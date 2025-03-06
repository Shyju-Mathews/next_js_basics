import { NextResponse } from "next/server";
import connectionToDatabase from "../../../utils/connection";
import EnquiryModel from "../../../models/enquiryModel";

export const POST = async (req) => {
    try {
        await connectionToDatabase();
        const { name, email, message } = await req.json();
        const newEnquiry = new EnquiryModel({name, email, message});
        await newEnquiry.save();
        return NextResponse.json(newEnquiry, {status: 201});
    } catch (error) {
        return NextResponse.json({ message: error.message }, {status: 500})
    }
};