'use client';

import { useEffect, useState, useRef, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiClock, FiChevronDown, FiChevronUp, FiUsers, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import { getJobs } from '../../lib/jobs';
import { GlobalLoadingContext } from '@/components/GlobalLoading';

interface JobUI {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  salaryRange?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  urgency: 'low' | 'medium' | 'high';
}

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [jobs, setJobs] = useState<JobUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [restored, setRestored] = useState(false);
  const splineRef = useRef<any>(null);

  useEffect(() => {
    // Try restore from sessionStorage to avoid pop-in on back navigation
    try {
      const cached = sessionStorage.getItem('careers-jobs');
      const ui = sessionStorage.getItem('careers-ui');
      if (cached) {
        const parsed: JobUI[] = JSON.parse(cached);
        setJobs(parsed);
        setLoading(false);
        setRestored(true);
      }
      if (ui) {
        const parsedUi = JSON.parse(ui);
        if (typeof parsedUi.searchQuery === 'string') setSearchQuery(parsedUi.searchQuery);
        if (parsedUi.selectedType === null || typeof parsedUi.selectedType === 'string') setSelectedType(parsedUi.selectedType);
        if (parsedUi.selectedDepartment === null || typeof parsedUi.selectedDepartment === 'string') setSelectedDepartment(parsedUi.selectedDepartment);
      }
    } catch {}

    (async () => {
      try {
        const data = await getJobs();
        const active = data.filter((j) => j.active);
        setJobs(active);
        // Cache latest
        try { sessionStorage.setItem('careers-jobs', JSON.stringify(active)); } catch {}
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Configure Spline viewer (disable excessive zoom if possible)
  useEffect(() => {
    const el: any = splineRef.current;
    if (!el) return;
    const handleLoad = () => {
      try {
        // Try common control APIs exposed by the viewer/runtime
        if (el?.viewer?.controls) el.viewer.controls.enableZoom = false;
        if (el?.scene?.controls) el.scene.controls.enableZoom = false;
        if (el?.controls) el.controls.enableZoom = false;
      } catch {}
    };
    el.addEventListener('load', handleLoad);
    return () => el.removeEventListener('load', handleLoad);
  }, [splineRef.current]);

  // Persist UI state
  useEffect(() => {
    try {
      sessionStorage.setItem('careers-ui', JSON.stringify({ searchQuery, selectedType, selectedDepartment }));
    } catch {}
  }, [searchQuery, selectedType, selectedDepartment]);

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Fellowship'];
  const departments = ['All', ...Array.from(new Set(jobs.map((j) => j.department)))];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || selectedType === 'All' || job.type === selectedType;
    const matchesDepartment = !selectedDepartment || selectedDepartment === 'All' || job.department === selectedDepartment;
    return matchesSearch && matchesType && matchesDepartment;
  });

  // Removed urgency badges/accents per request

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case 'Research': return <FiBookOpen className="w-4 h-4" />;
      case 'Communications': return <FiUsers className="w-4 h-4" />;
      case 'Government Relations': return <FiTrendingUp className="w-4 h-4" />;
      default: return <FiUsers className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative w-full sm:h-[92vh] lg:h-[100vh] overflow-hidden">
		{/* Mobile: no hero to avoid blank space */}
		<div className="hidden sm:block">
			{/* Desktop/tablet view */}
			<div className="absolute inset-0 origin-center scale-105 md:scale-110 lg:scale-112 transform-gpu will-change-transform filter saturate-110 contrast-105 touch-pan-y">
				<iframe
					src="https://my.spline.design/glassmorphlandingpage-1la93iQR7FbfZmn8LDWFpSUp/"
					className="w-full h-full"
					style={{ background: 'transparent' }}
					frameBorder={0}
					allow="autoplay; camera; microphone; xr-spatial-tracking; gyroscope; accelerometer"
					loading="lazy"
					ref={splineRef}
				/>
			</div>
		</div>
        {/* Soft bottom gradient to ease transition into content */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 hidden sm:block h-28 lg:h-32 bg-gradient-to-t from-white to-transparent" />
        {/* Discreet corner mask to hide Spline watermark */}
		<div 
			className="pointer-events-none absolute bottom-0 right-0 hidden sm:block w-48 h-32 sm:w-56 sm:h-40"
          style={{
            backgroundImage: 'radial-gradient(120% 90% at 100% 100%, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 40%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 78%)'
          }}
        />
      </section>

      {/* Main Content */}
      <section className="pt-20 sm:pt-0 lg:pt-2 pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="mt-0 sm:-mt-16 lg:-mt-24 mb-8 sm:mb-10 space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                {loading ? (
                  <div className="h-[44px] w-full bg-white border border-slate-200 rounded-xl shadow-sm animate-pulse" />
                ) : (
                  <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"/></svg>
                    <input
                      type="text"
                      placeholder="Search roles"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-200 font-roboto shadow-sm"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {loading ? (
                  <>
                    <div className="h-[44px] w-40 bg-white border border-slate-200 rounded-xl shadow-sm animate-pulse" />
                    <div className="h-[44px] w-40 bg-white border border-slate-200 rounded-xl shadow-sm animate-pulse" />
                  </>
                ) : (
                  <>
                    <select
                      value={selectedType || 'All'}
                      onChange={(e) => setSelectedType(e.target.value === 'All' ? null : e.target.value)}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-roboto shadow-sm"
                    >
                      {jobTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <select
                      value={selectedDepartment || 'All'}
                      onChange={(e) => setSelectedDepartment(e.target.value === 'All' ? null : e.target.value)}
                      className="px-4 py-3 bg-white border border-slate-200 rounded-full text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 font-roboto shadow-sm"
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </div>
            <div className="text-slate-600 text-sm font-roboto min-h-[20px]">
              {!loading && <span>Showing {filteredJobs.length} of {jobs.length} roles</span>}
            </div>
          </div>

          {/* Jobs List */}
          {loading ? (
            <div className="space-y-4 sm:space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm animate-pulse">
                  <div className="h-6 w-2/3 bg-slate-100 rounded mb-3" />
                  <div className="flex gap-4 mb-4">
                    <div className="h-4 w-24 bg-slate-100 rounded" />
                    <div className="h-4 w-32 bg-slate-100 rounded" />
                    <div className="h-4 w-20 bg-slate-100 rounded" />
                  </div>
                  <div className="h-4 w-full bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                  initial={restored ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: restored ? 0.15 : 0.3, ease: 'easeOut' }}
                className={`group bg-white/70 backdrop-blur-sm border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200`}
              >
                <button
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="relative w-full p-6 sm:p-8 text-left"
                >
                  <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-b from-white to-transparent" />
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl sm:text-2xl font-medium text-slate-900 font-roboto tracking-tight">{job.title}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2 sm:gap-3 text-sm text-slate-600 mb-3 font-roboto">
                        <span className="inline-flex items-center rounded-full bg-white text-slate-700 px-3 py-1 border border-slate-200 shadow-xs">
                          {getDepartmentIcon(job.department)}
                          <span className="ml-2">{job.department}</span>
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white text-slate-700 px-3 py-1 border border-slate-200 shadow-xs">
                          <FiMapPin className="mr-2" />{job.location}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-white text-slate-700 px-3 py-1 border border-slate-200 shadow-xs">
                          <FiClock className="mr-2" />{job.type}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm sm:text-base line-clamp-2 font-roboto font-light">
                        {job.description}
                      </p>
                    </div>
                    <div className="text-slate-400 ml-4">
                      {expandedJob === job.id ? <FiChevronUp /> : <FiChevronDown />}
                    </div>
                  </div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: expandedJob === job.id ? 'auto' : 0,
                    opacity: expandedJob === job.id ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-6 bg-gradient-to-b from-white to-white/90">
                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Description</h4>
                      <p className="text-slate-600 font-roboto font-light leading-relaxed">{job.description}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Requirements</h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start text-slate-600 font-roboto font-light">
                            <span className="text-teal-600 mr-3 font-medium">•</span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-lg font-medium text-slate-900 mb-3 font-roboto">Benefits</h4>
                      <ul className="space-y-2">
                        {job.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start text-slate-600 font-roboto font-light">
                            <span className="text-teal-600 mr-3 font-medium">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`/careers/apply/${job.id}`}
                        className="inline-flex items-center justify-center px-5 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-150 font-roboto shadow-sm"
                      >
                        Apply Now
                        <FiArrowRight className="ml-2" />
                      </a>
                      <span className="text-slate-500 text-sm self-center">Posted {job.postedDate}</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-slate-600 text-lg mb-4 font-roboto">No roles found matching your filters</div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType(null);
                  setSelectedDepartment(null);
                }}
                className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-roboto font-medium"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
} 