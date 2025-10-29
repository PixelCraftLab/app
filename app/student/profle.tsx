import React from 'react';
import { User } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function StudentProfileScreen() {
  return (
    <PlaceholderScreen
      title="Student Profile"
      icon={User}
      iconColor={Colors.dark.secondary}
      description="Manage your verification status, upload medical credentials, and track your learning progress."
    />
  );
}
