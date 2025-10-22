import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stethoscope, Star, Users, TrendingUp, Award } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';
import Colors from '@/constants/colors';

export default function DoctorDashboard() {
  const { user } = useAuth();
  
  const creditScore = user?.creditScore ?? 0;

  const stats = [
    { label: 'Credit Score', value: creditScore.toString(), icon: Award, color: Colors.dark.warning },
    { label: 'Reviews Given', value: '127', icon: Star, color: Colors.dark.primary },
    { label: 'Students Rated', value: '34', icon: Users, color: Colors.dark.accent },
  ];

  const pendingReviews = [
    { id: '1', caseId: 'PC-2025-1847', student: 'PG Student #3847', specialty: 'General Surgery' },
    { id: '2', caseId: 'PC-2025-2193', student: 'PG Student #2901', specialty: 'Internal Medicine' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Doctor Portal</Text>
          <Text style={styles.headerSubtitle}>Rate & Guide Students</Text>
        </View>
        <View style={styles.headerIcon}>
          <Stethoscope size={28} color={Colors.dark.primary} strokeWidth={2} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.creditScoreCard}>
          <View style={styles.creditScoreHeader}>
            <Award size={24} color={Colors.dark.warning} strokeWidth={2} />
            <Text style={styles.creditScoreLabel}>Your Credit Score</Text>
          </View>
          <Text style={styles.creditScoreValue}>{creditScore}</Text>
          <Text style={styles.creditScoreDescription}>
            Earn credits by rating and reviewing PG student opinions
          </Text>
        </View>

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
          <Text style={styles.sectionTitle}>Pending Reviews ({pendingReviews.length})</Text>
          {pendingReviews.map((review) => (
            <TouchableOpacity key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View>
                  <Text style={styles.reviewCaseId}>Case {review.caseId}</Text>
                  <Text style={styles.reviewStudent}>{review.student}</Text>
                </View>
                <View style={styles.specialtyBadge}>
                  <Text style={styles.specialtyText}>{review.specialty}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.rateButton}>
                <Star size={16} color={Colors.dark.warning} strokeWidth={2} />
                <Text style={styles.rateButtonText}>Rate Opinion</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoCard}>
          <TrendingUp size={24} color={Colors.dark.success} strokeWidth={2} />
          <Text style={styles.infoTitle}>Shape Future Doctors</Text>
          <Text style={styles.infoText}>
            Your ratings help PG students build verified medical resumes. 100+ doctor ratings validate their expertise.
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
  creditScoreCard: {
    backgroundColor: Colors.dark.warning + '10',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.dark.warning + '30',
    alignItems: 'center',
  },
  creditScoreHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  creditScoreLabel: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.text,
  },
  creditScoreValue: {
    fontSize: 48,
    fontWeight: '700' as const,
    color: Colors.dark.warning,
    marginBottom: 8,
  },
  creditScoreDescription: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
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
  reviewCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewCaseId: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  reviewStudent: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
  },
  specialtyBadge: {
    backgroundColor: Colors.dark.primary + '20',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  specialtyText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.dark.primary,
  },
  rateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.dark.warning + '15',
  },
  rateButtonText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.warning,
  },
  infoCard: {
    backgroundColor: Colors.dark.success + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.success,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
