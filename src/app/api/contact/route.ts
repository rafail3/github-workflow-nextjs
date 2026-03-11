import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type ContactMessage = {
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "data", "messages.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    const fileContent = await fs.readFile(filePath, "utf-8");
    const messages: ContactMessage[] = JSON.parse(fileContent);

    messages.push(newMessage);

    await fs.writeFile(filePath, JSON.stringify(messages, null, 2), "utf-8");

    return NextResponse.json(
      { message: "Message received successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("CONTACT API ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unknown server error.",
      },
      { status: 400 }
    );
  }
}