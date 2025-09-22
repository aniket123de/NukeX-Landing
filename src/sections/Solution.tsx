"use client"

import { motion } from "framer-motion"

const solutionFeatures = [
  {
    title: "Cross-Platform Tool",
    description: "Windows, Linux, Android",
    details: "Universal compatibility ensures no device is left behind in your e-waste processing workflow."
  },
  {
    title: "One-Click Erasure",
    description: "Simple, user-friendly interface",
    details: "Intuitive design makes secure data wiping accessible to both technical and non-technical users."
  },
  {
    title: "Complete Wipe",
    description: "HPA/DCO, SSD sectors, hidden storage",
    details: "Comprehensive erasure covers all storage areas including hidden partitions and secure zones."
  },
  {
    title: "Blockchain Certificate",
    description: "PDF + JSON, digitally signed",
    details: "Immutable proof of erasure with cryptographic signatures for legal and regulatory compliance."
  },
  {
    title: "Offline Mode",
    description: "Bootable ISO/USB for legacy devices",
    details: "Works without internet connectivity, perfect for air-gapped systems and older hardware."
  },
  {
    title: "Standards-Compliant",
    description: "NIST SP 800-88 aligned",
    details: "Meets international standards for secure data destruction in enterprise environments."
  }
]

export const Solution = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-transparent to-purple-900/10" id="solution">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 mb-6">
            <span className="text-2xl">🔧</span>
            <span className="text-white/80 font-medium">Proposed Solution</span>
          </div>
          <h2 className="text-5xl lg:text-7xl font-medium tracking-tighter mb-6">
            Complete Data Wiping Platform
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            A comprehensive solution that addresses every aspect of secure data erasure, 
            from execution to verification, built for India's e-waste ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {solutionFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-white/20 rounded-xl p-6 bg-gradient-to-b from-white/5 to-transparent hover:from-white/10 transition-all duration-300 group"
            >
              <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-purple-300 font-medium mb-3">
                {feature.description}
              </p>
              <p className="text-white/70 text-sm leading-relaxed">
                {feature.details}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-white/20 rounded-2xl p-8">
          <h3 className="text-3xl font-semibold text-center mb-8 text-white">
            Solution Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🖥️</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">User Interface Layer</h4>
              <p className="text-white/70 text-sm">
                One-click app for Windows, Linux, or Android with 2FA login and OTP authentication
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔗</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">Blockchain Layer</h4>
              <p className="text-white/70 text-sm">
                Immutable hash storage with certificate generation and third-party auditor integration
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h4 className="text-xl font-semibold mb-2 text-white">Verification Layer</h4>
              <p className="text-white/70 text-sm">
                Validate certificates, query blockchain, and generate verified audit reports
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
