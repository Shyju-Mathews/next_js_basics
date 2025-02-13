"use client"
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PostsObject } from "./types";



export default function Home() {
  const [posts, setPosts] = useState<PostsObject | any>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState(false)
  const inputRef = useRef<string | any>("");

  const getPosts = async (signal: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        signal,
      });
      const data = await res.json();
      setPosts(data);
    } catch (error: any) {
      console.error(error.message)
    }
  }

  useEffect(() => {

    const controller = new AbortController();
    const signal = controller.signal;
    getPosts(signal);
    

    // return(() => {
    //   controller.abort();
    // })
  }, [])

  const searchPost = async () => {
    try {
      setSearch(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts?q=${inputRef.current.value}`);
      const data = await res.json();
      setPosts(data);
      setSearch(false);
      // inputRef.current.value = "";
    } catch (error: any) {
      console.error(error.message)
    }
  }

  
  return (
    // <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    //   <h1 className="text-black font-bold text-3xl">My Next Js APP</h1>
    //   <div className="mt-5 w-full flex flex-row justify-center gap-5">
    //     <button className="border-[2px] border-red-500 rounded p-1 w-52"><Link href="/dashboard">Dashboard</Link></button>
    //     <button className="border-[2px] border-red-500 rounded p-1 w-52"><Link href="/profile">Profile</Link></button>
    //   </div>
    // </div>
    <>
    <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main>
    <div className="flex justify-end px-4 mb-2">
        <input type="text" className="px-4 py-2 border border-gray-300 rounded-md" placeholder="Search..." /* value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} */ ref={inputRef} />
        <button onClick={searchPost} disabled={search} className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4">{search ? "..." : "Search"}</button>
      </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {posts.map((post: PostsObject) => (
      <Link href={`/post/${post._id}`} key={post._id}>
      <div className="border rounded-2xl border-gray-200 p-4 bg-gray-200">
      <img className="w-full h-48 object-contain mb-4" /*src="https://picsum.photos/200" */ src={post.image} alt="Post Image"/>
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600">{post.short_desc}</p>
    </div>
    </Link>
    ))}
    {inputRef.current.value && posts.length === 0 && <p>No posts avilable for this query <b>{inputRef.current.value}</b></p>}
        {/* <div className="border border-gray-200 p-4">
          <img className="w-full h-48 object-cover mb-4" src="https://picsum.photos/200" alt="Post Image"/>
          <h2 className="text-xl font-semibold mb-2">Post Title 2</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="border border-gray-200 p-4">
          <img className="w-full h-48 object-cover mb-4" src="https://picsum.photos/200" alt="Post Image"/>
          <h2 className="text-xl font-semibold mb-2">Post Title 3</h2>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div> */}
    </div>
    </>
  );
}
