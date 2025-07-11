'use client'

import React from 'react'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext' // Import from your context file
import './cart-styles.css'

// Main Cart Component
const CartPage: React.FC = () => {
  const {
    items,
    totalItems,
    totalPrice,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart() // Now using the context hook

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    alert('Proceeding to checkout...')
    // Implement checkout logic here
  }

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-wrapper">
          <div className="empty-cart">
            <ShoppingBag className="empty-cart-icon" />
            <h2 className="empty-cart-title">Your cart is empty</h2>
            <p className="empty-cart-text">Start adding some products to your cart!</p>
            <Link href="/products" className="continue-shopping-link">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        {/* Header */}
        <div className="cart-header">
          <h1 className="cart-title">Shopping Cart</h1>
          <button onClick={handleClearCart} className="clear-cart-btn">
            <Trash2 className="clear-cart-icon" />
            <span>Clear Cart</span>
          </button>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items-container">
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  {/* Product Image */}
                  <div className="product-image-container">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="product-image"
                      />
                    ) : (
                      <div className="product-image-placeholder">
                        <ShoppingBag className="product-image-placeholder-icon" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="product-details">
                    <h3 className="product-name">{item.name}</h3>
                    <p className="product-price">${item.price.toFixed(2)} each</p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="quantity-btn"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="quantity-btn-icon" />
                    </button>
                    
                    <span className="quantity-display">{item.quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      <Plus className="quantity-btn-icon" />
                    </button>
                  </div>

                  {/* Item Total */}
                  <div className="item-total">
                    <p className="item-total-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    <Trash2 className="remove-btn-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="cart-total">
              <span className="cart-total-label">
                Total ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
              <span className="cart-total-price">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            
            <div className="cart-actions">
              <Link href="/products" className="cart-action-btn secondary">
                Continue Shopping
              </Link>
             <Link href="/cart/checkout">
                 <button 
                onClick={handleCheckout}
                className="cart-action-btn primary"
              >
                Proceed to Checkout
              </button>
             </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage