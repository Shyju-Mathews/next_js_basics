import connectionToDatabase from "../../../utils/connection";
import PostModel from '../../../models/postModel';
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectionToDatabase();
    const posts = await PostModel.find({});
    return Response.json(posts);
  } catch (error) {
    return Response.status(500).json({ message: error.message })
  }
};


export const POST = async (req) => {
    try {
        await connectionToDatabase();
        const { title, description, image } = await req.json();
        const newPost = new PostModel({title, description, image});
        await newPost.save();
        return NextResponse.json(newPost, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: error.message }, {status: 500})
    }
};
