import React, { createContext, useContext, useEffect, useState } from 'react';

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Then check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        // Update localStorage when theme changes
        localStorage.setItem('theme', theme);
        
        // Update document class
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Toggle theme function
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    // Value object to be provided by the context
    const themeContextValue = {
        theme,
        isDarkMode: theme === 'dark', // For backward compatibility
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeContextValue}>
            <div className={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};