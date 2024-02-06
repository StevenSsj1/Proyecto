// api/upload.js
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from "next/server"
import { writeFile } from 'fs/promises';

export async function POST (request) {
    const data = await request.formData();
    console.log(data.get("file").name)
    const bytes = await data.get("file").arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filepath = path.join(process.cwd(), "public/colaboraciones", data.get("file").name);
    console.log(filepath)
    await writeFile(filepath, buffer)
  

    return NextResponse.json("Imagen subida")
}