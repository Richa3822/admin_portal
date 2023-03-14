import React from 'react'

function ImgTag(props) {
  const { imgUrl, altText, className, width } = props;
  return (
    <img className={className} width={width} src={imgUrl} alt={altText} />
  )
}

export default ImgTag
