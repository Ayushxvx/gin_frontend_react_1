import React from "react"
import { useState,useEffect } from "react"

export default function App(){
  
  const [posttitle, setTitle] = useState("");
  const [postcontent, setContent] = useState("");
  const [error, setError] = useState(null);
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    async function func() {
       let response = await fetch("https://gin-backend-2.onrender.com")
    let data = await response.json()
    setPosts(data) 
    console.log(posts)
    }
    func();
  },[])

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!posttitle.trim() || !postcontent.trim()) {
      setError("Both title and content are required.");
      return;
    }

    let response = await fetch("https://gin-backend-2.onrender.com/addpost",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({title:posttitle,
        content:postcontent
      })
    })

    let data = await response.json();
    setPosts([...posts,data])

    setTitle("");
    setContent("");
    setError(null);
  };
  return(
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-gray-100 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Add Post Form */}
        <form
          onSubmit={handleAddPost}
          className="bg-gray-800 rounded-lg p-6 shadow-lg mb-10"
        >
          <h2 className="text-3xl font-bold mb-6 text-purple-400 drop-shadow-md">
            Add New Post
          </h2>

          {error && (
            <div className="mb-4 text-red-400 font-semibold">{error}</div>
          )}

          <label className="block mb-2 font-semibold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={posttitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post title"
            className="w-full p-3 mb-6 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <label className="block mb-2 font-semibold" htmlFor="content">
            Content
          </label>
          <textarea
            id="content"
            rows={5}
            value={postcontent}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post content here..."
            className="w-full p-3 mb-6 rounded-md bg-gray-700 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-bold shadow-lg transition"
          >
            Add Post
          </button>
        </form>

        <section className="text-white">
          <h2 className="text-3xl font-extrabold mb-8 text-purple-400 drop-shadow-md">
            All Posts
          </h2>

          {posts.length === 0 ? (
            <p className="text-gray-400 text-center">No posts available.</p>
          ) : (
            <div className="space-y-8">
              {posts.map(({ id, title, content, created_at }) => (
                <article
                  key={id}
                  className="bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 p-6 rounded-xl shadow-xl hover:shadow-purple-600 transition"
                >
                  <header>
                    <h3 className="text-2xl font-bold mb-2">{title}</h3>
                    <span
                      className="text-sm italic text-indigo-300"
                    >
                      {created_at}
                    </span>
                  </header>
                  <p className="mt-4 text-gray-300 whitespace-pre-line">{content}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
    </>
  )
}
