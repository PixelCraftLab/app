import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface PlaceholderScreenProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  description: string;
}

export default function PlaceholderScreen({
  title,
  subtitle,
  icon: Icon,
  iconColor = Colors.dark.primary,
  description,
}: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{title}</Text>
          {subtitle && <Text style={styles.headerSubtitle}>{subtitle}</Text>}
        </View>
        <View style={styles.headerIcon}>
          <Icon size={28} color={iconColor} strokeWidth={2} />
        </View>
      </View>

      <View style={styles.content}>
        <View style={[styles.iconWrapper, { backgroundColor: iconColor + '20' }]}>
          <Icon size={48} color={iconColor} strokeWidth={1.5} />
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
