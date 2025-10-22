import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { AlertCircle, FileText, Eye, MessageCircle, Activity } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { mockPatientCases } from '@/mocks/data';
import { PatientCase } from '@/types';

export default function PatientDashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const [cases] = useState<PatientCase[]>(mockPatientCases);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  };

  const renderSeverityBadge = (severity: string) => {
    const colors: Record<string, string> = {
      critical: Colors.dark.error,
      high: Colors.dark.warning,
      medium: '#F59E0B',
      low: Colors.dark.success,
    };

    return (
      <View style={[styles.badge, { backgroundColor: colors[severity] + '20' }]}>
        <Text style={[styles.badgeText, { color: colors[severity] }]}>
          {severity.toUpperCase()}
        </Text>
      </View>
    );
  };

  const renderCaseCard = (caseItem: PatientCase) => {
    const hasUrgentAlert = caseItem.aiAnalysis?.severity === 'high' || caseItem.aiAnalysis?.severity === 'critical';

    return (
      <View key={caseItem.id} style={styles.caseCard}>
        {hasUrgentAlert && caseItem.aiAnalysis?.warning && (
          <View style={styles.urgentAlert}>
            <AlertCircle size={20} color={Colors.dark.error} strokeWidth={2.5} />
            <Text style={styles.urgentText}>{caseItem.aiAnalysis.warning}</Text>
          </View>
        )}

        <View style={styles.caseHeader}>
          <View>
            <Text style={styles.caseId}>Case {caseItem.caseId}</Text>
            <Text style={styles.hospitalName}>{caseItem.hospitalName}</Text>
          </View>
          {caseItem.aiAnalysis && renderSeverityBadge(caseItem.aiAnalysis.severity)}
        </View>

        <View style={styles.divider} />

        <View style={styles.caseDetails}>
          <View style={styles.detailRow}>
            <FileText size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.detailText}>
              {caseItem.reports.length} Report{caseItem.reports.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MessageCircle size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.detailText}>
              {caseItem.pgOpinions.length} Opinion{caseItem.pgOpinions.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Activity size={16} color={Colors.dark.textSecondary} />
            <Text style={styles.detailText}>
              {new Date(caseItem.uploadDate).toLocaleDateString()}
            </Text>
          </View>
        </View>

        {caseItem.aiAnalysis?.detectedConditions && caseItem.aiAnalysis.detectedConditions.length > 0 && (
          <View style={styles.conditionsContainer}>
            <Text style={styles.conditionsTitle}>Detected Conditions:</Text>
            {caseItem.aiAnalysis.detectedConditions.map((condition, index) => (
              <Text key={index} style={styles.conditionText}>
                • {condition}
              </Text>
            ))}
          </View>
        )}

        {caseItem.pgOpinions.length > 0 && (
          <View style={styles.opinionPreview}>
            <Text style={styles.opinionTitle}>Latest Medical Opinion:</Text>
            <Text style={styles.opinionText} numberOfLines={3}>
              {caseItem.pgOpinions[0].opinion}
            </Text>
            {caseItem.pgOpinions[0].averageRating && (
              <View style={styles.ratingRow}>
                <Text style={styles.ratingLabel}>Professional Rating:</Text>
                <Text style={styles.ratingValue}>
                  {caseItem.pgOpinions[0].averageRating.toFixed(1)}/10
                </Text>
              </View>
            )}
          </View>
        )}

        <TouchableOpacity style={styles.viewButton}>
          <Eye size={18} color={Colors.dark.primary} />
          <Text style={styles.viewButtonText}>View Full Details</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const urgentCases = cases.filter(c => c.aiAnalysis?.severity === 'high' || c.aiAnalysis?.severity === 'critical');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Your Health Dashboard</Text>
          <Text style={styles.headerSubtitle}>Anonymous • Secure • AI-Powered</Text>
        </View>
        <View style={styles.headerIcon}>
          <Activity size={28} color={Colors.dark.primary} strokeWidth={2} />
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.dark.primary} />}
      >
        {urgentCases.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <AlertCircle size={20} color={Colors.dark.error} />
              <Text style={[styles.sectionTitle, { color: Colors.dark.error }]}>
                Requires Attention ({urgentCases.length})
              </Text>
            </View>
            {urgentCases.map(renderCaseCard)}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Cases ({cases.length})</Text>
          {cases.map(renderCaseCard)}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🔒 Your Privacy is Protected</Text>
          <Text style={styles.infoText}>
            All your personal information is completely hidden. Medical professionals only see anonymized case data.
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
    backgroundColor: Colors.dark.background,
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
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.dark.text,
  },
  caseCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  urgentAlert: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.dark.error + '15',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 10,
  },
  urgentText: {
    flex: 1,
    fontSize: 14,
    color: Colors.dark.error,
    lineHeight: 20,
    fontWeight: '500' as const,
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
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700' as const,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.dark.border,
    marginVertical: 12,
  },
  caseDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  conditionsContainer: {
    backgroundColor: Colors.dark.warning + '10',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.warning,
  },
  conditionsTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 6,
  },
  conditionText: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
  opinionPreview: {
    backgroundColor: Colors.dark.primary + '10',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
  },
  opinionTitle: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 6,
  },
  opinionText: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: Colors.dark.textSecondary,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: Colors.dark.primary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: Colors.dark.primary + '15',
    gap: 8,
  },
  viewButtonText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.dark.primary,
  },
  infoCard: {
    backgroundColor: Colors.dark.accent + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.accent,
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
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
