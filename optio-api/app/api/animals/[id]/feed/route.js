import connectMongoDB from "@/app/lib/mongodbConnection";
import { NextResponse } from "next/server";
import Animal from "../../../../lib/models/animal";

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    //const requestData = await request.json();
    await connectMongoDB();
    const updatedUser = await Animal.findOneAndUpdate(
      { _id: id },
      { $inc: { creditCount: 1 } },
      { returnDocument: "after" }
    );
    
    return NextResponse.json({
      animal: updatedUser,
      message: "Credit count updated successfully",
      status: 200
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Failed to update credit count",
      status: 500
    }
    );
  }
}
