import React from 'react'
import img from "../assets/loading.gif"

const Loader = () => {
  return (
    <div style={{width: "100%", height:"100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <img src={img} alt="Loading" />
    </div>
  )
}

export default Loader