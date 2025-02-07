export const GET = async (req) => {
    const type = req.nextUrl.searchParams.get('type');
    console.log("type", type)
    return Response.json([
        {id: 1, name: "Shyju"},
        {id: 2, name: "mathews"},
    ])
}

// export async function GET (req) {
//     const type = req.nextUrl.searchParams.get('type');
//     console.log("type", type)
//     return Response.json([
//         {id: 1, name: "Shyju"},
//         {id: 2, name: "mathews"},
//     ])
// }


export const POST = async (req) => {
    const body =  await req.json();
    console.log("req body", body)
    return Response.json({data: body, msg: "Post success"})
}