'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiSearch, FiFileText, FiChevronRight, FiCalendar, FiUser, FiTag } from "react-icons/fi";
import { getArticles, Article } from "../../lib/articles";
import NewsletterSubscription from "@/components/NewsletterSubscription";
import Navbar from '../../components/Navbar'
import { useInView } from 'react-intersection-observer'
import { useGlobalLoading } from '@/lib/hooks/useGlobalLoading'

// Modern animation variants matching events page
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Card hover effect
const cardHover = {
  rest: { y: 0, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" },
  hover: { 
    y: -8, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)", 
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  }
};

const categories = [
  { name: "All", slug: "all" },
  { name: "Politics", slug: "International Affairs" },
  { name: "Technology", slug: "AI" },
  { name: "Economics", slug: "Economics" },
  { name: "Climate", slug: "Climate" },
  { name: "Health", slug: "Health" },
  { name: "Intelligence", slug: "Intelligence" },
  { name: "Opinion", slug: "opinion" },
];

export default function NewsPageClient() {
  const globalLoading = useGlobalLoading()
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [recentNews, setRecentNews] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllArticles, setShowAllArticles] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const headerTranslateY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  // Intersection Observer for scroll animations
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  useEffect(() => {
    async function fetchArticles() {
      try {
        globalLoading.setIsLoading(true)
        const articles = await getArticles();
        setRecentNews(articles);
        setFilteredArticles(articles);
      } finally {
        globalLoading.setIsLoading(false)
      }
    }
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = recentNews;
    
    if (activeCategory !== "All") {
      const categorySlug = categories.find(cat => cat.name === activeCategory)?.slug;
      if (categorySlug && categorySlug !== "all") {
        filtered = filtered.filter(article => {
          if (Array.isArray(article.category)) {
            return article.category.includes(categorySlug);
          }
          return article.category === categorySlug || (categorySlug === "opinion" && article.type === "opinion");
        });
      }
    }
    
    if (searchTerm) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredArticles(filtered);
  }, [activeCategory, searchTerm, recentNews]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const mainFeatured = featuredArticles.length > 0 ? featuredArticles[0] : filteredArticles[0];

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-white to-slate-50 text-slate-900 font-roboto">
      {/* Navbar */}
      <Navbar />
      
      {/* Compact Header */}
      <div className="bg-white border-b border-slate-200 pt-28 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact title and navigation */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
            {/* Title section */}
            <div className="flex items-center">
              <div className="bg-slate-100 rounded-lg p-2 mr-3 shadow-sm border border-slate-200">
                <FiFileText className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-light text-slate-900 tracking-tight">
                  News & Research
                </h1>
                <p className="text-slate-600 text-sm font-light mt-1">
                  Policy research and strategic analysis
                </p>
              </div>
            </div>
            
            {/* Search and filters in one row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-4 w-4 text-slate-500" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles..."
                  className="w-64 pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500"
                />
              </div>
              
              {/* Category filters - compact */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                      activeCategory === category.name
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content with article cards - articles start immediately */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {filteredArticles.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center p-12 text-center"
            >
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-lg border border-slate-200">
                <FiFileText className="h-8 w-8 text-slate-600" />
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">No Articles Found</h3>
              <p className="text-slate-600 mb-6 font-light">No articles match your current filter criteria.</p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Show All Articles
              </button>
            </motion.div>
          ) : showAllArticles ? (
            // Show all articles in a simple grid when "View All" is clicked
            <div className="space-y-12">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
                  <h2 className="text-sm uppercase tracking-widest text-slate-600 font-light">All Articles</h2>
                  <div className="h-px flex-1 bg-slate-400/50 ml-4"></div>
                </div>
                <button
                  onClick={() => setShowAllArticles(false)}
                  className="text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  ← Back to Sections
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => {
                  const categoryColor = article.category === 'AI' ? 'from-blue-100 to-indigo-200' :
                                      article.category === 'Economics' ? 'from-green-100 to-emerald-200' :
                                      article.category === 'Climate' ? 'from-teal-100 to-cyan-200' :
                                      article.category === 'Health' ? 'from-purple-100 to-violet-200' :
                                      article.category === 'Intelligence' ? 'from-orange-100 to-amber-200' :
                                      'from-slate-100 to-slate-200';
                  
                  return (
                    <motion.div
                      key={article.id}
                      initial="rest"
                      animate="rest"
                      whileHover="hover"
                      variants={cardHover}
                      className="group bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg border border-slate-200 relative"
                    >
                      <div className="absolute inset-0 rounded-xl border border-slate-200 z-20 pointer-events-none"></div>
                      
                      <div className="relative overflow-hidden">
                        <div className="relative h-40 overflow-hidden">
                          <Image
                            src={article.image}
                            alt={article.title}
                            width={300}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                          
                          <div className="absolute top-3 left-3">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColor} text-slate-800 backdrop-blur-sm border border-white/20`}>
                              {Array.isArray(article.category) ? article.category[0] : article.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="px-6 py-6 bg-white">
                          <div className="space-y-3 mb-4">
                            <h3 className="text-lg font-medium text-slate-900 tracking-tight line-clamp-2 group-hover:text-slate-700 transition-colors">
                              {article.title}
                            </h3>
                            <div className="h-0.5 w-8 bg-slate-500/30"></div>
                          </div>
                          
                          <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2 font-light text-sm">
                            {article.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                            <span>{article.authorName || "Perrin Institute"}</span>
                            <span>{article.date}</span>
                          </div>
                          
                          <Link
                            href={`/news/${article.id}`}
                            className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors group text-sm"
                          >
                            <span className="relative">
                              <span className="relative z-10">Read More</span>
                              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-400/30 group-hover:bg-slate-600/50 transition-colors"></span>
                            </span>
                            <FiChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-16">
              {/* Featured Story Section - WSJ Style Lead */}
              {mainFeatured && (
                <motion.section variants={fadeIn} className="border-b border-slate-200 pb-16">
                  <div className="flex items-center mb-8">
                    <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-600 font-light">Lead Story</h2>
                    <div className="h-px flex-1 bg-slate-400/50 ml-4"></div>
                  </div>
                  
                  <Link href={`/news/${mainFeatured.id}`} className="group">
                    <article className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      {/* Featured image */}
                      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
                        <Image
                          src={mainFeatured.image}
                          alt={mainFeatured.title}
                          width={600}
                          height={450}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                      
                      {/* Featured content */}
                      <div className="space-y-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                          <FiTag className="w-3 h-3 mr-1" />
                          {Array.isArray(mainFeatured.category) ? mainFeatured.category[0] : mainFeatured.category}
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-light text-slate-900 leading-tight group-hover:text-slate-700 transition-colors">
                          {mainFeatured.title}
                        </h1>
                        
                        <div className="h-1 w-16 bg-slate-400/50 rounded-full"></div>
                        
                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                          {mainFeatured.excerpt}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center">
                            <FiUser className="w-4 h-4 mr-2" />
                            <span>{mainFeatured.authorName || "Perrin Institute"}</span>
                          </div>
                          <div className="flex items-center">
                            <FiCalendar className="w-4 h-4 mr-2" />
                            <span>{mainFeatured.date}</span>
                          </div>
                        </div>
                        
                        <div className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors group">
                          <span className="relative">
                            <span className="relative z-10">Read Full Article</span>
                            <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-400/30 group-hover:bg-slate-600/50 transition-colors"></span>
                          </span>
                          <FiChevronRight className="ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.section>
              )}
              
              {/* Secondary Stories - WSJ 3-column layout */}
              <motion.section variants={fadeIn}>
                <div className="flex items-center mb-8">
                  <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
                  <h2 className="text-sm uppercase tracking-widest text-slate-600 font-light">Latest Research</h2>
                  <div className="h-px flex-1 bg-slate-400/50 ml-4"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.slice(1, 7).map((article) => {
                    const categoryColor = article.category === 'AI' ? 'from-blue-100 to-indigo-200' :
                                        article.category === 'Economics' ? 'from-green-100 to-emerald-200' :
                                        article.category === 'Climate' ? 'from-teal-100 to-cyan-200' :
                                        article.category === 'Health' ? 'from-purple-100 to-violet-200' :
                                        article.category === 'Intelligence' ? 'from-orange-100 to-amber-200' :
                                        'from-slate-100 to-slate-200';
                    
                    return (
                      <motion.div
                        key={article.id}
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        variants={cardHover}
                        className="group bg-white rounded-xl overflow-hidden transition-all duration-300 shadow-lg border border-slate-200 relative"
                      >
                        <div className="absolute inset-0 rounded-xl border border-slate-200 z-20 pointer-events-none"></div>
                        
                        <div className="relative overflow-hidden">
                          <div className="relative h-40 overflow-hidden">
                            <Image
                              src={article.image}
                              alt={article.title}
                              width={300}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            
                            <div className="absolute top-3 left-3">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColor} text-slate-800 backdrop-blur-sm border border-white/20`}>
                                {Array.isArray(article.category) ? article.category[0] : article.category}
                              </span>
                            </div>
                          </div>
                          
                          <div className="px-6 py-6 bg-white">
                            <div className="space-y-3 mb-4">
                              <h3 className="text-lg font-medium text-slate-900 tracking-tight line-clamp-2 group-hover:text-slate-700 transition-colors">
                                {article.title}
                              </h3>
                              <div className="h-0.5 w-8 bg-slate-500/30"></div>
                            </div>
                            
                            <p className="text-slate-600 leading-relaxed mb-4 line-clamp-2 font-light text-sm">
                              {article.excerpt}
                            </p>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                              <span>{article.authorName || "Perrin Institute"}</span>
                              <span>{article.date}</span>
                            </div>
                            
                            <Link
                              href={`/news/${article.id}`}
                              className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors group text-sm"
                            >
                              <span className="relative">
                                <span className="relative z-10">Read More</span>
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-400/30 group-hover:bg-slate-600/50 transition-colors"></span>
                              </span>
                              <FiChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
              
              {/* Analysis & Opinion Section */}
              {filteredArticles.filter(a => a.type === 'opinion').length > 0 && (
                <motion.section variants={fadeIn} className="border-t border-slate-200 pt-16">
                  <div className="flex items-center mb-8">
                    <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-600 font-light">Analysis & Opinion</h2>
                    <div className="h-px flex-1 bg-slate-400/50 ml-4"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredArticles.filter(a => a.type === 'opinion').slice(0, 4).map((article) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={`/news/${article.id}`} className="group">
                          <article className="flex space-x-4 p-6 bg-white rounded-lg border border-slate-200 hover:shadow-lg transition-all duration-300">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                                <FiFileText className="w-6 h-6 text-slate-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-lg font-medium text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2 mb-2">
                                {article.title}
                              </h3>
                              <p className="text-slate-600 text-sm line-clamp-2 mb-3 font-light">
                                {article.excerpt}
                              </p>
                              <div className="flex items-center text-xs text-slate-500">
                                <span>{article.authorName || "Perrin Institute"}</span>
                                <span className="mx-2">•</span>
                                <span>{article.date}</span>
                              </div>
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
              
              {/* More Headlines Section */}
              {filteredArticles.length > 7 && (
                <motion.section variants={fadeIn} className="border-t border-slate-200 pt-16">
                  <div className="flex items-center mb-8">
                    <div className="h-px w-12 bg-slate-400/50 mr-4"></div>
                    <h2 className="text-sm uppercase tracking-widest text-slate-600 font-light">More Headlines</h2>
                    <div className="h-px flex-1 bg-slate-400/50 ml-4"></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredArticles.slice(7, 15).map((article) => (
                      <motion.div key={article.id} variants={fadeIn}>
                        <Link href={`/news/${article.id}`} className="group">
                          <article className="space-y-3">
                            <div className="aspect-[4/3] overflow-hidden rounded-lg">
                              <Image
                                src={article.image}
                                alt={article.title}
                                width={250}
                                height={200}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="space-y-2">
                              <div className="text-xs text-slate-500 uppercase font-medium tracking-wide">
                                {Array.isArray(article.category) ? article.category[0] : article.category}
                              </div>
                              <h3 className="text-sm font-medium text-slate-900 leading-tight group-hover:text-slate-700 transition-colors line-clamp-3">
                                {article.title}
                              </h3>
                              <div className="text-xs text-slate-500">
                                {article.date}
                              </div>
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>
          )}
        </motion.div>
        
        {/* View All Articles Button */}
        {filteredArticles.length > 15 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mt-16 text-center"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-16 bg-slate-400/50 mr-4"></div>
              <p className="text-xs uppercase tracking-widest text-slate-600 font-light">More Articles</p>
              <div className="h-px w-16 bg-slate-400/50 ml-4"></div>
            </div>
            
            <button
              onClick={() => {
                setShowAllArticles(true);
                setActiveCategory('All');
                setSearchTerm('');
              }}
              className="inline-flex items-center px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <span className="font-medium">View All Articles</span>
              <FiChevronRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            
            <p className="text-slate-500 text-sm mt-4 font-light">
              Showing {Math.min(filteredArticles.length, 15)} of {filteredArticles.length} articles
            </p>
          </motion.div>
        )}
        
      </div>
    </div>
  );
}