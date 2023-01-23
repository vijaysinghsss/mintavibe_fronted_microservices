import React from 'react'

function SubscribeBox() {
  return (
    <div className="newsletter-box">
             <h4>Be Informed On Our Next NFTs</h4>
             <p style={{maxWidth:"320px", margin:"0 auto"}}>Enter your email address to register to our
                newsletter subscription</p>

             <form style={{marginBottom: "30px;", action:"", method:"post", id:"mc-embedded-subscribe-form" ,name:"mc-embedded-subscribe-form", className:"validate", target:"_blank", noValidate:""}}>


                <input className="FieldInput" id="" type="text" placeholder="Email Address" name="mail" required=""/>

                <input id="" className="Submitbtn" type="submit" value="Subscribe" />

            </form>
        
        </div>
  )
}

export default SubscribeBox