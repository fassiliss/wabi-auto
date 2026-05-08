'use client';
import { useEffect, useSyncExternalStore } from 'react';

const themeChangeEvent = 'wabi-theme-change';

function getPreferredDarkMode() {
    if (typeof window === 'undefined') {
        return false;
    }

    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ||
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function subscribeToThemeChanges(callback: () => void) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    window.addEventListener('storage', callback);
    window.addEventListener(themeChangeEvent, callback);
    mediaQuery.addEventListener('change', callback);

    return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener(themeChangeEvent, callback);
        mediaQuery.removeEventListener('change', callback);
    };
}

function getServerThemeSnapshot() {
    return false;
}

export default function ThemeToggle() {
    const darkMode = useSyncExternalStore(
        subscribeToThemeChanges,
        getPreferredDarkMode,
        getServerThemeSnapshot,
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        localStorage.setItem('theme', darkMode ? 'light' : 'dark');
        window.dispatchEvent(new Event(themeChangeEvent));
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="theme-toggle-btn"
            aria-label="Toggle dark mode"
            style={{
                background: darkMode ? '#374151' : '#f3f4f6',
                color: darkMode ? '#f9fafb' : '#111827',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '20px',
                transition: 'all 0.3s ease',
                marginLeft: '15px'
            }}
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}
