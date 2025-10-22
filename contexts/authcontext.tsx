import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { User, UserRole } from '@/types';

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = useCallback(async (email: string, password: string, role: UserRole) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      role,
      email,
      verified: role === 'pg_student' ? false : true,
    };

    if (role === 'hospital_authority' || role === 'hospital_doctor') {
      newUser.hospitalName = 'Sample Hospital';
    }

    if (role === 'hospital_doctor') {
      newUser.creditScore = 0;
    }

    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  const register = useCallback(async (
    email: string,
    password: string,
    role: UserRole,
    additionalData?: Record<string, string | boolean | number>
  ) => {
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      role,
      email,
      verified: role === 'pg_student' ? false : true,
      ...additionalData,
    };

    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  }, [user]);

  return useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      updateUser,
    }),
    [user, loading, login, register, logout, updateUser]
  );
});
