// UMD/ESM entry for SoulvexAI ChatWidget
import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './ChatWidget';
import './styles/tailwind.css';

window.SoulvexChatWidget = {
    mount: function(opts = {}) {
        const target = document.querySelector(opts.target || '#root');
        if (!target) return;
        const root = ReactDOM.createRoot(target);
        root.render(<ChatWidget {...opts.props} />);
    }
};
