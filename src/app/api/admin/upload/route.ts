import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import dbConnect from '@/lib/dbConnect';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

async function uploadFileToCloudinary(file: File) {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: 'auto',
    }, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    }).end(bytes);
  });
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ message: "No files to upload." }, { status: 400 });
    }
    
    const uploadPromises = files.map(uploadFileToCloudinary);
    const results = await Promise.all(uploadPromises);
    const urls = results.map((result: any) => result.secure_url);

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("UPLOAD_ERROR", error);
    return NextResponse.json({ message: "Error uploading files.", error: (error as Error).message }, { status: 500 });
  }
}
