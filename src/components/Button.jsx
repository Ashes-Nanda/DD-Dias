import React from 'react';
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
                className={cn(
                    "absolute inset-0 top-[100%] left-0 w-full h-full",
                    bgHoverColors[variant]
                )}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                {children}
            </span>
        </Component>
    );
}
