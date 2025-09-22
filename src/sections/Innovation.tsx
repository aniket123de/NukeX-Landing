"use client"

import { motion } from "framer-motion"

const innovations = [
  {
    title: "India's First Blockchain-Backed Solution",
    description: "Open, transparent, and auditable data wiping solution built for both enterprises and everyday users.",
    icon: "🔗"
  },
  {
    title: "All-in-One Platform",
    description: "Secure erasure, blockchain certificate, and third-party verification integrated seamlessly.",
    icon: "⚡"
  },
  {
    title: "One-Click & Standards-Compliant",
    description: "Simple for users, yet aligned with NIST SP 800-88 for enterprise-grade security.",
    icon: "🛡️"
  },
  {
    title: "Enabling Circular Economy",
    description: "Builds trust between users, recyclers, and regulators, driving safe IT asset reuse.",
    icon: "♻️"
  }
]

export const Innovation = () => {
  return (
    <section className="py-20 md:py-28" id="innovation">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-7xl font-medium tracking-tighter mb-6">
            Innovation & Uniqueness
          </h2>
          <p className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto">
            Revolutionary approach to e-waste data security that addresses India's 
            1.75M+ tonnes of yearly e-waste with blockchain-verified compliance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {innovations.map((innovation, index) => (
            <motion.div
              key={innovation.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-white/20 rounded-2xl p-8 bg-gradient-to-b from-white/5 to-transparent hover:from-white/10 transition-all duration-300"
            >
              <div className="text-4xl mb-4">{innovation.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {innovation.title}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {innovation.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/20 rounded-2xl p-8">
          <h3 className="text-3xl font-semibold text-center mb-6 text-white">
            Key Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">1.75M+</div>
              <div className="text-white/70">Tonnes of e-waste yearly in India</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">₹50,000</div>
              <div className="text-white/70">Crore worth of IT assets hoarded</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-white/70">Tamper-proof blockchain certificates</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
