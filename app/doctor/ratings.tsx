import React from 'react';
import { Star } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function RatingsScreen() {
  return (
    <PlaceholderScreen
      title="Rate Students"
      icon={Star}
      iconColor={Colors.dark.warning}
      description="Review PG student opinions and rate them on a scale of 1-10. Your feedback shapes future medical professionals."
    />
  );
}
