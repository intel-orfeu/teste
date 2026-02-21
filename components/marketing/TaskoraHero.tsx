import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Menu, X, ArrowRight, CheckCircle2, MoreHorizontal, Bell, Search, Home, Users, BarChart2, Settings, ChevronDown, Filter } from 'lucide-react';

// --- Assets ---
// Video URL: https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260201_052917_7fc4e418-3123-40bf-b5ba-394c28eb4b3a.mp4

// --- Components ---

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 max-w-5xl mx-auto z-50 px-4 sm:px-6"
        >
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-6 py-4 flex items-center justify-between shadow-2xl shadow-black/20">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-sm" />
                    </div>
                    <span className="text-white font-manrope font-bold text-lg tracking-tight">Taskora</span>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'Features', 'Company', 'Contact'].map((link) => (
                        <a key={link} href="#" className="text-sm font-inter text-white/80 hover:text-white transition-colors">
                            {link}
                        </a>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="text-sm font-inter text-white hover:text-white/80 transition-colors">Sign Up</button>
                    <button className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-cabin font-bold hover:scale-105 transition-transform">
                        Sign In
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full mt-2 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden shadow-2xl"
                    >
                        {['Home', 'Features', 'Company', 'Contact'].map((link) => (
                            <a key={link} href="#" className="text-lg font-inter text-white/80 hover:text-white transition-colors">
                                {link}
                            </a>
                        ))}
                        <div className="h-px bg-white/10 my-2" />
                        <button className="text-lg font-inter text-white hover:text-white/80 transition-colors text-left">Sign Up</button>
                        <button className="bg-white text-black px-5 py-3 rounded-full text-lg font-cabin font-bold text-center">
                            Sign In
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const DashboardPreview = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-6xl mx-auto mt-16 md:mt-24 perspective-1000"
        >
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-t from-blue-500/20 to-purple-500/20 blur-3xl rounded-[3rem] -z-10" />

            <div className="bg-[#F9F9FA] rounded-[2rem] border border-white/20 shadow-2xl overflow-hidden md:aspect-[16/9] flex text-slate-800">
                {/* Sidebar */}
                <div className="w-16 md:w-20 bg-white border-r border-slate-200 flex flex-col items-center py-6 gap-6 flex-shrink-0">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                        <div className="w-5 h-5 bg-white rounded-md" />
                    </div>
                    <div className="flex flex-col gap-4 mt-4 w-full px-2">
                        {[Home, Users, BarChart2, Settings].map((Icon, i) => (
                            <div key={i} className={`p-3 rounded-xl flex justify-center cursor-pointer transition-colors ${i === 0 ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
                                <Icon size={20} />
                            </div>
                        ))}
                    </div>
                    <div className="mt-auto mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200" />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-[#F9F9FA]">
                    {/* Header */}
                    <header className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-10">
                        <div className="flex items-center gap-4 bg-slate-100 px-4 py-2 rounded-lg w-64">
                            <Search size={16} className="text-slate-400" />
                            <span className="text-sm text-slate-400 font-inter">Search projects...</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-lg cursor-pointer">
                                <Bell size={20} />
                                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
                            </div>
                            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold text-slate-800 font-manrope">Alex Morgan</p>
                                    <p className="text-xs text-slate-500 font-inter">Product Manager</p>
                                </div>
                                <img src="https://ui-avatars.com/api/?name=Alex+Morgan&background=6366f1&color=fff" alt="User" className="w-9 h-9 rounded-full border-2 border-slate-100" />
                            </div>
                        </div>
                    </header>

                    {/* Dashboard Content */}
                    <main className="p-6 md:p-8 overflow-auto flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold font-manrope text-slate-900">Dashboard</h2>
                                <p className="text-slate-500 font-inter text-sm md:text-base">Welcome back, here's what's happening today.</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50">
                                    <Filter size={16} /> Filter
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700">
                                    Create Report
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {[
                                { label: 'Total Sales', value: '$124,500', trend: '+12.5%', isPositive: true },
                                { label: 'Operating Expenses', value: '$45,200', trend: '-2.4%', isPositive: true },
                                { label: 'Gross Profit', value: '$79,300', trend: '+8.2%', isPositive: true },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="text-sm font-medium text-slate-500 font-inter">{stat.label}</p>
                                        <div className={`text-xs font-bold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {stat.trend}
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-bold font-manrope text-slate-900 mb-4">{stat.value}</h3>
                                    {/* Mini Bar Chart */}
                                    <div className="flex items-end gap-1 h-10 mt-auto">
                                        {[40, 70, 45, 90, 60, 80, 50, 70, 60].map((h, j) => (
                                            <div key={j} className="flex-1 bg-indigo-50 rounded-sm hover:bg-indigo-500 transition-colors" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Revenue Chart Placeholder */}
                            <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-80 flex flex-col">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold font-manrope text-slate-900">Revenue Overview</h3>
                                    <div className="flex gap-2">
                                        <span className="text-xs font-medium text-slate-400">Monthly</span>
                                        <ChevronDown size={14} className="text-slate-400" />
                                    </div>
                                </div>
                                <div className="flex-1 flex items-end justify-between gap-4 px-2">
                                    {[30, 45, 60, 40, 70, 85, 90, 65, 50, 75, 80, 95].map((h, k) => (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ duration: 0.8, delay: 1 + (k * 0.05) }}
                                            key={k}
                                            className="flex-1 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg opacity-90 hover:opacity-100 transition-opacity"
                                        />
                                    ))}
                                </div>
                                <div className="flex justify-between mt-4 text-xs text-slate-400 font-inter">
                                    <span>Jan</span><span>Dec</span>
                                </div>
                            </div>

                            {/* Deals Table - Simplified */}
                            <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                                <h3 className="text-lg font-bold font-manrope text-slate-900 mb-4">Recent Deals</h3>
                                <div className="flex-1 overflow-auto -mx-2">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-xs text-slate-400 font-inter border-b border-slate-100">
                                                <th className="font-medium py-2 px-2">Company</th>
                                                <th className="font-medium py-2 px-2 text-right">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { company: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com', amount: '$12.5k' },
                                                { company: 'Spotify', logo: 'https://logo.clearbit.com/spotify.com', amount: '$8.2k' },
                                                { company: 'Slack', logo: 'https://logo.clearbit.com/slack.com', amount: '$5.9k' },
                                                { company: 'Netflix', logo: 'https://logo.clearbit.com/netflix.com', amount: '$15.0k' },
                                            ].map((deal, idx) => (
                                                <tr key={idx} className="group border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                                    <td className="py-3 px-2 flex items-center gap-3">
                                                        <img src={deal.logo} alt={deal.company} className="w-6 h-6 rounded-full opacity-80 group-hover:opacity-100" />
                                                        <span className="text-sm font-medium text-slate-700">{deal.company}</span>
                                                    </td>
                                                    <td className="py-3 px-2 text-right text-sm font-bold text-slate-800">{deal.amount}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </motion.div>
    );
};

export default function TaskoraHero() {
    return (
        <div className="relative w-full min-h-screen bg-[#050505] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30">

            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-50"
                >
                    <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260201_052917_7fc4e418-3123-40bf-b5ba-394c28eb4b3a.mp4" type="video/mp4" />
                </video>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050505]/80 to-[#050505] z-10" />
            </div>

            <Navbar />

            <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-48 pb-20 flex flex-col items-center">

                {/* Hero Content */}
                <div className="text-center max-w-4xl mx-auto flex flex-col items-center gap-8">

                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg shadow-blue-500/10"
                    >
                        <div className="p-1 rounded-full bg-blue-500/20">
                            <div className="text-blue-400">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                            </div>
                        </div>
                        <span className="text-sm font-manrope font-medium text-white/90">Trusted by +30.000 of clients globally</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="text-5xl md:text-[80px] leading-[1.1] md:leading-[1.1] font-inter font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/70"
                    >
                        Simplify Your <span className="font-instrument-serif italic font-normal text-white">Workflow.</span> <br className="hidden md:block" />
                        Stay Focused.
                    </motion.h1>

                    {/* Subhead */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl font-manrope leading-relaxed"
                    >
                        Taskora helps teams manage projects, tasks, and deadlines with clarity. Experience the new standard in productivity.
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2, delay: 0.5 }}
                        className="px-8 py-4 bg-white text-black rounded-full font-cabin font-bold text-lg md:text-xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-shadow"
                    >
                        Book a Free Demo
                    </motion.button>

                </div>

                {/* Dashboard Preview */}
                <DashboardPreview />

            </div>
        </div>
    );
}
