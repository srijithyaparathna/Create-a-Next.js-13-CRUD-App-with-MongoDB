import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// For PUT (Update Topic)
export async function PUT(request, { params }) {
  try {
    const { id } = await params; // Ensure params are awaited

    // Destructure request data
    const { title, description } = await request.json();  // Ensure the request body is parsed correctly

    // Ensure the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    // Connect to MongoDB
    await connectMongoDB();

    // Update the topic using the correct 'id'
    const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

    // Check if the topic was found and updated
    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Topic updated", topic: updatedTopic }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// For GET (Get Topic by ID)
export async function GET(request, { params }) {
  try {
    const { id } = await params;  // Ensure params are awaited

    // Ensure the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid ID format" }, { status: 400 });
    }

    await connectMongoDB();

    // Find the topic by its ID
    const topic = await Topic.findById(id);  // Using findById for clarity

    if (!topic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ topic }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
