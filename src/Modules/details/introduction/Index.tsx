import type { IIntroduction } from "@/Modules/details/introduction/introTypes";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import profilepic2 from "@/assets/icons/ChatGPT Image Aug 24, 2025, 03_42_53 PM.png";
import { Introductiondata } from "@/constants/Constant";

export const IndexPage = () => {
  return (
    <section className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-14 py-8 sm:py-14">
      {/* Intro Text Column */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center">
        {Introductiondata.map((intro: IIntroduction) => (
          <div
            key={intro.salutation}
            className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 sm:gap-6"
          >
            <motion.h1
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#DF8908] to-[#B415FF] bg-clip-text text-transparent pb-1"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7 }}
            >
              {intro.salutation}
            </motion.h1>

            <motion.h2
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-[#F7971E] to-[#FFD200] bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {intro.position}
            </motion.h2>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {intro.description}
            </motion.p>

            {/* Quick Feature Badges */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-2"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 border border-neutral-800 text-cyan-400 shadow-sm">
                🚀 Full-Stack Web & Mobile
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 border border-neutral-800 text-emerald-400 shadow-sm">
                💡 150+ DSA Problems Solved
              </span>
              <span className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-neutral-900 border border-neutral-800 text-purple-400 shadow-sm">
                ⚡ Modern APIs & Architectures
              </span>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <Link
                className="px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all transform hover:-translate-y-0.5 active:scale-95"
                to="/projects"
              >
                Explore Projects →
              </Link>
              <Link
                className="px-6 py-3 rounded-xl font-semibold text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-all transform hover:-translate-y-0.5 active:scale-95"
                to="/contact"
              >
                Contact Me
              </Link>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Profile Picture Column — 100% Uncropped with Hair Completely Visible */}
      <div className="w-full lg:w-2/5 flex justify-center items-center">
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-3xl p-1 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-transparent shadow-2xl shadow-cyan-500/10"
          initial={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
        >
          <img
            alt="Shashvat Singh profile"
            className="w-auto h-auto max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] max-w-full object-contain rounded-3xl border border-neutral-800 shadow-inner block"
            loading="eager"
            src={profilepic2}
          />
        </motion.div>
      </div>
    </section>
  );
};
