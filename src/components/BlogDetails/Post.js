import React from 'react'

function Post(props) {
  return (
      <div className="post">
            <div className="post-img"><img src={props.img} /></div>
            <div className="post-text">
                <p><b>{props.title}</b></p>
                <p>{props.body}</p>
               
            </div>

         </div>
  )
}

export default Post