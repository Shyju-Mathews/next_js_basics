"use client"
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Post = () => {
    const {id} = useParams();

    // const {id} = React.use(params);
    const [post, setPost] = useState(null);


      const getPost = async () => {
        let isMounted = true;  // Track whether the component is mounted
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
          const data = await res.json();
          if (isMounted) {
            setPost(data); // Only set state if the component is still mounted
          }
        } catch (error) {
          console.error(error.message);
        }
        return () => {
          isMounted = false; // Cleanup function to mark the component as unmounted
        };
      };
    
      useEffect(() => {
        getPost();
      }, []);


    return <>
            {post && <main className="container mx-auto px-4 py-6">
                <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
                <p className="text-gray-500">Published on {post.created_at_formatted}</p>
                <img width={300} height={200} src={post.image} alt="Post Image" className="my-4" />
                <p>{post.description}</p>
            </main>
            }
            {/* <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Blog Post Title is {id}</h2>
        <p className="text-gray-500">Published on January 1, 2022</p>
        <img src="https://picsum.photos/200" alt="Post Image" className="my-4"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    </main> */}
    </>
    
            
}

export default Post;