import * as React from "react"
import { render } from "react-dom"
import Frame from "./Frame"

const isDev = process.env.NODE_ENV === 'development';

/**
 * All configurations for the Gumget
 */
interface GumgetConfig {
  /**
   * List of all URL substrings that the Gumget will be interested in converting
   * from pure links to Gumget links
   */
  domains: string[]
}

interface IGumget {
  config: GumgetConfig | null
  iframeContainer: HTMLDivElement | null

  /**
   * Used to initialize and setup Gumget. After the initial setup
   * process, it will scan for Gumroad links. Those links will be
   * modified so that when the user click on those links, the content
   * will be displayed on an IFrame.
   */
  init: (config: GumgetConfig) => void

  /**
   * Transform every found links on the page that can be turned into
   * Gumget links
   */
  transform: () => void

  /**
   * Scan all anchor links in teh DOM that can be turned into Gumget links
   */
  scanLinks: () => HTMLAnchorElement[]

  /**
   * Open a given URL in a Gumget Iframe. If such Iframe is already present
   * in the document, Gumget will close/remove previous Iframe from the DOM
   */
  openFrame: (url: string) => void

  /**
   * Add CSS for styling the Gumget links
   */
  addStyles: () => void
}

const Widget: IGumget = {
  config: null,
  iframeContainer: null,

  init(config: GumgetConfig) {
    this.config = Object.assign({}, config)

    if (!this.config.domains || this.config.domains.length === 0) {
      this.config.domains = ["gumroad.com/l"]
    }

    this.addStyles()
    this.transform()
  },

  scanLinks() {
    if (!this.config) {
      throw Error("Please init() Gumget first")
    }

    const allLinks = document.querySelectorAll("a")
    let eligibleLinks: HTMLAnchorElement[] = []

    this.config.domains.forEach(domain => {
      allLinks.forEach(link => {
        if (link.href.includes(domain)) {
          eligibleLinks.push(link)
        }
      })
    })

    if (isDev) {
      console.info("Following links are going to be transformed by Gumget", eligibleLinks)
    }

    return eligibleLinks
  },

  transform() {

    this.scanLinks().forEach(link => {
      const gumroadLogo = document.createElement("span")
      gumroadLogo.setAttribute("class", "gumroad-button-logo")
      link.prepend(gumroadLogo)

      link.setAttribute("class", "gumroad-button")

      link.onclick = (e) => {
        e.preventDefault()
        this.openFrame(link.href)
      }
    })
  },

  openFrame(url: string) {
    if (this.iframeContainer) {
      this.iframeContainer.parentNode?.removeChild(this.iframeContainer)
    }

    this.iframeContainer = document.createElement("div")
    document.body.appendChild(this.iframeContainer)
    render(<Frame url={url}/>, this.iframeContainer)
  },

  addStyles() {
    const style = document.createElement("style")
    style.innerHTML = `
      a.gumroad-button {
        background-color: white !important;
        background-image: url("https://gumroad.com/button/button_bar.jpg") !important;
        background-repeat: repeat-x !important;
        border-radius: 4px !important;
        box-shadow: rgba(0, 0, 0, 0.4) 0 0 2px !important;
        color: #000 !important;
        display: inline-block !important;
        font-family: -apple-system, ".SFNSDisplay-Regular", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
        font-size: 16px !important;
        font-style: normal !important;
        font-weight: 500 !important;
        line-height: 50px !important;
        padding: 0 15px !important;
        text-shadow: none !important;
        text-decoration: none !important;
      }

      a.gumroad-button:hover {
        box-shadow: 0 2px 3px rgba(0,0,0,.3)!important;
      }

      .gumroad-button-logo {
        background-image: url("https://gumroad.com/button/button_logo.png") !important;
        background-size: cover !important;
        height: 17px !important;
        width: 16px !important;
        display: inline-block !important;
        margin-bottom: -3px !important;
        margin-right: 15px !important;
      }
    `

    document.body.appendChild(style)
  }
}

export default Widget
