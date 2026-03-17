import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import Button from './Button';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4 pointer-events-none">
            <div
                className={cn(
                    "max-w-7xl mx-auto flex items-center justify-between pointer-events-auto transition-all duration-500 rounded-full px-6 py-3",
                    scrolled ? "bg-surface shadow-sm border border-border" : "bg-transparent"
                )}
            >
                <Link to="/" className="font-serif font-bold text-2xl text-primary tracking-tight">
                    Draupadi on the Dais
                </Link>

                <div className="hidden md:flex items-center space-x-8 font-sans text-[15px] font-medium text-text-dark">
                    <Link to="/directory" className="hover:text-primary transition-colors">Find a Voice</Link>
                    <Link to="/apply" className="hover:text-primary transition-colors">Join the Dais</Link>
                    <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                    <Link to="/directory" className="hover:text-primary transition-colors">For Organisers</Link>
                </div>

                <div className="hidden md:block">
                    <Button to="/directory" variant="primary" className="py-2 px-5 text-sm">
                        Enter the Dais
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden pointer-events-auto p-2 text-primary"
                    onClick={() => setMobileMenuOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-surface flex flex-col pt-32 px-6 pointer-events-auto">
                    <button
                        className="absolute top-6 right-6 p-2 text-primary"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    <div className="flex flex-col space-y-8 font-serif text-3xl font-bold text-primary">
                        <Link to="/directory" onClick={() => setMobileMenuOpen(false)}>Find a Voice</Link>
                        <Link to="/apply" onClick={() => setMobileMenuOpen(false)}>Join the Dais</Link>
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
                        <Link to="/directory" onClick={() => setMobileMenuOpen(false)}>For Organisers</Link>
                    </div>
                    <div className="mt-12">
                        <Button to="/directory" variant="primary" className="w-full py-4 text-center justify-center" onClick={() => setMobileMenuOpen(false)}>
                            Enter the Dais
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
