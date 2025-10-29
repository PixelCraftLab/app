import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { GraduationCap, FileText, Award, Star, TrendingUp } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { mockPendingReviewCases } from '@/mocks/data';

export default function StudentDashboard() {
  const stats = [
    { label: 'Cases Reviewed', value: '45', icon: FileText, color: Colors.dark.secondary },
    { label: 'Avg Rating', value: '8.5', icon: Star, color: Colors.dark.warning },
    { label: 'Resume Score', value: '892', icon: TrendingUp, color: Colors.dark.success },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>PG Student Portal</Text>
          <Text style={styles.headerSubtitle}>Review & Learn</Text>
        </View>
        <View style={styles.headerIcon}>
          <GraduationCap size={28} color={Colors.dark.secondary} strokeWidth={2} />
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Cases ({mockPendingReviewCases.length})</Text>
          {mockPendingReviewCases.map((caseItem) => (
            <TouchableOpacity key={caseItem.id} style={styles.caseCard}>
              <View style={styles.caseHeader}>
                <View>
                  <Text style={styles.caseId}>Case {caseItem.caseId}</Text>
                  <Text style={styles.hospitalName}>{caseItem.hospitalName}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{caseItem.aiAnalysis?.severity.toUpperCase()}</Text>
                </View>
              </View>
              <Text style={styles.conditionText} numberOfLines={2}>
                {caseItem.aiAnalysis?.detectedConditions.join(', ')}
              </Text>
              <View style={styles.reportsRow}>
                <FileText size={14} color={Colors.dark.textSecondary} />
                <Text style={styles.reportsText}>{caseItem.reports.length} Reports</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.warningCard}>
          <Award size={24} color={Colors.dark.warning} strokeWidth={2} />
          <Text style={styles.warningTitle}>Important Notice</Text>
          <Text style={styles.warningText}>
            All opinions must be genuine and medically sound. AI-generated content is strictly prohibited and will result in immediate account termination.
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
    marginBottom: 24,
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 12,
  },
  caseCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  caseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  caseId: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  hospitalName: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
  },
  badge: {
    backgroundColor: Colors.dark.warning + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: Colors.dark.warning,
    letterSpacing: 0.5,
  },
  conditionText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    marginBottom: 10,
  },
  reportsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reportsText: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
  },
  warningCard: {
    backgroundColor: Colors.dark.warning + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.warning,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  warningTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginTop: 12,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
