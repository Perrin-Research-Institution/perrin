import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '../../../../lib/mongodb'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const app = await db.collection('applications').findOne({ id: params.id })
    if (!app) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    return NextResponse.json(app)
  } catch (e) {
    console.error('Get application error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const body = await request.json()
    const allowed: any = {}
    if (body.status) allowed.status = body.status
    if (body.notes) allowed.notes = String(body.notes)
    allowed.updatedAt = new Date().toISOString()

    const app = await db.collection('applications').findOne({ id: params.id })
    if (!app) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    await db.collection('applications').updateOne({ id: params.id }, { $set: allowed })
    const updated = { ...app, ...allowed }

    // Attempt to send email using SendGrid Web API
    let emailAttempted = false
    let emailSent = false
    if (allowed.status && updated.email) {
      try {
        const sg = await import('@sendgrid/mail').catch(() => null as any)
        if (sg) {
          const apiKey = process.env.SENDGRID_API_KEY || ''
          if (apiKey && apiKey.trim().length > 0) {
            emailAttempted = true
            sg.setApiKey(apiKey)

            // Build explicit from object (email + name)
            let fromEmail = process.env.FROM_EMAIL_ADDRESS || 'admin@perrininstitution.org'
            let fromName = process.env.FROM_EMAIL_NAME || 'Perrin Recruiting'
            const fromCombined = process.env.FROM_EMAIL
            if (!process.env.FROM_EMAIL_ADDRESS && typeof fromCombined === 'string') {
              const match = fromCombined.match(/^(.*)<\s*([^>]+)\s*>\s*$/)
              if (match) {
                const maybeName = match[1].trim()
                const maybeEmail = match[2].trim()
                if (maybeEmail) fromEmail = maybeEmail
                if (maybeName) fromName = maybeName.replace(/"|'/g, '').trim()
              }
            }
            const isRejected = String(allowed.status).toLowerCase() === 'rejected'
            const subject = isRejected
              ? `Regarding your application for ${updated.jobTitle} — Perrin Institution`
              : `Offer: ${updated.jobTitle} at the Perrin Institution`

            const applicantFirst = (updated.fields || []).find((f: any) => f.name.toLowerCase() === 'firstname')?.value || 'Applicant'
            const greetingName = typeof applicantFirst === 'string' ? applicantFirst : 'Applicant'
            const discordUrl = 'https://discord.gg/jXbQFNCZ7v'
            const bodyHtml = isRejected
              ? [
                  `<p>Dear ${greetingName},</p>`,
                  `<p>Thank you for your interest in the <strong>${updated.jobTitle}</strong> role at the Perrin Institution and for the time you invested in your application. After a careful and competitive review, we won’t be moving forward at this time.</p>`,
                  `<p>This decision isn’t a reflection of a lack of talent—many strong candidates applied for a limited number of openings. We genuinely appreciate your interest in our mission. If you’d like, we encourage you to reapply in the future as new roles open that may be an even closer match to your experience.</p>`,
                  `<p>In the meantime, you can stay connected with us by following our work and future opportunities on our website and news page.</p>`,
                  `<p>With appreciation,<br/>Perrin Institution Recruiting</p>`,
                ].join('')
              : [
                  `<p>Dear ${greetingName},</p>`,
                  `<p>We are delighted to offer you the position of <strong>${updated.jobTitle}</strong> at the Perrin Institution.</p>`,
                  `<p>Next steps to confirm and begin onboarding:</p>`,
                  `<ol>`,
                  `<li>Join our onboarding Discord within 24–48 hours: <a href="${discordUrl}">${discordUrl}</a></li>`,
                  `<li>Reply to this email to confirm acceptance and your earliest start-date availability.</li>`,
                  `<li>We will follow up with your onboarding checklist and scheduling details.</li>`,
                  `</ol>`,
                  `<p>We’re excited to welcome you to the team.</p>`,
                  `<p>Warmly,<br/>Perrin Institution Recruiting</p>`,
                ].join('')

            await sg.send({
              to: String(updated.email),
              from: { email: fromEmail, name: fromName },
              subject,
              html: bodyHtml,
            })
            emailSent = true
          }
        }
      } catch (emailErr) {
        console.error('SendGrid email error (non-fatal):', emailErr)
      }
    }
    return NextResponse.json({ ...updated, emailAttempted, emailSent })
  } catch (e) {
    console.error('Update application error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db('perrindb')
    const res = await db.collection('applications').deleteOne({ id: params.id })
    if (res.deletedCount === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (e) {
    console.error('Delete application error:', e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}


