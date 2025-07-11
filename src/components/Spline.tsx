import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// Styled components
const Interactive3DSection = styled.section`
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(0, 255, 184, 0.08) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const InteractiveContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
`;

const InteractiveContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  @media (max-width: 768px) {
    gap: 2rem;
  }
`;

const InteractiveLeft = styled.div`
  z-index: 2;
  padding-right: 2rem;

  @media (max-width: 1024px) {
    padding-right: 0;
    text-align: center;
  }
`;

const InteractiveBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 212, 255, 0.1);
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 50px;
  color: #00D4FF;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
`;

const BadgeDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00D4FF;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  animation: pulse-dot 2s ease-in-out infinite;

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(1.2); }
  }
`;

const InteractiveTitle = styled.h2`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const TitleHighlight = styled.span`
  background: linear-gradient(135deg, #00D4FF 0%, #00FFB8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InteractiveDescription = styled.p`
  font-size: 1.1rem;
  color: #b0b0b0;
  line-height: 1.7;
  margin-bottom: 2rem;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 100%;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const InteractiveFeatures = styled.div`
  margin-bottom: 2.5rem;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    color: #00D4FF;
  }

  &:hover .feature-icon {
    background: rgba(0, 212, 255, 0.2);
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00D4FF;
  border: 1px solid rgba(0, 212, 255, 0.3);
  transition: all 0.3s ease;
`;

const FeatureText = styled.span`
  color: #e0e0e0;
  font-weight: 500;
  transition: color 0.3s ease;
`;

const InteractiveCTA = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryCTA = styled.button`
  background: linear-gradient(135deg, #00D4FF 0%, #00FFB8 100%);
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  color: #000;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 212, 255, 0.4);
  }

  &:hover .cta-arrow {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
`;



const CTAArrow = styled.svg`
  transition: transform 0.3s ease;
`;

const InteractiveRight = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SplineWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1;
  border-radius: 24px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 1024px) {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    max-width: 400px;
  }

  @media (max-width: 480px) {
    max-width: 320px;
  }
`;

const SplineGlow = styled.div`
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 26px;
  background: linear-gradient(135deg, #00D4FF, #00FFB8, #FF6B6B);
  opacity: 0.3;
  filter: blur(20px);
  z-index: -1;
  animation: glow-pulse 3s ease-in-out infinite;

  @keyframes glow-pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.02); }
  }
`;

const SplineIframe = styled.iframe`
  width: 100%;
  height: 100%;
  border-radius: 24px;
  position: relative;
  z-index: 1;
`;

const FloatingUI = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 2;
`;

const UIElement = styled.div<{ position: 'ui-1' | 'ui-2' | 'ui-3' }>`
  position: absolute;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  animation: float-ui 3s ease-in-out infinite;

  ${({ position }) => {
    switch (position) {
      case 'ui-1':
        return `
          top: 10%;
          right: 10%;
          animation-delay: 0s;
        `;
      case 'ui-2':
        return `
          bottom: 20%;
          left: 10%;
          animation-delay: 1s;
        `;
      case 'ui-3':
        return `
          top: 50%;
          right: 5%;
          animation-delay: 2s;
        `;
      default:
        return '';
    }
  }}

  @keyframes float-ui {
    0%, 100% { transform: translateY(0px); opacity: 0.8; }
    50% { transform: translateY(-10px); opacity: 1; }
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
`;

const UILabel = styled.span`
  color: #00D4FF;
  font-size: 0.8rem;
  font-weight: 500;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;


// Main component
const Interactive3DSectionComponent: React.FC = () => {
  return (
    <Interactive3DSection>
      <InteractiveContainer>
        <InteractiveContent>
          {/* Left Side - Content & CTA */}
          <InteractiveLeft>
            <InteractiveBadge>
              <BadgeDot />
              Interactive 3D Experience
            </InteractiveBadge>
            
            <InteractiveTitle>
              Explore iPhone 16 Pro Max in 
              <TitleHighlight> 3D Reality</TitleHighlight>
            </InteractiveTitle>
            
            <InteractiveDescription>
              Experience the future of mobile technology with our interactive 3D showcase. 
              Rotate, zoom, and explore every detail of the iPhone 16 Pro Max - from its 
              premium titanium build to the revolutionary camera system.
            </InteractiveDescription>
            
            <InteractiveFeatures>
              <FeatureItem>
                <FeatureIcon className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </FeatureIcon>
                <FeatureText>Premium Titanium Build</FeatureText>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </FeatureIcon>
                <FeatureText>Professional Camera System</FeatureText>
              </FeatureItem>
              
              <FeatureItem>
                <FeatureIcon className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M7 15h10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </FeatureIcon>
                <FeatureText>6.7" Super Retina XDR Display</FeatureText>
              </FeatureItem>
            </InteractiveFeatures>
            
            <InteractiveCTA>
              <Link href="/products">
                 <PrimaryCTA>
                <span>Shop Now</span>
                <CTAArrow className="cta-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12m-6-6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </CTAArrow>
              </PrimaryCTA>
              </Link>
              
              
            </InteractiveCTA>
          </InteractiveLeft>

          {/* Right Side - 3D Spline Iframe */}
          <InteractiveRight>
            <SplineWrapper>
              <SplineGlow />
              <SplineIframe
                src="https://my.spline.design/iphone16promaxmockup-oUka5JxUWjM0wmVekl395n9T/"
                frameBorder="0"
                width="100%"
                height="100%"
                allowFullScreen
              />
              
              {/* Floating UI Elements */}
              <FloatingUI>
                <UIElement position="ui-1">
                  <UILabel>360° View</UILabel>
                </UIElement>
                <UIElement position="ui-2">
                  <UILabel>Zoom & Explore</UILabel>
                </UIElement>
                <UIElement position="ui-3">
                  <UILabel>Real-time Interaction</UILabel>
                </UIElement>
              </FloatingUI>
            </SplineWrapper>
          </InteractiveRight>
        </InteractiveContent>
      </InteractiveContainer>
    </Interactive3DSection>
  );
};

export default Interactive3DSectionComponent;