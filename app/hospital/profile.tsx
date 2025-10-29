import React from 'react';
import { User } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function HospitalProfileScreen() {
  return (
    <PlaceholderScreen
      title="Hospital Profile"
      icon={User}
      iconColor={Colors.dark.accent}
      description="Manage hospital settings, staff members, and system preferences."
    />
  );
}
