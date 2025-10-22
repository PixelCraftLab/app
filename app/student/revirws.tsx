import React from 'react';
import { FileText } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function ReviewsScreen() {
  return (
    <PlaceholderScreen
      title="My Reviews"
      icon={FileText}
      iconColor={Colors.dark.secondary}
      description="View all your case reviews, ratings from professional doctors, and feedback to improve your medical analysis skills."
    />
  );
}