'use client';

import { useState } from 'react';
import { ShoppingCart, Plus, Check, RefreshCw, AlertCircle } from 'lucide-react';
import useSWR from 'swr';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import './ProductList.css';

// Fetcher function for SWR
const fetcher = async (url: string) => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  return data;
};

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  inStock?: boolean;
  createdAt?: string;
}

interface LoadingState {
  [key: number]: boolean;
}

export default function ProductList() {
  const [addingToCart, setAddingToCart] = useState<LoadingState>({});
  
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const { 
    data: products, 
    error, 
    isLoading,
    mutate 
  } = useSWR<Product[]>('/api/products', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  });

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(prev => ({ ...prev, [product.id]: true }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      addToCart(product);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleRetry = () => {
    mutate();
  };

  // Error State
  if (error) {
    return (
      <div className="product-list-container">
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">
              <AlertCircle />
            </div>
            <h3 className="error-title">
              Failed to load products
            </h3>
            <p className="error-message">
              {error.message || 'Something went wrong while fetching products'}
            </p>
            <button
              onClick={handleRetry}
              className="retry-button"
              aria-label="Retry loading products"
            >
              <RefreshCw />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="product-list-container">
        <div className="loading-skeleton">
          <div className="loading-title" aria-label="Loading title"></div>
          <div className="loading-description" aria-label="Loading description"></div>
        </div>
        <div className="products-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="product-card loading-card" aria-label="Loading product">
              <div className="product-image-container">
                <div className="loading-product-image"></div>
              </div>
              <div className="product-info">
                <div className="loading-product-name"></div>
                <div className="loading-product-desc"></div>
                <div className="loading-product-price"></div>
              </div>
              <div className="product-actions">
                <div className="loading-product-button"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <div className="product-list-container">
        <div className="empty-state">
          <div className="empty-content">
            <div className="empty-icon">
              <ShoppingCart />
            </div>
            <h3 className="empty-title">
              No products available
            </h3>
            <p className="empty-message">
              Check back later for new arrivals
            </p>
            <button
              onClick={handleRetry}
              className="retry-button"
              aria-label="Refresh products"
            >
              <RefreshCw />
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Display Products
  return (
    <div className="product-list-container">
      <div className="header-section">
        <div className="header-content">
          <div>
            <h1 className="header-title">
              Featured Products
            </h1>
            <p className="header-description">
              Discover our curated selection of premium items ({products.length} products)
            </p>
          </div>
          <button
            onClick={handleRetry}
            className="refresh-button"
            title="Refresh products"
            aria-label="Refresh products"
          >
            <RefreshCw />
          </button>
        </div>
      </div>
      
      <div className="products-grid">
        {products.map((product: Product) => {
          const productInCart = isInCart(product.id);
          const itemQuantity = getItemQuantity(product.id);
          
          return (
            <article
              key={product.id}
              className="product-card"
              aria-labelledby={`product-${product.id}-name`}
            >
              <div className="product-image-container">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                 
                />
                <div className="product-image-overlay"></div>
                {product.inStock === false && (
                  <div className="out-of-stock-overlay">
                    <span className="out-of-stock-text">Out of Stock</span>
                  </div>
                )}
                {/* {productInCart && itemQuantity > 0 && (
                  <div className="quantity-badge" aria-label={`${itemQuantity} items in cart`}>
                    {itemQuantity}
                  </div>
                )} */}
              </div>
              
              <div className="product-info">
                <h3 id={`product-${product.id}-name`} className="product-name">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="product-description">
                    {product.description}
                  </p>
                )}
                <div className="product-details">
                  <span className="product-price" aria-label={`Price: $${product.price.toFixed(2)}`}>
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="shipping-badge">
                    Free shipping
                  </span>
                  {product.category && (
                    <span className="category-badge">
                      {product.category}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="product-actions">
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={addingToCart[product.id] || product.inStock === false}
                  className={`add-to-cart-button ${
                    product.inStock === false
                      ? 'button-out-of-stock'
                      : productInCart 
                      ? 'button-in-cart' 
                      : addingToCart[product.id]
                      ? 'button-adding'
                      : 'button-default'
                  }`}
                  aria-label={
                    product.inStock === false
                      ? 'Product out of stock'
                      : productInCart
                      ? `Add more ${product.name} to cart (${itemQuantity} currently in cart)`
                      : `Add ${product.name} to cart`
                  }
                >
                  {product.inStock === false ? (
                    'Out of Stock'
                  ) : productInCart ? (
                    <>
                      <Check size={16} />
                      Add More ({itemQuantity})
                    </>
                  ) : addingToCart[product.id] ? (
                    <>
                      <div className="loading-spinner"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}