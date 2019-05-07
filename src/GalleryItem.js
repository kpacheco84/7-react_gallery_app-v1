import React from "react";



const GalleryItem = props => (

  //Pull in image URL

  <li className="gif-wrap">

    <img src={props.url} alt="" />

  </li>

);



export default GalleryItem;