import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import { contentService } from '../../../../services/contentService';
import { useSelector } from 'react-redux';

const ContactUsScreen = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    setLoading(true);
    try {
      await contentService.submitTicket({ subject, message, domain: activeDomain });
      Alert.alert('Success', 'Your ticket has been submitted. We will get back to you shortly.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to submit ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: scaleh(24) }} />
      </View>
      <View style={styles.headerDivider} />

      <View style={styles.content}>
        <Text style={styles.label}>Subject</Text>
        <TextInput 
          style={[styles.input, isCosmetics && { borderColor: '#FFC2D1' }]} 
          placeholder="e.g. Order Issue, Payment Issue" 
          value={subject}
          onChangeText={setSubject}
        />

        <Text style={styles.label}>Message</Text>
        <TextInput 
          style={[styles.input, styles.textArea, isCosmetics && { borderColor: '#FFC2D1' }]} 
          placeholder="Describe your issue..." 
          multiline 
          numberOfLines={6}
          textAlignVertical="top"
          value={message}
          onChangeText={setMessage}
        />

        <TouchableOpacity 
          style={[styles.submitButton, isCosmetics && { backgroundColor: '#FF0069' }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitText}>Submit Ticket</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: scaleh(18), fontWeight: '600', color: '#1A1A1A' },
  headerDivider: { height: 1, backgroundColor: '#E0E0E0' },
  content: { padding: scaleh(20) },
  label: { fontSize: scaleh(14), fontWeight: '600', marginBottom: scalev(10), color: '#333' },
  input: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: scaleh(8),
    padding: scaleh(15),
    fontSize: scaleh(14),
    marginBottom: scalev(20),
    backgroundColor: '#F9F9F9'
  },
  textArea: {
    height: scalev(150),
  },
  submitButton: {
    backgroundColor: AppTheme.colors.primary,
    paddingVertical: scalev(15),
    borderRadius: scaleh(8),
    alignItems: 'center',
    marginTop: scalev(10)
  },
  submitText: {
    color: '#FFF',
    fontSize: scaleh(16),
    fontWeight: '700'
  }
});

export default ContactUsScreen;
