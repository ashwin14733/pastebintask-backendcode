import React, { useState } from 'react'
import axios from "axios"
const CreatePage = () => {

  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [maxViews, setMaxViews] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const createPaste = async ()=>{
    setError("");
    setUrl("");

    if(!content.trim()){
      setError("Contenet is Required here...");
      return;
    }

    const body = {
      content, 
      ...(ttl && { ttl_seconds : Number(ttl)}),
      ...(maxViews && {max_views : Number(maxViews)}),
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/pastes`,{ method: "POST", headers : { "Content-Type" : "application.json" }, body : JSON.stringify(body)});
      
      const data = await res.json();

      if(!res.ok){
        setError(data.error || "Something went Wrong...");
        return
      }
      setUrl(data.url);
      setContent("");
      setTtl("");
      setMaxViews("");
    
    } catch{
      setError("Server Unreachable...");
    }
  }

  return (
    <div>
      {/* Createpaste component */}
        <div>
          <h2>Create Paste Page</h2>
          <textarea rows={6} placeholder='Enter your text here...' value={content} onChange={(e)=>setContent(e.target.value)}></textarea>
          <input type="number" placeholder='Enter TTL_Seconds here...'  value={ttl} onChange={(e)=>setTtl(e.target.value)}/>
          <input type="number" placeholder='Enter the Max_views here...' value={maxViews} onChange={(e)=>setMaxViews(e.target.value)} />
          <button onClick={createPaste}>Create</button>
          {url && (<p>Share Link : <a href={url}>{url}</a></p>)}
          {error && <p style={{color:"red"}}>{error}</p>}

        </div>
    </div>
  )
}

export default CreatePage
