import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Bell, Clock, Pill, Check } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { mockPatientCases } from '@/mocks/data';

export default function MedicationsScreen() {
  const medications = mockPatientCases
    .flatMap(c => c.medications || [])
    .filter(m => m);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Medications</Text>
          <Text style={styles.headerSubtitle}>AI-Powered Reminders</Text>
        </View>
        <View style={styles.headerIcon}>
          <Pill size={28} color={Colors.dark.primary} strokeWidth={2} />
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {medications.length === 0 ? (
          <View style={styles.emptyState}>
            <Pill size={64} color={Colors.dark.textMuted} strokeWidth={1.5} />
            <Text style={styles.emptyText}>No medications yet</Text>
          </View>
        ) : (
          medications.map((med) => (
            <View key={med.id} style={styles.medCard}>
              <View style={styles.medHeader}>
                <View style={styles.medIconWrapper}>
                  <Pill size={20} color={Colors.dark.primary} strokeWidth={2} />
                </View>
                <View style={styles.medInfo}>
                  <Text style={styles.medName}>{med.name}</Text>
                  <Text style={styles.medDosage}>{med.dosage}</Text>
                </View>
                {med.taken ? (
                  <View style={styles.takenBadge}>
                    <Check size={16} color={Colors.dark.success} strokeWidth={3} />
                  </View>
                ) : null}
              </View>
              <View style={styles.medSchedule}>
                <Clock size={14} color={Colors.dark.textSecondary} />
                <Text style={styles.scheduleText}>{med.frequency}</Text>
              </View>
              <View style={styles.medTimes}>
                {med.time.map((t, i) => (
                  <View key={i} style={styles.timeChip}>
                    <Text style={styles.timeText}>{t}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity style={styles.reminderButton}>
                <Bell size={16} color={Colors.dark.primary} />
                <Text style={styles.reminderText}>Set Reminder</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>🤖 Your AI Health Partner</Text>
          <Text style={styles.aiText}>
            I&apos;ll remind you to take your medications on time and monitor your health progress.
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.dark.textMuted,
    marginTop: 16,
  },
  medCard: {
    backgroundColor: Colors.dark.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  medHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  medIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  medInfo: {
    flex: 1,
  },
  medName: {
    fontSize: 17,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  medDosage: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  takenBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.dark.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medSchedule: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  scheduleText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
  },
  medTimes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  timeChip: {
    backgroundColor: Colors.dark.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.dark.borderLight,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '500' as const,
    color: Colors.dark.text,
  },
  reminderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: Colors.dark.primary + '15',
    marginTop: 8,
  },
  reminderText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.primary,
  },
  aiCard: {
    backgroundColor: Colors.dark.secondary + '10',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.secondary,
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  aiText: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
});
