"use client"

import avatar1 from "@/assets/avatar-1.png"
import avatar2 from "@/assets/avatar-2.png"
import avatar3 from "@/assets/avatar-3.png"
import avatar4 from "@/assets/avatar-4.png"
import Image from "next/image"
import { motion } from "framer-motion"

const testimonials = [
  {
    text: "NukeX has revolutionized our e-waste data security process. The blockchain certificates give us complete confidence in data erasure compliance.",
    name: "Raj Patel",
    title: "CTO @ GreenTech Recycling",
    avatarImg: avatar1,
  },
  {
    text: "The cross-platform compatibility is amazing. We can securely wipe data from any device - Windows, Linux, or Android - with one solution.",
    name: "Priya Sharma",
    title: "Operations Manager @ EcoWaste Solutions",
    avatarImg: avatar2,
  },
  {
    text: "NIST SP 800-88 compliance with tamper-proof certificates has made our audit processes seamless. Regulators love the transparency.",
    name: "Dr. Amit Kumar",
    title: "Compliance Head @ SecureRecycle Ltd",
    avatarImg: avatar3,
  },
  {
    text: "The offline mode for legacy devices is a game-changer. We can now handle all types of e-waste without connectivity concerns.",
    name: "Sneha Reddy",
    title: "Technical Lead @ Urban Mining Co",
    avatarImg: avatar4,
  },
]

export const Testimonials = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <h2 className="text-5xl text-center lg:text-7xl font-semibold tracking-tighter">
          Trusted by Industry Leaders
        </h2>
        <p className="text-white/70 max-w-2xl mx-auto text-center pt-5 text-lg md:text-xl tracking-tight">
          Leading recycling companies and enterprises trust NukeX for secure, 
          compliant data wiping solutions that build confidence with regulators and customers.
        </p>
        <div className="flex overflow-hidden mt-10 [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          <motion.div
            initial={{ translateX: "-50%" }}
            animate={{ translateX: "0" }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex gap-5 flex-none -translate-x-1/2 pr-5"
          >
            {/* creating an array and spreading testimonial so that it can loop basically to map testimonial twice */}
            {[...testimonials, ...testimonials].map((testimonial) => (
              <div
                key={testimonial.name}
                // flex-none esure that flex property is not determining the dimention of the element, and it is determined by whatever the explicit declaration is
                className="border border-white/15 p-6 md:p-10 lg:p-12 rounded-xl bg-[linear-gradient(to_bottom_left,rgb(140,69,255,.3),black)] max-w-xs md:max-w-md lg:max-w-lg mx-auto flex-none"
              >
                <div className="text-xl tracking-tight">{testimonial.text}</div>
                <div className="flex items-center gap-3 mt-5">
                  <Image
                    src={testimonial.avatarImg}
                    alt={`Avatar of ${testimonial.name}`}
                    className="rounded-xl h-11 w-11 grayscale border border-white/80"
                  />

                  <div>
                    <p className="text-sm font-semibold">{testimonial.name}</p>
                    <p className="font-light">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
