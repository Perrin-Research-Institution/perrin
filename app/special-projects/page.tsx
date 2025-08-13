"use client";

import {
  ArrowRight,
  BarChart2,
  Globe,
  Search,
  Target,
  TrendingUp,
  Users,
  X,
  Zap
} from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import NameCarousel from "./ui/NameCarousel";
import PartnershipCard from "./ui/PartnershipCard";

// Partnership data with professional metrics
const partnerships = [
  {
    name: "Learn4Lanka",
    category: "Education Technology",
    description: "Transforming education infrastructure in Sri Lankan schools through direct resource delivery and strategic community partnerships.",
    longDescription: "Our partnership with Learn4Lanka focuses on sustainable educational transformation through technology integration, teacher training programs, and community engagement initiatives. We've developed comprehensive digital learning platforms and established resource distribution networks across rural communities.",
    metrics: [
      { label: "Students Reached", value: "5,000+", icon: Users },
      { label: "Schools Partnered", value: "50+", icon: Target },
      { label: "Communities Served", value: "20+", icon: Globe }
    ],
    image: "https://images.pexels.com/photos/8471831/pexels-photo-8471831.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: "https://learn4lanka.org/",
    status: "Active Partnership",
    color: "blue"
  },
  {
    name: "WikiJobs",
    category: "Career Intelligence Platform",
    description: "AI-powered career reentry platform providing personalized job matching and strategic career guidance for returning professionals.",
    longDescription: "WikiJobs leverages advanced machine learning algorithms to create personalized career pathways for professionals returning to the workforce. Our collaboration includes developing predictive models for career success and building comprehensive skills assessment frameworks.",
    metrics: [
      { label: "Platform Reach", value: "500K+", icon: BarChart2 },
      { label: "Success Rate", value: "94%", icon: TrendingUp },
      { label: "Career Placements", value: "15K+", icon: Target }
    ],
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: "https://wikijob.org/",
    status: "Strategic Alliance",
    color: "emerald"
  },
  {
    name: "Menstrual Equity Initiative",
    category: "Health Research & Policy",
    description: "All-female-led research organization advancing evidence-based policy for menstrual health and reproductive equity through comprehensive research initiatives.",
    longDescription: "This groundbreaking initiative combines rigorous academic research with grassroots advocacy to address systemic barriers to menstrual equity. Our partnership supports large-scale data collection, policy analysis, and the development of evidence-based interventions.",
    metrics: [
      { label: "Research Studies", value: "10+", icon: BarChart2 },
      { label: "Policy Initiatives", value: "25+", icon: Target },
      { label: "Educational Outreach", value: "UN General Assembly Presence", icon: Users }
    ],
    image: "https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: undefined,
    status: "Research Partnership",
    color: "purple"
  },
  {
    name: "OutsideConnection",
    category: "Reentry Employment Platform",
    description: "Leading second-chance employment platform facilitating successful workforce reintegration through nationwide fair-chance opportunities.",
    longDescription: "OutsideConnection represents a paradigm shift in reentry employment, utilizing data-driven matching algorithms and comprehensive support systems. Our partnership focuses on scaling impact through technology innovation and employer network expansion.",
    metrics: [
      { label: "Reentrants Served", value: "10K+", icon: Users },
      { label: "States Covered", value: "50", icon: Globe },
      { label: "Cities Active", value: "126", icon: Target }
    ],
    image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: "https://www.outsideconnection.org/",
    status: "Impact Partnership",
    color: "orange"
  },
  {
    name: "TechPals",
    category: "Digital Literacy Initiative",
    description: "Comprehensive digital literacy program bridging generational technology gaps through structured education and volunteer mentorship.",
    longDescription: "TechPals addresses the digital divide through innovative peer-to-peer learning models and structured curriculum development. Our collaboration includes developing scalable training modules and building sustainable volunteer networks across communities.",
    metrics: [
      { label: "Program Participants", value: "5K+", icon: Users },
      { label: "Training Programs", value: "8+", icon: BarChart2 },
      { label: "Volunteer Network", value: "100+", icon: Target }
    ],
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: "https://www.techpals.io/",
    status: "Educational Alliance",
    color: "indigo"
  },
  {
    name: "VenturEd",
    category: "Tech Fellowship Program",
    description: "Elite 8-week Silicon Valley startup fellowship connecting high-potential students with Y Combinator partners and real-world technology opportunities.",
    longDescription: "VenturEd represents the future of experiential learning in technology entrepreneurship. Our partnership supports curriculum development, mentor network expansion, and the creation of sustainable pathways from education to innovation leadership.",
    metrics: [
      { label: "Diversity Increase", value: "+27.4%", icon: TrendingUp },
      { label: "Program Duration", value: "8 Weeks", icon: Target },
      { label: "Partner Network", value: "YC Alumni", icon: Globe }
    ],
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
    website: "https://www.venturedglobal.org/",
    status: "Fellowship Partnership",
    color: "teal"
  },
  {
    name: "HumanityBridge.love",
    category: "Social Impact Platform",
    description: "Connecting you with work & volunteer opportunities worldwide. Founded by Finn Järvi & Cash Hilinski",
    longDescription: "HumanityBridge.love represents a new paradigm in social impact technology, creating meaningful connections between diverse communities worldwide. Our partnership focuses on developing scalable solutions for humanitarian challenges, fostering cross-cultural understanding, and building sustainable social impact networks through innovative digital platforms.",
    metrics: [
      { label: "Total Users", value: "10K+", icon: Globe },
      { label: "Active Projects", value: "1.4M+", icon: Target },
      { label: "Languages Supported", value: "10+", icon: Users }
    ],
    image: "/humanitybridge.png",
    website: "https://humanitybridge.love/",
    status: "Active Partnership",
    color: "purple"
  }
  
];


export default function SpecialProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Create logical category groups for better organization
  const categoryMap: { [key: string]: string[] } = {
    "All": [],
    "Education": ["Education Technology", "Tech Fellowship Program", "Digital Literacy Initiative"],
    "Employment": ["Career Intelligence Platform", "Reentry Employment Platform"],
    "Health & Policy": ["Health Research & Policy"],
    "Social Impact": ["Social Impact Platform"]
  };

  const filters = Object.keys(categoryMap);

  // Simple search filter
  const filteredPartnerships = useMemo(() => {
    let results = partnerships;

    // Apply search filter
    if (searchQuery.trim()) {
      results = results.filter(partnership => 
        partnership.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partnership.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partnership.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        partnership.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilter !== "All") {
      const allowedCategories = categoryMap[activeFilter];
      results = results.filter(partnership => 
        allowedCategories.includes(partnership.category)
      );
    }

    return results;
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsHeroVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-blue-50/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            {/* Badge */}
            <div 
              className={`inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-full shadow-sm mb-8 transition-all duration-1000 ${
                isHeroVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Zap className="h-5 w-5 text-blue-600 mr-3" />
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                Strategic Partnerships
              </span>
            </div>

            {/* Main Heading */}
            <h1 
              className={`text-6xl sm:text-7xl lg:text-8xl font-extralight text-gray-900 mb-8 tracking-tight leading-none transition-all duration-1000 delay-200 ${
                isHeroVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              Special
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            
            {/* Description */}
            <p 
              className={`text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-16 font-light transition-all duration-1000 delay-400 ${
                isHeroVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              Strategic alliances with innovative organizations advancing policy research, 
              democratic innovation, and systemic change through data-driven solutions.
            </p>

            {/* Stats Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto transition-all duration-1000 delay-600 ${
              isHeroVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <Users className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <div className="text-4xl font-light text-gray-900 mb-2">500K+</div>
                <div className="text-sm text-gray-600 font-medium tracking-wide">People Reached</div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <Target className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                <div className="text-4xl font-light text-gray-900 mb-2">70+</div>
                <div className="text-sm text-gray-600 font-medium tracking-wide">Institutions Supported</div>
              </div>
              <div className="text-center p-8 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300">
                <TrendingUp className="h-10 w-10 text-emerald-600 mx-auto mb-4" />
                <div className="text-4xl font-light text-gray-900 mb-2">48K+</div>
                <div className="text-sm text-gray-600 font-medium tracking-wide">Educated Globally</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Name Carousel */}
      <NameCarousel partnerships={partnerships} />

      {/* Search and Filter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search special projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300 transition-all duration-300 text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <X className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 hover:scale-105 ${
                    activeFilter === filter
                      ? 'bg-gray-900 text-white shadow-lg'
                      : 'bg-white/80 text-gray-600 hover:bg-gray-100 border border-gray-200/60 backdrop-blur-sm'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-center">
              <p className="text-gray-600 font-light">
                {filteredPartnerships.length} project{filteredPartnerships.length !== 1 ? 's' : ''} found
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPartnerships.length > 0 ? (
            <div className="space-y-24">
              {filteredPartnerships.map((partnership, index) => (
                <PartnershipCard 
                  key={partnership.name} 
                  partnership={partnership} 
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-light text-gray-900 mb-4">No projects found</h3>
                <p className="text-gray-600 mb-8">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveFilter("All");
                  }}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light mb-8 leading-tight">
              Ready to partner with us?
            </h2>
            <p className="text-xl text-gray-300 mb-12 font-light leading-relaxed">
              Join our network of innovative organizations creating meaningful impact through strategic collaboration.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-white text-gray-900 rounded-2xl font-semibold text-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:scale-105">
              Start a Partnership
              <ArrowRight className="ml-3 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}