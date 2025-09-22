import LogoIcon from "@/assets/logo.svg"
import XSocial from "@/assets/social-x.svg"
import INstaSocial from "@/assets/social-instagram.svg"
import YTSocial from "@/assets/social-youtube.svg"

export const Footer = () => {
  return (
    <footer className="py-5 border border-t border-white/15">
      <div className="container">
        {/* main wrapping div */}
        <div className="flex flex-col gap-y-8 lg:items-center lg:flex-row justify-between">
          {/* left or top div */}
          <div className="flex gap-x-5 items-center">
            <div className="">
              <LogoIcon className="h-8 w-8  border border-white/20 rounded-lg " />
            </div>
            <p className="font-medium">NukeX</p>
          </div>
          {/* middle div */}
          <div className="flex flex-col lg:flex-row gap-x-8 ">
            <a
              href="#features"
              className=" text-xs md:text-sm text-white/70 hover:text-white py-2 md:py-4"
            >
              Features
            </a>
            <a
              href="#solution"
              className=" text-xs md:text-sm text-white/70 hover:text-white py-2 md:py-4"
            >
              Solution
            </a>
            <a
              href="#security"
              className=" text-white/70 hover:text-white py-2 md:py-4"
            >
              Security
            </a>
            <a
              href="#recycling"
              className=" text-xs md:text-sm text-white/70 hover:text-white py-2 md:py-4"
            >
              Recycling
            </a>
            <a
              href="#compliance"
              className=" text-xs md:text-sm text-white/70 hover:text-white py-2 md:py-4"
            >
              Compliance
            </a>
          </div>
          {/* right or bottom div */}
          <div className="flex gap-x-8">
            <XSocial className="text-white/30 hover:text-white transition" />
            <INstaSocial className="text-white/30 hover:text-white transition" />
            <YTSocial className="text-white/30 hover:text-white transition" />
          </div>
        </div>
      </div>
    </footer>
  )
}
