import { useThemeStore } from '../store/themeStore';
import { useAuthStore } from '../store/authStore';
import { describe, it, expect, beforeEach } from 'vitest';

describe('useThemeStore', () => {
  beforeEach(() => {
    useThemeStore.setState({ isDark: false });
  });

  it('should have isDark as false by default', () => {
    const { isDark } = useThemeStore.getState();
    expect(isDark).toBe(false);
  });

  it('should toggle theme', () => {
    const { toggleTheme } = useThemeStore.getState();
    
    expect(useThemeStore.getState().isDark).toBe(false);
    
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(true);
    
    toggleTheme();
    expect(useThemeStore.getState().isDark).toBe(false);
  });
});

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, isAdmin: false, loading: false, initialized: true });
  });

  it('should have user as null by default', () => {
    const { user, isAdmin } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAdmin).toBe(false);
  });

  it('should have loading as false by default', () => {
    const { loading, initialized } = useAuthStore.getState();
    expect(loading).toBe(false);
    expect(initialized).toBe(true);
  });

  it('should have initial values set correctly', () => {
    const state = useAuthStore.getState();
    
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('isAdmin');
    expect(state).toHaveProperty('loading');
    expect(state).toHaveProperty('initialized');
    expect(state).toHaveProperty('signIn');
    expect(state).toHaveProperty('signUp');
    expect(state).toHaveProperty('signOut');
    expect(state).toHaveProperty('initAuth');
    expect(state).toHaveProperty('fetchUserRole');
  });

  it('should have signIn function', () => {
    const { signIn } = useAuthStore.getState();
    expect(typeof signIn).toBe('function');
  });

  it('should have signUp function', () => {
    const { signUp } = useAuthStore.getState();
    expect(typeof signUp).toBe('function');
  });

  it('should have signOut function', () => {
    const { signOut } = useAuthStore.getState();
    expect(typeof signOut).toBe('function');
  });

  it('should have initAuth function', () => {
    const { initAuth } = useAuthStore.getState();
    expect(typeof initAuth).toBe('function');
  });

  it('should have fetchUserRole function', () => {
    const { fetchUserRole } = useAuthStore.getState();
    expect(typeof fetchUserRole).toBe('function');
  });
});