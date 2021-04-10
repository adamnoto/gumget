import * as React from "react"
import styled from "styled-components"

interface Props {
  /**
   * The URL for the Iframe
   */
  url: string
}

const Iframe = styled.iframe`
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  border: none !important;
`

const Frame = ({ url }: Props) => {
  return (
    <>
      <Iframe src={url} allowFullScreen={true} />
    </>
  )
}

export default Frame
