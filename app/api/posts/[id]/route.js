import PostModel from "../../../../models/postModel";
import connectionToDatabase from "../../../../utils/connection";


export const GET = async (req, { params }) => {
  try {
    await connectionToDatabase();
    const { id } = await params;
    const post = await PostModel.findById({ _id: id});
    return Response.json(post);
  } catch (error) {
    return Response.status(500).json({ message: error.message })
  }
};
