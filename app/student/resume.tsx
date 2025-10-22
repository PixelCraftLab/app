import React from 'react';
import { Award } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function ResumeScreen() {
  return (
    <PlaceholderScreen
      title="Medical Resume"
      icon={Award}
      iconColor={Colors.dark.secondary}
      description="Your professional resume automatically updates with verified ratings from 100+ doctors. Build your medical career with documented expertise."
    />
  );
}