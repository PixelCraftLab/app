import React from 'react';
import { Upload } from 'lucide-react-native';
import PlaceholderScreen from '@/components/PlaceholderScreen';
import Colors from '@/constants/colors';

export default function UploadScreen() {
  return (
    <PlaceholderScreen
      title="Upload Reports"
      icon={Upload}
      iconColor={Colors.dark.accent}
      description="Upload patient medical reports for AI analysis and PG student review. Reports are automatically anonymized to protect patient privacy."
    />
  );
}