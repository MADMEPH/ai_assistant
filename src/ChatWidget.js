import React, { useState, useEffect, useRef, useCallback } from 'react';

// Включить подробный дебаг React ошибок в dev-режиме
if (process.env.NODE_ENV !== 'production') {
	// eslint-disable-next-line no-console
	console.warn('React is running in development mode. Detailed error messages are enabled.');
}
import { motion, AnimatePresence } from 'framer-motion';
let lottieLib = null;


// Название бота для простоты развертывания
const BOT_NAME = 'Assistant';
const UI = {
	title: BOT_NAME,
	close: 'Close',
	empty: '👋 Ask a question — I am here to help.',
	thinking: 'Thinking...',
	placeholder: 'Type your message...',
	send: 'Send',
	hide: 'Hide',
	needHelp: 'Need help?',
	openButton: 'Chat',
	error: 'Error: failed to get a response.'
};

const ChatWidget = () => {
	const [open, setOpen] = useState(false);
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState('');
	const [loading, setLoading] = useState(false);
	const [sessionId, setSessionId] = useState(() => {
		try {
			return localStorage.getItem('chat_session_id');
		} catch {
			return null;
		}
	});
	const bottomRef = useRef(null);
	const [isHidden, setIsHidden] = useState(false);
	const handleMouseEnter = useCallback(() => setIsHidden(false), []);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [messages, open]);

	// ...лотти-анимации удалены...

	const sendMessage = async () => {
		if (!input.trim() || loading) return;
		const userMsg = { role: 'user', content: input.trim() };
		setMessages(prev => [...prev, userMsg]);
		const payload = { message: input.trim(), session_id: sessionId };
		setInput('');
		setLoading(true);
		try {
			const base = 'http://localhost:8000'; // Change to your API endpoint
			const chatUrl = /\/chat($|\?)/.test(base) ? base : base.replace(/\/$/, '') + '/chat';
			const res = await fetch(chatUrl, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error('Network error');
			const data = await res.json();
			if (!sessionId && data.session_id) {
				try { localStorage.setItem('chat_session_id', data.session_id); } catch {}
			}
			setSessionId(prev => prev || data.session_id);
			setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
		} catch (e) {
			setMessages(prev => [...prev, { role: 'assistant', content: UI.error }]);
		} finally {
			setLoading(false);
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	};

	return (
		<div style={{ position: 'fixed', bottom: 60, right: 24, zIndex: 100 }} className='flex flex-col items-end font-sans'>
			<AnimatePresence>
				{open && (
					<motion.div
						key="chat-window"
						style={{ width: 370, height: 520 }}
						className="bg-white rounded-xl shadow-xl flex flex-col overflow-hidden border border-purple-textlight"
						initial={{ opacity: 0, scale: 0.85, y: 40 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						transition={{ type: 'spring', stiffness: 220, damping: 26 }}
					>
						{/* Header */}
						<div className="bg-purple-text px-4 py-3 flex items-center justify-between rounded-t-xl">
							<div className="flex items-center gap-2">
								{/* Логотип */}
								<div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-bold text-purple-text text-lg">AI</div>
								<span className="text-white font-semibold text-lg">{BOT_NAME}</span>
								<span className="ml-2 text-xs bg-white/20 text-white px-2 py-1 rounded">Active</span>
							</div>
							<button onClick={() => setOpen(false)} className="text-white opacity-70 hover:opacity-100 text-xl" aria-label={UI.close}>х</button>
						</div>
						{/* Message */}
						<div className="flex-1 px-4 py-3 overflow-y-auto text-sm">
							<div className="mb-2">
								<div className="text-purple-text font-semibold mb-2">AI {BOT_NAME}</div>
								{messages.length === 0 && (
									<div className="text-gray-700 bg-gray-50 rounded-lg p-3 text-center mt-2 shadow">{UI.empty}</div>
								)}
								{messages.map((m, i) => (
									<div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
										<div className={
											'inline-block px-3 py-2 rounded-lg max-w-[80%] shadow-sm ' +
											(m.role === 'user' ? 'bg-purple-textlight text-white' : 'bg-gray-50 text-gray-800')
										}>
											{m.content}
										</div>
									</div>
								))}
								{loading && <div className="text-gray-400 text-center">{UI.thinking}</div>}
								<div ref={bottomRef} />
							</div>
						</div>

						{/* Кнопки убраны по требованию */}
						{/* Теги */}
						
						{/* Input */}
						<div className="flex items-center px-4 py-3 border-t bg-white">
							<input
								value={input}
								onChange={e => setInput(e.target.value)}
								onKeyDown={handleKeyDown}
								placeholder={UI.placeholder}
								className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none"
							/>
							<button
								onClick={sendMessage}
								disabled={loading || !input.trim()}
								className="ml-2 bg-purple-textlight text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-purple-text transition disabled:opacity-50"
							>
								<svg _ngcontent-stl-c15="" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" style={{ transform: 'none' }}><path _ngcontent-stl-c15="" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path></svg>
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

		<button
			onMouseEnter={handleMouseEnter}
			onClick={() => !open && setOpen(true)}
			aria-haspopup="dialog"
			aria-expanded={open}
			className={
				'fixed bg-purple-text cursor-pointer bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-xl transition-opacity duration-300 ' +
				(open ? 'opacity-0 pointer-events-none' : 'opacity-100')
			}
		>
			{/* SVG chat icon */}
			<svg width="32" height="32" viewBox="0 0 32 32" fill="none">
				<circle cx="16" cy="16" r="16" fill="none" />
				<rect x="8" y="10" width="16" height="10" rx="4" fill="white" />
				<circle cx="12" cy="15" r="1.5" fill="#6c2eb7" />
				<circle cx="20" cy="15" r="1.5" fill="#6c2eb7" />
			</svg>
		</button>
		</div>
	);
};

export default ChatWidget;
