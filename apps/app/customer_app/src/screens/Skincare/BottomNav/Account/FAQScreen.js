import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, LayoutAnimation, UIManager, Platform, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { scaleh, scalev } from '../../../../constants/AppTheme';
import { useSelector } from 'react-redux';
import { contentService } from '../../../../services/contentService';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const FAQScreen = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const [expandedId, setExpandedId] = useState('order-5');

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await contentService.getFaqs();
        // Assuming API returns array of sections or array of faqs
        if (Array.isArray(response)) {
          setFaqs(response);
        } else if (response.data) {
          setFaqs(response.data);
        }
      } catch (error) {
        console.log('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>FAQ</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.mainHeading}>Frequently Asked Questions</Text>
          
          {loading ? (
            <ActivityIndicator size="large" color={isCosmetics ? '#FF0069' : '#333'} style={{ marginTop: 50 }} />
          ) : (
            faqs.map((sectionData, index) => (
            <View key={index} style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{sectionData.section}</Text>
              
              {sectionData.items.map((item) => {
                const isExpanded = expandedId === item.id;
                
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    activeOpacity={0.9} 
                    onPress={() => toggleExpand(item.id)}
                    style={styles.faqCardWrapper}
                  >
                    <LinearGradient
                      colors={isCosmetics ? ['#FFF0F5', '#FFF0F5'] : ['#FF006926', '#FFD49826']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.faqGradientBg}
                    >
                      <View style={styles.faqQuestionRow}>
                        <Text style={styles.faqQuestionText}>{item.question}</Text>
                        <Icon name={isExpanded ? "minus" : "plus"} size={scaleh(18)} color={isCosmetics ? "#FF0069" : "#333333"} style={styles.faqIcon} />
                      </View>
                      
                      {isExpanded && (
                        <View style={styles.faqAnswerContainer}>
                          <Text style={styles.faqAnswerText}>{item.answer}</Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>
          )))}
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    marginTop: scalev(35),
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: scaleh(5),
  },
  headerTitle: {
    fontSize: scaleh(18),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(25),
    paddingBottom: scalev(50),
  },
  mainHeading: {
    fontSize: scaleh(18),
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: scalev(25),
  },
  sectionContainer: {
    marginBottom: scalev(10),
  },
  sectionTitle: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#333333',
    marginBottom: scalev(15),
    marginLeft: scaleh(5),
  },
  faqCardWrapper: {
    marginBottom: scalev(12),
    borderRadius: scaleh(10),
    overflow: 'hidden',
  },
  faqGradientBg: {
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(15),
    borderRadius: scaleh(10),
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  faqQuestionText: {
    flex: 1,
    fontSize: scaleh(13),
    color: '#333333',
    fontWeight: '500',
    lineHeight: scalev(18),
    paddingRight: scaleh(10),
  },
  faqIcon: {
    marginTop: scalev(2),
  },
  faqAnswerContainer: {
    marginTop: scalev(15),
  },
  faqAnswerText: {
    fontSize: scaleh(11),
    color: '#4A4A4A',
    lineHeight: scalev(16),
  },
});

export default FAQScreen;
