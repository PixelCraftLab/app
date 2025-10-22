import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/colors';

export default function Index() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace('/auth');
      } else {
        switch (user.role) {
          case 'patient':
            router.replace('/(patient)/home' as any);
            break;
          case 'hospital_authority':
            router.replace('/(hospital)/home' as any);
            break;
          case 'hospital_doctor':
            router.replace('/(doctor)/home' as any);
            break;
          case 'pg_student':
            router.replace('/(student)/home' as any);
            break;
          default:
            router.replace('/auth');
        }
      }
    }
  }, [user, loading]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.dark.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
});