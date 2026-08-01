import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleh, scalev, AppTheme } from '../../../../constants/AppTheme';
import { contentService } from '../../../../services/contentService';

const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.faqItemContainer}>
      <TouchableOpacity 
        style={styles.faqQuestionRow} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={scaleh(18)} color="#1a1a1a" />
      </TouchableOpacity>
      {expanded && (
        <Text style={styles.faqAnswerText}>{answer}</Text>
      )}
    </View>
  );
};

const MembershipFAQScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const data = await contentService.getFaqs();
        // Since backend FAQ might just return a flat array, group by category if it exists,
        // or just render as a flat list if category doesn't exist
        setFaqs(data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  // Group FAQs by category
  const groupedFaqs = faqs.reduce((acc, faq) => {
    const category = faq.category || 'General';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {});

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={scaleh(28)} color="#1a1a1a" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.pageTitle}>Program Details</Text>

        {loading ? (
          <ActivityIndicator size="large" color={AppTheme.colors.primary} style={{ marginTop: scalev(40) }} />
        ) : (
          Object.keys(groupedFaqs).map((category, index) => (
            <View key={category} style={styles.categorySection}>
              {category !== 'General' && (
                <Text style={styles.categoryTitle}>{category}</Text>
              )}
              {groupedFaqs[category].map((faq) => (
                <FaqItem 
                  key={faq.id || faq.question} 
                  question={faq.question} 
                  answer={faq.answer} 
                />
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(10),
  },
  backBtn: {
    padding: scaleh(5),
  },
  scrollContent: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(40),
  },
  pageTitle: {
    fontSize: scaleh(22),
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: scalev(10),
    marginBottom: scalev(20),
  },
  categorySection: {
    marginBottom: scalev(15),
  },
  categoryTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: scalev(20),
    marginBottom: scalev(15),
  },
  faqItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    paddingVertical: scalev(15),
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestionText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    fontWeight: '500',
    flex: 1,
    paddingRight: scaleh(15),
    lineHeight: scalev(20),
  },
  faqAnswerText: {
    fontSize: scaleh(13),
    color: '#666666',
    marginTop: scalev(12),
    lineHeight: scalev(18),
  }
});

export default MembershipFAQScreen;
