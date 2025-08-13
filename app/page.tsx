"use client";

// Pre-render the home page at build time to avoid runtime SSR errors on the host
//
import React, { useState, useEffect, useRef, Suspense, lazy, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiArrowUpRight, FiBook, FiGlobe, FiLayers, FiUsers, FiChevronDown, FiArrowDown, FiExternalLink, FiClock, FiPlay, FiDownload } from 'react-icons/fi';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RESEARCH_CATEGORIES } from '@/lib/constants';
import MorphingShape from '@/components/MorphingShape';
import FloatingElement from '@/components/FloatingElement';
import Parallax from '@/components/Parallax';
import Transform3D from '@/components/Transform3D';
import { useGlobalLoading } from '@/lib/hooks/useGlobalLoading';

// React.lazy import for Spline (kept, but will be deferred)
const Spline = lazy(() => import('@splinetool/react-spline'));

// Lightweight wrapper to defer Spline execution until browser is idle/after a short delay
function DeferredSpline({ onLoad }: { onLoad: () => void }) {
  const [shouldRender, setShouldRender] = useState(false);
  useEffect(() => {
    let timeoutId: number | undefined;
    // Defer until global loading allows it (longer on mobile)
    const delay = /Mobi|Android/i.test(navigator.userAgent) ? 2000 : 1200;
    timeoutId = window.setTimeout(() => setShouldRender(true), delay);
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);
  if (!shouldRender) return null;
  return (
    <Spline
      scene="https://prod.spline.design/N-7Bwb97Q2XUmz3O/scene.splinecode"
      onLoad={onLoad}
      style={{ width: '100%', height: '100%', background: 'transparent', position: 'absolute', inset: 0 }}
    />
  );
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

// Animation variants
const fadeIn: any = {
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

const containerVariants: any = {
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

const itemVariants: any = {
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

const slideInRight: any = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.9, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  }
};

const scaleUp: any = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Component to render icons based on category name
const CategoryIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Human-Centered AI Laboratory':
      return <FiUsers className="w-6 h-6" />;
    case 'Policy Entrepreneurship Laboratory':
      return <FiLayers className="w-6 h-6" />;
    case 'Governance Technology Laboratory':
      return <FiGlobe className="w-6 h-6" />;
    case 'International Studies Laboratory':
      return <FiBook className="w-6 h-6" />;
    default:
      return <div className="w-6 h-6 rounded-full bg-teal-100"></div>;
  }
};

export default function Home() {
  const globalLoading = useGlobalLoading();
  const [articles, setArticles] = useState<Article[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [regularArticles, setRegularArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);
  
  // Refs for scroll-driven animations
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const featuredRef = useRef(null);
  
  // Scroll progress for hero section
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values for parallax effects
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const headerTranslateY = useTransform(heroProgress, [0, 0.2], [0, -50]);
  const parallaxBackground = useTransform(heroProgress, [0, 1], [0, 100]);
  
  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load articles data
  useEffect(() => {
    const loadArticles = async () => {
      try {
        if (typeof window !== 'undefined') {
          try {
            const articlesModule = await import('@/lib/articles').catch(err => {
              console.error('Failed to import articles module:', err);
              return null;
            });
            
            if (articlesModule) {
              const { getArticles } = articlesModule;
              const fetchedArticles = await getArticles().catch(err => {
                console.error('Failed to fetch articles:', err);
                return [];
              });
              
              setArticles(fetchedArticles);
              
              if (fetchedArticles && fetchedArticles.length > 0) {
                const featured = fetchedArticles.filter((article: Article) => article.featured);
                
                if (featured.length > 0) {
                  setFeaturedArticles(featured.slice(0, 4));
                  setRegularArticles(fetchedArticles.filter((a: Article) => !featured.slice(0, 4).some((f: Article) => f.id === a.id)));
                } else {
                  setFeaturedArticles(fetchedArticles.slice(0, 4));
                  setRegularArticles(fetchedArticles.slice(4));
                }
              }
            }
          } catch (error) {
            console.error('Error in fetchArticles:', error);
            setError("Failed to load articles");
            setFeaturedArticles([]);
            setRegularArticles([]);
          }
        }
        
        // Show content immediately since GlobalLoading handles the loading screen
        setShowMainContent(true);
        
      } catch (error) {
        console.error('Error during initialization:', error);
        setShowMainContent(true);
      }
    };

    loadArticles();
  }, []);

  // Function to handle slide changing
  const nextSlide = () => {
    if (featuredArticles.length > 0) {
      setCurrentSlideIndex((prev) => 
        prev === featuredArticles.length - 1 ? 0 : prev + 1
      );
    }
  };
  
  // Auto advance slides
  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 8000); // Change slide every 8 seconds
    
    return () => clearInterval(slideInterval);
  }, [featuredArticles]);

  // Retry function for error state
  const retryFetchArticles = async () => {
    // Simplified retry without loading state
    if (typeof window === 'undefined') return;
    
    try {
      const { getArticles } = await import('@/lib/articles');
      const fetchedArticles = await getArticles()
      setArticles(fetchedArticles)
      
      if (fetchedArticles && fetchedArticles.length > 0) {
        const featured = fetchedArticles.filter((article: Article) => article.featured);
        
        if (featured.length > 0) {
          setFeaturedArticles(featured.slice(0, 4));
          setRegularArticles(fetchedArticles.filter((a: Article) => !featured.slice(0, 4).some((f: Article) => f.id === a.id)));
        } else {
          setFeaturedArticles(fetchedArticles.slice(0, 4));
          setRegularArticles(fetchedArticles.slice(4));
        }
        setError(null);
      } else {
        setError("No articles available");
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError("Failed to load articles");
    }
  }

  const onSplineLoad = () => {
    console.log('Spline loaded!');
    globalLoading.setSplineLoaded(true);
    setIsSplineLoaded(true);
  };

  // Using GlobalLoading component instead of page-specific loading

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50"
    >
      {/* Old Money Tech Prestige Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden bg-white"
      >
        {/* Background layer: fast poster image first, then defer Spline */}
        <div className="absolute inset-0 z-5">
          <div className="w-full h-full relative">
            {/* Poster image for immediate paint */}
            <Image
              src="/news/hero-background.jpg"
              alt="Background"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            {/* Defer Spline; hide canvas until fully loaded to avoid placeholder artifact */}
            {isMounted && (
              <Suspense fallback={null}>
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${isSplineLoaded ? 'opacity-100' : 'opacity-0'}`}
                  aria-hidden={!isSplineLoaded}
                  style={{ pointerEvents: 'none' }}
                >
                  <DeferredSpline onLoad={onSplineLoad} />
                </div>
              </Suspense>
            )}
            {/* White block to cover Spline watermark */}
            <div className="absolute bottom-5 right-1 w-44 h-12 bg-white z-20 pointer-events-none"></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/65 to-white/80"></div>

            {/* Lightweight loading pill shown only until Spline is loaded */}
            {!isSplineLoaded && (
              <div
                className="absolute bottom-5 left-4 z-30 inline-flex items-center gap-2 px-3 py-2 bg-white/85 backdrop-blur-sm border border-slate-200 rounded-full text-slate-700 text-xs shadow-glass transition-opacity duration-300"
                aria-live="polite"
              >
                <span className="h-3.5 w-3.5 rounded-full border-2 border-slate-300 border-t-slate-700 motion-safe:animate-spin"></span>
                <span>Loading interactive scene…</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Refined Content Layout */}
        <div className="relative z-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center min-h-screen py-16 sm:py-20">
              
              {/* Left Column - Sophisticated Content */}
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6 sm:space-y-8 text-center lg:text-left"
              >
                {/* Refined institutional badge */}
                <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 rounded-full bg-slate-100 px-4 py-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div>
                  <span className="text-xs font-medium text-slate-600 tracking-wide sm:text-sm">
                    Accredited by the United Nations
                  </span>
                </motion.div>
                
                {/* Sophisticated headline */}
                <motion.h1 
                  variants={itemVariants}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-slate-900 leading-[0.95] tracking-tight"
                  style={{ fontFamily: 'SF Pro Display, system-ui, sans-serif' }}
                >
                  Transforming
                  <br />
                  <span className="font-medium text-slate-700">
                    policy research
                  </span>
                  <br />
                  <span className="text-slate-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
                    with AI
                  </span>
                </motion.h1>
                
                {/* Refined description */}
                <motion.p 
                  variants={itemVariants}
                  className="text-base sm:text-lg lg:text-xl text-slate-600 leading-relaxed font-light max-w-xl mx-auto lg:mx-0"
                >
                  Advanced analytics and machine learning to solve complex policy challenges at the University of Virginia.
                </motion.p>
                
                {/* Understated CTAs */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6 justify-center lg:justify-start"
                >
                  <Link 
                    href="/news" 
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base"
                  >
                    View our intelligence
                    <FiArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  
                  <Link 
                    href="/Labs" 
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 text-sm sm:text-base"
                  >
                    Explore research labs
                  </Link>
                </motion.div>
              </motion.div>
              
              {/* Right Column - Refined Image & Subtle Elements */}
              <motion.div 
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                className="relative mt-8 lg:mt-0"
              >
                {/* Main refined image */}
                <div className="relative">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl bg-white border border-slate-200">
                    <Image 
                      src="/capital.jpeg"
                      alt="Policy Research Excellence" 
                      width={700} 
                      height={500}
                      className="w-full h-auto object-cover"
                      priority
                      quality={95}
                    />
                    
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Refined floating elements - smaller and more elegant */}
                  
                  {/* Compact Analytics Card - Hidden on mobile to prevent overlap */}
                  <div className="hidden sm:block absolute -top-2 sm:-top-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 p-3 sm:p-4 w-44 sm:w-56">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium text-slate-900">Research Labs</span>
                      </div>
                      <div className="text-xs text-slate-500">Active</div>
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-600">Labs Active</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-900">10</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1 sm:h-1.5">
                        <div className="bg-slate-600 h-1 sm:h-1.5 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Compact Insights Panel - Hidden on mobile to prevent overlap */}
                  <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-lg rounded-xl shadow-lg border border-slate-200 p-3 sm:p-4 w-48 sm:w-60">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                      <div className="w-5 sm:w-6 h-5 sm:h-6 rounded-lg bg-slate-900 flex items-center justify-center">
                        <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-sm"></div>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium text-slate-900">Research Output</h3>
                        <p className="text-xs text-slate-600">2023-2024</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">100+</div>
                        <div className="text-xs text-slate-600">Articles</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">250+</div>
                        <div className="text-xs text-slate-600">Researchers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs sm:text-sm font-semibold text-slate-900">6</div>
                        <div className="text-xs text-slate-600">Agencies</div>
                      </div>
                    </div>
                  </div>

                  
                  {/* Subtle corner accents */}
                  <div className="absolute -top-1 -right-1 w-6 sm:w-8 h-6 sm:h-8">
                    <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-3 sm:w-4 h-3 sm:h-4 border-t border-r border-slate-300"></div>
                  </div>
                  <div className="absolute -bottom-1 -left-1 w-6 sm:w-8 h-6 sm:h-8">
                    <div className="absolute bottom-1 sm:bottom-2 left-1 sm:left-2 w-3 sm:w-4 h-3 sm:h-4 border-b border-l border-slate-300"></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CIO-UVA Contract Link */}
      <div className="relative z-30 -mt-16 sm:-mt-20 mb-12 sm:mb-16 lg:mb-20 px-4 text-center">
        <a
          href="/CIO_UVA_Contract.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center text-xs font-medium text-slate-500 transition-colors duration-200 hover:text-slate-900 sm:text-sm"
        >
          <span>See our UVA contract</span>
          <FiExternalLink className="ml-1.5 h-3.5 w-3.5 transform transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

              {/* Government Agencies Policy Advisory Carousel */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-8 sm:mb-12"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-600 font-medium px-4 sm:px-6">Policy Advisory</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl font-light text-slate-900 mb-3 sm:mb-4 font-roboto">
              Trusted by Leading Agencies
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg text-slate-600 font-light max-w-2xl mx-auto px-4 sm:px-0">
              We've suggested strategic policy recommendations and research to key government departments
            </motion.p>
          </motion.div>
          
          {/* Carousel Container */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="relative"
          >
            {/* Agency Logos Carousel */}
            <div className="overflow-hidden">
              <div className="flex animate-scroll-x space-x-8 sm:space-x-12 lg:space-x-16 py-6 sm:py-8">
                {/* First set */}
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/environmental_protection_agency-epa-logo.png"
                      alt="US Environmental Protection Agency"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Environmental Protection</h3>
                  <p className="text-xs text-slate-500 text-center">Climate Policy Research</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/energy-logo.png"
                      alt="US Department of Energy"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Energy</h3>
                  <p className="text-xs text-slate-500 text-center">Energy Infrastructure Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/education-logo.png"
                      alt="US Department of Education"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Education</h3>
                  <p className="text-xs text-slate-500 text-center">Educational Technology Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/us-department-of-state-2-logo-png-transparent.png"
                      alt="US Department of State"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of State</h3>
                  <p className="text-xs text-slate-500 text-center">International Relations Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/Federal-Bureau-of-Investigation-Logo.png"
                      alt="US Department of Justice"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Justice</h3>
                  <p className="text-xs text-slate-500 text-center">Legal Framework Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/nasa-logo.png"
                      alt="NASA"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">NASA</h3>
                  <p className="text-xs text-slate-500 text-center">Space Technology Governance</p>
                </motion.div>
                
                {/* Duplicate set for seamless endless loop */}
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/environmental_protection_agency-epa-logo.png"
                      alt="US Environmental Protection Agency"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Environmental Protection</h3>
                  <p className="text-xs text-slate-500 text-center">Climate Policy Research</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/energy-logo.png"
                      alt="US Department of Energy"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Energy</h3>
                  <p className="text-xs text-slate-500 text-center">Energy Infrastructure Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/education-logo.png"
                      alt="US Department of Education"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Education</h3>
                  <p className="text-xs text-slate-500 text-center">Educational Technology Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/us-department-of-state-2-logo-png-transparent.png"
                      alt="US Department of State"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of State</h3>
                  <p className="text-xs text-slate-500 text-center">International Relations Policy</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/Federal-Bureau-of-Investigation-Logo.png"
                      alt="US Department of Justice"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">Department of Justice</h3>
                  <p className="text-xs text-slate-500 text-center">Legal Framework Analysis</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="group flex-shrink-0 flex flex-col items-center bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 w-36 sm:w-44 lg:w-48">
                  <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-full bg-slate-50 group-hover:bg-slate-100 transition-colors">
                    <Image
                      src="/nasa-logo.png"
                      alt="NASA"
                      width={64}
                      height={64}
                      className="h-10 sm:h-12 lg:h-16 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-medium text-slate-900 text-center mb-1">NASA</h3>
                  <p className="text-xs text-slate-500 text-center">Space Technology Governance</p>
                </motion.div>
              </div>
            </div>
            
            {/* Gradient overlays for seamless effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Institutional Honors - Horizontal Layout */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-600 font-medium px-4 sm:px-6">Institutional Recognition</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 font-roboto leading-tight">
              Distinguished Acknowledgments
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Recognition from distinguished leaders and prominent media coverage of our research impact
            </motion.p>
          </motion.div>
          
          {/* Multi-level Layout with More Space */}
          <div className="space-y-8 sm:space-y-12">
            
            {/* First Level - Senate Recognition (Full Width with More Space) */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8"
            >
              {/* Van Hollen Letter Image */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="relative h-72 sm:h-80 lg:h-96">
                  <Image
                    src="/download (2).jpg"
                    alt="Letter from Senator Van Hollen"
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Van Hollen Quote - Expanded */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-500 flex flex-col justify-center">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="rounded-full bg-slate-100 p-3 sm:p-4 shadow-sm mr-4 sm:mr-6 border border-slate-200">
                    <Image
                      src="/US-Senate-Logo.png"
                      alt="U.S. Senate"
                      width={32}
                      height={32}
                      className="sm:w-10 sm:h-10"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 font-roboto">U.S. Senate Recognition</h3>
                    <p className="text-slate-600 font-light text-sm sm:text-base">Senator Chris Van Hollen</p>
                  </div>
                </div>
                
                <blockquote className="text-base sm:text-lg lg:text-xl italic text-slate-700 font-light leading-relaxed mb-4 sm:mb-6 border-l-4 border-slate-300 pl-4 sm:pl-6">
                  "...your initiative sets a powerful example of how passion and purpose can drive meaningful change..."
                </blockquote>
                
                <div className="text-sm sm:text-base text-slate-500 font-medium">
                  Official Letter of Commendation
                </div>
              </div>
            </motion.div>

            {/* Second Level - BBC Feature (Full Width with More Space) */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8"
            >
              {/* BBC Interview Video - Larger */}
              <div className="lg:col-span-3 bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-500">
                <div className="relative h-72 sm:h-80 lg:h-96">
                  <iframe
                    src="https://www.youtube.com/embed/xS_3pUX3Qvg?autoplay=1&mute=1&controls=1&rel=0&showinfo=0"
                    title="BBC Interview - Inclusive Policy Lab Director"
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* BBC Interview Text - Expanded */}
              <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 hover:shadow-xl transition-all duration-500 flex flex-col justify-center">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="rounded-lg bg-red-600 p-3 sm:p-4 shadow-sm mr-4 sm:mr-6">
                    <span className="text-white font-bold text-sm sm:text-base">BBC</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium text-slate-900 font-roboto">BBC International</h3>
                    <p className="text-slate-600 font-light text-sm sm:text-base">Global Coverage</p>
                  </div>
                </div>
                
                <h4 className="text-base sm:text-lg font-medium text-slate-900 mb-3 sm:mb-4 font-roboto leading-tight">
                  Policy Expert Interview
                </h4>
                
                <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed mb-4 sm:mb-6">
                  Our Inclusive Policy Lab Director featured in BBC's international coverage, discussing innovative governance approaches and policy solutions.
                </p>
                
                <a 
                  href="https://www.youtube.com/watch?list=TLGGGfHfzVOPgocyMzA1MjAyNQ&v=xS_3pUX3Qvg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-slate-700 hover:text-slate-900 font-medium transition-colors font-roboto group text-sm sm:text-base"
                >
                  <span>Watch Full Interview</span>
                  <FiExternalLink className="ml-2 w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Articles - Refined Design */}
      <section 
        ref={featuredRef}
        className="py-12 sm:py-16 md:py-20 lg:py-32 bg-slate-50 relative"
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs sm:text-sm font-medium mb-3 sm:mb-4 font-roboto">Latest Articles</span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light mb-3 sm:mb-4 font-roboto text-slate-900">Our latest insights</h2>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl font-light font-roboto">In-depth analysis from our team on today's most pressing policy challenges</p>
            </div>
            
            <Link 
              href="/news" 
              className="hidden md:flex items-center text-slate-700 hover:text-slate-900 transition-colors mt-6 md:mt-0 font-roboto font-medium"
            >
              <span>View all articles</span>
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
          
          {/* Featured Articles Section with better error handling */}
          {error ? (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">{error}</p>
              <button 
                onClick={retryFetchArticles}
                className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Retry Loading Articles
              </button>
            </div>
          ) : featuredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Article 1 - Large feature (left) */}
              <Link 
                href={`/news/${featuredArticles[0].id}`}
                className="block bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 transition-shadow hover:shadow-md group"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredArticles[0].image || "/uva-stock-3.jpg"}
                    alt={featuredArticles[0].title || "Featured article"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                    {(() => {
                      const categories = Array.isArray(featuredArticles[0].category) 
                        ? featuredArticles[0].category 
                        : [featuredArticles[0].category || "Paper"];
                      return categories.map((cat, index) => (
                        <span 
                          key={index}
                          className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-lg font-roboto"
                        >
                          {cat}
                        </span>
                      ));
                    })()}
                  </div>
                  <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors font-roboto leading-tight">
                    {featuredArticles[0].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-4 line-clamp-2 font-roboto font-light">
                    {featuredArticles[0].subtitle || featuredArticles[0].excerpt}
                  </p>
                  <div className="flex items-center">
                    <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-3 font-roboto text-sm">
                      {featuredArticles[0].authorName ? featuredArticles[0].authorName.charAt(0) : 'P'}
                    </div>
                    <span className="text-xs sm:text-sm text-slate-500 font-roboto">{featuredArticles[0].authorName || "Perrin Researcher"}</span>
                  </div>
                </div>
              </Link>
              
              {/* Articles right column */}
              <div className="space-y-4 sm:space-y-6">
                {featuredArticles.slice(1, 4).map((article, index) => (
                  <Link 
                    key={article.id}
                    href={`/news/${article.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 transition-shadow hover:shadow-md group"
                  >
                    <div className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4 flex flex-wrap gap-2">
                        {(() => {
                          const categories = Array.isArray(article.category) 
                            ? article.category 
                            : [article.category || (index % 2 === 0 ? "Commentary" : "Paper")];
                          return categories.map((cat, index) => (
                            <span 
                              key={index}
                              className="bg-slate-100 text-slate-700 text-xs font-medium px-3 py-1 rounded-lg font-roboto"
                            >
                              {cat}
                            </span>
                          ));
                        })()}
                      </div>
                      <h3 className="text-lg sm:text-xl font-medium text-slate-900 mb-3 group-hover:text-slate-700 transition-colors font-roboto leading-tight">
                        {article.title}
                      </h3>
                      <div className="flex items-center">
                        <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 mr-3 font-roboto text-sm">
                          {article.authorName ? article.authorName.charAt(0) : 'P'}
                        </div>
                        <span className="text-xs sm:text-sm text-slate-500 font-roboto">{article.authorName || "Perrin Researcher"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-600 mb-4">No articles available at the moment.</p>
              <button 
                onClick={retryFetchArticles}
                className="inline-flex items-center px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Key Metrics Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center mb-12 sm:mb-16"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
              <span className="text-xs sm:text-sm uppercase tracking-wide text-slate-600 font-medium px-4 sm:px-6">Impact by the Numbers</span>
              <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent via-slate-400 to-transparent"></div>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-slate-900 mb-4 sm:mb-6 font-roboto leading-tight">
              Driving Real Impact
            </motion.h2>
            <motion.p variants={itemVariants} className="text-base sm:text-lg lg:text-xl text-slate-600 font-light max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              Our work extends beyond research to create tangible opportunities and build engaged communities
            </motion.p>
          </motion.div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Scholarship Metric */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-md bg-slate-600"></div>
                </div>
                <div className="text-xs text-slate-500 font-medium tracking-wide">SCHOLARSHIPS</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-5xl font-light text-slate-900 font-roboto tracking-tight">$3M</h3>
                <p className="text-base font-medium text-slate-700 font-roboto">Scholarships Secured</p>
                <p className="text-sm text-slate-600 font-light leading-relaxed font-roboto">
                  Through our comprehensive scholarship center, connecting students with opportunities
                </p>
              </div>
            </motion.div>
            
            {/* TikTok Followers Metric */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-md bg-slate-600"></div>
                </div>
                <div className="text-xs text-slate-500 font-medium tracking-wide">SOCIAL REACH</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-5xl font-light text-slate-900 font-roboto tracking-tight">48K</h3>
                <p className="text-base font-medium text-slate-700 font-roboto">TikTok Followers</p>
                <p className="text-sm text-slate-600 font-light leading-relaxed font-roboto">
                  Engaging young audiences with accessible policy content and insights
                </p>
                <a
                  href="https://www.tiktok.com/@theperrininstitution"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-all duration-200 text-sm font-roboto"
                >
                  <FiExternalLink className="mr-2 w-4 h-4" />
                  Visit TikTok
                </a>
              </div>
            </motion.div>
            
            {/* Policy Researchers Metric */}
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="group bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-md bg-slate-600"></div>
                </div>
                <div className="text-xs text-slate-500 font-medium tracking-wide">NETWORK</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-4xl sm:text-5xl font-light text-slate-900 font-roboto tracking-tight">250+</h3>
                <p className="text-base font-medium text-slate-700 font-roboto">Policy Researchers</p>
                <p className="text-sm text-slate-600 font-light leading-relaxed font-roboto">
                  Expert network contributing to cutting-edge policy analysis and solutions
                </p>
              </div>
            </motion.div>
            
          </div>
          
          {/* Refined CTA */}
          <motion.div 
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center mt-12 sm:mt-16"
          >
            <Link 
              href="/scholarship-center"
              className="inline-flex items-center px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base font-roboto shadow-sm hover:shadow-md"
            >
              Explore Scholarship Opportunities
              <FiArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Research Section */}
      <section className="py-12 sm:py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-8">

          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 font-roboto leading-tight">
              Our Research
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mb-10 sm:mb-12 font-light font-roboto">
              Our scholars generate strategic ideas and independent analysis to help inform countries, institutions, and leaders.
            </p>
          </div>

          {/* Featured Publication Download */}
          <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 text-center hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-3 font-roboto">
                Featured Publication
              </h3>
              <p className="text-slate-600 font-roboto text-sm sm:text-base mb-6">
                The U.S.-China Tech Rivalry: A comprehensive analysis of the strategic implications of the AI semiconductor race.
              </p>
              <div className="mb-6 h-96 overflow-y-auto rounded-lg border border-slate-300 bg-white">
                <iframe
                  src={`/YIP_PAPER.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  className="w-full h-full"
                  title="Featured Publication Preview"
                  // sandbox="allow-scripts allow-same-origin"
                ></iframe>
              </div>
              <a 
                href="/YIP_PAPER.pdf"
                download="YIP_PAPER.pdf"
                className="inline-flex items-center px-6 sm:px-8 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-sm sm:text-base font-roboto shadow-sm hover:shadow-md"
              >
                <FiDownload className="mr-2 w-4 h-4" />
                Download Full Report
              </a>
            </div>
          </div>

        </div>
      </section>
    </motion.main>
  );
}
