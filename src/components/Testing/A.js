import React from 'react'
import { useHistory } from "react-router-dom";
export default function A(props) {
 let handleClick=()=>{
   
  props.history.push("/dashboard");
  } 
  return (
    <div>
      <button onClick={()=>handleClick()} type="button">
          Click
        </button>
czsfds
    </div>
  )
}
