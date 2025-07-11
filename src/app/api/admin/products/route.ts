import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';


type Product = {
  id: number | string;
  name: string;
  price: number;
  // If you need extra fields, use unknown instead of any:
  [key: string]: unknown;
};
// ppost products to redis
export const POST = async (req: NextRequest) => {
  try {
    const newProduct = await req.json();
    
    // Validate required fields
    if (!newProduct.name || !newProduct.price) {
      return NextResponse.json(
        { error: 'Name and price are required' }, 
        { status: 400 }
      );
    }
    
    const existing = JSON.parse(await redis.get('products') || '[]');
    
    // Add ID and timestamp if not provided
    const productWithMeta = {
      id: newProduct.id || Date.now(),
      ...newProduct,
      createdAt: new Date().toISOString()
    };
    
    existing.push(productWithMeta);
    await redis.set('products', JSON.stringify(existing));
    
    return NextResponse.json(
      { message: 'Product added successfully', product: productWithMeta }, 
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json(
      { error: 'Failed to add product' }, 
      { status: 500 }
    );
  }
};




export const DELETE = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: 'Product id is required' },
        { status: 400 }
      );
    }

    const products = JSON.parse(await redis.get('products') || '[]') as Product[];
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    products.splice(index, 1);
    await redis.set('products', JSON.stringify(products));

    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
};
