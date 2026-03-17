import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import Button from './Button';

export default function ExpertCard({ expert }) {
    return (
        <Link
            to={`/expert/${expert.slug}`}
            className="group block border border-border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition-all duration-300"
        >
            <div className="relative aspect-square overflow-hidden bg-surface">
                {expert.photo ? (
                    <img
                        src={expert.photo}
                        alt={expert.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary-light text-primary font-serif italic text-xl">
                        No Photo
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="font-serif font-bold text-xl text-primary mb-0.5">{expert.name}</h3>
                <p className="font-sans text-text-dark font-medium text-sm mb-0.5">{expert.title}</p>
                <p className="font-sans text-text-mid text-xs mb-3">{expert.org} • {expert.city.join(', ')}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {expert.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 bg-surface text-text-dark font-sans text-xs font-medium uppercase tracking-wider rounded-full">
                            {tag}
                        </span>
                    ))}
                    {expert.appearanceTypes.slice(0, 1).map(type => (
                        <span key={type} className="px-2.5 py-0.5 bg-primary-light text-primary font-sans text-xs font-medium uppercase tracking-wider rounded-full">
                            {type}
                        </span>
                    ))}
                </div>

                <div className="w-full flex items-center justify-center py-2 border border-primary/20 text-primary rounded-xl font-sans font-semibold text-sm group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    View Profile
                </div>
            </div>
        </Link>
    );
}
