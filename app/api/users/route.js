import { NextResponse } from "next/server";
import UserModel from "../../../models/userModel";
import connectionToDatabase from "../../../utils/connection"

export const GET = async () => {
    try {
        await connectionToDatabase();
        const users = await UserModel.find({});
        return Response.json(users);
    } catch (error) {
        return Response.status(500).json({ message: error.message })
    }
};

export const POST = async (req) => {
    try {
        await connectionToDatabase();
        const { name, email } = await req.json();
        const newUser = new UserModel({name, email});
        await newUser.save();
        return NextResponse.json(newUser, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: error.message }, {status: 500})
    }
};