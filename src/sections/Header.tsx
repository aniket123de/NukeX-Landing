import LogoIcon from "@/assets/logo.svg"
import MenuIcon from "@/assets/icon-menu.svg"

export const Header = () => {
  return (
    <header className="py-4 border-b border-white/15 md:border-none sticky top-0 z-10 ">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border rounded-lg border-white/15  md:py-2.5 md:px-5 max-w-2xl mx-auto relative ">
          <div className="hidden md:block absolute inset-0 backdrop-blur -z-10 "></div>
          <div>
            {/* To make the border of the Logo inline-flex to make it in center aligfned with Logo */}
            <div className="border h-10 w-10 rounded-xl border-white/15 inline-flex justify-center items-center">
              <LogoIcon className="h-8 w-8" />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-sm ">
              <a
                className="text-white/70 hover:text-white hover:y-10 transition "
                href="#features"
              >
                Features
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#solution"
              >
                Solution
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#security"
              >
                Security
              </a>
              <a
                className="text-white/70 hover:text-white transition "
                href="#recycling"
              >
                Recycling
              </a>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <button className="relative py-2 px-4 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] hidden md:block">
              <div className="absolute inset-0">
                <div className="border rounded-lg border-white/20 absolute inset-0"></div>
              </div>
              <span>Download</span>
            </button>
            <MenuIcon className="md:hidden" />
          </div>
        </div>
      </div>
    </header>
  )
}
