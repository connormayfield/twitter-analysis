import React from "react"
import {Link} from "react-router-dom"

export function Navbar({props}){

    return (<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
    <Link className="navbar-brand" to="/"><span style={{display:"inline-block", width:"60px"}}></span><span style={{"font-size":"25px", "color":"white"}}>TweetTrace</span></Link>
    {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> */}
    
  </nav>
  )
}

export default Navbar