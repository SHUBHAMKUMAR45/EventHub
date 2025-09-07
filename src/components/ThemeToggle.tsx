import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useThemeToggle } from '../contexts/ThemeContext';
import Button from './ui/Button';

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useThemeToggle();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      icon={isDarkMode ? Sun : Moon}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      className="p-2"
    />
  );
}