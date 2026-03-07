import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

export default function Button({
    children,
    variant = 'primary',
    href,
    to,
    className,
    onClick,
    type = 'button',
    ...props
}) {
    const buttonRef = useRef(null);
    const textRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const btn = buttonRef.current;
        if (!btn) return;

        // Magnetic interaction
        const xTo = gsap.quickTo(btn, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(btn, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textXTo = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const textYTo = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseEnter = (e) => {
            // Background slide animation
            gsap.to(bgRef.current, { top: "0%", duration: 0.3, ease: "power2.inOut" });
        };

        const handleMouseLeave = (e) => {
            xTo(0);
            yTo(0);
            textXTo(0);
            textYTo(0);

            // Background slide out animation
            gsap.to(bgRef.current, { top: "-100%", duration: 0.3, ease: "power2.inOut" });
        };

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = btn.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.2);
            yTo(y * 0.2);
            textXTo(x * 0.1);
            textYTo(y * 0.1);
        };

        btn.addEventListener("mouseenter", handleMouseEnter);
        btn.addEventListener("mouseleave", handleMouseLeave);
        btn.addEventListener("mousemove", handleMouseMove);

        return () => {
            btn.removeEventListener("mouseenter", handleMouseEnter);
            btn.removeEventListener("mouseleave", handleMouseLeave);
            btn.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const variants = {
        primary: "border-primary text-primary",
        secondary: "border-text-dark text-text-dark",
    };

    const bgHoverColors = {
        primary: "bg-primary text-white",
        secondary: "bg-text-dark text-white",
    };

    const Component = to ? Link : href ? 'a' : 'button';
    const linkProps = to ? { to } : href ? { href } : { type };

    return (
        <Component
            ref={buttonRef}
            className={cn(
                "relative inline-flex items-center justify-center px-6 py-3 border rounded-3xl overflow-hidden group cursor-pointer font-sans font-semibold text-[15px] transition-colors duration-300",
                variants[variant],
                className
            )}
            onClick={onClick}
            {...linkProps}
            {...props}
        >
            <div
                ref={bgRef}
                className={cn(
                    "absolute inset-0 top-[100%] left-0 w-full h-full",
                    bgHoverColors[variant]
                )}
            />
            <span ref={textRef} className="relative z-10 group-hover:text-white transition-colors duration-300">
                {children}
            </span>
        </Component>
    );
}
