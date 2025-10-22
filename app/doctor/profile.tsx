import React from 'react';
import { User } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function DoctorProfileScreen() {
  return (
    <PlaceholderScreen
      title="Doctor Profile"
      icon={User}
      iconColor={Colors.dark.primary}
      description="Manage your professional profile, specialization, and teaching preferences."
    />
  );
}
