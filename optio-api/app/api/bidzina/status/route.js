import connectMongoDB from "../../../lib/mongodbConnection";
import { NextResponse } from "next/server";
import PigStatus from "../../../lib/models/pigStatus";


export async function GET() {
  try {
    await connectMongoDB();
    const pigStatus = await PigStatus.find();
    return NextResponse.json(pigStatus);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Failed to retrieve pig's statuses",
        status: 500
      }
    );
  }
}
