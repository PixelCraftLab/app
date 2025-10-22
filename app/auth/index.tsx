import { router } from 'expo-router';
import { Activity, Building2, GraduationCap, Shield, Stethoscope, Upload } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { generateText } from '@rork/toolkit-sdk';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

type AuthMode = 'select' | 'login' | 'register' | 'hospital_select';
type HospitalType = 'authority' | 'doctor' | null;

export default function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<AuthMode>('select');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [universityProofUri, setUniversityProofUri] = useState<string>('');
  const [idCardUri, setIdCardUri] = useState<string>('');
  const [verifyingProof, setVerifyingProof] = useState(false);
  const [proofVerified, setProofVerified] = useState(false);
  const [verifyingIdCard, setVerifyingIdCard] = useState(false);
  const [idCardVerified, setIdCardVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    if (role === 'hospital_authority' || role === 'hospital_doctor') {
      setSelectedRole(role);
      setMode('login');
    } else {
      setSelectedRole(role);
      setMode('login');
    }
    setError('');
  };

  const handleHospitalTypeSelect = (type: HospitalType) => {
    const role = type === 'authority' ? 'hospital_authority' : 'hospital_doctor';
    setSelectedRole(role as UserRole);
    setMode('login');
    setError('');
  };

  const pickUniversityProof = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUniversityProofUri(result.assets[0].uri);
      await verifyUniversityProof(result.assets[0].uri);
    }
  };

  const verifyUniversityProof = async (uri: string) => {
    setVerifyingProof(true);
    setError('');
    
    try {
      const response = await generateText({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image and determine if it is a legitimate university admission proof or medical student ID card. Look for official seals, university logos, student information, and signs of authenticity. Respond with ONLY "VERIFIED" if it appears to be a genuine university document, or "REJECTED: [reason]" if it appears fake or invalid.'
              },
              {
                type: 'image',
                image: uri
              }
            ]
          }
        ]
      });

      if (response.toUpperCase().includes('VERIFIED')) {
        setProofVerified(true);
        Alert.alert('Success', 'University proof verified successfully!');
      } else {
        setProofVerified(false);
        setUniversityProofUri('');
        const reason = response.replace(/REJECTED:/i, '').trim();
        Alert.alert('Verification Failed', reason || 'The uploaded document could not be verified as a legitimate university proof. Please upload a valid document.');
      }
    } catch (err) {
      console.error('Verification error:', err);
      Alert.alert('Error', 'Failed to verify document. Please try again.');
      setUniversityProofUri('');
    } finally {
      setVerifyingProof(false);
    }
  };

  const pickIdCard = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setIdCardUri(result.assets[0].uri);
      await verifyIdCard(result.assets[0].uri);
    }
  };

  const verifyIdCard = async (uri: string) => {
    setVerifyingIdCard(true);
    setError('');
    
    try {
      const roleText = selectedRole === 'hospital_doctor' ? 'doctor' : 'hospital authority/staff';
      const response = await generateText({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this image and determine if it is a legitimate ${roleText} ID card. Look for official hospital/medical institution logos, employee information, photo, designation, and signs of authenticity. Respond with ONLY "VERIFIED" if it appears to be a genuine ${roleText} ID card, or "REJECTED: [reason]" if it appears fake or invalid.`
              },
              {
                type: 'image',
                image: uri
              }
            ]
          }
        ]
      });

      if (response.toUpperCase().includes('VERIFIED')) {
        setIdCardVerified(true);
        Alert.alert('Success', 'ID card verified successfully!');
      } else {
        setIdCardVerified(false);
        setIdCardUri('');
        const reason = response.replace(/REJECTED:/i, '').trim();
        Alert.alert('Verification Failed', reason || 'The uploaded ID card could not be verified as legitimate. Please upload a valid ID card.');
      }
    } catch (err) {
      console.error('ID verification error:', err);
      Alert.alert('Error', 'Failed to verify ID card. Please try again.');
      setIdCardUri('');
    } finally {
      setVerifyingIdCard(false);
    }
  };

  const handleAuth = async () => {
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (selectedRole === 'patient' && mode === 'register') {
      if (email.includes(' ') || /[A-Z]/.test(email.split('@')[0])) {
        setError('For privacy, use an anonymous email without your name');
        return;
      }
    }

    if (selectedRole === 'pg_student' && mode === 'register') {
      if (!universityProofUri || !proofVerified) {
        setError('Please upload and verify your university admission proof');
        return;
      }
    }

    if ((selectedRole === 'hospital_doctor' || selectedRole === 'hospital_authority') && mode === 'register') {
      if (!idCardUri || !idCardVerified) {
        setError('Please upload and verify your ID card');
        return;
      }
    }

    setLoading(true);
    try {
      const additionalData: Record<string, string | boolean | number> = {};
      
      if (selectedRole === 'pg_student' && mode === 'register') {
        additionalData.universityProofUrl = universityProofUri;
        additionalData.universityProofVerified = proofVerified;
      }

      if ((selectedRole === 'hospital_doctor' || selectedRole === 'hospital_authority') && mode === 'register') {
        additionalData.idCardUrl = idCardUri;
        additionalData.idCardVerified = idCardVerified;
        
        if (selectedRole === 'hospital_doctor') {
          additionalData.creditScore = 0;
        }
      }

      if (mode === 'login') {
        await login(email, password, selectedRole);
      } else {
        await register(email, password, selectedRole, additionalData);
      }
      
      switch (selectedRole) {
        case 'patient':
          router.replace('/(patient)/home' as any);
          break;
        case 'hospital_authority':
          router.replace('/(hospital)/home' as any);
          break;
        case 'hospital_doctor':
          router.replace('/(doctor)/home' as any);
          break;
        case 'pg_student':
          router.replace('/(student)/home' as any);
          break;
      }
    } catch {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetToRoleSelection = () => {
    setMode('select');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setUniversityProofUri('');
    setProofVerified(false);
    setIdCardUri('');
    setIdCardVerified(false);
    setError('');
  };

  if (mode === 'select') {
    return (
      <View style={styles.bgContainer}>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <Activity size={40} color={Colors.dark.primary} strokeWidth={2.5} />
            </View>
            <Text style={styles.title}>MediConnect AI</Text>
            <Text style={styles.subtitle}>
              Revolutionizing Medical Education with AI-Powered Patient Care
            </Text>
          </View>

          <View style={styles.rolesContainer}>
            <Text style={styles.sectionTitle}>Select Your Role</Text>
            
            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleRoleSelect('patient')}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: Colors.dark.primary + '20' }]}>
                <Shield size={32} color={Colors.dark.primary} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>Patient</Text>
                <Text style={styles.roleDescription}>
                  Anonymous health tracking with AI analysis and expert opinions
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => setMode('hospital_select' as AuthMode)}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: Colors.dark.accent + '20' }]}>
                <Building2 size={32} color={Colors.dark.accent} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>Hospital Staff</Text>
                <Text style={styles.roleDescription}>
                  Authority or Doctor access to manage patient care
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleRoleSelect('pg_student')}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: Colors.dark.secondary + '20' }]}>
                <GraduationCap size={32} color={Colors.dark.secondary} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>PG Medical Student</Text>
                <Text style={styles.roleDescription}>
                  Review cases, provide opinions, and build your medical resume
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Secure • Anonymous • AI-Powered
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (mode === 'hospital_select') {
    return (
      <View style={styles.bgContainer}>
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <TouchableOpacity onPress={resetToRoleSelection} style={styles.backButtonTop}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={[styles.iconWrapper, { backgroundColor: Colors.dark.surface }]}>
              <Building2 size={40} color={Colors.dark.accent} strokeWidth={2.5} />
            </View>
            <Text style={styles.title}>Hospital Staff</Text>
            <Text style={styles.subtitle}>
              Select your role in the hospital
            </Text>
          </View>

          <View style={styles.rolesContainer}>
            <Text style={styles.sectionTitle}>Choose Your Position</Text>
            
            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleHospitalTypeSelect('authority')}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: Colors.dark.accent + '20' }]}>
                <Upload size={32} color={Colors.dark.accent} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>Hospital Authority</Text>
                <Text style={styles.roleDescription}>
                  Upload patient reports and manage medical records
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.roleCard}
              onPress={() => handleHospitalTypeSelect('doctor')}
              activeOpacity={0.7}
            >
              <View style={[styles.roleIcon, { backgroundColor: Colors.dark.primary + '20' }]}>
                <Stethoscope size={32} color={Colors.dark.primary} strokeWidth={2} />
              </View>
              <View style={styles.roleContent}>
                <Text style={styles.roleTitle}>Doctor</Text>
                <Text style={styles.roleDescription}>
                  Review student opinions, rate feedback, and gain credit score
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  const getRoleColor = () => {
    switch (selectedRole) {
      case 'patient':
        return Colors.dark.primary;
      case 'hospital_authority':
        return Colors.dark.accent;
      case 'hospital_doctor':
        return Colors.dark.primary;
      case 'pg_student':
        return Colors.dark.secondary;
      default:
        return Colors.dark.primary;
    }
  };

  const getRoleIcon = () => {
    switch (selectedRole) {
      case 'patient':
        return <Shield size={24} color={getRoleColor()} strokeWidth={2} />;
      case 'hospital_authority':
        return <Upload size={24} color={getRoleColor()} strokeWidth={2} />;
      case 'hospital_doctor':
        return <Stethoscope size={24} color={getRoleColor()} strokeWidth={2} />;
      case 'pg_student':
        return <GraduationCap size={24} color={getRoleColor()} strokeWidth={2} />;
      default:
        return <Shield size={24} color={getRoleColor()} strokeWidth={2} />;
    }
  };

  const getRoleTitle = () => {
    switch (selectedRole) {
      case 'patient':
        return 'Patient';
      case 'hospital_authority':
        return 'Hospital Authority';
      case 'hospital_doctor':
        return 'Doctor';
      case 'pg_student':
        return 'PG Medical Student';
      default:
        return '';
    }
  };

  return (
    <View style={styles.bgContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
          <ScrollView contentContainerStyle={styles.authContainer} keyboardShouldPersistTaps="handled">
            <TouchableOpacity onPress={resetToRoleSelection} style={styles.backButton}>
              <Text style={styles.backButtonText}>← Change Role</Text>
            </TouchableOpacity>

            <View style={styles.authHeader}>
              <View style={[styles.authRoleIcon, { backgroundColor: getRoleColor() + '20' }]}>
                {getRoleIcon()}
              </View>
              <Text style={styles.authTitle}>
                {mode === 'login' ? 'Login as ' : 'Register as '}
                {getRoleTitle()}
              </Text>
            </View>

            <View style={styles.form}>
              {selectedRole === 'patient' && mode === 'register' && (
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    🔒 For your privacy, please create an anonymous email address that doesn&apos;t include your name
                  </Text>
                </View>
              )}

              {selectedRole === 'pg_student' && mode === 'register' && (
                <View style={styles.uploadSection}>
                  <Text style={styles.uploadLabel}>University Admission Proof *</Text>
                  <Text style={styles.uploadDescription}>
                    Upload your university admission proof or medical student ID for AI verification
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickUniversityProof}
                    disabled={verifyingProof}
                  >
                    <Upload size={20} color={Colors.dark.text} strokeWidth={2} />
                    <Text style={styles.uploadButtonText}>
                      {universityProofUri ? 'Change Document' : 'Upload Document'}
                    </Text>
                  </TouchableOpacity>

                  {verifyingProof && (
                    <View style={styles.verifyingContainer}>
                      <ActivityIndicator color={Colors.dark.secondary} />
                      <Text style={styles.verifyingText}>Verifying with AI...</Text>
                    </View>
                  )}

                  {universityProofUri && proofVerified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓ Document Verified</Text>
                    </View>
                  )}
                </View>
              )}

              {(selectedRole === 'hospital_doctor' || selectedRole === 'hospital_authority') && mode === 'register' && (
                <View style={styles.uploadSection}>
                  <Text style={styles.uploadLabel}>ID Card *</Text>
                  <Text style={styles.uploadDescription}>
                    Upload your {selectedRole === 'hospital_doctor' ? 'doctor' : 'hospital staff'} ID card for AI verification
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickIdCard}
                    disabled={verifyingIdCard}
                  >
                    <Upload size={20} color={Colors.dark.text} strokeWidth={2} />
                    <Text style={styles.uploadButtonText}>
                      {idCardUri ? 'Change ID Card' : 'Upload ID Card'}
                    </Text>
                  </TouchableOpacity>

                  {verifyingIdCard && (
                    <View style={styles.verifyingContainer}>
                      <ActivityIndicator color={Colors.dark.accent} />
                      <Text style={styles.verifyingText}>Verifying with AI...</Text>
                    </View>
                  )}

                  {idCardUri && idCardVerified && (
                    <View style={styles.verifiedBadge}>
                      <Text style={styles.verifiedText}>✓ ID Card Verified</Text>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={Colors.dark.textMuted}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.dark.textMuted}
                  secureTextEntry
                  autoCapitalize="none"
                />
              </View>

              {mode === 'register' && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    placeholderTextColor={Colors.dark.textMuted}
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </View>
              )}

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity
                style={[styles.authButton, { backgroundColor: getRoleColor() }]}
                onPress={handleAuth}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={styles.authButtonText}>
                  {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Register'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setError('');
                }}
                style={styles.toggleButton}
              >
                <Text style={styles.toggleButtonText}>
                  {mode === 'login'
                    ? "Don't have an account? Register"
                    : 'Already have an account? Login'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.dark.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: Colors.dark.primary,
  },
  title: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.dark.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  rolesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 16,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  roleIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleContent: {
    flex: 1,
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: Colors.dark.textSecondary,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: Colors.dark.textMuted,
    letterSpacing: 1,
  },
  authContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonTop: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.dark.primary,
    fontWeight: '500' as const,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  authRoleIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: Colors.dark.text,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  infoBox: {
    backgroundColor: Colors.dark.primary + '15',
    borderLeftWidth: 3,
    borderLeftColor: Colors.dark.primary,
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark.text,
    lineHeight: 20,
  },
  uploadSection: {
    marginBottom: 24,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  uploadDescription: {
    fontSize: 13,
    color: Colors.dark.textSecondary,
    marginBottom: 12,
    lineHeight: 18,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: Colors.dark.surface,
    borderWidth: 2,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 20,
  },
  uploadButtonText: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: Colors.dark.text,
  },
  verifyingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.dark.secondary + '15',
    borderRadius: 8,
  },
  verifyingText: {
    fontSize: 14,
    color: Colors.dark.secondary,
    fontWeight: '500' as const,
  },
  verifiedBadge: {
    marginTop: 12,
    padding: 12,
    backgroundColor: Colors.dark.success + '15',
    borderRadius: 8,
    alignItems: 'center',
  },
  verifiedText: {
    fontSize: 14,
    color: Colors.dark.success,
    fontWeight: '600' as const,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.dark.inputBg,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.dark.text,
  },
  errorText: {
    color: Colors.dark.error,
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  authButton: {
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600' as const,
  },
  toggleButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  toggleButtonText: {
    fontSize: 15,
    color: Colors.dark.textSecondary,
  },
});
