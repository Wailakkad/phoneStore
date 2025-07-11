"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from './ThankYouPage.module.css'

export default function ThankYouPage() {
  const router = useRouter()
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setShowContent(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleContinueShopping = () => {
    router.push("/")
  }

  const handleViewOrders = () => {
    router.push("/orders")
  }

  return (
    <div className={styles.thankYouContainer}>
      <div className={`${styles.thankYouCard} ${showContent ? styles.visible : ''}`}>
        {/* Success Icon */}
        <div className={styles.iconContainer}>
          <div className={styles.successIcon}>
            <svg 
              className={styles.checkmark} 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <polyline points="9,11 12,14 22,4"></polyline>
              <path d="M21,12v7a2,2 0 0,1 -2,2H5a2,2 0 0,1 -2,-2V5a2,2 0 0,1 2,-2h11"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className={styles.content}>
          <h1 className={styles.title}>Order Confirmed!</h1>
          <p className={styles.message}>
            Thank you for your purchase. Your order has been successfully placed and our team will contact you soon to confirm delivery details.
          </p>
          
          <div className={styles.orderInfo}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>What happens next?</h3>
              <div className={styles.stepsList}>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>1</span>
                  <span className={styles.stepText}>We'll review your order</span>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>2</span>
                  <span className={styles.stepText}>Our team will contact you</span>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>3</span>
                  <span className={styles.stepText}>Schedule delivery or pickup</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.contactInfo}>
            <p className={styles.contactText}>
              <strong>Need help?</strong> Contact us at <span className={styles.highlight}>support@yourstore.com</span> or call <span className={styles.highlight}>+1 (555) 123-4567</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <button 
              onClick={handleContinueShopping}
              className={`${styles.button} ${styles.primaryButton}`}
            >
              Continue Shopping
            </button>
            <button 
              onClick={handleViewOrders}
              className={`${styles.button} ${styles.secondaryButton}`}
            >
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}