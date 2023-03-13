import React from 'react'
import ImgTag from '../atoms/ImgTag';

function SocialIcon(props) {
    const {divClass,imgClass, urlArr} =props;
  return (
    <div className={divClass}>
      { urlArr.map((image,i)=>{
        console.log("image",image)
        return (<ImgTag className={imgClass} imgUrl={`/assets/images/${image}`} altText={image} key={i}/>)
      }) }
    </div>
  )
}

export default SocialIcon
