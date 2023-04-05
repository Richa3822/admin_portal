import React from 'react'

function ImgTag(props) {
  const { imgUrl, altText, className, width,onclick } = props;
  return (
    <img className={className} width={width} src={imgUrl} alt={altText} onClick={onclick} />
  )
}

export default ImgTag
