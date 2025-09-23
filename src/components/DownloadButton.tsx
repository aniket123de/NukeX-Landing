"use client"

import { useEffect, useState } from "react"

interface DownloadOption {
  os: string
  arch: string
  filename: string
}

const downloadOptions: DownloadOption[] = [
  { os: "Windows", arch: "x64", filename: "nukex-windows-x64.exe" },
  { os: "Windows", arch: "x86", filename: "nukex-windows-x86.exe" },
  { os: "macOS", arch: "Intel", filename: "nukex-macos-intel.dmg" },
  { os: "macOS", arch: "Apple Silicon", filename: "nukex-macos-arm64.dmg" },
  { os: "Linux", arch: "x64", filename: "nukex-linux-x64.AppImage" },
  { os: "Linux", arch: "ARM64", filename: "nukex-linux-arm64.AppImage" },
]

export const DownloadButton = () => {
  const [selectedOption, setSelectedOption] = useState(downloadOptions[0])

  const handleDownload = () => {
    // Simulate download
    console.log(`Downloading ${selectedOption.filename}`)
    // In a real app, you'd trigger the actual download here
    alert(`Downloading ${selectedOption.filename}`)
  }

  // Prefer Windows installer if user is on Windows; otherwise choose sensible defaults
  useEffect(() => {
    if (typeof window === 'undefined') return
    const ua = window.navigator.userAgent.toLowerCase()
    const isWindows = ua.includes('windows') || ua.includes('win32')
    const isMac = ua.includes('mac os x') || ua.includes('macintosh')
    const isArm = ua.includes('arm64') || ua.includes('aarch64') || ua.includes('apple silicon')
    let preferred = downloadOptions[0]
    if (isWindows) {
      preferred = downloadOptions.find(o => o.os === 'Windows' && o.arch === 'x64') || preferred
    } else if (isMac) {
      preferred = downloadOptions.find(o => o.os === 'macOS' && (isArm ? o.arch === 'Apple Silicon' : o.arch === 'Intel')) || preferred
    }
    setSelectedOption(preferred)
  }, [])

  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Toggle dropdown
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const buttonElement = document.querySelector('.dropdown-part')
      
      // Don't close if clicking on the dropdown toggle button
      if (buttonElement && buttonElement.contains(target)) {
        return
      }
      
      setDropdownOpen(false)
    }
    
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  // Prevent dropdown from closing when clicking inside
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }
  
  // Handle direct download without showing dropdown
  const downloadDirectly = () => {
    handleDownload()
  }

  return (
    <div className="relative inline-block">
      <div className="download-button">
        <div className="flex">
          <button
            onClick={downloadDirectly}
            className="blur-button download-part"
            aria-label={`Download for ${selectedOption.os}`}
          >
            Download for {selectedOption.os}
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDropdownOpen(!dropdownOpen) // Directly toggle instead of using the function
            }}
            className="blur-button dropdown-part"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {dropdownOpen && (
          <div 
            className="dropdown-menu" 
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="download-options"
          >
            <div className="py-1">
              {downloadOptions.map((option, index) => (
                <button
                  key={index}
                  className={`dropdown-item ${selectedOption === option ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedOption(option)
                    handleDownload()
                    setDropdownOpen(false)
                  }}
                >
                  {option.os} ({option.arch})
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .download-button {
          position: relative;
          z-index: 10;
        }
        
        .blur-button {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.75rem 1rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .download-part {
          border-radius: 0.5rem 0 0 0.5rem;
          border-right: none;
        }
        
        .dropdown-part {
          border-radius: 0 0.5rem 0.5rem 0;
          padding: 0.75rem 0.5rem;
        }
        
        .blur-button:hover {
          background: rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
        
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          min-width: 14rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 50; /* Increased z-index to ensure visibility */
        }
        
        .dropdown-item {
          display: block;
          width: 100%;
          padding: 0.75rem 1rem;
          color: white;
          text-align: left;
          background: transparent;
          border: none;
          transition: background 0.15s ease;
        }
        
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        
        .dropdown-item.active {
          background: rgba(255, 255, 255, 0.15);
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}
