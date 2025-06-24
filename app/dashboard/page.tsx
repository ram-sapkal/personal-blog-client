'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken } from '@/lib/auth';
import api from '@/lib/api';
import Link from 'next/link';
import CreatePostPopup from '@/components/CreatePostPopup';

export default function DashboardPage() {
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!getToken()) {
      router.push('/login');
    } else {
      api.get('/posts', {
        headers: { Authorization: `Bearer ${getToken()}` }
      }).then(res => {
        const token = getToken();
        let userId: string | undefined;
        if (token) {
          const payload = token.split('.')[1];
          if (payload) {
            try {
              userId = JSON.parse(atob(payload)).id;
            } catch {
              userId = undefined;
            }
          }
        }
        setMyPosts(res.data.filter((p: any) => p.authorId === userId));
      });
    }
  }, []);

  function handleLogout() {
    clearToken();
    router.push('/login');
  }

  return (
    <>
      <header className="bg-gray-900 text-white px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center flex-wrap gap-2">
        <Link href="/" className="text-lg sm:text-xl font-semibold">
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="text-sm sm:text-base underline px-3 py-1 rounded-full hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
        >
          Logout
        </button>
      </header>

      <main className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <h2 className="text-lg sm:text-xl font-bold">My Posts</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 text-sm sm:text-base rounded hover:bg-blue-700 transition"
          >
            + New Post
          </button>
        </div>

        {myPosts.length > 0 ? (
          <ul className="space-y-4">
            {myPosts.map((post: any) => (
              <li key={post._id} className="border p-4 rounded shadow-sm bg-white">
                <h3 className="font-semibold text-base sm:text-lg mb-1 line-clamp-1">{post.title}</h3>
                <p className="text-sm sm:text-base text-gray-700 line-clamp-2">{post.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center mt-8">{`You haven't created any posts yet.`}</p>
        )}
      </main>

      {showModal && <CreatePostPopup onClose={() => setShowModal(false)} />}
    </>
  );
}
