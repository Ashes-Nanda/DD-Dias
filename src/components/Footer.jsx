import { Link } from 'react-router-dom';

const DD_SUBSTACK_URL = 'https://decodingdraupadi.substack.com';
const DD_INSTAGRAM_URL = 'https://www.instagram.com/decodingdraupadi/';
const DD_LINKEDIN_URL = 'https://www.linkedin.com/company/decodingdraupadi';
const DD_WEBSITE_URL = 'https://decodingdraupadi.com';

function ColumnHeading({ children }) {
    return (
        <h3 className="font-sans text-base font-bold text-white uppercase tracking-widest mb-5">
            {children}
        </h3>
    );
}

function FooterLink({ to, href, children }) {
    const classes =
        'font-sans text-[15px] text-white/75 hover:text-primary hover:underline underline-offset-4 transition-colors';

    if (to) {
        return <Link to={to} className={classes}>{children}</Link>;
    }
    return (
        <a href={href} target="_blank" rel="noreferrer" className={classes}>
            {children}
        </a>
    );
}

export default function Footer() {
    return (
        <footer className="bg-[#1A0A0A] text-white pt-20 pb-8 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 pb-14">
                    {/* Brand block */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold leading-tight">
                                Draupadi on the Dais
                            </h2>
                            <p className="font-sans text-primary text-xs font-bold uppercase tracking-[0.2em] mt-3">
                                A Decoding Draupadi Initiative
                            </p>
                        </div>
                        <p className="font-sans text-[15px] text-white/60 leading-relaxed max-w-sm">
                            Where India's most credible women get found.
                        </p>
                    </div>

                    <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-8">
                        <div>
                            <ColumnHeading>For Speakers</ColumnHeading>
                            <ul className="space-y-3">
                                <li><FooterLink to="/apply">List Your Profile</FooterLink></li>
                                <li><FooterLink to="/directory">Browse the Dais</FooterLink></li>
                                <li><FooterLink to="/about">About</FooterLink></li>
                            </ul>
                        </div>
                        <div>
                            <ColumnHeading>Decoding Draupadi</ColumnHeading>
                            <ul className="space-y-3">
                                <li><FooterLink href={DD_SUBSTACK_URL}>The Talk</FooterLink></li>
                                <li><FooterLink href={DD_INSTAGRAM_URL}>Instagram</FooterLink></li>
                                <li><FooterLink href={DD_LINKEDIN_URL}>LinkedIn</FooterLink></li>
                                <li><FooterLink href={DD_WEBSITE_URL}>decodingdraupadi.com</FooterLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#333333] pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <p className="font-sans text-xs md:text-sm text-white/55">
                        &copy; {new Date().getFullYear()} Draupadi on the Dais. All rights reserved.
                    </p>
                    <a
                        href={DD_WEBSITE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="font-sans text-xs md:text-sm text-white/55 hover:text-primary transition-colors"
                    >
                        Part of the Decoding Draupadi ecosystem → decodingdraupadi.com
                    </a>
                </div>
            </div>
        </footer>
    );
}
