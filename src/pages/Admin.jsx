import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Trash2, Eye, EyeOff, Edit3, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { cn } from '../lib/utils';

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    const [pending, setPending] = useState([]);
    const [approved, setApproved] = useState([]);
    const [hidden, setHidden] = useState([]);

    const [editingExpert, setEditingExpert] = useState(null);
    const [editForm, setEditForm] = useState(null);
    const [editPressLinks, setEditPressLinks] = useState([]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchExperts();
        }
    }, [isAuthenticated]);

    const fetchExperts = async () => {
        const { data: pendingData } = await supabase.from('experts').select('*').eq('status', 'pending').order('created_at', { ascending: false });
        const { data: approvedData } = await supabase.from('experts').select('*').eq('status', 'approved').order('created_at', { ascending: false });
        const { data: hiddenData } = await supabase.from('experts').select('*').eq('status', 'hidden').order('created_at', { ascending: false });

        if (pendingData) setPending(pendingData);
        if (approvedData) setApproved(approvedData);
        if (hiddenData) setHidden(hiddenData);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') setIsAuthenticated(true); // Dummy password for V1 mock
        else alert('Incorrect password');
    };

    const handleApprove = async (id) => {
        const { error } = await supabase.from('experts').update({ status: 'approved' }).eq('id', id);
        if (!error) {
            fetchExperts();
            alert('Approved! Profile created and welcome email sent (simulated).');
        }
    };

    const handleReject = async (id) => {
        const { error } = await supabase.from('experts').update({ status: 'rejected' }).eq('id', id);
        if (!error) {
            fetchExperts();
            alert('Rejected. Rejection email queued (simulated).');
        }
    };

    const handleToggleVisibility = async (id, currentStatus) => {
        const newStatus = currentStatus === 'approved' ? 'hidden' : 'approved';
        const { error } = await supabase.from('experts').update({ status: newStatus }).eq('id', id);
        if (!error) fetchExperts();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this profile?")) {
            const { error } = await supabase.from('experts').delete().eq('id', id);
            if (!error) fetchExperts();
        }
    };

    const openEditModal = (expert) => {
        setEditingExpert(expert);
        setEditForm({
            full_name: expert.full_name || '',
            title: expert.title || '',
            organisation: expert.organisation || '',
            bio: expert.bio || '',
            linkedin_url: expert.linkedin_url || '',
            twitter_url: expert.twitter_url || '',
            website_url: expert.website_url || ''
        });
        setEditPressLinks(expert.press_links || []);
    };

    const saveChanges = async () => {
        const { error } = await supabase.from('experts').update({
            ...editForm,
            press_links: editPressLinks
        }).eq('id', editingExpert.id);

        if (!error) {
            setEditingExpert(null);
            fetchExperts();
        } else {
            alert("Failed to update profile.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface px-6">
                <div className="w-full max-w-sm bg-white p-8 rounded-3xl shadow-sm border border-border">
                    <div className="flex justify-center mb-6 text-primary"><Shield size={40} /></div>
                    <h1 className="font-serif text-2xl text-primary font-bold text-center mb-6">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full border border-border rounded-xl px-4 py-3 bg-surface mb-4 font-sans text-text-dark"
                        />
                        <button type="submit" className="w-full bg-primary text-white font-sans font-semibold py-3 rounded-xl hover:bg-primary-hover transition-colors">
                            Access Panel
                        </button>
                    </form>
                    <p className="text-center text-xs text-text-mid mt-4 font-sans">For demo purposes, password is 'admin123'</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 bg-surface">
            <div className="max-w-7xl mx-auto px-6">

                <div className="flex justify-between items-center mb-12">
                    <h1 className="font-serif text-4xl text-primary font-bold">Admin Dashboard</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm border border-border bg-white px-4 py-2 rounded-lg font-sans text-text-dark hover:border-primary/50 transition-colors">
                        Log out
                    </button>
                </div>

                {/* Pending Queue */}
                <div className="mb-16">
                    <h2 className="font-serif text-2xl text-text-dark font-bold mb-6">Application Queue</h2>
                    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-surface border-b border-border font-sans text-text-mid text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Name</th>
                                    <th className="p-4 font-medium">Email</th>
                                    <th className="p-4 font-medium">Industry</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-text-mid font-sans italic">No pending applications in the queue.</td>
                                    </tr>
                                ) : (
                                    pending.map(app => (
                                        <tr key={app.id} className="border-b border-border hover:bg-surface/50 transition-colors">
                                            <td className="p-4 font-sans font-bold text-text-dark">{app.full_name}</td>
                                            <td className="p-4 font-sans text-text-mid text-sm">{app.email}</td>
                                            <td className="p-4 font-sans text-text-dark text-sm">{app.industries?.[0] || 'N/A'}</td>
                                            <td className="p-4 font-sans text-text-mid text-sm">{new Date(app.created_at).toLocaleDateString()}</td>
                                            <td className="p-4 flex gap-2 justify-end">
                                                <button onClick={() => handleApprove(app.id)} className="flex items-center gap-1 text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded bg-white hover:bg-green-100 transition-colors font-sans font-medium">
                                                    <CheckCircle size={14} /> Approve
                                                </button>
                                                <button onClick={() => handleReject(app.id)} className="flex items-center gap-1 text-xs bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded bg-white hover:bg-red-100 transition-colors font-sans font-medium">
                                                    <XCircle size={14} /> Reject
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Live Directory */}
                <div>
                    <h2 className="font-serif text-2xl text-text-dark font-bold mb-6">Live Directory ({approved.length + hidden.length} Total, {hidden.length} Hidden)</h2>
                    <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="bg-surface border-b border-border font-sans text-text-mid text-sm uppercase tracking-wider">
                                    <th className="p-4 font-medium">Expert</th>
                                    <th className="p-4 font-medium">Title/Org</th>
                                    <th className="p-4 font-medium">Location</th>
                                    <th className="p-4 font-medium text-right">Settings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...approved, ...hidden].map(expert => (
                                    <tr key={expert.id} className={cn("border-b border-border hover:bg-surface/50 transition-colors", expert.status === 'hidden' && "opacity-60 bg-surface/30")}>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-primary-light shrink-0">
                                                    {expert.photo_url && <img src={expert.photo_url} alt={expert.full_name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <p className="font-sans font-bold text-text-dark flex items-center gap-2">
                                                        {expert.full_name}
                                                        {expert.status === 'hidden' && <span className="text-[10px] bg-text-mid text-white px-1.5 py-0.5 rounded uppercase tracking-wider">Hidden</span>}
                                                    </p>
                                                    <a href={`/expert/${expert.slug}`} target="_blank" rel="noreferrer" className="text-xs text-primary underline font-sans">View Profile</a>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-sans text-sm">
                                            <p className="font-medium text-text-dark">{expert.title}</p>
                                            <p className="text-text-mid">{expert.organisation}</p>
                                        </td>
                                        <td className="p-4 font-sans text-text-dark text-sm">{expert.city?.[0]}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button onClick={() => openEditModal(expert)} className="text-text-mid hover:text-primary transition-colors p-1" title="Edit Profile">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button onClick={() => handleToggleVisibility(expert.id, expert.status)} className="text-text-mid hover:text-text-dark transition-colors p-1" title={expert.status === 'approved' ? "Hide Profile" : "Show Profile"}>
                                                    {expert.status === 'approved' ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                                <button onClick={() => handleDelete(expert.id)} className="text-text-mid hover:text-red-600 transition-colors p-1" title="Delete Profile">
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Modal (Full Profile Editor) */}
                {editingExpert && editForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
                        <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-serif text-2xl text-primary font-bold">Edit Profile: {editingExpert.full_name}</h3>
                                <button onClick={() => setEditingExpert(null)} className="text-text-mid hover:text-text-dark"><X size={24} /></button>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Full Name</label>
                                        <input type="text" value={editForm.full_name} onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Organisation</label>
                                        <input type="text" value={editForm.organisation} onChange={e => setEditForm({ ...editForm, organisation: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Title</label>
                                        <input type="text" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Bio</label>
                                        <textarea value={editForm.bio} onChange={e => setEditForm({ ...editForm, bio: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm min-h-[120px]" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">LinkedIn URL</label>
                                        <input type="url" value={editForm.linkedin_url} onChange={e => setEditForm({ ...editForm, linkedin_url: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Twitter URL</label>
                                        <input type="url" value={editForm.twitter_url} onChange={e => setEditForm({ ...editForm, twitter_url: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-1">Website URL</label>
                                        <input type="url" value={editForm.website_url} onChange={e => setEditForm({ ...editForm, website_url: e.target.value })} className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-border">
                                    <label className="block text-xs font-bold text-text-mid uppercase tracking-wider mb-3">Press Links</label>

                                    <div className="space-y-4">
                                        {editPressLinks.map((link, idx) => (
                                            <div key={idx} className="flex gap-4 items-start">
                                                <div className="flex-1 space-y-2">
                                                    <input type="text" value={link.title} onChange={(e) => {
                                                        const newLinks = [...editPressLinks]; newLinks[idx].title = e.target.value; setEditPressLinks(newLinks);
                                                    }} placeholder="Display Title" className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                                    <input type="url" value={link.url} onChange={(e) => {
                                                        const newLinks = [...editPressLinks]; newLinks[idx].url = e.target.value; setEditPressLinks(newLinks);
                                                    }} placeholder="URL" className="w-full border border-border rounded-xl px-4 py-2 font-sans text-sm" />
                                                </div>
                                                <button onClick={() => {
                                                    const newLinks = editPressLinks.filter((_, i) => i !== idx); setEditPressLinks(newLinks);
                                                }} className="text-red-500 hover:text-red-700 p-2 mt-1"><Trash2 size={18} /></button>
                                            </div>
                                        ))}
                                        <button onClick={() => setEditPressLinks([...editPressLinks, { title: '', url: '', publisher: '' }])} className="text-sm font-sans font-medium text-primary hover:underline">
                                            + Add another link
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-border bg-white sticky bottom-0">
                                <button onClick={() => setEditingExpert(null)} className="font-sans font-semibold text-text-mid hover:text-text-dark">Cancel</button>
                                <button onClick={saveChanges} className="bg-primary text-white font-sans font-semibold px-6 py-2 rounded-xl hover:bg-primary-hover">Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
