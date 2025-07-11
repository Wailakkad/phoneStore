"use client"
import Link from 'next/link'
import Image from 'next/image'
import {useEffect} from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";
import Interactive3DSectionComponent from '@/components/Spline';

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
   useEffect(()=>{
    // Hero Section Animations
    const heroTl = gsap.timeline();
    
    // Hero text animations - staggered fade-in from left
    heroTl.fromTo(".hero-title", 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 1, ease: "power2.out" }
    )
    .fromTo(".hero-subtitle", 
      { x: -100, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 
      "-=0.5"
    )
    .fromTo(".hero-cta", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, 
      "-=0.3"
    );

    // Hero graphic animation - scale in from right
    gsap.fromTo(".hero-graphic", 
      { scale: 0.8, x: 100, opacity: 0 }, 
      { 
        scale: 1, 
        x: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out",
        delay: 0.3
      }
    );

    // Floating animation for the phone graphic
    gsap.to(".floating-phone", {
      y: -20,
      duration: 3,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Pulse animation for CTA button
    gsap.to(".cta-pulse", {
      scale: 1.05,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Existing code for other sections
    const scroolTriggerSettings = {
      trigger : ".main",
      start : "top 25%",
      toggleAction : "play reverse play reverse"
    };

    const LeftXvalue = [-800, -900, -400];
    const RightXvalue = [800, 900, 400];
    const leftRotateValue = [-30, -20, -35];
    const rightRotateValue = [30, 20, 35]
    const yValues = [100, -150, -400];

    gsap.utils.toArray('.row').forEach((row : any, index) => {
      const cardLeft = row.querySelector('.card-left');
      const cardRight = row.querySelector('.card-right');

      gsap.to(cardLeft ,{
        x : LeftXvalue[index],
        scrollTrigger : {
          trigger : ".main",
          start : "top center",
          end : "150% bottom",
          scrub : true,
          onUpdate : (self)=>{
            const progress = self.progress;
            cardLeft.style.transform = `translateX(${LeftXvalue[index] * progress}px) translateY(${yValues[index] * progress}px) rotate(${leftRotateValue[index] * progress}deg)`;
            cardRight.style.transform = `translateX(${RightXvalue[index] * progress}px) translateY(${yValues[index] * progress}px) rotate(${rightRotateValue[index] * progress}deg)`;
          }
        }
      })
    })

    gsap.to(".logo" ,{
      scale : 1,
      duration : 0.5,
      ease : "power1.out",
      scrollTrigger : scroolTriggerSettings,
    })

     gsap.to(".line p" ,{
      y : 0,
      stagger : 0.1,
      duration : 0.5,
      ease : "power1.out",
      scrollTrigger : scroolTriggerSettings,
    })

    gsap.to("button" ,{
      y : 0,
      opacity : 1,
      delay : 0.25,
      duration : 0.5,
      ease : "power1.out",
      scrollTrigger : scroolTriggerSettings,
    })

    // NEW: Enhanced Footer Animations with ScrollTrigger
    const footerTriggerSettings = {
      trigger: ".enhanced-footer",
      start: "top 80%",
      end: "bottom center",
      toggleActions: "play reverse play reverse"
    };

    // Background blur animation
    gsap.fromTo(".footer-blur-bg", 
      { 
        filter: "blur(0px)",
        opacity: 0 
      },
      {
        filter: "blur(15px)",
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: footerTriggerSettings
      }
    );

    // Central content fade-in
    gsap.fromTo(".footer-content", 
      { 
        y: 50, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          ...footerTriggerSettings,
          
        }
      }
    );

    // Staggered asset animations
    gsap.fromTo(".footer-asset", 
      { 
        scale: 0.8, 
        opacity: 0,
        y: 30
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.2)",
        stagger: 0.15,
        scrollTrigger: {
          ...footerTriggerSettings,
          
        }
      }
    );

    // Inverse parallax for background assets
    gsap.utils.toArray('.footer-bg-asset').forEach((asset: any, index) => {
      gsap.to(asset, {
        y: -30 * (index + 1),
        scrollTrigger: {
          trigger: ".enhanced-footer",
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    });

    // Social icons hover animations
    gsap.utils.toArray('.social-icon').forEach((icon: any) => {
      icon.addEventListener('mouseenter', () => {
        gsap.to(icon, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          ease: "back.out(1.5)"
        });
      });
      
      icon.addEventListener('mouseleave', () => {
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    return () =>{
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());    
    }

   } , [])

  const generaterows = () => {
    const rows = [];
    for (let i = 1; i<=3; i++) {
      rows.push(
        <div className="row" key={i}>
          <div className='card card-left'>
            <Image src={`/img-${2 * i - 1}.jpg`} alt="" />
          </div>
          <div className='card card-right'>
            <Image src={`/img-${2 * i}.jpg`} alt="" />
          </div>
        </div>
      )
    }
    return rows;
  }

  return (
    <>
     <ReactLenis root>
      {/* Updated Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            {/* Left Side - Text & CTA */}
            <div className="hero-left">
              <h1 className="hero-title">
                BadarPhone – Premium Tech, 
                <span className="text-gradient"> Unbeatable Deals</span>
              </h1>
              <p className="hero-subtitle">
                Shop the latest smartphones with exclusive discounts. 
                Experience cutting-edge technology at prices that won't break the bank.
              </p>
              <div className="hero-cta">
                <button className="cta-button cta-pulse">
                  <span>Explore Now</span>
                  <svg className="cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Animated Graphic */}
            <div className="hero-right">
              <div className="hero-graphic">
                <div className="floating-phone">
                  {/* Animated Phone SVG */}
                  <svg width="300" height="400" viewBox="0 0 300 400" fill="none" className="phone-svg">
                    {/* Phone Body */}
                    <rect x="50" y="20" width="200" height="360" rx="30" fill="url(#phoneGradient)" stroke="#00D4FF" strokeWidth="2"/>
                    
                    {/* Screen */}
                    <rect x="70" y="60" width="160" height="280" rx="15" fill="#000"/>
                    
                    {/* Screen Glow */}
                    <rect x="70" y="60" width="160" height="280" rx="15" fill="url(#screenGlow)" opacity="0.7"/>
                    
                    {/* Home Indicator */}
                    <rect x="125" y="355" width="50" height="4" rx="2" fill="#00D4FF"/>
                    
                    {/* Camera Notch */}
                    <rect x="130" y="35" width="40" height="15" rx="7" fill="#333"/>
                    
                    {/* Floating Elements */}
                    <circle cx="280" cy="100" r="8" fill="#00D4FF" opacity="0.6" className="float-1"/>
                    <circle cx="30" cy="200" r="6" fill="#00FFB8" opacity="0.6" className="float-2"/>
                    <circle cx="270" cy="300" r="10" fill="#FF6B6B" opacity="0.6" className="float-3"/>
                    
                    {/* Gradient Definitions */}
                    <defs>
                      <linearGradient id="phoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#1a1a1a"/>
                        <stop offset="100%" stopColor="#2a2a2a"/>
                      </linearGradient>
                      <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3"/>
                        <stop offset="50%" stopColor="#00FFB8" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.1"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Existing sections remain unchanged */}
      <section className="main">
        <div className="main-container">
          <div className="logo">
            {/* <img src="/logoHero.png" alt="" /> */}
            <h2 className="footer-brand">IStore.</h2>
          </div>
          <div className="copy">
            <div className="line">
              <p><span className="highlight">Premium Quality</span> • Latest Technology • <span className="highlight">Unbeatable Prices</span></p>
            </div>
            <div className="line">
              <p>Experience the <span className="highlight">Future of Mobile</span> with Cutting-Edge Features</p>
            </div>
            <div className="line">
              <p><span className="highlight">Trusted by 50K+</span> Customers • <span className="highlight">Fast Shipping</span> • Premium Support</p>
            </div>
          </div>
        
        </div>

        {generaterows()}
      </section>

      {/* NEW: Enhanced Footer Section with Black Background */}
      <section className='enhanced-footer'>
        {/* Background blur layer */}
        <div className="footer-blur-bg"></div>
        
        {/* Background assets for parallax */}
        <div className="footer-bg-asset footer-asset-1">
          <Image src="/headphones.png" alt="Headphones" />
        </div>
        <div className="footer-bg-asset footer-asset-2">
          <Image src="/iphone-white.png" alt="iPhone White" />
        </div>
        <div className="footer-bg-asset footer-asset-3">
          <Image src="/airpods.png" alt="AirPods" />
        </div>
        <div className="footer-bg-asset footer-asset-4">
          <Image src="/apple-watch-red.png" alt="Apple Watch Red" />
        </div>
        <div className="footer-bg-asset footer-asset-5">
          <Image src="/apple-watch-green.png" alt="Apple Watch Green" />
        </div>
        <div className="footer-bg-asset footer-asset-6">
          <Image src="/iphone-blue.png" alt="iPhone Blue" />
        </div>

        {/* Central content */}
        <div className="footer-content">
          <div className="footer-main-text">
            <h2 className="footer-brand">IStore.</h2>
            <p className="footer-tagline">The Best Way To Buy</p>
            <p className="footer-subtitle">The products You Love</p>
          </div>

          {/* Social media icons */}
          <div className="footer-social">
            <Link href="#" className="social-icon footer-asset">
              <Image src="/tktok-icon.png" alt="WhatsApp" />
            </Link>
            <Link href="#" className="social-icon footer-asset">
              <Image src="/facebook-icon.png" alt="Facebook" />
            </Link>
            <Link href="#" className="social-icon footer-asset">
              <Image src="/instagram-icon.png" alt="Instagram" />
            </Link>
            
          </div>
          <div className='btnAction'>
            <Link href="/products">
               <button className='Actionbtn'>see All</button>
            </Link>
          </div>
        </div>
      </section>
    
     </ReactLenis>
    <Interactive3DSectionComponent/>
     

     {/* Enhanced Styles */}
     <style jsx>{`
       /* Enhanced Copy Section Styles */
       .copy {
         margin: 2rem 0;
         padding: 2rem 0;
         border-top: 1px solid rgba(255, 255, 255, 0.1);
         border-bottom: 1px solid rgba(255, 255, 255, 0.1);
       }

       .copy .line {
         margin: 1.5rem 0;
         overflow: hidden;
         position: relative;
       }

       .copy .line p {
         font-size: 1.2rem;
         color: #e0e0e0;
         line-height: 1.8;
         font-weight: 400;
         letter-spacing: 0.5px;
         transform: translateY(30px);
         opacity: 0.9;
         text-align: center;
         margin: 0;
         padding: 0.5rem 0;
         position: relative;
       }

       .copy .line:nth-child(2) p {
         font-size: 1.4rem;
         font-weight: 500;
       }

       .copy .line .highlight {
         background: linear-gradient(135deg, #00D4FF 0%, #00FFB8 50%, #FF6B6B 100%);
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
         background-clip: text;
         font-weight: 600;
         position: relative;
         text-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
       }

       .copy .line .highlight::after {
         content: '';
         position: absolute;
         bottom: -2px;
         left: 0;
         width: 100%;
         height: 2px;
         background: linear-gradient(90deg, #00D4FF, #00FFB8);
         opacity: 0.6;
         border-radius: 1px;
       }

       .copy .line:hover p {
         transform: translateY(-2px);
         transition: transform 0.3s ease;
       }

       .copy .line:hover .highlight {
         text-shadow: 0 0 25px rgba(0, 212, 255, 0.5);
         transition: text-shadow 0.3s ease;
       }

       /* Add subtle animation to bullet points */
       .copy .line p::before {
         content: '';
         position: absolute;
         left: 50%;
         top: 50%;
         width: 4px;
         height: 4px;
         background: #00D4FF;
         border-radius: 50%;
         transform: translate(-50%, -50%) scale(0);
         animation: pulse 2s ease-in-out infinite;
         opacity: 0.7;
       }

       .copy .line:nth-child(1) p::before {
         animation-delay: 0s;
       }

       .copy .line:nth-child(2) p::before {
         animation-delay: 0.7s;
       }

       .copy .line:nth-child(3) p::before {
         animation-delay: 1.4s;
       }

       @keyframes pulse {
         0%, 100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
         50% { transform: translate(-50%, -50%) scale(1); opacity: 0.7; }
       }

       /* Mobile responsive for copy section */
       @media (max-width: 768px) {
         .copy .line p {
           font-size: 1rem;
           line-height: 1.6;
         }

         .copy .line:nth-child(2) p {
           font-size: 1.1rem;
         }

         .copy {
           margin: 1.5rem 0;
           padding: 1.5rem 0;
         }
       }

       @media (max-width: 480px) {
         .copy .line p {
           font-size: 0.9rem;
           padding: 0.3rem 0;
         }

         .copy .line:nth-child(2) p {
           font-size: 1rem;
         }

         .copy {
           margin: 1rem 0;
           padding: 1rem 0;
         }
       }

       /* Hero Styles */
       .hero {
         min-height: 100vh;
         margin-bottom: 100;
         display: flex;
         align-items: center;
         position: relative;
         overflow: hidden;
       }

       .hero::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background: radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                     radial-gradient(circle at 80% 80%, rgba(0, 255, 184, 0.1) 0%, transparent 50%);
         pointer-events: none;
       }

       .hero-container {
         max-width: 1400px;
         margin: 0 auto;
         padding: 0 2rem;
         width: 100%;
       }

       .hero-content {
         display: grid;
         grid-template-columns: 1fr 1fr;
         gap: 4rem;
         align-items: center;
         min-height: 80vh;
       }

       .hero-left {
         z-index: 2;
       }

       .hero-title {
         font-size: clamp(2.5rem, 5vw, 4.5rem);
         font-weight: 800;
         color: #ffffff;
         line-height: 1.1;
         margin-bottom: 1.5rem;
         letter-spacing: -0.02em;
       }

       .text-gradient {
         background: linear-gradient(135deg, #00D4FF 0%, #00FFB8 100%);
         -webkit-background-clip: text;
         -webkit-text-fill-color: transparent;
         background-clip: text;
       }

       .hero-subtitle {
         font-size: 1.25rem;
         color: #b0b0b0;
         line-height: 1.6;
         margin-bottom: 2.5rem;
         max-width: 500px;
       }

       .hero-cta {
         margin-top: 2rem;
       }

       .cta-button {
         background: linear-gradient(135deg, #00D4FF 0%, #00FFB8 100%);
         border: none;
         padding: 1rem 2.5rem;
         border-radius: 50px;
         color: #000;
         font-weight: 600;
         font-size: 1.1rem;
         cursor: pointer;
         display: inline-flex;
         align-items: center;
         gap: 0.5rem;
         transition: all 0.3s ease;
         box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
       }

       .cta-button:hover {
         transform: translateY(-2px);
         box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
       }

       .cta-arrow {
         transition: transform 0.3s ease;
       }

       .cta-button:hover .cta-arrow {
         transform: translateX(5px);
       }

       .hero-right {
         display: flex;
         justify-content: center;
         align-items: center;
         position: relative;
       }

       .hero-graphic {
         position: relative;
       }

       .phone-svg {
         max-width: 100%;
         height: auto;
         filter: drop-shadow(0 20px 40px rgba(0, 212, 255, 0.2));
       }

       .float-1 {
         animation: float1 4s ease-in-out infinite;
       }

       .float-2 {
         animation: float2 3s ease-in-out infinite 0.5s;
       }

       .float-3 {
         animation: float3 5s ease-in-out infinite 1s;
       }

       @keyframes float1 {
         0%, 100% { transform: translateY(0px) translateX(0px); }
         50% { transform: translateY(-15px) translateX(10px); }
       }

       @keyframes float2 {
         0%, 100% { transform: translateY(0px) translateX(0px); }
         50% { transform: translateY(-20px) translateX(-5px); }
       }

       @keyframes float3 {
         0%, 100% { transform: translateY(0px) translateX(0px); }
         50% { transform: translateY(-10px) translateX(8px); }
       }

       /* NEW: Enhanced Footer Styles */
       .enhanced-footer {
         position: relative;
         min-height: 100vh;
         background: #000000;
         display: flex;
         align-items: center;
         justify-content: center;
         overflow: hidden;
       }

       .footer-blur-bg {
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background: radial-gradient(circle at 50% 50%, rgba(50, 50, 50, 0.3) 0%, transparent 70%);
         filter: blur(15px);
         opacity: 0;
       }

       .footer-blur-bg::before {
         content: '';
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         background-image: 
           radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
           radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
         opacity: 0.5;
       }

       .footer-content {
         position: relative;
         z-index: 10;
         text-align: center;
         max-width: 600px;
         padding: 0 2rem;
       }

       .footer-brand {
         font-size: clamp(3rem, 6vw, 5rem);
         font-weight: 800;
         color: #ffffff;
         margin: 0 0 1rem 0;
         letter-spacing: -0.02em;
       }

       .footer-tagline {
         font-size: clamp(1.5rem, 3vw, 2.5rem);
         color: #888888;
         margin: 0 0 0.5rem 0;
         font-weight: 400;
       }

       .footer-subtitle {
         font-size: clamp(1.5rem, 3vw, 2.5rem);
         color: #888888;
         margin: 0 0 3rem 0;
         font-weight: 400;
       }

       .footer-social {
         display: flex;
         justify-content: center;
         gap: 2rem;
         margin-top: 3rem;
       }

       .social-icon {
         display: block;
         width: 60px;
         height: 60px;
         border-radius: 50%;
         background: rgba(255, 255, 255, 0.1);
         display: flex;
         align-items: center;
         justify-content: center;
         transition: all 0.3s ease;
         backdrop-filter: blur(10px);
         border: 1px solid rgba(255, 255, 255, 0.2);
       }

       .social-icon img {
         width: 30px;
         height: 30px;
         object-fit: contain;
       }

       .social-icon:hover {
         background: rgba(255, 255, 255, 0.2);
         transform: translateY(-5px);
         box-shadow: 0 10px 25px rgba(255, 255, 255, 0.1);
       }
        .btnAction {
         display: flex;
         justify-content: center;
         margin-top: 2rem;
         
         }


        .Actionbtn {
         background: none;
         border: 2px solid #00D4FF;
         padding: 0.75rem 2rem;
         border-radius: 50px;
         color: #00D4FF;
         font-weight: 600;
         font-size: 1.1rem;
         cursor: pointer;
         transition: all 0.3s ease;
         box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
       }

       .Actionbtn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
          background: rgba(0, 212, 255, 0.1);
          color: #FFFFFF;
        }
       /* Background Assets Positioning */
       .footer-bg-asset {
         position: absolute;
         opacity: 0.6;
         pointer-events: none;
       }

       .footer-asset-1 {
         top: 60%;
         left: 9%;
         width: 120px;
         height: auto;
       }

       .footer-asset-2 {
         top: 10%;
         left: 30%;
         width: 100px;
         height: auto;
       }

       .footer-asset-3 {
         top: 15%;
         right: 30%;
         width: 80px;
         height: auto;
       }

       .footer-asset-4 {
         top: 35%;
         right: 15%;
         width: 90px;
         height: auto;
       }

       .footer-asset-5 {
         bottom: 45%;
         left: 15%;
         width: 95px;
         height: auto;
       }

       .footer-asset-6 {
         bottom: 7%;
         right: 8%;
         width: 110px;
         height: auto;
       }

       .footer-bg-asset img {
         width: 100%;
         height: auto;
         object-fit: contain;
         filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.1));
       }

       /* Mobile Responsiveness */
       @media (max-width: 768px) {
         .hero-content {
           grid-template-columns: 1fr;
           gap: 2rem;
           text-align: center;
         }

         .hero-left {
           order: 2;
         }

         .hero-right {
           order: 1;
         }

         .hero-title {
           font-size: 2.5rem;
         }

         .hero-subtitle {
           font-size: 1.1rem;
           max-width: 100%;
         }

         .phone-svg {
           width: 250px;
         }

         .hero-container {
           padding: 0 1rem;
         }

         .footer-social {
           gap: 1.5rem;
         }

         .social-icon {
           width: 50px;
           height: 50px;
         }

         .social-icon img {
           width: 25px;
           height: 25px;
         }

         .footer-bg-asset {
           opacity: 0.3;
         }

         .footer-asset-1, .footer-asset-2, .footer-asset-3 {
           width: 80px;
         }

         .footer-asset-4, .footer-asset-5, .footer-asset-6 {
           width: 70px;
         }
       }

       @media (max-width: 480px) {
         .hero-title {
           font-size: 2rem;
         }

         .cta-button {
           padding: 0.875rem 2rem;
           font-size: 1rem;
         }

         .phone-svg {
           width: 200px;
         }

         .footer-social {
           gap: 1rem;
         }

         .social-icon {
           width: 45px;
           height: 45px;
         }

         .social-icon img {
           width: 22px;
           height: 22px;
         }

         .footer-bg-asset {
           opacity: 0.2;
         }

         .spline-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0 2rem 0;
  background: #101010;
}

.spline-container {
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
}

@media (max-width: 900px) {
  .spline-container {
    max-width: 100%;
    aspect-ratio: 1/1;
  }
}

             }
     `}</style>
    </>
  )
}