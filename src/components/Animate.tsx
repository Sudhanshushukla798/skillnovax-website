import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';

// ==========================================
// 1. Scroll Reveal Component
// ==========================================
interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  threshold?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,       // Default 0.9s duration
  distance = 80,       // Default 80px translate
  className = '',
  threshold = 0.1,
}: ScrollRevealProps) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction];

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...initialOffset,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // premium cubic-bezier easeOutExpo (power4.out)
      }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 2. Stagger Entrance Component
// ==========================================
interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  staggerChildren?: number;
  className?: string;
  threshold?: number;
}

export function StaggerContainer({
  children,
  delay = 0,
  staggerChildren = 0.12, // Default stagger of 0.12s
  className = '',
  threshold = 0.05,
}: StaggerContainerProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: threshold }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  key?: React.Key;
}

export function StaggerItem({
  children,
  direction = 'up',
  distance = 80, // Default 80px distance
  className = '',
}: StaggerItemProps) {
  const directions = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = directions[direction];

  const itemVariants = {
    hidden: { opacity: 0, ...initialOffset },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1], // power4.out cubic-bezier
      },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

// ==========================================
// 3. Smooth Animated Counter
// ==========================================
interface AnimatedCounterProps {
  value: number;
  duration?: number; // in milliseconds
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function AnimatedCounter({
  value,
  duration = 1500,
  className = '',
  suffix = '',
  prefix = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeProgress * value));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {count.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
}

// ==========================================
// 4. Magnetic Button Wrapper
// ==========================================
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  range?: number; // sensitivity range
}

export function MagneticButton({ children, className = '', range = 40 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Check if mouse is within sensitivity range of button
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      x.set(distanceX * 0.35); // Move button 35% of the mouse offset
      y.set(distanceY * 0.35);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// ==========================================
// 5. Ripple Button Component
// ==========================================
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  rippleColor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  id?: string;
}

export function RippleButton({
  children,
  className = '',
  rippleColor = 'rgba(255, 255, 255, 0.35)',
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) {
      onClick(e);
    }
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1));
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [ripples]);

  return (
    <button
      {...props}
      className={`relative overflow-hidden ${className}`}
      onClick={onClickHandler}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {children}
      </span>
      <span className="absolute inset-0 pointer-events-none overflow-hidden block">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-current opacity-25 animate-ripple block"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              transform: 'scale(0)',
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>
    </button>
  );
}

// ==========================================
// 6. Floating Particles
// ==========================================
export function FloatingParticles({ count = 25 }: { count?: number }) {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }).map((_, idx) => ({
      id: idx,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 4 + 1.5, // 1.5px to 5.5px
      duration: Math.random() * 20 + 10, // 10s to 30s
      delay: Math.random() * -20, // start offset immediately
    }));
    setParticles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-blue-500/20 dark:bg-sky-400/15"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
