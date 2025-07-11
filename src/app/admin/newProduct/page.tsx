"use client";
import  { useState } from 'react';

interface Product {
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
}

interface FormErrors {
  name?: string;
  price?: string;
  imageUrl?: string;
  category?: string;
  description?: string;
}



const PlusIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5v14M5 12h14"/>
  </svg>
);

const TagIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
);

const CategoryIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14,2 14,8 20,8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10,9 9,9 8,9"/>
  </svg>
);

const AddProductForm: React.FC = () => {
  const [product, setProduct] = useState<Product>({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    description: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Home & Garden',
    'Sports',
    'Beauty',
    'Automotive',
    'Food & Beverage'
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!product.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(product.price)) || Number(product.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!product.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(product.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid image URL';
    }

    if (!product.category) {
      newErrors.category = 'Category is required';
    }

    if (!product.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (product.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      const response = await fetch('/api/admin/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name.trim(),
          price: parseFloat(product.price),
          imageUrl: product.imageUrl.trim(),
          category: product.category,
          description: product.description.trim(),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - reset form and show success message
        setProduct({
          name: '',
          price: '',
          imageUrl: '',
          category: '',
          description: ''
        });
        setErrors({});
        setSubmitMessage({
          type: 'success',
          text: 'Product added successfully!'
        });
        
        // Auto-hide success message after 3 seconds
        setTimeout(() => setSubmitMessage(null), 3000);
      } else {
        // API returned an error
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Failed to add product. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting product:', error);
      setSubmitMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Product, value: string) => {
    setProduct(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Clear submit message when user starts editing
    if (submitMessage) {
      setSubmitMessage(null);
    }
  };

 

  return (
    <div className="admin-container">
      <div className="admin-wrapper">
        {/* Main Card */}
        <div className="admin-card">
          {/* Card Header */}
          <div className="card-header">
            <div className="card-header-content">
              <div className="icon-container">
                <PlusIcon size={24} />
              </div>
              <div>
                <h1 className="card-title">Add New Product</h1>
                <p className="card-subtitle">Fill in the details below to create a new product</p>
              </div>
            </div>
          </div>

          {/* Success/Error Message */}
          {submitMessage && (
            <div className={`message ${submitMessage.type === 'success' ? 'message-success' : 'message-error'}`}>
              {submitMessage.text}
            </div>
          )}

          {/* Form */}
          <div className="form-container">
            {/* Product Name */}
            <div className="field-group">
              <label className="field-label">
                <TagIcon />
                Product Name
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  className={`field-input ${errors.name ? 'input-error' : ''} ${focusedField === 'name' ? 'input-focused' : ''}`}
                  placeholder="Enter product name"
                />
                {errors.name && (
                  <p className="error-text">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="field-group">
              <label className="field-label">
                <DollarIcon />
                Price
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  onFocus={() => setFocusedField('price')}
                  onBlur={() => setFocusedField(null)}
                  className={`field-input ${errors.price ? 'input-error' : ''} ${focusedField === 'price' ? 'input-focused' : ''}`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="error-text">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Image URL */}
            <div className="field-group">
              <label className="field-label">
                <ImageIcon />
                Image URL
              </label>
              <div className="input-wrapper">
                <input
                  type="url"
                  value={product.imageUrl}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  onFocus={() => setFocusedField('imageUrl')}
                  onBlur={() => setFocusedField(null)}
                  className={`field-input ${errors.imageUrl ? 'input-error' : ''} ${focusedField === 'imageUrl' ? 'input-focused' : ''}`}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.imageUrl && (
                  <p className="error-text">{errors.imageUrl}</p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="field-group">
              <label className="field-label">
                <CategoryIcon />
                Category
              </label>
              <div className="input-wrapper">
                <select
                  value={product.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  onFocus={() => setFocusedField('category')}
                  onBlur={() => setFocusedField(null)}
                  className={`field-select ${errors.category ? 'input-error' : ''} ${focusedField === 'category' ? 'input-focused' : ''}`}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="error-text">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="field-group">
              <label className="field-label">
                <FileTextIcon />
                Description
              </label>
              <div className="input-wrapper">
                <textarea
                  rows={4}
                  value={product.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  onFocus={() => setFocusedField('description')}
                  onBlur={() => setFocusedField(null)}
                  className={`field-textarea ${errors.description ? 'input-error' : ''} ${focusedField === 'description' ? 'input-focused' : ''}`}
                  placeholder="Enter product description..."
                />
                {errors.description && (
                  <p className="error-text">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="submit-container">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`submit-button ${isSubmitting ? 'button-disabled' : ''}`}
              >
                {isSubmitting ? (
                  <div className="button-content">
                    <div className="spinner" />
                    Adding Product...
                  </div>
                ) : (
                  <div className="button-content">
                    <PlusIcon size={20} />
                    Add Product
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          min-height: 100vh;
          background-color: #111827;
          padding: 1rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: #ffffff;
        }

        .admin-wrapper {
          max-width: 672px;
          margin: 0 auto;
        }

        /* Message Styles */
        .message {
          padding: 1rem 1.5rem;
          margin: 0;
          font-weight: 500;
          font-size: 0.875rem;
          animation: slideIn 0.3s ease-out;
        }

        .message-success {
          background-color: #065f46;
          color: #a7f3d0;
          border-left: 4px solid #10b981;
        }

        .message-error {
          background-color: #7f1d1d;
          color: #fca5a5;
          border-left: 4px solid #ef4444;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Header Styles */
        .admin-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #9ca3af;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.2s ease;
          padding: 0.5rem;
          border-radius: 0.5rem;
        }

        .back-button:hover {
          color: #ffffff;
          background-color: rgba(75, 85, 99, 0.3);
        }

        .back-button:hover svg {
          transform: translateX(-4px);
        }

        /* Card Styles */
        .admin-card {
          background-color: #1f2937;
          border-radius: 1rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid #374151;
          overflow: hidden;
        }

        .card-header {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          padding: 1.5rem;
        }

        .card-header-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .icon-container {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0;
        }

        .card-subtitle {
          color: #dbeafe;
          margin: 0.25rem 0 0 0;
          font-size: 0.875rem;
        }

        /* Form Styles */
        .form-container {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .field-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #d1d5db;
        }

        .input-wrapper {
          position: relative;
        }

        .field-input,
        .field-select,
        .field-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #374151;
          border: 1px solid #4b5563;
          border-radius: 0.5rem;
          color: #ffffff;
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .field-input::placeholder,
        .field-textarea::placeholder {
          color: #9ca3af;
        }

        .field-select {
          cursor: pointer;
        }

        .field-select option {
          background-color: #374151;
          color: #ffffff;
        }

        .field-textarea {
          resize: vertical;
          min-height: 100px;
        }

        .input-focused {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
          transform: scale(1.02);
        }

        .input-error {
          border-color: #ef4444;
        }

        .error-text {
          color: #fca5a5;
          font-size: 0.875rem;
          margin-top: 0.25rem;
          animation: pulse 1s infinite;
        }

        /* Submit Button Styles */
        .submit-container {
          padding-top: 1rem;
        }

        .submit-button {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1rem;
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          font-family: inherit;
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #2563eb, #7c3aed);
          box-shadow: 0 10px 25px rgba(37, 99, 235, 0.25);
          transform: translateY(-2px);
        }

        .submit-button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .button-disabled {
          background: #4b5563;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .button-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .admin-container {
            padding: 0.5rem;
          }
          
          .admin-wrapper {
            max-width: 100%;
          }
          
          .form-container {
            padding: 1rem;
          }
          
          .card-header {
            padding: 1rem;
          }
          
          .card-title {
            font-size: 1.25rem;
          }
          
          .card-header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .admin-header {
            margin-bottom: 1rem;
          }
          
          .field-group {
            gap: 0.25rem;
          }
          
          .form-container {
            gap: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default function AddProductPage() {
  return <AddProductForm />;
}