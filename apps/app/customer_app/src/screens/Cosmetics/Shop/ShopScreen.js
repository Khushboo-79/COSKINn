import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { scaleh, scalev } from '../../../constants/AppTheme';
import BottomNavBar from '../../../constants/BottomNavBar';
import SearchBarRow from '../../../components/SearchBarRow';

const SHOP_CATEGORIES = [
  { id: '1', name: 'FACE' },
  { id: '2', name: 'EYES' },
  { id: '3', name: 'LIPS' },
  { id: '4', name: 'NAILS' },
  { id: '5', name: 'TOOLS & BRUSHES' },
  { id: '6', name: 'PALETTES' },
  { id: '7', name: 'FRAGRANCE' },
  { id: '8', name: 'KITS & COMBOS' },
  { id: '9', name: 'GIFTS & ACCESSORIES' },
];

const ShopScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('CATEGORIES');

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      {/* Clickable Image Area (Pink Section) - Currently clear/transparent as requested */}
      <TouchableOpacity 
        style={styles.categoryImageArea} 
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CategoryDetail', { category: item.name })}
      >
      </TouchableOpacity>
      
      {/* Non-Clickable Text Area (White Section) */}
      <View style={styles.categoryTextRow}>
        <Text style={styles.categoryText}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../images/makeup/CosmeticBackImg.webp')}
        style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
        resizeMode="cover"
      />
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={{ paddingTop: 0, paddingBottom: scalev(10) }}>
           <SearchBarRow />
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
           <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('CATEGORIES')} activeOpacity={0.8}>
             <Text style={[styles.tabText, activeTab === 'CATEGORIES' && styles.activeTabText]}>CATEGORIES</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.tab} onPress={() => setActiveTab('COLLABS')} activeOpacity={0.8}>
             <Text style={[styles.tabText, activeTab === 'COLLABS' && styles.activeTabText]}>COLLABS</Text>
           </TouchableOpacity>
           
           <View style={[styles.activeLine, { left: activeTab === 'CATEGORIES' ? 0 : '50%' }]} />
        </View>

        {/* List */}
        {activeTab === 'CATEGORIES' && (
          <FlatList
            data={SHOP_CATEGORIES}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: scalev(80) }}
            renderItem={renderCategory}
          />
        )}

        {/* Collabs Tab Placeholder */}
        {activeTab === 'COLLABS' && (
          <LinearGradient
            colors={['#FF006926', '#FFD49826']}
            style={styles.collabsContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.collabsContent}>
              <View style={styles.emptyLogoBox}>
                <Text style={styles.emptyLogoText}>C</Text>
                <View style={styles.emptyLogoHeartTop}>
                  <Ionicons name="heart" size={scaleh(16)} color="#FF0069" />
                </View>
                <View style={styles.emptyLogoHeartBottom}>
                  <Ionicons name="heart" size={scaleh(20)} color="#FF0069" />
                </View>
              </View>

              <View style={styles.textContainerCosmetics}>
                <Text style={styles.titleTextLineCosmetics}>
                  Our <Text style={styles.titleHighlightCosmetics}>COLLABS</Text>
                </Text>
                <Text style={[styles.titleTextLineCosmetics, { marginBottom: scalev(40) }]}>
                  are <Text style={styles.titleHighlightCosmetics}>COMING SOON !</Text>
                </Text>
              </View>

              <Text style={styles.subtitleTextCosmetics}>Stay tuned for exciting collaborations</Text>

              <TouchableOpacity
                style={styles.addButtonCosmetics}
                onPress={() => setActiveTab('CATEGORIES')}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonTextCosmetics}>EXPLORE CATEGORIES</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        )}
      </SafeAreaView>

      <BottomNavBar 
        activeTab="shop" 
        onTabPress={(tabId) => {
          if (tabId === 'home') {
            navigation.navigate('Dashboard');
          }
          if (tabId === 'new') {
            navigation.navigate('NewScreen');
          }
          if (tabId === 'rewards') {
            navigation.navigate('RewardsScreen');
          }
          if (tabId === 'account') {
            navigation.navigate('AccountScreen');
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDCE6', 
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || scalev(30),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: scalev(45),
    position: 'relative',
    // Removed bottom border to match reference exactly
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  activeTabText: {
    fontWeight: '800', // Slightly bolder for active
  },
  activeLine: {
    position: 'absolute',
    bottom: 0,
    width: '50%',
    height: scalev(4), // Thicker line like reference
    backgroundColor: '#FFB2C9',
  },
  categoryContainer: {
    width: '100%',
  },
  categoryImageArea: {
    height: scalev(150), // Diameter 402*150 requested
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.01)', // Near-invisible color to ensure touch registers on Android
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  collabsContainer: {
    flex: 1,
    marginTop: scalev(-10), // pull up slightly
  },
  collabsContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  emptyLogoBox: {
    width: scaleh(90),
    height: scaleh(90),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(40),
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FF006930',
    backgroundColor: '#FF006908',
  },
  emptyLogoText: {
    fontSize: scaleh(70),
    fontWeight: '700',
    color: '#FF708C',
    fontStyle: 'italic',
    lineHeight: scaleh(85),
  },
  emptyLogoHeartTop: {
    position: 'absolute',
    top: scalev(5),
    right: scaleh(5),
  },
  emptyLogoHeartBottom: {
    position: 'absolute',
    bottom: scalev(-5),
    right: scaleh(-5),
  },
  textContainerCosmetics: {
    alignItems: 'center',
  },
  titleTextLineCosmetics: {
    fontSize: scaleh(26),
    color: '#FF708C',
    fontStyle: 'italic',
    fontWeight: '400',
  },
  titleHighlightCosmetics: {
    fontWeight: '800',
    fontStyle: 'italic',
  },
  subtitleTextCosmetics: {
    fontSize: scaleh(13),
    color: '#333333',
    fontStyle: 'italic',
    fontWeight: '600',
    marginBottom: scalev(30),
  },
  addButtonCosmetics: {
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(30),
    borderRadius: scaleh(25),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  addButtonTextCosmetics: {
    color: '#333',
    fontSize: scaleh(12),
    fontWeight: '700',
  },
  categoryTextRow: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    height: scalev(65),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1.5,
  }
});

export default ShopScreen;
