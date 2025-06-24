'use client'
import { useEffect, useState } from 'react'
import { Search, Filter } from 'lucide-react'
import api from '@/lib/api'
import Header from '@/components/Header'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [authorId, setAuthorId] = useState('')

  async function fetchPosts(author?: string) {
    const res = await api.get('/posts' + (author ? `?author=${author}` : ''))
    setPosts(res.data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <Header />
      <main className="p-4 sm:p-6">
        {/* Title and Filter */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <h1 className="text-2xl font-bold">All Blog Posts</h1>

          <div className="flex flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                className="pl-9 pr-2 py-2 border rounded w-full text-sm"
                placeholder="Filter by Author ID"
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}/>
            </div>

            <button
              onClick={() => fetchPosts(authorId)}
              className="flex items-center justify-center gap-1 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm">
              <Filter size={16} color="white" fill="white" /> 
            </button>
          </div>
        </div>

        {/* Posts */}
        <ul className="space-y-4">
          {posts.map((post: any) => (
            <li key={post._id} className="border p-4 rounded bg-white shadow-sm">
              <h2 className="font-semibold text-lg line-clamp-1">{post.title}</h2>
              <p className="text-sm mt-1 line-clamp-2">{post.content}</p>
              <small className="text-gray-500 block mt-2">Author: {post.authorId}</small>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
