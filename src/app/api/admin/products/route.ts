import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const newProduct = new Product(body);
    await newProduct.save();
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("API_PRODUCTS_POST_ERROR", error);
    return NextResponse.json({ message: 'Error creating product', error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return NextResponse.json(products);
  } catch (error) {
     console.error("API_PRODUCTS_GET_ERROR", error);
    return NextResponse.json({ message: 'Error fetching products', error: (error as Error).message }, { status: 500 });
  }
}
