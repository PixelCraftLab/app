import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Building2, Upload, Users, Activity, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';

export default function HospitalDashboard() {
  const stats = [
    { label: 'Total Cases', value: '247', icon: Activity, color: Colors.dark.primary },
    { label: 'Pending Reviews', value: '12', icon: TrendingUp, color: Colors.dark.warning },
    { label: 'Active Patients', value: '89', icon: Users, color: Colors.dark.accent },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Authority Dashboard</Text>
          <Text style={styles.headerSubtitle}>Hospital Management Portal</Text>
        </View>
        <View style={styles.headerIcon}>
          <Building2 size={28} color={Colors.dark.accent} strokeWidth={2} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                <stat.icon size={24} color={stat.color} strokeWidth={2} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadCard} activeOpacity={0.7}>
          <View style={styles.uploadIconWrapper}>
            <Upload size={32} color={Colors.dark.accent} strokeWidth={2} />
          </View>
          <Text style={styles.uploadTitle}>Upload Patient Report</Text>
          <Text style={styles.uploadText}>
            Securely upload medical reports for AI analysis and professional review by PG students
          </Text>
        </TouchableOpacity>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Patient Privacy Protected</Text>
          <Text style={styles.infoText}>
            All uploaded data is automatically anonymized. Patient identities are protected while enabling quality medical education.
          </Text>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
  },
  uploadCard: {
    backgroundColor: Colors.dark.accent + '15',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.dark.accent + '30',
    marginBottom: 20,
  },
  uploadIconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.dark.accent + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  uploadText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: Colors.dark.primary + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
    padding: 16,
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
});
