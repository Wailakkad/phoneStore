"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import styles from './CheckoutPage.module.css'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [form, setForm] = useState({ fullname: "", address: "", phone: "", notes: "" })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e : any) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e : any) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch("/api/admin/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customer: form, items, totalPrice }),
    })
    setLoading(false)
    if (res.ok) {
      clearCart()
      alert("Order placed! The admin will contact you soon.")
      router.push("/thank-you")
    } else {
      alert("Failed to place order. Please try again.")
    }
  }

  return (
    <div className={styles.checkoutContainer}>
      <div className={styles.checkoutCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Complete Your Order</h1>
          <p className={styles.subtitle}>Fill in your details to finalize your purchase</p>
        </div>
        
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Full Name
              <input 
                name="fullname" 
                value={form.fullname} 
                onChange={handleChange} 
                required 
                className={styles.input}
                placeholder="Enter your full name"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Delivery Address
              <input 
                name="address" 
                value={form.address} 
                onChange={handleChange} 
                required 
                className={styles.input}
                placeholder="Enter your complete address"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Phone Number
              <input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                required 
                className={styles.input}
                placeholder="Enter your phone number"
                type="tel"
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Special Instructions
              <textarea 
                name="notes" 
                value={form.notes} 
                onChange={handleChange} 
                className={`${styles.input} ${styles.textarea}`}
                placeholder="Any special delivery instructions or notes..."
                rows={4}
              />
            </label>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
          >
            {loading ? (
              <span className={styles.loadingContent}>
                <span className={styles.spinner}></span>
                Processing Order...
              </span>
            ) : (
              "Complete Purchase"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}