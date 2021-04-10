import * as React from "react"
import styled from "styled-components"

interface Props {
  /**
   * The URL for the Iframe
   */
  url: string

  /**
   * Whether the page should auto-trigger the payment form
   */
  isWanted: boolean
}

const FrameContainer = styled.div`
  position: fixed !important;
  z-index: 9999 !important;
  top: 0 !important;
  right: 0 !important;
  min-width: 100%;
  min-height: 100%;
`

const Iframe = styled.iframe`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  border: none !important;
`

const Frame = ({ url, isWanted }: Props) => {
  const urlToOpen = new URL(url)

  if (isWanted) {
   urlToOpen.searchParams.append("wanted", "true")
  }

  return (
    <FrameContainer>
      <Iframe src={urlToOpen.href} allowFullScreen={true} />
    </FrameContainer>
  )
}

export default Frame
