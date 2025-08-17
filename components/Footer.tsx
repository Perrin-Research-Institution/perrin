"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import TechGrid from "@/components/TechGrid";
import { FiArrowRight, FiMail, FiSend, FiMapPin, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';
import NewsletterSubscription from "./NewsletterSubscription";

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 px-4 sm:px-6 py-12 border-t border-slate-200 overflow-hidden">
      {/* Subtle tech background */}
      <TechGrid animated={false} opacity={0.01} />
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-slate-100 pointer-events-none"></div>
      
      {/* Decorative floating shapes */}
      <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-slate-200/20 blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-64 h-64 rounded-full bg-slate-300/15 blur-3xl"></div>
      
      <div className="container mx-auto relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <div className="flex items-center mb-4">
              {/* Enhanced PERRIN logo with better visibility */}
              <div className="relative">
                <div className="absolute inset-0 bg-slate-200/20 blur-md rounded-lg"></div>
                <div className="text-2xl font-serif font-bold mr-2 relative px-3 py-1 bg-gradient-to-r from-slate-100/50 to-transparent backdrop-blur-sm border border-slate-300/20 rounded-lg">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">PERRIN</span>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-200/50 rounded-full">EST. 2023</div>
            </div>
            <p className="text-slate-600 text-sm max-w-md mb-5 font-roboto leading-relaxed">
              A think tank at the University of Virginia dedicated to advancing 
              innovative solutions for complex policy challenges in AI governance and technology policy.
            </p>
            
            {/* Newsletter subscription - Light theme */}
            <div className="flex mb-4">
              <div className="relative flex-grow">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="w-full bg-white border border-slate-300 rounded-l-lg px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500/20 font-roboto"
                />
              </div>
              <button className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-r-lg flex items-center justify-center transition-colors">
                <FiSend className="w-4 h-4" />
              </button>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-3">
              <motion.a
                href="https://www.tiktok.com/@theperrininstitution?_t=ZT-8ugIWNNxeqw&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-pink-600 transition-colors border border-slate-200 hover:border-pink-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <span className="sr-only">TikTok</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.lemon8-app.com/@theperrininstitution?_r=1&_t=MGcEDJSsUpTM0hN1%2FAEbUQRFyOmB02V%2BMIHsUs9SjlevWPuqEk4jDpyOhGEumD%2FzKwbIEmZiaU%2BM5ZGda7WkaHv6D%2B5aVD6q6JpkfVLEn0B1YoVWT5WqBBAx5G%2FEEKzHpbfZ6FdcsMKf&language=en&region=us&share_platform=copy&ui_language=en"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-yellow-600 transition-colors border border-slate-200 hover:border-yellow-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <span className="sr-only">Lemon8</span>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.45 8.19c-1.36-1.36-3.92-1.17-5.72.53l-6.18 6.18c-1.8 1.8-1.99 4.36-.63 5.72 1.36 1.36 3.92 1.17 5.72-.63l6.18-6.18c1.8-1.8 1.99-4.36.63-5.72zm-1.41 1.42c.59.59.59 1.76-.72 3.07l-6.18 6.18c-1.3 1.3-2.48 1.31-3.07.72-.59-.59-.59-1.76.72-3.07l6.18-6.18c1.3-1.3 2.47-1.31 3.07-.72zM6.6 5.89L13.07 6c.19.01.36.11.47.29l1.37 2.28 2.28 1.37c.18.11.28.28.29.47l.1 6.48c.01.17-.05.33-.16.46l-1.57 1.87c-.44.52-1.26.54-1.73.03l-8.8-9.62c-.45-.49-.37-1.26.16-1.65l1.23-.83c.13-.09.28-.14.43-.15l-.7-1.01c-.53-.77-.04-1.83.88-1.91l.18-.01c.13 0 .27.03.4.08z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/perrin-institution/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <span className="sr-only">LinkedIn</span>
                <FiLinkedin className="w-3.5 h-3.5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/perrininstit"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2, scale: 1.05 }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-600 hover:text-blue-400 transition-colors border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <span className="sr-only">Twitter</span>
                <FiTwitter className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </motion.div>
          
          <div className="md:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="col-span-1 md:col-span-2"
              >
                <h3 className="text-xs text-slate-700 mb-3 uppercase tracking-wider font-medium font-roboto">Navigation</h3>
                <div className="grid grid-cols-2 gap-x-4">
                  <ul className="space-y-2">
                    {['Home', 'Directory', 'Labs', 'News'].map((item, index) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.3 + 0.05 * index }}
                      >
                        <Link 
                          href={item === 'Home' ? '/' : 
                               item === 'Directory' ? '/experts' : 
                               item === 'Labs' ? '/Labs' : 
                               item === 'News' ? '/news' : 
                               `/${item.toLowerCase()}`}
                          className="text-slate-600 hover:text-slate-900 transition-colors flex items-center group text-sm font-roboto"
                        >
                          <motion.span 
                            className="w-0 h-px bg-slate-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                          />
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                  <ul className="space-y-2">
                    {['Events', 'Careers', 'Scholarships'].map((item, index) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.45 + 0.05 * index }}
                      >
                        <Link 
                          href={ item === 'Scholarships' ? '/scholarship-center' : `/${item.toLowerCase()}` }
                          className="text-slate-600 hover:text-slate-900 transition-colors flex items-center group text-sm font-roboto"
                        >
                          <motion.span 
                            className="w-0 h-px bg-slate-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                          />
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              {/* Removed Application links */}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <h3 className="text-xs text-slate-700 mb-3 uppercase tracking-wider font-medium font-roboto">Legal</h3>
                <ul className="space-y-2">
                  <motion.li 
                    key="privacy"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                  >
                    <Link 
                      href="/privacy-policy"
                      className="text-slate-600 hover:text-slate-900 transition-colors flex items-center group text-sm font-roboto"
                    >
                      <motion.span 
                        className="w-0 h-px bg-slate-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                      />
                      Privacy Policy
                    </Link>
                  </motion.li>
                  <motion.li 
                    key="terms"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.65 }}
                  >
                    <Link 
                      href="/terms-of-use"
                      className="text-slate-600 hover:text-slate-900 transition-colors flex items-center group text-sm font-roboto"
                    >
                      <motion.span 
                        className="w-0 h-px bg-slate-400 mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"
                      />
                      Terms of Use
                    </Link>
                  </motion.li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Bottom footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-6 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-slate-500 text-xs mb-3 md:mb-0 font-roboto">
            &copy; {new Date().getFullYear()} The Perrin Institution. All rights reserved.
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 items-center">
            <a href="mailto:contact@perrininstitution.org" className="text-slate-500 hover:text-slate-700 transition-colors text-xs font-roboto flex items-center gap-2">
              <FiMail className="w-3 h-3" />
              <span>contact@perrininstitution.org</span>
            </a>
            <div className="text-slate-500 text-xs font-roboto flex items-center gap-2">
              <FiMapPin className="w-3 h-3" />
              <span>University of Virginia</span>
            </div>
            
            {/* Subtle founders attribution */}
            <div className="text-slate-400 text-xs font-roboto">
              Founded by Finn Jarvi & Cash Hilinski
            </div>
            {/* Disclaimer that website is under maintenance */}
            <div className="text-slate-400 text-xs font-roboto">
              This website is under maintenance. Some features may not be available.
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
