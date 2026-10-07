import React from 'react'

import img from "../assets/not-found.gif"
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{width: "100%", height: "100vh"}}>
        <div style={{width: "100%", height:"100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <img src={img} alt="Not Found" style={{position: "relative", bottom: "5rem", marginBottom: "3rem"}} />

            <div className="text-center" style={{position: "relative", bottom: "5rem"}}>
                <Link className="btn btn-danger btn-sm" to="/">
                    Back to Homepage
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NotFound