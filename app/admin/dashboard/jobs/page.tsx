"use client"

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { addJob, deleteJob, getJobs, JobFormField, JobRole, JobUrgency, updateJob } from '../../../../lib/jobs'
import { getApplicationsByJob, Application, updateApplicationStatus, deleteApplication } from '../../../../lib/applications'

const DEFAULT_FORM_FIELDS: JobFormField[] = [
  { id: 'firstName', name: 'firstName', label: 'First Name', type: 'text', required: true, placeholder: 'Your first name' },
  { id: 'lastName', name: 'lastName', label: 'Last Name', type: 'text', required: true, placeholder: 'Your last name' },
  { id: 'email', name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
  { id: 'phone', name: 'phone', label: 'Phone', type: 'phone', required: false, placeholder: '(123) 456-7890' },
  { id: 'coverLetter', name: 'coverLetter', label: 'Cover Letter', type: 'textarea', required: true, placeholder: 'Tell us about yourself' },
  { id: 'resume', name: 'resume', label: 'Resume/CV', type: 'file', required: true },
]

export default function JobsAdminPage() {
  const router = useRouter()
  const [jobs, setJobs] = useState<JobRole[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [editing, setEditing] = useState<JobRole | null>(null)
  const [activeJobId, setActiveJobId] = useState<string | null>(null)
  const [applications, setApplications] = useState<Record<string, Application[]>>({})
  const [loadingApps, setLoadingApps] = useState<string | null>(null)
  const [hasJobsAccess, setHasJobsAccess] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [pwError, setPwError] = useState('')

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('perrinAdminAuth') === 'true'
    if (!isAuthenticated) router.push('/admin')
  }, [router])

  useEffect(() => {
    const access = sessionStorage.getItem('perrinJobsPW') === 'true'
    if (access) {
      setHasJobsAccess(true)
    } else {
      // Do not show loading overlay while waiting for password
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!hasJobsAccess) return
    setLoading(true)
    ;(async () => {
      try {
        const data = await getJobs()
        setJobs(data)
      } catch (e) {
        setError('Failed to load jobs')
      } finally {
        setLoading(false)
      }
    })()
  }, [hasJobsAccess])

  const handlePwSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordInput === 'execstaffperrin2024!') {
      sessionStorage.setItem('perrinJobsPW', 'true')
      setPwError('')
      setHasJobsAccess(true)
    } else {
      setPwError('Incorrect passcode. Please try again.')
    }
  }

  const loadApplications = async (jobId: string) => {
    try {
      setLoadingApps(jobId)
      const list = await getApplicationsByJob(jobId)
      setApplications(prev => ({ ...prev, [jobId]: list }))
    } catch (e) {
      setError('Failed to load applications')
    } finally {
      setLoadingApps(null)
    }
  }

  const resetEditing = () => {
    setEditing(null)
    setIsSaving(false)
    setError('')
  }

  const startCreate = () => {
    const draft: JobRole = {
      id: 'new',
      title: '',
      type: 'Full-time',
      location: '',
      department: '',
      salaryRange: '',
      description: '',
      requirements: [],
      benefits: [],
      postedDate: new Date().toISOString().slice(0, 10),
      urgency: 'medium',
      formFields: DEFAULT_FORM_FIELDS,
      active: true,
    }
    setEditing(draft)
  }

  const saveEditing = async () => {
    if (!editing) return
    if (!editing.title || !editing.location || !editing.department || !editing.description) {
      setError('Please fill required fields')
      return
    }
    setIsSaving(true)
    setError('')
    setSuccess('')
    try {
      if (editing.id === 'new') {
        const { id: _omitId, postedDate: _omitPosted, ...payload } = editing
        const created = await addJob(payload)
        if (!created) throw new Error('Create failed')
        setJobs([created, ...jobs])
      } else {
        const updated = await updateJob(editing.id, editing)
        if (!updated) throw new Error('Update failed')
        setJobs(jobs.map(j => (j.id === updated.id ? updated : j)))
      }
      setSuccess('Saved successfully')
      resetEditing()
    } catch (e) {
      setError('Failed to save job')
    } finally {
      setIsSaving(false)
    }
  }

  const removeJob = async (id: string) => {
    try {
      const ok = await deleteJob(id)
      if (ok) setJobs(jobs.filter(j => j.id !== id))
    } catch (e) {
      setError('Failed to delete job')
    }
  }

  if (loading && hasJobsAccess) {
    return (
      <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999 }}>
        <div className="min-h-screen flex items-center justify-center text-gray-300">Loading jobs…</div>
      </div>
    )
  }

  if (!hasJobsAccess) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, #0b0f19, #000)', zIndex: 9999 }}>
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-sm bg-gray-900/80 border border-gray-800 rounded-xl p-6 shadow-2xl">
            <div className="flex items-center mb-4">
              <Image src="/moretechperrin-removebg-preview.png" alt="Perrin Institution Logo" width={120} height={40} className="h-8 w-auto mr-3" />
              <h2 className="text-gray-200 font-semibold">Jobs Access</h2>
            </div>
            <p className="text-sm text-gray-400 mb-4">Enter the executive staff passcode to manage jobs.</p>
            <form onSubmit={handlePwSubmit} className="space-y-3">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Passcode"
                className="w-full px-3 py-2 bg-gray-800 text-gray-100 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                autoFocus
              />
              {pwError && <div className="text-sm text-red-400">{pwError}</div>}
              <button type="submit" className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">Unlock</button>
            </form>
            <div className="mt-4 text-xs text-gray-500">You must also be signed in to the Employee Portal.</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, overflow: 'auto' }}>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
            <div className="flex items-center">
              <Image src="/moretechperrin-removebg-preview.png" alt="Perrin Institution Logo" width={140} height={50} className="h-10 w-auto mr-4" />
              <h1 className="text-xl font-bold text-white hidden sm:block">Employee Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  sessionStorage.removeItem('perrinAdminAuth')
                  router.push('/admin')
                }}
                className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-md transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex mb-6 text-sm border-b border-gray-800">
            <Link href="/admin/dashboard" className="px-4 py-2 text-gray-500 hover:text-gray-300">Create Article</Link>
            <Link href="/admin/dashboard/articles" className="px-4 py-2 text-gray-500 hover:text-gray-300">Manage Articles</Link>
            <div className="px-4 py-2 border-b-2 border-blue-500 text-blue-400 font-medium">Jobs</div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-800 text-red-300 rounded-md">{error}</div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-800 text-green-300 rounded-md">{success}</div>
          )}

          {/* Editor */}
          {editing && (
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow-xl mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">{editing.id === 'new' ? 'Create Job' : 'Edit Job'}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Title</label>
                  <input className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Type</label>
                  <select className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })}>
                    {['Full-time','Part-time','Contract','Internship','Fellowship'].map(t => (<option key={t} value={t}>{t}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Location</label>
                  <input className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.location} onChange={e => setEditing({ ...editing, location: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Department</label>
                  <input className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.department} onChange={e => setEditing({ ...editing, department: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Salary Range</label>
                  <input className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.salaryRange ?? ''} onChange={e => setEditing({ ...editing, salaryRange: e.target.value })} />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Urgency</label>
                  <select className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.urgency} onChange={e => setEditing({ ...editing, urgency: e.target.value as JobUrgency })}>
                    {(['low','medium','high'] as JobUrgency[]).map(u => (<option key={u} value={u}>{u}</option>))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 mb-2">Description</label>
                  <textarea rows={5} className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Requirements (one per line)</label>
                    <textarea rows={5} className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.requirements.join('\n')} onChange={e => setEditing({ ...editing, requirements: e.target.value.split('\n').filter(Boolean) })} />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">Benefits (one per line)</label>
                    <textarea rows={5} className="w-full px-3 py-2 bg-gray-800 text-white rounded border border-gray-700" value={editing.benefits.join('\n')} onChange={e => setEditing({ ...editing, benefits: e.target.value.split('\n').filter(Boolean) })} />
                  </div>
                </div>
              </div>

              {/* Form fields builder */}
              <div className="mt-6">
                <h3 className="text-lg text-white mb-3">Application Form Fields</h3>
                <div className="space-y-3">
                  {editing.formFields.map((f: JobFormField, idx: number) => (
                    <div key={f.id} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-gray-800/50 p-3 rounded border border-gray-700">
                      <input className="px-3 py-2 bg-gray-900 text-white rounded border border-gray-700" placeholder="Label" value={f.label} onChange={e => {
                        const copy = [...editing.formFields]; copy[idx] = { ...copy[idx], label: e.target.value }; setEditing({ ...editing, formFields: copy })
                      }} />
                      <input className="px-3 py-2 bg-gray-900 text-white rounded border border-gray-700" placeholder="Name" value={f.name} onChange={e => {
                        const copy = [...editing.formFields]; copy[idx] = { ...copy[idx], name: e.target.value }; setEditing({ ...editing, formFields: copy })
                      }} />
                      <select className="px-3 py-2 bg-gray-900 text-white rounded border border-gray-700" value={f.type} onChange={e => {
                        const copy = [...editing.formFields]; copy[idx] = { ...copy[idx], type: e.target.value as any }; setEditing({ ...editing, formFields: copy })
                      }}>
                        {['text','email','textarea','url','date','select','checkbox','radio','file','phone'].map(t => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      <input className="px-3 py-2 bg-gray-900 text-white rounded border border-gray-700" placeholder="Placeholder / Options (comma)" value={f.type === 'select' || f.type === 'radio' ? (f.options?.join(',') ?? '') : (f.placeholder ?? '')} onChange={e => {
                        const copy = [...editing.formFields];
                        if (f.type === 'select' || f.type === 'radio') copy[idx] = { ...copy[idx], options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } as any;
                        else copy[idx] = { ...copy[idx], placeholder: e.target.value } as any;
                        setEditing({ ...editing, formFields: copy })
                      }} />
                      <label className="inline-flex items-center text-gray-300"><input type="checkbox" className="mr-2" checked={f.required} onChange={e => { const copy: JobFormField[] = [...editing.formFields]; copy[idx] = { ...copy[idx], required: e.target.checked }; setEditing({ ...editing, formFields: copy }) }} /> Required</label>
                      <div className="md:col-span-5 flex justify-end">
                        <button className="text-red-400 hover:text-red-300 text-sm" onClick={() => {
                          const copy = editing.formFields.filter((_: JobFormField, i: number) => i !== idx); setEditing({ ...editing, formFields: copy })
                        }}>Remove</button>
                      </div>
                    </div>
                  ))}
                  <button className="mt-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded border border-gray-700 text-sm" onClick={() => {
                    setEditing({ ...editing, formFields: [...editing.formFields, { id: `field-${Date.now()}`, name: 'customField', label: 'Custom Field', type: 'text', required: false }] })
                  }}>Add Field</button>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={resetEditing} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded">Cancel</button>
                <button onClick={saveEditing} disabled={isSaving} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-60">{isSaving ? 'Saving…' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* Jobs list */}
          <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <h2 className="text-xl font-semibold text-white">Jobs ({jobs.length})</h2>
              <button onClick={startCreate} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm">Create Job</button>
            </div>
            {jobs.length === 0 ? (
              <div className="p-6 text-center text-gray-400">No jobs yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {jobs.map(job => (
                      <tr key={job.id} className="hover:bg-gray-800/50">
                        <td className="px-6 py-4 text-gray-200">{job.title}</td>
                        <td className="px-6 py-4 text-gray-300">{job.department}</td>
                        <td className="px-6 py-4 text-gray-300">{job.type}</td>
                        <td className="px-6 py-4 text-gray-300">{job.location}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${job.active ? 'bg-green-900/50 text-green-400 border border-green-800/50' : 'bg-gray-800 text-gray-400 border border-gray-700'}`}>{job.active ? 'Active' : 'Inactive'}</span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <button onClick={() => setEditing(job)} className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                          <button onClick={() => removeJob(job.id)} className="text-red-400 hover:text-red-300 mr-3">Delete</button>
                          <button onClick={() => { setActiveJobId(activeJobId === job.id ? null : job.id); if (activeJobId !== job.id) loadApplications(job.id) }} className="text-gray-300 hover:text-white">{activeJobId === job.id ? 'Hide Applications' : 'View Applications'}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Applications for selected job */}
          {activeJobId && (
            <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-xl mt-6">
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-xl font-semibold text-white">Applications for Job #{activeJobId}</h2>
                {loadingApps && <span className="text-gray-400 text-sm">Loading…</span>}
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-800">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resume</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {(applications[activeJobId] || []).map((app) => {
                      const firstName = app.fields.find(f => f.name.toLowerCase() === 'firstName'.toLowerCase())?.value || ''
                      const lastName = app.fields.find(f => f.name.toLowerCase() === 'lastName'.toLowerCase())?.value || ''
                      const resume = app.files?.[0]
                      const viewUrl = resume?.url
                      return (
                        <tr key={app.id} className="hover:bg-gray-800/50">
                          <td className="px-6 py-4 text-gray-200">{String(firstName)} {String(lastName)}</td>
                          <td className="px-6 py-4 text-gray-300">{app.email || '—'}</td>
                          <td className="px-6 py-4 text-gray-300 capitalize">{app.status.replace('_',' ')}</td>
                          <td className="px-6 py-4">{resume ? (
                            <a href={viewUrl || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                              {resume.filename || 'View'}
                            </a>
                          ) : '—'}</td>
                          <td className="px-6 py-4 text-sm">
                            <button className="text-green-400 hover:text-green-300 mr-3" onClick={async () => {
                              if (!confirm('Send acceptance email and remove applicant from the pool?')) return
                              const updated: any = await updateApplicationStatus(app.id, 'shortlist')
                              if (updated) {
                                if (updated.emailAttempted && !updated.emailSent) {
                                  alert('Acceptance email was attempted but not sent. Please verify SMTP configuration (SMTP_URL or SMTP_HOST/PORT/USER/PASS) and applicant email.')
                                } else if (!updated.emailAttempted) {
                                  alert('Acceptance email not attempted (no SMTP configured or no applicant email captured).')
                                }
                                await deleteApplication(app.id)
                                loadApplications(activeJobId)
                              }
                            }}>Accept</button>
                            <button className="text-red-400 hover:text-red-300" onClick={async () => {
                              if (!confirm('Send rejection email and remove applicant from the pool?')) return
                              const updated: any = await updateApplicationStatus(app.id, 'rejected')
                              if (updated) {
                                if (updated.emailAttempted && !updated.emailSent) {
                                  alert('Rejection email was attempted but not sent. Please verify SMTP configuration (SMTP_URL or SMTP_HOST/PORT/USER/PASS) and applicant email.')
                                } else if (!updated.emailAttempted) {
                                  alert('Rejection email not attempted (no SMTP configured or no applicant email captured).')
                                }
                                await deleteApplication(app.id)
                                loadApplications(activeJobId)
                              }
                            }}>Reject</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {(applications[activeJobId] || []).length === 0 && (
                  <div className="p-6 text-center text-gray-400">No applications yet</div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 text-center text-gray-500 text-xs">© {new Date().getFullYear()} Perrin Institution. All rights reserved.</div>
        </div>
      </div>
    </div>
  )
}


