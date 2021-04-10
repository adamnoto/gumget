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
  iframe: HTMLIFrameElement | null

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
  transform: () => void,

  /**
   * Scan all anchor links in teh DOM that can be turned into Gumget links
   */
  scanLinks: () => HTMLAnchorElement[]
}

const Widget: IGumget = {
  config: null,
  iframe: null,

  init(config: GumgetConfig) {
    this.config = Object.assign({}, config)

    if (!this.config.domains || this.config.domains.length === 0) {
      this.config.domains = ["gumroad.com/l"]
    }

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
      link.onclick = (e) => {
        e.preventDefault()
        alert("Hey, I am clicked")
      }
    })
  }
}

export default Widget
