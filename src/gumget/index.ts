/**
 * All configurations for the Gumget
 */
interface GumgetConfig {
  readonly domains: string[]
}

interface IGumget {
  config: GumgetConfig | null
  iframe: HTMLIFrameElement | null
  init: (config: GumgetConfig) => void
}

const Widget: IGumget = {
  config: null,
  iframe: null,

  init(config: GumgetConfig) {
    this.config = config
  }
}

export default Widget
