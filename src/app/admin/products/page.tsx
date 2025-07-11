'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, Package, AlertCircle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './AllProducts.module.css'

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  imageUrl: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export default function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/products')
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`)
      }
      
      const data = await response.json()
      setProducts(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching products')
    } finally {
      setLoading(false)
    }
  }

  


  const handleDelete = async (productId: string) => {
     try{
      const res = await fetch('/api/admin/products', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ id: productId })
});

     if(res.ok) {
        setProducts((prevProducts) => 
          prevProducts.filter((product) => product.id !== productId)
        )
        alert('Product deleted successfully')
     }

     }catch (err) {
             console.log("Error : " , err)
     }
  }

 

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Out of Stock', color: '#ef4444' }
    if (stock < 10) return { text: 'Low Stock', color: '#f59e0b' }
    return { text: 'In Stock', color: '#10b981' }
  }

  if (loading) {
    return (
      <div className={styles.productsContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingContent}>
            <Loader2 className={styles.loadingSpinner} />
            <p className={styles.loadingText}>Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.productsContainer}>
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <AlertCircle className={styles.errorIcon} />
            <p className={styles.errorTitle}>Error loading products</p>
            <p className={styles.errorMessage}>{error}</p>
            <button onClick={fetchProducts} className={styles.retryButton}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.productsContainer}>
      <div className={styles.productsWrapper}>
        {/* Header */}
        <div className={styles.productsHeader}>
          <div className={styles.headerLeft}>
            <Package className={styles.headerIcon} />
            <h1 className={styles.headerTitle}>Products</h1>
            <span className={styles.productCount}>
              {products.length} items
            </span>
          </div>
          <Link href="/admin/newProduct">
            <button className={styles.addProductBtn}>
            <Plus className={styles.btnIcon} />
            Add Product
          </button>
          </Link>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className={styles.emptyState}>
            <Package className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No products found</h3>
            <p className={styles.emptySubtitle}>Get started by adding your first product</p>
            <Link href="/admin/newProduct">
            <button className={styles.addProductBtn}>
            <Plus className={styles.btnIcon} />
            Add Product
          </button>
          </Link>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.map((product) => {
              const stockStatus = getStockStatus(product.stock)
              
              return (
                <div key={product.id} className={styles.productCard}>
                  {/* Product Image */}
                  <div className={styles.productImageContainer}>
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className={styles.productImage}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    ) : (
                      <div className={styles.productImagePlaceholder}>
                        <Package className={styles.placeholderIcon} />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className={styles.productDetails}>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productCategory}>{product.category}</p>
                      <div className={styles.productPriceStock}>
                        <span className={styles.productPrice}>
                          {formatPrice(product.price)}
                        </span>
                        <span 
                          className={styles.stockStatus}
                          style={{ color: stockStatus.color }}
                        >
                          {stockStatus.text}
                        </span>
                      </div>
                      <p className={styles.stockCount}>
                        Stock: {product.stock} units
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className={styles.actionButtons}>
                      {/* <button
                        onClick={() => handleEdit(product.id)}
                        className={styles.editBtn}
                      >
                        <Edit2 className={styles.btnIcon} />
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleDelete(product.id)}
                        className={styles.deleteBtn}
                      >
                        <Trash2 className={styles.btnIcon} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}