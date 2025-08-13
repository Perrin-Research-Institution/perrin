export interface Expert {
  id: number
  name: string
  role: string
  bio: string
  image: string
  email?: string
  phone?: string
  mentor?: string
  interests?: string[]
  category?: string
  affiliations?: {
    education?: string[]
    workExperience?: string[]
    organizations?: string[]
  }
  socialLinks?: {
    linkedin?: string
    instagram?: string
    website?: string
  }
  stats?: {
    sat?: string
    act?: string
    lsat?: string
  }
}

export const EXPERTS: Expert[] = [
  {
    id: 1,
    name: "Finn Järvi",
    role: "Founder & President",
    bio: "Finn Järvi is the visionary Founder and President of the Perrin Institute, leading groundbreaking research in technology policy and governance. With extensive experience in public policy and organizational leadership, Finn has established the Institute as a premier destination for innovative policy research and analysis.",
    image: "",
    email: "finnjarvi@perrininstitution.org",
    category: "Leadership",
    interests: ["Technology Policy", "Public Governance", "Innovation Strategy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 2,
    name: "Cash Hilinski",
    role: "Co-Founder & Chief Technology Officer",
    bio: "Cash Hilinski serves as Co-Founder and Chief Technology Officer, spearheading the technical strategy and digital innovation initiatives at the Perrin Institute. His expertise in technology implementation and systems architecture drives the Institute's technological advancement and research capabilities.",
    image: "",
    email: "admin@perrininstitution.org",
    category: "Leadership",
    interests: ["Technology Strategy", "Digital Innovation", "Systems Architecture"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 3,
    name: "Elise Tao",
    role: "Chief Operating Officer & Executive Editor",
    bio: "Elise Tao is a Harvard student and 19-year-old entrepreneur, activist, writer, and model from New Jersey. In addition to Perrin, she founded the global digital magazine Synthesis Publications when she was 14 and has appeared in publications including NBC, ABC, CBS, the Walt Disney Networks, The Coca Cola Scholarship press page, The Anthony Quinn Foundation press page, the Josh Gottheimer press page, DIAGRAM, Poetry Online, Double Yolk, and the Eunoia Review. She is involved with Everytown for Gun Safety's Students Demand Action, is the youngest intern for the Harvard Law Review, and is a reporter for The Harvard Crimson. She was named the 2024 Distinguished Young Woman of New Jersey and is signed to top agencies Dancho Models and Latitude Talent in New York City. She has given a TEDx Talk on \"The Art of Oversharing\" and has served as one of few select judges for the 2025 National Scholastic Art and Writing Competition, where she won a Gold Medal for Journalism in her senior year of high school. Elise is passionate about free press, women's rights, putting an end to gun violence, the arts, self-expression, and the power of storytelling.",
    image: "",
    email: "elise@perrininstitution.org",
    category: "Leadership",
    interests: ["Journalism", "Free Press", "Women's Rights", "Gun Violence Prevention", "Creative Writing", "Modeling"],
    affiliations: {
      organizations: ["Perrin Institute", "Harvard Law Review", "The Harvard Crimson", "Synthesis Publications", "Everytown for Gun Safety"],
      education: ["Harvard University"]
    }
  },
  {
    id: 4,
    name: "Samuel Riverson",
    role: "Chief Marketing Officer",
    bio: "Samuel Riverson, born and raised in northern Virginia, is the chief strategy officer at Perrin. He studies Systems Engineering at the University of Virginia and is active in NSBE (National Society of Black Engineers), TOTE (Taste of the East) dance, Chi Alpha Christian Fellowship, and serves as President of the Perrin Institution at UVA, Logistics Chair of EESA, and Teaching Assistant for Professor Shaylin Williams. He has been teaching Sunday school for six years at his home church in Springfield, Virginia. He worked with the Pink Room Foundation in Durban, South Africa on their Sandwich Drive Initiative, served as a doctor's assistant at a mobile clinic in Balgowan, and helped launch the Pamojja Project, a nonprofit program in Uganda that supported local farmers by teaching modern best practices. He is currently working as a summer associate at Lafayette Square learning how to underwrite finance deals. Samuel is ultimately interested in combining his systems engineering and service background to impact the world by using finance as a tool.",
    image: "",
    email: "rgf9kv@virginia.edu",
    category: "Leadership",
    interests: ["Strategic Marketing", "Brand Development", "Communications Strategy", "Systems Engineering", "Finance"],
    affiliations: {
      organizations: ["Perrin Institute"],
      education: ["University of Virginia"]
    }
  },
  {
    id: 5,
    name: "Thomas Fang",
    role: "Chief of Staff",
    bio: "Thomas Fang serves as Chief of Staff, overseeing operations and team coordination across all Institute initiatives. His strategic leadership ensures efficient workflow and effective collaboration between departments while maintaining the Institute's high standards of excellence.",
    image: "",
    email: "hayobro7512@gmail.com",
    category: "Leadership",
    interests: ["Operations Management", "Strategic Planning", "Team Leadership"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 6,
    name: "Agneya Tharun",
    role: "Chief Information Security Officer",
    bio: "Agneya Tharun leads the Institute's cybersecurity initiatives as Chief Information Security Officer, ensuring robust data protection and security protocols. His expertise in information security safeguards the Institute's research data and maintains the highest standards of digital security.",
    image: "",
    category: "Leadership",
    interests: ["Cybersecurity", "Data Protection", "Information Security"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 7,
    name: "Arlan Rakhmetzhanov",
    role: "Emeritus COO",
    bio: "Arlan Rakhmetzhanov serves as Emeritus COO, bringing extensive experience in operations management and strategic leadership to the Institute. His legacy of operational excellence continues to influence the Institute's organizational structure and efficiency standards.",
    image: "",
    category: "Leadership",
    interests: ["Operations Management", "Strategic Leadership", "Organizational Excellence"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 8,
    name: "Emmanuel Asamoah",
    role: "Chief Compliance Officer",
    bio: "Emmanuel Asamoah ensures regulatory compliance and ethical standards as Chief Compliance Officer, maintaining the Institute's commitment to transparency and accountability in all research and operational activities.",
    image: "",
    category: "Leadership",
    interests: ["Regulatory Compliance", "Ethics", "Risk Management"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  
  
  {
    id: 11,
    name: "Avani Agarwal",
    role: "Software Engineer",
    bio: "Avani Agarwal contributes to the Institute's technical capabilities as a Software Engineer, developing and maintaining applications that support research operations and enhance the Institute's digital infrastructure.",
    image: "",
    email: "avanipersonal7@gmail.com",
    category: "Engineering",
    interests: ["Software Development", "Web Applications", "Technical Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 12,
    name: "Chankyu Kim",
    role: "Software Engineer",
    bio: "Chankyu Kim specializes in software development and technical solutions as a Software Engineer, contributing to the Institute's technological advancement through innovative programming and system development.",
    image: "",
    email: "nehemiahk.perrin@gmail.com",
    category: "Engineering",
    interests: ["Software Engineering", "System Development", "Technical Solutions"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 13,
    name: "Cody Coleman",
    role: "Director of Technology",
    bio: "Cody Coleman oversees technical initiatives and strategy as Director of Technology, leading the development of innovative technological solutions that enhance the Institute's research capabilities and operational efficiency.",
    image: "",
    category: "Engineering",
    interests: ["Technology Leadership", "Technical Strategy", "Innovation Management"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 14,
    name: "Khoa Duong",
    role: "Vice President of Marketing",
    bio: "Khoa Duong leads brand strategy and market growth initiatives as Vice President of Marketing, developing comprehensive marketing campaigns that increase the Institute's visibility and influence in the policy research community.",
    image: "",
    email: "duongdangkhoa0328@gmail.com",
    phone: "(+84) 981880698",
    category: "Leadership",
    interests: ["Brand Strategy", "Market Growth", "Marketing Analytics"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 15,
    name: "Vick Volovnyk",
    role: "Director of Communications",
    bio: "Vick Volovnyk manages external communications and public relations as Director of Communications, crafting strategic messaging that effectively communicates the Institute's research findings and mission to diverse audiences.",
    image: "",
    category: "Leadership",
    interests: ["Public Relations", "Strategic Communications", "Media Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 16,
    name: "Yiren Jing",
    role: "Policy Researcher",
    bio: "Yiren Jing is a Policy Researcher at the Perrin Institute specializing in comprehensive policy analysis and strategic development. He conducts rigorous research across multiple policy domains, focusing on creating evidence-based recommendations for complex governance challenges. His work involves analyzing policy implementation frameworks and their effectiveness in achieving intended outcomes. He is committed to advancing data-driven policy solutions through systematic research methodologies.",
    image: "",
    email: "jingyiren345@gmail.com",
    category: "Research",
    interests: ["Policy Analysis", "Strategic Development", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 17,
    name: "Rienat Kharian",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing policy implications and opportunities.",
    image: "",
    category: "Research"
  },
  {
    id: 18,
    name: "Kashaf Alvi",
    role: "Senior Lab Director",
    bio: "Senior Lab Director conducting research on various policy areas.",
    image: "",
    category: "Research"
  },
  {
    id: 19,
    name: "Aayam Bansal",
    role: "Policy Researcher",
    bio: "Policy Researcher specializing in policy analysis and development.",
    image: "",
    category: "Research"
  },
  {
    id: 20,
    name: "Daniel Tu",
    role: "Policy Researcher",
    bio: "Policy Researcher focusing on policy implementation and evaluation.",
    image: "",
    category: "Research"
  },
  {
    id: 21,
    name: "Lucas Benardete",
    role: "Policy Researcher",
    bio: "Policy Researcher investigating policy impacts and effectiveness.",
    image: "",
    category: "Research"
  },
  {
    id: 22,
    name: "Anirudh Polagani",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative policy solutions.",
    image: "",
    email: "anirudh.perrin@gmail.com",
    category: "Research"
  },
  {
    id: 23,
    name: "Riya Dutta",
    role: "Policy Researcher",
    bio: "Riya Dutta is a high school student from Texas focused on public policy, human rights, and civic leadership. She is the Founder and CEO of Restoring Rainbows Southlake, a nonprofit that has distributed over 3,000 refurbished school and art supplies across Dallas through 10+ donation sites. As a U.S. Congressional Intern, she supported campaign strategy and led outreach to over 200 constituents. She has also published policy briefs on gender-based violence in Egypt and led diplomatic outreach to 20+ UN delegations and government officials. As nationally ranked Congressional debater, she qualified for NSDA Nationals and competed at major tournaments like Emory's Barkley Forum and the UKY Opener. Riya has completed over 400 hours of community service, held leadership roles in student government and choir, and was one of 20 students selected for a regional scholarship from a pool of 37,000+ applicants. She plans to pursue a career in law, global policy, and education reform.",
    image: "",
    email: "riyadutta@perrinlabs.org",
    category: "Research",
    interests: ["Public Policy", "Human Rights", "Civic Leadership", "Congressional Debate", "Global Policy"],
    affiliations: {
      organizations: ["Perrin Institute", "Restoring Rainbows Southlake"]
    }
  },
  {
    id: 24,
    name: "Jacob Wolmetz",
    role: "Policy Researcher",
    bio: "Policy Researcher studying emerging policy trends and challenges.",
    image: "",
    category: "Research"
  },
  {
    id: 25,
    name: "Yash Laddha",
    role: "Policy Researcher",
    bio: "Policy Researcher contributing to policy innovation and research.",
    image: "",
    email: "yashladdha75@gmail.com",
    category: "Research"
  },
  {
    id: 26,
    name: "Noah Diaz",
    role: "Policy Researcher",
    bio: "Policy Researcher analyzing complex policy issues and solutions.",
    image: "",
    category: "Research"
  },
  {
    id: 27,
    name: "Saanvi Gowda",
    role: "Policy Researcher",
    bio: "Policy Researcher conducting thorough policy analysis and research.",
    image: "",
    category: "Research"
  },
  {
    id: 28,
    name: "Shuwei Guo",
    role: "Policy Researcher",
    bio: "Policy Researcher exploring innovative approaches to policy challenges.",
    image: "",
    email: "shuweiguo1@gmail.com",
    category: "Research"
  },
  {
    id: 29,
    name: "Simran Sahoo",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher reviewing and overseeing content publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 30,
    name: "Mohammad Ibrahim",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher contributing to content analysis and publication.",
    image: "",
    category: "Editorial"
  },
  {
    id: 31,
    name: "Aaron Zeleke",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher supporting content development and research.",
    image: "",
    category: "Editorial"
  },
  {
    id: 32,
    name: "Rebekah Mekonen",
    role: "Editorial Board Researcher",
    bio: "Editorial Board Researcher and Outreach Chair facilitating research communication.",
    image: "",
    email: "qhu4bv@virginia.edu",
    phone: "5714993544",
    category: "Editorial"
  },
  {
    id: 33,
    name: "Kiro Moussa",
    role: "Research Fellow",
    bio: "Kiro Moussa is a distinguished Research Fellow specializing in the intersection of technology policy and social justice. His research focuses on ensuring equitable access to emerging technologies and developing frameworks for inclusive policy development. Kiro brings a unique perspective to technology governance through his interdisciplinary approach combining political science, technology studies, and social justice advocacy.",
    image: "",
    interests: ["Social Justice", "Technology Policy", "Political Science", "Digital Equity", "Inclusive Innovation"],
    category: "Research Fellow",
    socialLinks: {
      linkedin: "https://linkedin.com/in/kiro-moussa",
      website: "https://kiromoussa.com"
    },
    affiliations: {
      education: ["Harvard University", "MIT"],
      organizations: ["Perrin Institute", "Tech Justice Coalition"]
    }
  },
  {
    id: 34,
    name: "Lexie Hobbs",
    role: "Research Fellow",
    bio: "Lexie Hobbs is a Research Fellow with expertise in government relations and policy research, particularly in higher education policy. Her work focuses on analyzing educational governance structures and developing evidence-based recommendations for institutional improvement and student success initiatives.",
    image: "",
    interests: ["Government Relations", "Policy Research", "Higher Education", "Educational Governance"],
    category: "Research Fellow",
    affiliations: {
      education: ["Smith College"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 35,
    name: "Anaise Lopez-Rodriguez",
    role: "Research Fellow",
    bio: "Anaise Lopez-Rodriguez conducts policy research with a focus on social equity and community development. Her work examines the intersection of public policy and community welfare, developing frameworks for inclusive policy implementation.",
    image: "",
    category: "Research Fellow",
    interests: ["Social Equity", "Community Development", "Public Policy"],
    affiliations: {
      education: ["Brown University"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 36,
    name: "Jawhar Yasin",
    role: "Research Fellow",
    bio: "Jawhar Yasin specializes in policy implementation and evaluation as a Research Fellow. His research focuses on developing metrics for policy effectiveness and creating frameworks for evidence-based policy adjustment and improvement.",
    image: "",
    category: "Research Fellow",
    interests: ["Policy Implementation", "Policy Evaluation", "Evidence-Based Policy"],
    affiliations: {
      education: ["Princeton University"],
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 37,
    name: "Neha Nair",
    role: "Research Fellow",
    bio: "Neha Nair is a Research Fellow specializing in environmental policy and sustainability initiatives. Her research explores the intersection of technology and environmental governance, developing innovative approaches to climate policy and sustainable development.",
    image: "",
    interests: ["Environmental Policy", "Technology", "Sustainability", "Climate Governance"],
    category: "Research Fellow",
    affiliations: {
      organizations: ["Perrin Institute", "Climate Policy Initiative"]
    }
  },
  {
    id: 38,
    name: "Lourdes Ronquillo",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Tufts University"]
    }
  },
  {
    id: 39,
    name: "Christian Wang",
    role: "Research Fellow",
    bio: "Research Fellow focusing on philosophy, politics, and economics.",
    image: "",
    interests: ["Philosophy", "Politics", "Economics"],
    category: "Research Fellow",
    affiliations: {
      education: ["Oxford University"]
    }
  },
  {
    id: 40,
    name: "Oz Smith",
    role: "Research Fellow",
    bio: "Research Fellow conducting independent policy research.",
    image: "",
    category: "Research Fellow"
  },
  {
    id: 41,
    name: "Heba Elkouraichi",
    role: "Research Fellow",
    bio: "Research Fellow studying policy implementation.",
    image: "",
    category: "Research Fellow",
    affiliations: {
      education: ["Vassar College"]
    }
  },
  {
    id: 42,
    name: "Sophie Sarazin",
    role: "Research Fellow",
    bio: "Research Fellow focusing on policy research.",
    image: "",
    email: "ssarazin.07@gmail.com",
    category: "Research Fellow",
    interests: ["Educational Policy", "Environmental Policy"]
  },
  {
    id: 43,
    name: "Noah Wondwossen",
    role: "Co-President",
    bio: "Co-President of Perrin at The University of Virginia.",
    image: "",
    email: "kqe8kv@virginia.edu",
    phone: "2408107421",
    category: "UVA Chapter"
  },
  {
    id: 44,
    name: "Nehemiah Kim",
    role: "Treasurer",
    bio: "Treasurer of Perrin at The University of Virginia.",
    image: "",
    email: "kyi5ra@virginia.edu",
    phone: "3176280361",
    category: "UVA Chapter"
  },
  {
    id: 45,
    name: "Naomi Million",
    role: "Secretary",
    bio: "Secretary of Perrin at The University of Virginia.",
    image: "",
    email: "uwm4xh@virginia.edu",
    phone: "7033990711",
    category: "UVA Chapter"
  },
  {
    id: 46,
    name: "Manuella Kodwo",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "pyv7wx@virginia.edu",
    phone: "7038592870",
    category: "UVA Chapter"
  },
  {
    id: 47,
    name: "Mikael Tefferi",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "dne7vg@virginia.edu",
    phone: "7033464967",
    category: "UVA Chapter"
  },
  {
    id: 48,
    name: "Heran Dereje",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "rqh5rc@virginia.edu",
    category: "UVA Chapter"
  },
  {
    id: 49,
    name: "Abel Alexander",
    role: "Member",
    bio: "Member of Perrin at The University of Virginia.",
    image: "",
    email: "fct4zy@virginia.edu",
    category: "UVA Chapter"
  },
  {
    id: 50,
    name: "Aashi Jain",
    role: "Research Associate",
    bio: "Research Associate focused on policy development and implementation.",
    image: "",
    email: "foreveraashijain@gmail.com",
    category: "Research Associates"
  },
  {
    id: 51,
    name: "Shivam Bhatt",
    role: "Research Associate",
    bio: "Research Associate specializing in policy analysis and research.",
    image: "",
    email: "shivamb0608@gmail.com",
    category: "Research Associates"
  },
  {
    id: 52,
    name: "Aashrith Tatineni",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "atatineni09@gmail.com",
    category: "Research Associates"
  },
  {
    id: 53,
    name: "Matthew Ma",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "matthewma347@gmail.com",
    category: "Research Associates"
  },
  {
    id: 54,
    name: "Amrith Ponneth",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "amrith.ponneth@gmail.com",
    category: "Research Associates"
  },
  {
    id: 55,
    name: "Afia Mubashir",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mubashir.afia@gmail.com",
    category: "Research Associates"
  },
  {
    id: 56,
    name: "Aiyana Bage",
    role: "Research Associate",
    bio: "Research Associate studying policy implications and opportunities.",
    image: "",
    email: "aiyanabag10@gmail.com",
    category: "Research Associates"
  },
  {
    id: 57,
    name: "Nivriti Deshpande",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "nivriti.deshpande@gmail.com",
    category: "Research Associates"
  },
  {
    id: 58,
    name: "Shreshtha Aggarwal",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "shreshtha.aggarwal01@gmail.com",
    category: "Research Associates"
  },
  {
    id: 59,
    name: "Saahir Vazirani",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "saahir.vazirani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 60,
    name: "Bhavana Karthik",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "bhavana22.karthik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 61,
    name: "Eva Dubey",
    role: "Research Associate & Domestic Affairs Editor",
    bio: "Research Associate and Domestic Affairs Editor specializing in policy research, evaluation, and domestic policy analysis.",
    image: "",
    email: "evasalt92@Gmail.com",
    category: "Research Associates",
    interests: ["Policy Research", "Domestic Affairs", "Policy Evaluation"]
  },
  {
    id: 62,
    name: "Arvind Salem",
    role: "Research Associate",
    bio: "Research Associate investigating policy solutions and impacts.",
    image: "",
    email: "arvindsalem1613@gmail.com",
    category: "Research Associates"
  },
  {
    id: 63,
    name: "Daniel Neuner",
    role: "Chief Strategy Officer & Executive Editor",
    bio: "Research Associate focused on policy development and analysis.",
    image: "",
    email: "dxneuner08@gmail.com",
    category: "Leadership",
  },
  {
    id: 64,
    name: "Iris Tang",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "tangiris2008@gmail.com",
    category: "Research Associates"
  },
  {
    id: 65,
    name: "Tanmay Rai",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research and analysis.",
    image: "",
    email: "tanmayraisa@gmail.com",
    category: "Research Associates"
  },
  {
    id: 66,
    name: "Aaron Kunnikuru",
    role: "Research Associate",
    bio: "Research Associate exploring policy development and implementation.",
    image: "",
    email: "aaronkunnik@gmail.com",
    category: "Research Associates"
  },
  {
    id: 68,
    name: "Samarth Pandey",
    role: "Research Associate",
    bio: "Research Associate examining policy frameworks and outcomes.",
    image: "",
    email: "samarthpan945@gmail.com",
    category: "Research Associates"
  },
  {
    id: 69,
    name: "Danielle Kim",
    role: "Research Associate",
    bio: "Research Associate investigating policy impacts and effectiveness.",
    image: "",
    email: "kimelledani@gmail.com",
    category: "Research Associates"
  },
  {
    id: 70,
    name: "Serra Aksoy",
    role: "Research Associate",
    bio: "Research Associate exploring innovative approaches to policy challenges.",
    image: "",
    email: "serurays@gmail.com",
    category: "Research Associates"
  },
  {
    id: 71,
    name: "Mahanth Komuravelli",
    role: "Research Associate",
    bio: "Research Associate conducting policy research and analysis.",
    image: "",
    email: "mahanthf112@gmail.com",
    category: "Research Associates"
  },
  {
    id: 72,
    name: "Vaishnavi Singh",
    role: "Senior Editor, AI Governance",
    bio: "Vaishnavi Singh is a Singaporean undergraduate at Singapore Management University studying Computer Science, Law and Political Science. She is a policy researcher, programmer and writer who served as the President of the Artificial Intelligence club at SMU, where she cultivated an environment to discuss AI and entrepreneurship alongside AI Safety and Governance. She was the sole intern at KPMG's AI Governance team, and has worked at 3 startups hoping to reconnect the law and AI. She is a Berkeley AI Safety Student Fellow, and has done the BlueDot AI Governance Programme, as well as the European Network AI Safety AI Alignment Track Fellowship. Currently she is looking to complete the ARENA curriculum and look into critical solutions for AI's technical governance, as well as analyse policy solutions across numerous jurisdictions. Before AI Governance, she represented her university as part of the international business case competition team, and served as a student consultant to the University's Board of Directors, with her solutions pitched to the University's President. Now having found her passion, she hopes to pursue a career in policy research, journalism and technical analysis.",
    image: "",
    email: "vaishnavi@perrinlabs.org",
    category: "Editorial",
    interests: ["AI Governance", "Computer Science", "Law", "Political Science", "AI Safety", "Policy Research"],
    affiliations: {
      organizations: ["Perrin Institute", "Singapore Management University", "Berkeley AI Safety"],
      education: ["Singapore Management University"]
    }
  },
  {
    id: 73,
    name: "Sunkalp Chandra",
    role: "Research Associate",
    bio: "Research Associate developing policy recommendations and solutions.",
    image: "",
    email: "sunkalp.chandra@gmail.com",
    category: "Research Associates"
  },
  {
    id: 74,
    name: "Sophie Glass",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research initiatives.",
    image: "",
    email: "sophieglass212@gmail.com",
    category: "Research Associates"
  },
  {
    id: 75,
    name: "Cason Noll",
    role: "Research Associate",
    bio: "Research Associate focused on policy analysis and development.",
    image: "",
    email: "casonnoll1@gmail.com",
    category: "Research Associates"
  },
  {
    id: 76,
    name: "Neel Iyer",
    role: "Research Associate",
    bio: "Research Associate examining policy trends and challenges.",
    image: "",
    email: "neeliyer14@gmail.com",
    category: "Research Associates"
  },
  {
    id: 78,
    name: "Mark Li",
    role: "Domestic Affairs Correspondent",
    bio: "Mark Li is a 16-year-old activist, civic organizer, and performing artist from Maryland; he is committed to advancing sustainable change through policy, advocacy, and the arts. He currently leads the Maryland State High School Democrats and is a vocal AAPI youth advocate, having co-authored education legislation in the Maryland State Legislature and served as an intern in the Maryland General Assembly. Outside of government, Mark is an accomplished classical saxophonist and concert pianist, having performed at venues such as Carnegie Hall, Lincoln Center, and the Palladium. He is also a singer-songwriter and multi-sport competitive athlete in basketball and volleyball. As the host of Beyond the Hyphen, a global affairs and politics podcast with over 15,000 streams, Mark uses journalism and conversations as a platform to bridge cultural divides through authentic and pragmatic storytelling. His nonprofit work supporting underrepresented youth has earned formal recognition from U.S. Senator Chris Van Hollen and praise from President Joe Biden through collaborations with national organizations such as United Chinese Americans.",
    image: "",
    email: "markli@perrinlabs.org",
    category: "Editorial",
    interests: ["Domestic Affairs", "AAPI Advocacy", "Classical Music", "Journalism", "Politics", "Youth Activism"],
    affiliations: {
      organizations: ["Perrin Institute", "Maryland State High School Democrats", "United Chinese Americans"],
      education: ["Maryland General Assembly (Intern)"]
    }
  },
  {
    id: 79,
    name: "Hunter Buchheit",
    role: "Legal Senior Editor",
    bio: "Hunter Buchheit is a student at Emory University studying Data Science, History, and English. As a student organizer, journalist, and writer, he currently serves as an Editor and Editorial Board member for the Emory Wheel. As an activist and active Atlanta community member, he has interned and worked for Georgia Equality, the Atlanta LGBTQ+ History Project, the ACLU of Georgia, the Georgia Youth Justice Coalition, and Visionary Artistry Magazine. He currently serves on the Board of Directors of VOX ATL. His writing has been published in various local and national outlets, including the Atlanta Journal-Constitution, the Georgia Recorder, NPR, them, Teen Vogue, and The Nation. He hopes to pursue a career at the intersection of journalism, policy, and public service.",
    image: "",
    email: "hunterbuchheit@perrinlabs.org",
    category: "Editorial",
    interests: ["Legal Analysis", "Data Science", "History", "English", "LGBTQ+ Rights", "Youth Justice"],
    affiliations: {
      organizations: ["Perrin Institute", "Emory Wheel", "Georgia Equality", "ACLU of Georgia", "VOX ATL"],
      education: ["Emory University"]
    }
  },
  {
    id: 80,
    name: "Nathaniel Nadler",
    role: "Vice President of Intelligent Earth Systems",
    bio: "Nathaniel Nadler is Vice President of Intelligent Earth Systems at the Perrin Institute and a student at Don Bosco Prep in New Jersey. He specializes in analyzing the intersection of technology, finance, and business innovation with a focus on intelligent earth systems and environmental technologies. With a strong foundation in mathematics and computer science, he examines how emerging technologies are transforming commercial sectors and regulatory landscapes. His research focuses on identifying innovative business models and their policy implications in the context of intelligent earth systems.",
    image: "",
    email: "nathanielnadler@perrinlabs.org",
    category: "Leadership",
    interests: ["Mathematics", "Computer Science", "Finance", "Commercial Innovation", "Intelligent Earth Systems"],
    affiliations: {
      organizations: ["Perrin Institute"],
      education: ["Don Bosco Prep"]
    }
  },
  {
    id: 81,
    name: "Gabriel Kirkwood",
    role: "Senior Editor, Technological Development",
    bio: "Gabriel Kirkwood is Senior Editor for Technological Development at the Perrin Institute, where he leads research on technology policy and innovation governance. He specializes in analyzing how emerging technologies impact society and developing evidence-based policy recommendations. His work focuses on creating frameworks that balance technological advancement with public interest considerations. He is particularly interested in the regulatory challenges posed by rapid technological change.",
    image: "",
    email: "gkirkwood@perrinlabs.org",
    category: "Editorial",
    interests: ["Technological Development", "Policy Research", "Technology Policy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 82,
    name: "Himani Harrell",
    role: "Senior Editor, Climate Action",
    bio: "Himani Harrell is Senior Editor for Climate Action at the Perrin Institute, where she leads research on environmental policy and climate governance. She specializes in analyzing climate legislation, environmental regulations, and sustainability initiatives at local, national, and international levels. Her work focuses on developing policy solutions that address climate change while considering economic and social impacts. She is committed to advancing evidence-based climate action through rigorous policy analysis.",
    image: "",
    email: "himani@perrinlabs.org",
    category: "Editorial",
    interests: ["Climate Action", "Environmental Policy", "Sustainability"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 83,
    name: "Faith Mekonen",
    role: "Policy Researcher",
    bio: "Faith Mekonen is a Policy Researcher at the Perrin Institute specializing in comprehensive policy analysis and development. She conducts in-depth research on various policy areas, examining implementation strategies and their real-world impacts. Her work involves synthesizing complex policy information and developing actionable recommendations for policymakers. She is particularly focused on creating evidence-based solutions to contemporary governance challenges.",
    image: "",
    email: "faithmekonen@perrinlabs.org",
    category: "Research",
    interests: ["Policy Analysis", "Research Methods", "Policy Development"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 84,
    name: "Ikeoluwa Esan",
    role: "Education Policy Correspondent",
    bio: "Education Policy Correspondent focusing on educational reform and policy implementation.",
    image: "",
    email: "ikeoluwaesan@perrinlabs.org",
    category: "Editorial",
    interests: ["Education Policy", "Educational Reform", "Policy Implementation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 85,
    name: "Leo DeCock",
    role: "Legal Correspondent",
    bio: "Legal Correspondent specializing in legal analysis and jurisprudential research.",
    image: "",
    email: "leodecock@perrinlabs.org",
    category: "Editorial",
    interests: ["Legal Analysis", "Jurisprudence", "Constitutional Law"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 86,
    name: "Sid Bajaj",
    role: "Senior Editor for Economic Policy",
    bio: "Senior Editor specializing in economic policy analysis and financial governance frameworks.",
    image: "",
    email: "sidbajaj@perrinlabs.org",
    category: "Editorial",
    interests: ["Economic Policy", "Financial Analysis", "Market Regulation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 87,
    name: "Emily Gorodetskiy",
    role: "Economic Policy Correspondent",
    bio: "Emily Gurb is Economic Policy Correspondent at the Perrin Institute, where she covers economic policy developments and fiscal governance issues. She specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. Her reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences. She is particularly interested in how economic policies impact different sectors and communities.",
    image: "",
    email: "emily@perrinlabs.org",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 88,
    name: "Kofi Hair-Ralston",
    role: "Senior Vice President of Growth",
    bio: "Kofi Hair-Ralston is Senior Vice President of Growth at the Perrin Institute, where he leads strategic expansion and organizational development initiatives. He specializes in identifying growth opportunities and developing scalable organizational structures to support the Institute's mission. His work focuses on building partnerships, expanding research capabilities, and enhancing the Institute's impact across policy domains. He brings extensive experience in strategic planning and institutional development.",
    image: "",
    email: "KofiHairRalston@perrinlabs.org",
    category: "Leadership",
    interests: ["Strategic Growth", "Organizational Development", "Business Strategy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 89,
    name: "Anshi Bhatt",
    role: "Technology Policy Correspondent",
    bio: "Technology Policy Correspondent analyzing emerging technologies and their regulatory implications.",
    image: "",
    email: "anshib@perrinlabs.org",
    category: "Editorial",
    interests: ["Technology Policy", "Emerging Technologies", "Tech Regulation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 90,
    name: "Olivia Zhao",
    role: "Research Associate",
    bio: "Research Associate contributing to policy research and analysis initiatives.",
    image: "",
    email: "oliviazhao@perrinlabs.org",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 91,
    name: "Aadith Muthukumar",
    role: "Lead AI Governance Correspondent",
    bio: "Aadith Muthukumar is Lead AI Governance Correspondent at the Perrin Institute, where he leads research on artificial intelligence policy and governance frameworks. He specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. His work focuses on balancing innovation with ethical considerations and public safety. He examines AI governance models across jurisdictions to identify best practices for responsible AI development.",
    image: "",
    email: "aadithmuthukumar@perrinlabs.org",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 92,
    name: "Ari Hickman",
    role: "Lead Domestic Affairs Correspondent",
    bio: "Ari Hickman is Lead Domestic Affairs Correspondent at the Perrin Institute, where he covers national policy developments and domestic governance issues. He specializes in analyzing federal policy initiatives, congressional legislation, and executive actions across multiple policy domains. His reporting focuses on translating complex policy developments into accessible analysis for diverse audiences. He is particularly interested in how federal policies impact state and local governance structures.",
    image: "",
    email: "arihickman@perrinlabs.org",
    category: "Editorial",
    interests: ["Domestic Affairs", "National Policy", "Government Affairs"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 93,
    name: "Annika Raj",
    role: "Educational Policy Correspondent",
    bio: "Educational Policy Correspondent focusing on educational systems and institutional reform.",
    image: "",
    email: "annikaraj@perrinlabs.org",
    category: "Editorial",
    interests: ["Educational Policy", "Institutional Reform", "Academic Policy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 94,
    name: "Majdi Alameddine",
    role: "Editor of Economic Policy and Development",
    bio: "Majdi Alameddine is Editor of Economic Policy and Development at the Perrin Institute, where he leads research on economic policy frameworks and development strategies. He specializes in analyzing fiscal policy, international development, and economic governance structures. His work focuses on examining how economic policies impact growth, equity, and sustainability across different regions and development contexts. He is particularly interested in the intersection of economic policy and social development outcomes.",
    image: "",
    email: "majdi@perrinlabs.org",
    category: "Editorial",
    interests: ["Economic Policy", "Development Economics", "Fiscal Policy", "International Development"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 95,
    name: "Alex Cox",
    role: "Legal Correspondent",
    bio: "Legal Correspondent specializing in legal policy analysis and judicial research.",
    image: "",
    email: "alexcox@perrinlabs.org",
    category: "Editorial",
    interests: ["Legal Policy", "Judicial Research", "Constitutional Studies"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 96,
    name: "Shaivi Sharma",
    role: "Senior Editor for Education Policy",
    bio: "Senior Editor for Education Policy leading educational research and policy development initiatives.",
    image: "",
    email: "shaivisharma@perrinlabs.org",
    category: "Editorial",
    interests: ["Education Policy", "Educational Research", "Policy Development"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 97,
    name: "Ayushmaan Mukherjee",
    role: "International Policy Correspondent",
    bio: "Ayushmaan Mukherjee is International Policy Correspondent at the Perrin Institute, where he covers global policy developments and international governance issues. He specializes in analyzing foreign policy initiatives, international relations, and cross-border regulatory frameworks. His reporting focuses on translating complex international policy developments into accessible analysis for diverse audiences. He is particularly interested in how international policies impact domestic governance and global cooperation.",
    image: "",
    email: "ayushmaanmukherjee@perrinlabs.org",
    category: "Editorial",
    interests: ["International Policy", "Foreign Policy", "Global Governance", "International Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 98,
    name: "Ava Havidic",
    role: "Senior Editor on International Policy",
    bio: "Ava Havidic is Senior Editor on International Policy at the Perrin Institute, where she leads research on global policy frameworks and international governance systems. She specializes in analyzing multilateral agreements, international law, and cross-border policy coordination. Her work focuses on developing comprehensive analysis of international policy trends and their implications for global governance. She is committed to advancing understanding of complex international policy challenges through rigorous research and analysis.",
    image: "",
    email: "avahavidic@perrinlabs.org",
    category: "Editorial",
    interests: ["International Policy", "Global Governance", "International Law", "Multilateral Agreements"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 99,
    name: "Isabella Deng",
    role: "Digital Content Strategist Intern",
    bio: "Isabella Deng is Digital Content Strategist Intern at the Perrin Institute, where she supports digital content development and strategic communications initiatives. She specializes in creating engaging content across digital platforms and analyzing content performance metrics. Her work focuses on enhancing the Institute's digital presence and ensuring effective communication of research findings to diverse audiences. She brings fresh perspectives on digital engagement and content strategy.",
    image: "",
    email: "isabelladeng@perrinlabs.org",
    category: "Editorial",
    interests: ["Digital Content Strategy", "Communications", "Social Media", "Content Creation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 100,
    name: "Jeanette Trinidad",
    role: "Climate Action Correspondent",
    bio: "Jeanette Trinidad is Climate Action Correspondent at the Perrin Institute, where she covers environmental policy developments and climate governance issues. She specializes in analyzing climate legislation, environmental regulations, and sustainability initiatives at local, national, and international levels. Her reporting focuses on translating complex climate policy decisions into accessible analysis for diverse audiences. She is particularly interested in how climate policies impact communities and the intersection of environmental justice with climate action.",
    image: "",
    email: "jeanettetrinidad@perrinlabs.org",
    category: "Editorial",
    interests: ["Climate Action", "Environmental Policy", "Sustainability", "Environmental Justice"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 101,
    name: "Saniya Yamin",
    role: "Domestic Affairs Correspondent",
    bio: "Saniya Yamin is Domestic Affairs Correspondent at the Perrin Institute, where she covers national policy developments and domestic governance issues. She specializes in analyzing federal policy initiatives, congressional legislation, and executive actions across multiple policy domains. Her reporting focuses on translating complex domestic policy developments into accessible analysis for diverse audiences. She is particularly interested in how federal policies impact state and local governance structures and community outcomes.",
    image: "",
    email: "saniyayamin@perrinlabs.org",
    category: "Editorial",
    interests: ["Domestic Affairs", "National Policy", "Congressional Legislation", "Federal Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 102,
    name: "Emma Johnson",
    role: "Domestic Affairs Correspondent, Policy Insights Division",
    bio: "Emma Johnson is Domestic Affairs Correspondent in the Policy Insights Division at the Perrin Institute, where she covers national policy developments with a focus on policy analysis and insights. She specializes in analyzing federal policy initiatives, congressional legislation, and their real-world impacts on communities. Her reporting focuses on providing in-depth policy insights and translating complex domestic policy developments into actionable intelligence for policymakers and stakeholders.",
    image: "",
    email: "emmajohnson@perrinlabs.org",
    category: "Editorial",
    interests: ["Domestic Affairs", "Policy Analysis", "Congressional Legislation", "Policy Insights"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 103,
    name: "Storey Kuo",
    role: "Economic Policy Correspondent",
    bio: "Storey Kuo is Economic Policy Correspondent at the Perrin Institute, where she covers economic policy developments and fiscal governance issues. She specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. Her reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences. She is particularly interested in how economic policies impact different sectors, communities, and market dynamics.",
    image: "",
    email: "storeykuo@perrinlabs.org",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis", "Market Regulation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 104,
    name: "Vrinda Shah",
    role: "Technological Development Correspondent",
    bio: "Vrinda Shah is Technological Development Correspondent at the Perrin Institute, where she covers emerging technologies and their policy implications. She specializes in analyzing technological innovation, regulatory frameworks for emerging technologies, and the intersection of technology and governance. Her reporting focuses on translating complex technological developments into accessible policy analysis for diverse audiences. She is particularly interested in how technological advancement impacts society and the regulatory challenges of emerging technologies.",
    image: "",
    email: "vrindashah@perrinlabs.org",
    category: "Editorial",
    interests: ["Technological Development", "Emerging Technologies", "Technology Policy", "Innovation Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 105,
    name: "Precious Ojo",
    role: "Health Policy Correspondent",
    bio: "Precious Ojo is Health Policy Correspondent at the Perrin Institute, where she covers healthcare policy developments and health governance issues. She specializes in analyzing healthcare legislation, public health initiatives, and health system reforms at local, national, and international levels. Her reporting focuses on translating complex health policy decisions into accessible analysis for diverse audiences. She is particularly interested in health equity, healthcare access, and the intersection of public health with social policy.",
    image: "",
    email: "preciousojo@perrinlabs.org",
    category: "Editorial",
    interests: ["Health Policy", "Public Health", "Healthcare Reform", "Health Equity"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 106,
    name: "Anousha Mozammel",
    role: "Policy Content Analyst",
    bio: "Anousha Mozammel is Policy Content Analyst at the Perrin Institute, where she specializes in analyzing and developing policy-focused content across various domains. She conducts comprehensive research on policy issues and transforms complex policy information into accessible written content. Her work focuses on creating analytical pieces that bridge the gap between policy research and public understanding. She is particularly skilled at synthesizing policy developments into clear, engaging narratives for diverse audiences.",
    image: "",
    email: "anoushamozammel@perrinlabs.org",
    category: "Editorial",
    interests: ["Policy Analysis", "Content Development", "Research Writing", "Policy Communication"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 107,
    name: "Saathvik Valvekar",
    role: "AI Governance Correspondent",
    bio: "Saathvik Valvekar is AI Governance Correspondent at the Perrin Institute, where he covers artificial intelligence policy and governance frameworks. He specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. His reporting focuses on balancing innovation with ethical considerations and public safety. He examines AI governance models across jurisdictions to identify best practices for responsible AI development and implementation.",
    image: "",
    email: "saathvikvalvekar@perrinlabs.org",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics", "Regulatory Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 108,
    name: "Thavisha Ponnamperuma",
    role: "Executive Director II of Special Projects",
    bio: "Thavisha Ponnamperuma is Executive Director II of Special Projects at the Perrin Institute, where he leads strategic initiatives and oversees the development of innovative special projects. He specializes in project management, strategic planning, and cross-functional collaboration to deliver high-impact initiatives. His work focuses on identifying emerging opportunities and developing comprehensive project frameworks that align with the Institute's mission. He brings extensive experience in executive leadership and project execution to drive the Institute's special initiatives forward.",
    image: "",
    email: "thavishaponnamperuma@perrinlabs.org",
    category: "Leadership",
    interests: ["Strategic Planning", "Project Management", "Innovation Leadership", "Executive Strategy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 109,
    name: "Aanandi Thakur",
    role: "Senior Health Editor",
    bio: "Aanandi Thakur is Senior Health Editor at the Perrin Institute, where she leads editorial initiatives on health policy and healthcare governance. She specializes in analyzing healthcare legislation, public health policy, and health system reforms at national and international levels. Her editorial work focuses on translating complex health policy developments into accessible analysis for diverse audiences. She is particularly dedicated to covering health equity, healthcare access, and the intersection of public health with social and economic policy.",
    image: "",
    email: "aanandithakur@perrinlabs.org",
    category: "Editorial",
    interests: ["Health Policy", "Public Health", "Healthcare Reform", "Health Equity", "Healthcare Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 110,
    name: "Anirudh Venkatesan",
    role: "Economic Policy Correspondent",
    bio: "Anirudh Venkatesan is Economic Policy Correspondent at the Perrin Institute, where he covers economic policy developments and fiscal governance issues. He specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. His reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences. He is particularly interested in how economic policies impact different sectors, communities, and market dynamics.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis", "Market Regulation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 111,
    name: "Vikram Ranganath",
    role: "International Policy Correspondent",
    bio: "Vikram Ranganath is International Policy Correspondent at the Perrin Institute, where he covers global policy developments and international governance issues. He specializes in analyzing foreign policy initiatives, international relations, and cross-border regulatory frameworks. His reporting focuses on translating complex international policy developments into accessible analysis for diverse audiences. He is particularly interested in how international policies impact domestic governance and global cooperation.",
    image: "",
    category: "Editorial",
    interests: ["International Policy", "Foreign Policy", "Global Governance", "International Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 112,
    name: "Abhinav Kokkula",
    role: "PID Correspondent",
    bio: "Abhinav Kokkula is PID Correspondent at the Perrin Institute, where he covers policy developments with a focus on policy analysis and insights. He specializes in analyzing policy initiatives and their real-world impacts on communities. His reporting focuses on providing in-depth policy insights and translating complex policy developments into actionable intelligence for policymakers and stakeholders.",
    image: "",
    category: "Editorial",
    interests: ["Policy Analysis", "Policy Insights", "Government Policy", "Policy Communication"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 113,
    name: "Mihika Sakharpe",
    role: "AI Governance Correspondent",
    bio: "Mihika Sakharpe is AI Governance Correspondent at the Perrin Institute, where she covers artificial intelligence policy and governance frameworks. She specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. Her reporting focuses on balancing innovation with ethical considerations and public safety. She examines AI governance models across jurisdictions to identify best practices for responsible AI development and implementation.",
    image: "",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics", "Regulatory Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 114,
    name: "Raymond Chen",
    role: "Senior Climate Action Editor",
    bio: "Raymond Chen is Senior Climate Action Editor at the Perrin Institute, where he leads climate policy editorial initiatives from Taiwan. He specializes in analyzing climate legislation, environmental regulations, and sustainability policies across the Asia-Pacific region and internationally. His work focuses on translating complex climate policy developments into accessible analysis for diverse audiences. Based in Taiwan, he brings valuable regional perspective to global climate governance discussions and contributes to advancing evidence-based climate action through rigorous policy analysis.",
    image: "",
    category: "Editorial",
    interests: ["Climate Action", "Environmental Policy", "Sustainability", "Asia-Pacific Climate Policy", "Climate Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 115,
    name: "Aadyant Singh Harnwal",
    role: "Economic Policy Correspondent",
    bio: "Aadyant Singh Harnwal is Economic Policy Correspondent at the Perrin Institute, where he covers economic policy developments and fiscal governance issues. He specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. His reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 116,
    name: "Elias Eid",
    role: "Research Associate",
    bio: "Elias Eid is a Research Associate at the Perrin Institute, where he conducts comprehensive policy research and analysis across multiple domains. He specializes in developing evidence-based policy recommendations and examining the real-world impacts of policy implementation. His work focuses on creating rigorous research frameworks that inform effective policy development.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Policy Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 117,
    name: "Oz Susskind",
    role: "Senior Education Policy Editor",
    bio: "Oz Susskind is Senior Education Policy Editor at the Perrin Institute, where he leads editorial initiatives on education policy and educational governance. He specializes in analyzing educational legislation, institutional reforms, and policy implementation across different educational levels. His editorial work focuses on translating complex education policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Education Policy", "Educational Reform", "Policy Implementation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 118,
    name: "Anisha Arvind",
    role: "Research Associate",
    bio: "Anisha Arvind is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 119,
    name: "Shaveni",
    role: "Research Intern",
    bio: "Shaveni is a Research Intern at the Perrin Institute, where she supports research initiatives and contributes to policy analysis projects. She specializes in conducting background research and assisting with data collection and analysis. Her work focuses on supporting the Institute's research objectives and developing foundational research skills.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Collection", "Research Support"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 120,
    name: "Emlyn Joseph",
    role: "Research Associate",
    bio: "Emlyn Joseph is a Research Associate at the Perrin Institute, where he contributes to policy research and analysis initiatives. He specializes in examining policy frameworks and their effectiveness in addressing contemporary challenges. His work focuses on developing evidence-based recommendations for policy improvement and implementation.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Analysis", "Research Methods", "Policy Development"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 121,
    name: "Parin Chanana",
    role: "Senior Commercial Innovation Editor",
    bio: "Parin Chanana is Senior Commercial Innovation Editor at the Perrin Institute, where he leads editorial initiatives on commercial innovation and business policy. He specializes in analyzing the intersection of technology, finance, and business innovation, examining how emerging technologies are transforming commercial sectors and regulatory landscapes. His editorial work focuses on identifying innovative business models and their policy implications.",
    image: "",
    category: "Editorial",
    interests: ["Commercial Innovation", "Business Policy", "Technology Innovation", "Finance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 122,
    name: "Videep Agarwal",
    role: "International Policy Correspondent and Research Associate",
    bio: "Videep Agarwal is International Policy Correspondent and Research Associate at the Perrin Institute, where he covers global policy developments and conducts research on international governance issues. He specializes in analyzing foreign policy initiatives, international relations, and cross-border regulatory frameworks. His work focuses on translating complex international policy developments into accessible analysis while conducting in-depth research on global governance challenges.",
    image: "",
    category: "Editorial",
    interests: ["International Policy", "Foreign Policy", "Global Governance", "International Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 123,
    name: "Sanjana Bellur",
    role: "Economic Policy Correspondent",
    bio: "Sanjana Bellur is Economic Policy Correspondent at the Perrin Institute, where she covers economic policy developments and fiscal governance issues. She specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. Her reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 124,
    name: "Stanley Zhou",
    role: "Economic Policy Correspondent",
    bio: "Stanley Zhou is Economic Policy Correspondent at the Perrin Institute, where he covers economic policy developments and fiscal governance issues. He specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. His reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 125,
    name: "Divyansha Nashine",
    role: "Technological Development Senior Editor",
    bio: "Divyansha Nashine is Technological Development Senior Editor at the Perrin Institute, where she leads editorial initiatives on technology policy and innovation governance. She specializes in analyzing how emerging technologies impact society and developing evidence-based policy recommendations. Her work focuses on creating frameworks that balance technological advancement with public interest considerations and examining the regulatory challenges posed by rapid technological change.",
    image: "",
    category: "Editorial",
    interests: ["Technological Development", "Technology Policy", "Innovation Governance", "Tech Regulation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 126,
    name: "Adhithi Uppalapati",
    role: "Research Associate",
    bio: "Adhithi Uppalapati is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 127,
    name: "Livia Kam",
    role: "AI Governance Correspondent",
    bio: "Livia Kam is AI Governance Correspondent at the Perrin Institute, where she covers artificial intelligence policy and governance frameworks. She specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. Her reporting focuses on balancing innovation with ethical considerations and public safety while examining AI governance models across jurisdictions.",
    image: "",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics", "Regulatory Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 128,
    name: "Elaine Liu",
    role: "Senior Education Policy Editor",
    bio: "Elaine Liu is Senior Education Policy Editor at the Perrin Institute, where she leads editorial initiatives on education policy and educational governance. She specializes in analyzing educational legislation, institutional reforms, and policy implementation across different educational levels. Her editorial work focuses on translating complex education policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Education Policy", "Educational Reform", "Policy Implementation", "Educational Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 129,
    name: "Kevin Lopez Cruz",
    role: "Legal Correspondent",
    bio: "Kevin Lopez Cruz is Legal Correspondent at the Perrin Institute, where he covers legal policy developments and judicial research. He specializes in analyzing legal frameworks, constitutional issues, and judicial decisions that impact policy development. His reporting focuses on translating complex legal developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Legal Policy", "Constitutional Law", "Judicial Research", "Legal Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 130,
    name: "Natalie Nguyen",
    role: "Research Associate",
    bio: "Natalie Nguyen is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 131,
    name: "Keya Choudhary",
    role: "Research Associate",
    bio: "Keya Choudhary is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 132,
    name: "Nathan Beck",
    role: "Research Associate",
    bio: "Nathan Beck is a Research Associate at the Perrin Institute, where he contributes to policy research and analysis initiatives. He specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. His work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 133,
    name: "Joelle Watanabe",
    role: "Research Associate",
    bio: "Joelle Watanabe is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 134,
    name: "Isabelle Qi",
    role: "Senior Legal Editor",
    bio: "Isabelle Qi is Senior Legal Editor at the Perrin Institute, where she leads editorial initiatives on legal policy and judicial research. She specializes in analyzing legal frameworks, constitutional issues, and judicial decisions that impact policy development. Her editorial work focuses on translating complex legal developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Legal Policy", "Constitutional Law", "Judicial Research", "Legal Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 135,
    name: "Chase Phua",
    role: "AI Governance Correspondent",
    bio: "Chase Phua is AI Governance Correspondent at the Perrin Institute, where he covers artificial intelligence policy and governance frameworks. He specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. His reporting focuses on balancing innovation with ethical considerations and public safety while examining AI governance models across jurisdictions.",
    image: "",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics", "Regulatory Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 136,
    name: "Hannah You",
    role: "Health Correspondent",
    bio: "Hannah You is Health Correspondent at the Perrin Institute, where she covers healthcare policy developments and health governance issues. She specializes in analyzing healthcare legislation, public health initiatives, and health system reforms at local, national, and international levels. Her reporting focuses on translating complex health policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Health Policy", "Public Health", "Healthcare Reform", "Health Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 137,
    name: "Vihaan Nayak",
    role: "Research Associate",
    bio: "Vihaan Nayak is a Research Associate at the Perrin Institute, where he contributes to policy research and analysis initiatives. He specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. His work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 138,
    name: "Hansika Yakkala",
    role: "Research Associate",
    bio: "Hansika Yakkala is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 139,
    name: "Claire Yang",
    role: "Senior Economic Policy Editor",
    bio: "Claire Yang is Senior Economic Policy Editor at the Perrin Institute, where she leads editorial initiatives on economic policy and fiscal governance. She specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. Her editorial work focuses on translating complex economic policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 140,
    name: "Paritosh Bhole",
    role: "Research Associate",
    bio: "Paritosh Bhole is a Research Associate at the Perrin Institute, where he contributes to policy research and analysis initiatives. He specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. His work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 141,
    name: "Dara Mohd",
    role: "Senior Research Fellow, AI & Ethics",
    bio: "Dara Mohd is Senior Research Fellow for AI & Ethics at the Perrin Institute, where she leads research on artificial intelligence policy with a focus on ethical considerations and responsible AI development. She specializes in analyzing the intersection of AI technology and ethical frameworks, developing comprehensive policy recommendations that balance innovation with ethical considerations and public safety. Her work focuses on creating guidelines for responsible AI governance across different sectors.",
    image: "",
    email: "dara.a.mohd@gmail.com",
    category: "Research Fellow",
    interests: ["AI Ethics", "Artificial Intelligence Policy", "Technology Ethics", "Responsible AI", "AI Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 142,
    name: "Anvitaa Rudharraju",
    role: "Research Associate",
    bio: "Anvitaa Rudharraju is a Research Associate at the Perrin Institute, where she contributes to policy research and analysis initiatives. She specializes in conducting comprehensive research on policy issues and developing actionable recommendations for policymakers. Her work focuses on examining policy trends and their implications for effective governance.",
    image: "",
    category: "Research Associates",
    interests: ["Policy Research", "Data Analysis", "Research Methods"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 143,
    name: "Austin Stegerwald",
    role: "International Policy Correspondent",
    bio: "Austin Stegerwald is International Policy Correspondent at the Perrin Institute, where he covers global policy developments and international governance issues. He specializes in analyzing foreign policy initiatives, international relations, and cross-border regulatory frameworks. His reporting focuses on translating complex international policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["International Policy", "Foreign Policy", "Global Governance", "International Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 144,
    name: "Sharmili Karthik",
    role: "Economic Policy Correspondent",
    bio: "Sharmili Karthik is Economic Policy Correspondent at the Perrin Institute, where she covers economic policy developments and fiscal governance issues. She specializes in analyzing monetary policy, fiscal frameworks, and economic regulatory changes at national and international levels. Her reporting focuses on translating complex economic policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Economic Policy", "Fiscal Policy", "Monetary Policy", "Economic Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 145,
    name: "Austin Cheng",
    role: "Domestic Affairs Correspondent",
    bio: "Austin Cheng is Domestic Affairs Correspondent at the Perrin Institute, where he covers national policy developments and domestic governance issues. He specializes in analyzing federal policy initiatives, congressional legislation, and executive actions across multiple policy domains. His reporting focuses on translating complex domestic policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Domestic Affairs", "National Policy", "Congressional Legislation", "Federal Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 146,
    name: "Zahra Abdul Razaq",
    role: "Legal Correspondent",
    bio: "Zahra Abdul Razaq is Legal Correspondent at the Perrin Institute, where she covers legal policy developments and judicial research. She specializes in analyzing legal frameworks, constitutional issues, and judicial decisions that impact policy development. Her reporting focuses on translating complex legal developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Legal Policy", "Constitutional Law", "Judicial Research", "Legal Analysis"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 147,
    name: "Arpit Ahuja",
    role: "Web Developer",
    bio: "Arpit Ahuja is a Web Developer at the Perrin Institute, where he contributes to the technical development and maintenance of the Institute's digital platforms. He specializes in web development technologies and creating user-friendly interfaces that enhance the Institute's online presence and research accessibility. His work focuses on implementing technical solutions that support the Institute's mission and improve user experience.",
    image: "",
    category: "Engineering",
    interests: ["Web Development", "Frontend Development", "User Experience", "Technical Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 148,
    name: "Elijah Daniel",
    role: "Domestic Affairs Correspondent",
    bio: "Elijah Daniel is Domestic Affairs Correspondent at the Perrin Institute, where he covers national policy developments and domestic governance issues. He specializes in analyzing federal policy initiatives, congressional legislation, and executive actions across multiple policy domains. His reporting focuses on translating complex domestic policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Domestic Affairs", "National Policy", "Congressional Legislation", "Federal Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 149,
    name: "Akash Arun Kumar Soumya",
    role: "AI Governance Correspondent",
    bio: "Akash Arun Kumar Soumya is AI Governance Correspondent at the Perrin Institute, where he covers artificial intelligence policy and governance frameworks. He specializes in analyzing the regulatory challenges posed by AI technologies and developing comprehensive policy recommendations for AI governance. His reporting focuses on balancing innovation with ethical considerations and public safety while examining AI governance models across jurisdictions.",
    image: "",
    category: "Editorial",
    interests: ["AI Governance", "Artificial Intelligence Policy", "Technology Ethics", "Regulatory Innovation"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 150,
    name: "Ayisha Ong",
    role: "Climate Action Correspondent",
    bio: "Ayisha Ong is Climate Action Correspondent at the Perrin Institute, where she covers environmental policy developments and climate governance issues. She specializes in analyzing climate legislation, environmental regulations, and sustainability initiatives at local, national, and international levels. Her reporting focuses on translating complex climate policy decisions into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["Climate Action", "Environmental Policy", "Sustainability", "Climate Governance"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  },
  {
    id: 151,
    name: "Michelle Alinndra Annabeth Chandra",
    role: "International Policy Correspondent",
    bio: "Michelle Alinndra Annabeth Chandra is International Policy Correspondent at the Perrin Institute, where she covers global policy developments and international governance issues. She specializes in analyzing foreign policy initiatives, international relations, and cross-border regulatory frameworks. Her reporting focuses on translating complex international policy developments into accessible analysis for diverse audiences.",
    image: "",
    category: "Editorial",
    interests: ["International Policy", "Foreign Policy", "Global Governance", "International Relations"],
    affiliations: {
      organizations: ["Perrin Institute"]
    }
  }
] 
