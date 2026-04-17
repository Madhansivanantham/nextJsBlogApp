// import connectDB from "@/lib/mongodb";
// import Post from "@/models/Post";
// import { NextRequest, NextResponse } from "next/server";

// export async function DELETE(
//     req: NextRequest,
//     context: { params: { id: string } | Promise<{ id: string }> }
// ) {
//     await connectDB();
//     const { id } = (await context.params) as { id: string };
//     try {
//         const deletedPost = await Post.findByIdAndDelete(id);

//         if (!deletedPost) {
//             return NextResponse.json(
//                 { message: "Post not found" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { message: "Post deleted successfully" },
//             { status: 200 }
//         );
//     } catch (error) {
//         return NextResponse.json(
//             { message: "Error deleting post" },
//             { status: 500 }
//         );
//     }
// }
