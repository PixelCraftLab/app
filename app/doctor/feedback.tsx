import React from 'react';
import { MessageSquare } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function FeedbackScreen() {
  return (
    <PlaceholderScreen
      title="Feedback"
      icon={MessageSquare}
      iconColor={Colors.dark.primary}
      description="Send detailed feedback to PG students to help them improve their diagnostic and analytical skills."
    />
  );
}
