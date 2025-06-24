'use client';
import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { getToken } from '@/lib/auth';
import { motion, AnimatePresence } from 'framer-motion';

export default function CreatePostPopup({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  async function handlePost(e: React.FormEvent) {
    e.preventDefault();
    try {
      await api.post('/post', { title, content }, {
        headers: { Authorization: `Bearer ${getToken()}` }
      });
      onClose();
      window.location.reload();
    } catch (err) {
      alert('Failed to post');
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <motion.div
          ref={modalRef}
          className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md sm:max-w-lg md:max-w-xl"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Create New Post</h2>
          <form onSubmit={handlePost} className="space-y-3">
            <input
              className="block w-full p-2 border rounded-md"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
            <textarea
              className="block w-full p-2 border rounded-md resize-none h-32"
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
              >
                Post
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
