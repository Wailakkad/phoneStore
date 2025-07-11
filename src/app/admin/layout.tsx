"use client"
import { ReactNode } from 'react'
import Link from 'next/link'
import {
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Menu,
} from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <h1 className="admin-logo">Admin Panel</h1>
          </div>
          <nav className="admin-nav">
            <Link href="/admin/products" className="admin-nav-link">
              <Package size={20} />
              Products
            </Link>
            <Link href="/admin/orders" className="admin-nav-link">
              <ShoppingCart size={20} />
              Orders
            </Link>
            <Link href="/admin/analyse" className="admin-nav-link">
              <BarChart3 size={20} />
              Analytics
            </Link>
            <Link href="/admin/newProduct" className="admin-nav-link">
              <Settings size={20} />
              new product
            </Link>
          </nav>
        </aside>
        <main className="admin-main">
          <header className="admin-header">
            <button className="admin-menu-toggle">
              <Menu size={20} />
            </button>
            <div className="admin-header-actions">
              <span className="admin-user">Admin User</span>
            </div>
          </header>
          <div className="admin-content">
            {children}
          </div>
        </main>
      </div>

      <style jsx global>{`
        /* Reset and base styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        :global(body) {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background-color: #0a0a0a;
          color: #f1f5f9;
          line-height: 1.6;
          font-weight: 400;
        }

        /* Main layout */
        .admin-layout {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #0a0a0a 0%, #111827 100%);
        }

        /* Sidebar styles */
        .admin-sidebar {
          width: 280px;
          background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
          border-right: 1px solid #334155;
          padding: 0;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.25);
        }

        .admin-sidebar-header {
          padding: 32px 24px;
          border-bottom: 1px solid #334155;
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          position: relative;
          overflow: hidden;
        }

        .admin-sidebar-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%);
          pointer-events: none;
        }

        .admin-logo {
          color: #f8fafc;
          font-size: 22px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .admin-nav {
          padding: 32px 16px;
        }

        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          margin-bottom: 8px;
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 12px;
          font-weight: 500;
          font-size: 15px;
          position: relative;
          overflow: hidden;
          border: 1px solid transparent;
          background: transparent;
        }

        .admin-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #000000;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: -1;
        }

        .admin-nav-link:hover {
          color: #ffffff;
          border-color: #3b82f6;
          transform: translateX(6px);
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .admin-nav-link:hover::before {
          opacity: 1;
        }

        .admin-nav-link.active {
          background: #000000;
          color: #ffffff;
          border-color: #60a5fa;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.4);
          transform: translateX(6px);
        }

        .admin-nav-link.active::before {
          opacity: 1;
        }

        /* Main content area */
        .admin-main {
          flex: 1;
          margin-left: 280px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          min-height: 100vh;
        }

        /* Header styles */
        .admin-header {
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
          border-bottom: 1px solid #475569;
          padding: 20px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
        }

        .admin-menu-toggle {
          display: none;
          background: linear-gradient(135deg, #334155 0%, #475569 100%);
          border: 1px solid #64748b;
          color: #f8fafc;
          cursor: pointer;
          padding: 12px;
          border-radius: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .admin-menu-toggle:hover {
          background: linear-gradient(135deg, #475569 0%, #64748b 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #334155 0%, #475569 100%);
          border-radius: 12px;
          color: #f8fafc;
          font-weight: 500;
          border: 1px solid #64748b;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
        }

        .admin-user:hover {
          background: linear-gradient(135deg, #475569 0%, #64748b 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        }

        .admin-user::before {
          content: 'A';
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-weight: 700;
          font-size: 16px;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
        }

        /* Content area */
        .admin-content {
          padding: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 100%;
            max-width: 320px;
            box-shadow: 8px 0 32px rgba(0, 0, 0, 0.4);
          }
          
          .admin-sidebar.open {
            transform: translateX(0);
          }
          
          .admin-main {
            margin-left: 0;
          }
          
          .admin-menu-toggle {
            display: block;
          }
          
          .admin-content {
            padding: 24px 16px;
          }
          
          .admin-user {
            padding: 8px 16px;
          }
          
          .admin-header {
            padding: 16px 20px;
          }
          
          .admin-nav {
            padding: 24px 12px;
          }
        }

        /* Scrollbar styling */
        :global(::-webkit-scrollbar) {
          width: 8px;
        }

        :global(::-webkit-scrollbar-track) {
          background: #1e293b;
        }

        :global(::-webkit-scrollbar-thumb) {
          background: linear-gradient(180deg, #475569 0%, #64748b 100%);
          border-radius: 4px;
          border: 1px solid #334155;
        }

        :global(::-webkit-scrollbar-thumb:hover) {
          background: linear-gradient(180deg, #64748b 0%, #94a3b8 100%);
        }

        /* Enhanced transitions and animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .admin-content {
          animation: fadeIn 0.5s ease-out;
        }

        /* Focus states for accessibility */
        .admin-nav-link:focus,
        .admin-menu-toggle:focus,
        .admin-user:focus {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
        }
      `}</style>
    </>
  )
}