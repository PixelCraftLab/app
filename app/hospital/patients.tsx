import React from 'react';
import { Users } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function PatientsScreen() {
  return (
    <PlaceholderScreen
      title="Patients"
      icon={Users}
      iconColor={Colors.dark.accent}
      description="View and manage all patient cases. Track review status, AI analysis results, and PG student opinions."
    />
  );
}