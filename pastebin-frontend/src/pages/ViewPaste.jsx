import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const ViewPaste = () => {

  const { id } = useParams();
  const [content, setContent] = useState("Loading...");
  const [error, setError] = useState("");

  useEffect(()=>{
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pastes/${id}`).then((res)=>{ if(!res.ok) throw new Error(); return res.json(); }).then((data)=>setContent(data.content)).catch(()=>setError("Paste not found or expired..."))
  },[id])

  if(error)
    return <h3>{error}</h3>

  
  return (
    <div>
      {/* ViewPaste Component */}
    </div>
  )
}

export default ViewPaste
