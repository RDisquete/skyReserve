import { describe, it, expect, beforeEach } from 'vitest';
import { useThemeStore } from '../store/themeStore';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ isDark: false });
  });

  it('should have isDark as false by default', () => {
    const { isDark } = useThemeStore.getState();
    expect(isDark).toBe(false);
  });

  it('should toggle theme when toggleTheme is called', () => {
    const { toggleTheme } = useThemeStore.getState();
    
    expect(useThemeStore.getState().isDark).toBe(false);
    
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(true);
    
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(false);
  });

  it('should persist theme preference', () => {
    const { toggleTheme } = useThemeStore.getState();
    
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(true);
  });
});