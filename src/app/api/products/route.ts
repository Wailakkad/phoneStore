import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';



// get products from redis
export const GET = async () => {
  try {
    const products = await redis.get('products');
    const parsedProducts = products ? JSON.parse(products as string) : [];
    
    // Return properly formatted JSON response
    return NextResponse.json(parsedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' }, 
      { status: 500 }
    );
  }
};
