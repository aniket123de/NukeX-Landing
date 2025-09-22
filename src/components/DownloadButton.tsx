"use client"

import { useState } from "react"

interface DownloadOption {
  os: string
  arch: string
  filename: string
}

const downloadOptions: DownloadOption[] = [
  { os: "Windows", arch: "x64", filename: "nukex-windows-x64.exe" },
  { os: "Windows", arch: "x86", filename: "nukex-windows-x86.exe" },
  { os: "Linux", arch: "x64", filename: "nukex-linux-x64.AppImage" },
  { os: "Linux", arch: "ARM64", filename: "nukex-linux-arm64.AppImage" },
  { os: "Android", arch: "ARM64", filename: "nukex-android.apk" },
  { os: "Android", arch: "x86", filename: "nukex-android-x86.apk" },
]

export const DownloadButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(downloadOptions[0])

  const handleDownload = () => {
    // Simulate download
    console.log(`Downloading ${selectedOption.filename}`)
    // In a real app, you'd trigger the actual download here
    alert(`Downloading ${selectedOption.filename}`)
  }

  return (
    <div className="relative inline-block">
      {/* Main Download Button with Animation */}
      <div className="flex">
        <button
          onClick={handleDownload}
          className="download-button relative overflow-hidden flex items-center border border-[#17795E] bg-[#209978] hover:bg-[#17795E] transition-all duration-300 rounded-l-lg group"
          style={{ width: '220px', height: '50px' }}
        >
          <span className="button__text text-white font-semibold transition-all duration-300 transform translate-x-6 group-hover:text-transparent">
            Download {selectedOption.os}
          </span>
          <span className="button__icon absolute right-0 h-full w-12 bg-[#17795E] flex items-center justify-center transition-all duration-300 group-hover:w-full group-hover:-translate-x-0 group-active:bg-[#146c54]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="w-5 h-5 fill-white">
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
            </svg>
          </span>
        </button>
        
        {/* Dropdown Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative h-[50px] px-3 bg-[#209978] hover:bg-[#17795E] border border-l-0 border-[#17795E] rounded-r-lg transition-all duration-300 active:border-[#146c54]"
        >
          <svg
            className={`w-4 h-4 text-white transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Content */}
          <div className="absolute top-full left-0 mt-2 w-80 bg-black/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl z-50 overflow-hidden">
            <div className="p-2">
              <div className="text-sm text-white/60 px-3 py-2 font-medium">Select Platform & Architecture</div>
              {downloadOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedOption(option)
                    setIsOpen(false)
                  }}
                  className={`w-full text-left px-3 py-3 rounded-md hover:bg-[#209978]/20 transition-all duration-200 flex justify-between items-center group ${
                    selectedOption.filename === option.filename ? 'bg-[#209978]/30 border border-[#17795E]/50' : ''
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-white font-medium group-hover:text-[#209978] transition-colors">
                      {option.os}
                    </span>
                    <span className="text-sm text-white/60">
                      {option.arch} Architecture
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40 font-mono">
                      {option.filename}
                    </span>
                    {selectedOption.filename === option.filename && (
                      <div className="w-2 h-2 bg-[#209978] rounded-full"></div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            {/* File Info Footer */}
            <div className="border-t border-white/10 p-3 bg-black/50">
              <div className="text-xs text-white/50 text-center">
                Cross-platform • Offline capable • NIST SP 800-88 compliant
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
