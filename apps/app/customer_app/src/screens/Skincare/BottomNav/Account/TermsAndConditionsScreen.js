import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev, AppTheme } from '../../../../constants/AppTheme';
import { contentService } from '../../../../services/contentService';

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  // You can pass a custom slug, defaults to 'terms-and-conditions'
  const slug = route.params?.slug || 'terms-and-conditions';

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const article = await contentService.getArticleBySlug(slug);
        
        let parsedContent = null;
        if (article && article.contentJson) {
          parsedContent = JSON.parse(article.contentJson);
        }
        setContent({ title: article?.title || 'Terms & Conditions', blocks: parsedContent?.blocks || [] });
      } catch (error) {
        console.error('Error fetching terms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [slug]);

  const renderBlock = (block, index) => {
    switch (block.type) {
      case 'heading':
        return <Text key={index} style={styles.mainHeading}>{block.text}</Text>;
      case 'subheading':
        return <Text key={index} style={styles.subHeading}>{block.text}</Text>;
      case 'paragraph':
        return <Text key={index} style={styles.paragraph}>{block.text}</Text>;
      case 'bullet':
        return (
          <View key={index} style={styles.bulletRow}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.bulletText}>{block.text}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{content?.title || 'Terms & Conditions'}</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <ActivityIndicator size="large" color={AppTheme.colors.primary} style={{ marginTop: scalev(40) }} />
          ) : content && content.blocks.length > 0 ? (
            content.blocks.map((block, idx) => renderBlock(block, idx))
          ) : (
            <Text style={styles.paragraph}>No terms and conditions found.</Text>
          )}
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
    paddingHorizontal: scaleh(25),
    paddingTop: scalev(25),
    paddingBottom: scalev(50),
  },
  mainHeading: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(15),
  },
  subHeading: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: scalev(15),
    marginBottom: scalev(10),
  },
  paragraph: {
    fontSize: scaleh(14),
    color: '#333333',
    lineHeight: scalev(22),
    marginBottom: scalev(15),
    fontWeight: '400',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scalev(10),
    paddingLeft: scaleh(5),
  },
  bulletPoint: {
    fontSize: scaleh(16),
    color: '#333333',
    marginRight: scaleh(10),
    lineHeight: scalev(20),
  },
  bulletText: {
    fontSize: scaleh(14),
    color: '#333333',
    lineHeight: scalev(22),
    flex: 1,
  },
});

export default TermsAndConditionsScreen;
