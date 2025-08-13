'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiChevronUp, FiExternalLink, FiSearch, FiMenu, FiX, FiFileText, FiLayers, FiBook, FiArrowRight } from 'react-icons/fi'

// Define search result types
interface SearchResult {
  id: string
  title: string
  subtitle?: string
  type: 'article' | 'lab' | 'page'
  url: string
  description?: string
  category?: string
}

// Article interface (copied locally to avoid import issues)
interface Article {
  id: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  category: string | string[];
  type: 'news' | 'opinion';
  authorName?: string;
  authorPosition?: string;
  date: string;
  image: string;
  featured: boolean;
}

// Simple lab data for navbar (avoid importing the full labs.ts with React components)
const NAVBAR_LABS = [
  { id: "ai-governance", title: "AI Governance" },
  { id: "inclusive-policy", title: "Inclusive Policy" },
  { id: "climate-technology", title: "Climate Technology" },
  { id: "deliberative-democracy", title: "Deliberative Democracy" }
]

// All labs data for search (simplified)
const ALL_LABS = [
  { id: "ai-governance", title: "AI Governance", description: "Researching policy frameworks and governance models to ensure artificial intelligence development remains ethical, safe, and beneficial to society." },
  { id: "inclusive-policy", title: "Inclusive Policy", description: "Designing and evaluating policies that promote equity, inclusion, and representation across diverse communities and demographics." },
  { id: "climate-technology", title: "Climate Technology", description: "Researching technological solutions to climate challenges and the policy frameworks needed to accelerate their development and deployment." },
  { id: "deliberative-democracy", title: "Deliberative Democracy", description: "Exploring innovative democratic processes that enhance public deliberation, citizen participation, and collective decision-making on complex policy issues." },
  { id: "foreign-affairs", title: "Foreign Affairs", description: "Analyzing international relations, diplomacy, and global governance structures in an interconnected world." },
  { id: "economic-policy", title: "Economic Policy", description: "Examining macroeconomic trends, fiscal policy, and the intersection of economics with technology and society." },
  { id: "legal-research", title: "Legal Research", description: "Investigating legal frameworks for emerging technologies and evolving societal needs." },
  { id: "policy-entrepreneurship", title: "Policy Entrepreneurship", description: "Fostering innovation in policy design and implementation through entrepreneurial approaches." }
]

// Define static pages for search
const STATIC_PAGES: SearchResult[] = [
  {
    id: 'events',
    title: 'Events',
    subtitle: 'Academic exchanges and research symposiums',
    type: 'page',
    url: '/events',
    description: 'Explore academic exchanges, research symposiums, and policy discussions hosted by the Perrin Institute.'
  },
  {
    id: 'experts',
    title: 'Experts',
    subtitle: 'Our research team and fellows',
    type: 'page',
    url: '/experts',
    description: 'Meet our distinguished research team and expert fellows working on cutting-edge policy research.'
  },
  {
    id: 'scholarship-center',
    title: 'Scholarship Center',
    subtitle: 'Educational opportunities and funding',
    type: 'page',
    url: '/scholarship-center',
    description: 'Discover scholarship opportunities and educational programs for students and researchers.'
  },
  // Application removed in favor of Careers
  {
    id: 'news',
    title: 'Insights',
    subtitle: 'Latest research and policy insights',
    type: 'page',
    url: '/news',
    description: 'Explore our latest insights, analysis, and policy research from the Perrin Institute.'
  },
  {
    id: 'special-projects',
    title: 'Special Projects',
    subtitle: 'Strategic initiatives and partnerships',
    type: 'page',
    url: '/special-projects',
    description: 'Explore our sponsored projects and strategic initiatives that advance policy research and democratic innovation.'
  },
  {
    id: 'apply',
    title: 'Apply',
    subtitle: 'Join our team',
    type: 'page',
    url: '/careers',
    description: 'Explore career opportunities and join our team of policy researchers and experts.'
  },
  {
    id: 'admin',
    title: 'Employee Login',
    subtitle: 'Employee portal access',
    type: 'page',
    url: '/admin',
    description: 'Staff and employee login portal for content management and administrative access.'
  }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [articles, setArticles] = useState<Article[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  // Fetch articles on component mount
  useEffect(() => {
    async function fetchArticles() {
      // Only fetch articles on the client side
      if (typeof window === 'undefined') return;
      
      try {
        console.log('Attempting to import articles library in Navbar...');
        
        // Use a more defensive dynamic import approach
        const articlesModule = await import('../lib/articles').catch(err => {
          console.error('Failed to import articles module in Navbar:', err);
          return null;
        });
        
        if (!articlesModule) {
          throw new Error('Articles module failed to load in Navbar');
        }
        
        console.log('Articles library imported successfully in Navbar');
        const { getArticles } = articlesModule;
        
        const fetchedArticles = await getArticles().catch(err => {
          console.error('Failed to fetch articles in Navbar:', err);
          return [];
        });
        
        console.log('Articles fetched successfully in Navbar:', fetchedArticles.length);
        setArticles(fetchedArticles);
        
      } catch (error) {
        console.error('Error fetching articles in Navbar:', error);
        setArticles([])
      }
    }
    fetchArticles()
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when changing pages
  useEffect(() => {
    setMobileMenuOpen(false)
    setActiveDropdown(null)
    setIsSearchOpen(false)
    setSearchQuery('')
  }, [pathname])

  // Search functionality
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const results: SearchResult[] = []

    // Search articles
    const matchingArticles = articles.filter(article => {
      const categoryText = Array.isArray(article.category) 
        ? article.category.join(' ').toLowerCase() 
        : article.category.toLowerCase()
      
      return article.title.toLowerCase().includes(query) ||
        article.subtitle?.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        categoryText.includes(query)
    }).slice(0, 3) // Limit to 3 results

    matchingArticles.forEach(article => {
      const categoryDisplay = Array.isArray(article.category) 
        ? article.category[0] 
        : article.category
        
      results.push({
        id: article.id,
        title: article.title,
        subtitle: article.subtitle,
        type: 'article',
        url: `/news/${article.id}`,
        description: article.excerpt,
        category: categoryDisplay
      })
    })

    // Search labs
    const matchingLabs = ALL_LABS.filter(lab =>
      lab.title.toLowerCase().includes(query) ||
      lab.description.toLowerCase().includes(query)
    ).slice(0, 3) // Limit to 3 results

    matchingLabs.forEach(lab => {
      results.push({
        id: lab.id,
        title: lab.title,
        subtitle: 'Research Lab',
        type: 'lab',
        url: `/Labs/${lab.id}`,
        description: lab.description
      })
    })

    // Search static pages
    const matchingPages = STATIC_PAGES.filter(page =>
      page.title.toLowerCase().includes(query) ||
      page.subtitle?.toLowerCase().includes(query) ||
      page.description?.toLowerCase().includes(query)
    ).slice(0, 2) // Limit to 2 results

    matchingPages.forEach(page => {
      results.push(page)
    })

    setSearchResults(results.slice(0, 8)) // Total limit of 8 results
  }, [searchQuery])

  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null)
    } else {
      setActiveDropdown(name)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchResults.length > 0) {
      router.push(searchResults[0].url)
      setIsSearchOpen(false)
      setSearchQuery('')
    } else if (searchQuery.length > 0) {
      // Redirect to news page with search query
      router.push(`/news?search=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FiFileText className="h-4 w-4 text-slate-500" />
      case 'lab':
        return <FiLayers className="h-4 w-4 text-slate-500" />
      case 'page':
        return <FiBook className="h-4 w-4 text-slate-500" />
      default:
        return <FiSearch className="h-4 w-4 text-slate-500" />
    }
  }

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <Image 
                src="/moretechperrin-removebg-preview.png" 
                alt="Perrin Institution Logo" 
                width={180} 
                height={60}
                className="h-10 w-auto object-contain transition-all duration-300 group-hover:opacity-80"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Research */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => toggleDropdown('research')}
                  className={`flex items-center px-0.5 font-medium transition-colors ${
                    activeDropdown === 'research' 
                      ? 'text-teal-600' 
                      : isScrolled 
                        ? 'text-gray-800 hover:text-teal-600' 
                        : 'text-gray-800 hover:text-teal-500'
                  }`}
                >
                  <span>Research</span>
                  {activeDropdown === 'research' ? (
                    <FiChevronUp className="ml-1" size={16} />
                  ) : (
                    <FiChevronDown className="ml-1" size={16} />
                  )}
                </button>
                
                {/* Research Dropdown */}
                <AnimatePresence>
                  {activeDropdown === 'research' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-soft py-2 z-50"
                    >
                      <div className="py-1 px-3 text-xs text-gray-500 font-medium uppercase border-b border-gray-100 mb-1">Labs</div>
                      {NAVBAR_LABS.map((lab) => (
                        <Link 
                          key={lab.id}
                          href={`/Labs/${lab.id}`} 
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                        >
                          {lab.title}
                        </Link>
                      ))}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link href="/Labs" className="block px-4 py-2 text-teal-600 font-medium hover:bg-gray-50">
                          See all research areas
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Apply (second tab) */}
              <Link 
                href="/careers" 
                className={`font-medium transition-colors ${
                  pathname.includes('/careers') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Apply
              </Link>

              {/* Experts/Directory */}
              <Link 
                href="/experts" 
                className={`font-medium transition-colors ${
                  pathname.includes('/experts') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Experts
              </Link>
              
              {/* Scholarship Center */}
              <Link 
                href="/scholarship-center" 
                className={`font-medium transition-colors ${
                  pathname.startsWith('/scholarship-center') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Scholarship Center
              </Link>

              {/* Events */}
              <Link 
                href="/events" 
                className={`font-medium transition-colors ${
                  pathname.startsWith('/events') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Events
              </Link>

              {/* Intelligence */}
              <Link 
                href="/news" 
                className={`font-medium transition-colors ${
                  pathname.includes('/news') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Intelligence
              </Link>

              {/* Special Projects */}
              <Link 
                href="/special-projects" 
                className={`font-medium transition-colors ${
                  pathname.includes('/special-projects') 
                    ? 'text-teal-600' 
                    : isScrolled 
                      ? 'text-gray-800 hover:text-teal-600' 
                      : 'text-gray-800 hover:text-teal-500'
                }`}
              >
                Special Projects
              </Link>

              {/* Removed extra Careers (Apply moved earlier) */}

              {/* Employee Login */}
              <Link 
                href="/admin" 
                className="flex items-center space-x-1.5 text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm">Employee Login</span>
              </Link>

              {/* Search */}
              <div className="relative" ref={searchRef}>
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-gray-500 hover:text-teal-600 hover:bg-gray-100 transition-colors"
                >
                  <FiSearch size={20} />
                </button>

                {/* Search Dropdown */}
                <AnimatePresence>
                  {isSearchOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-96 bg-white border border-gray-100 rounded-xl shadow-soft py-3 z-50"
                    >
                      <form onSubmit={handleSearchSubmit} className="px-4 mb-3">
                        <div className="relative">
                          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search intelligence, labs, and pages..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors text-sm"
                            autoFocus
                          />
                        </div>
                      </form>

                      {searchQuery.length >= 2 && (
                        <div className="border-t border-gray-100 pt-2">
                          {searchResults.length > 0 ? (
                            <>
                              <div className="px-4 py-1 text-xs text-gray-500 font-medium uppercase">Results</div>
                              <div className="max-h-80 overflow-y-auto">
                                {searchResults.map((result) => (
                                  <Link
                                    key={`${result.type}-${result.id}`}
                                    href={result.url}
                                    className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                                    onClick={() => {
                                      setIsSearchOpen(false)
                                      setSearchQuery('')
                                    }}
                                  >
                                    <div className="flex items-start space-x-3">
                                      <div className="flex-shrink-0 mt-1">
                                        {getResultIcon(result.type)}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                          <p className="text-sm font-medium text-gray-900 truncate">
                                            {result.title}
                                          </p>
                                          <span className="text-xs text-gray-500 capitalize ml-2">
                                            {result.type}
                                          </span>
                                        </div>
                                        {result.subtitle && (
                                          <p className="text-xs text-gray-600 truncate">
                                            {result.subtitle}
                                          </p>
                                        )}
                                        {result.description && (
                                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                            {result.description}
                                          </p>
                                        )}
                                        {result.category && (
                                          <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            {result.category}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              {searchResults.length >= 8 && (
                                <div className="px-4 py-2 border-t border-gray-100">
                                  <button
                                    onClick={() => {
                                      router.push(`/news?search=${encodeURIComponent(searchQuery)}`)
                                      setIsSearchOpen(false)
                                      setSearchQuery('')
                                    }}
                                    className="flex items-center text-sm text-teal-600 hover:text-teal-700 transition-colors"
                                  >
                                    View all results <FiArrowRight className="ml-1 h-3 w-3" />
                                  </button>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="px-4 py-6 text-center">
                              <FiSearch className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">No results found</p>
                              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
                            </div>
                          )}
                        </div>
                      )}

                      {searchQuery.length < 2 && (
                        <div className="px-4 py-6 text-center border-t border-gray-100">
                          <FiSearch className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Start typing to search</p>
                          <p className="text-xs text-gray-400 mt-1">Intelligence, labs, and pages</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 mr-2 rounded-full text-gray-500 hover:text-teal-600 hover:bg-gray-100 transition-colors"
              >
                <FiSearch size={20} />
              </button>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-700 rounded-full hover:bg-gray-100 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <FiX size={24} />
                ) : (
                  <FiMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 z-50 bg-white"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Search</h3>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-4">
              <form onSubmit={handleSearchSubmit} className="mb-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search intelligence, labs, and pages..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    autoFocus
                  />
                </div>
              </form>

              {searchQuery.length >= 2 && searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((result) => (
                    <Link
                      key={`${result.type}-${result.id}`}
                      href={result.url}
                      className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery('')
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-0.5">
                          {getResultIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-gray-900 truncate">
                              {result.title}
                            </p>
                            <span className="text-xs text-gray-500 capitalize ml-2">
                              {result.type}
                            </span>
                          </div>
                          {result.subtitle && (
                            <p className="text-sm text-gray-600 truncate">
                              {result.subtitle}
                            </p>
                          )}
                          {result.description && (
                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                          {result.category && (
                            <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                              {result.category}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {searchQuery.length >= 2 && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <FiSearch className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No results found</p>
                  <p className="text-sm text-gray-400 mt-1">Try different keywords</p>
                </div>
              )}

              {searchQuery.length < 2 && (
                <div className="text-center py-8">
                  <FiSearch className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Start typing to search</p>
                  <p className="text-sm text-gray-400 mt-1">Intelligence, labs, and pages</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-[60px] inset-x-0 z-40 bg-white border-b border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-3">
              <div className="py-2 mb-3 flex flex-col space-y-2">
                
                {/* Research Dropdown */}
                <div>
                  <button 
                    onClick={() => toggleDropdown('mobile-research')}
                    className="w-full flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  >
                    <span>Research</span>
                    {activeDropdown === 'mobile-research' ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === 'mobile-research' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-2 space-y-1 overflow-hidden"
                      >
                        {NAVBAR_LABS.map((lab) => (
                          <Link 
                            key={lab.id}
                            href={`/Labs/${lab.id}`} 
                            className="block py-2 px-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-teal-600 rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {lab.title}
                          </Link>
                        ))}
                        <Link 
                          href="/Labs" 
                          className="block py-2 px-3 text-sm text-teal-600 font-medium hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          See all research areas
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Experts */}
                <Link 
                  href="/experts"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Experts</span>
                </Link>

                {/* Scholarship Center */}
                <Link 
                  href="/scholarship-center"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Scholarship Center</span>
                </Link>

                {/* Events */}
                <Link 
                  href="/events"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Events</span>
                </Link>

                {/* Intelligence */}
                <Link 
                  href="/news"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Intelligence</span>
                </Link>

                {/* Special Projects */}
                <Link 
                  href="/special-projects"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Special Projects</span>
                </Link>

                {/* Apply earlier in list already on desktop; include here too */}
                <Link 
                  href="/careers"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Apply</span>
                </Link>

                {/* Employee Login */}
                <Link 
                  href="/admin"
                  className="flex items-center justify-between py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Employee Login</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}