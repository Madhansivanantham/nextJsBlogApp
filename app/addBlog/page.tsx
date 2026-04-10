"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: '',
    tag: '',
    readTime: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.refresh();
        router.push('/');
      } else {
        alert('Error adding post');
      }
    } catch (error) {
      console.error(error);
      alert('Error adding post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-1 px-6 py-10  min-h-screen">

        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm">

          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Create New Post
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Title */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Excerpt</label>
              <input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm text-gray-600 mb-1">Content</label>
              <textarea
                name="content"
                rows={6}
                value={formData.content}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
            </div>

            {/* Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Author</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Tag</label>
                <input
                  type="text"
                  name="tag"
                  value={formData.tag}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Read Time</label>
                <input
                  type="text"
                  name="readTime"
                  value={formData.readTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition"
            >
              Publish Blog
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}