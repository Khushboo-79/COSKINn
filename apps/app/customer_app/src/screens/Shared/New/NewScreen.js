import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { useSelector } from 'react-redux';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';
import BottomNavBar from '../../../constants/BottomNavBar';
import Header from '../../../components/Header';
import TopHeader from '../../../components/TopHeader';
import SearchBarRow from '../../../components/SearchBarRow';

const NewScreen = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';

  const handleTabPress = (tabId) => {
    if (tabId === 'home') navigation.navigate('Dashboard');
    if (tabId === 'shop') navigation.navigate('Shop');
    if (tabId === 'new') navigation.navigate('NewScreen');
    if (tabId === 'rewards') navigation.navigate('RewardsScreen');
    if (tabId === 'account') navigation.navigate('AccountScreen');
  };

  return (
    <View style={[styles.container, { backgroundColor: isCosmetics ? '#FFFFFF' : '#FFFFFF' }]}>
      {isCosmetics && (
        <Image
          source={require('../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
          resizeMode="cover"
        />
      )}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        {isCosmetics ? (
          <>
            <View style={{ paddingTop: StatusBar.currentHeight || scalev(30) }}>
              <TopHeader />
              <SearchBarRow />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.cosmeticsComingSoon}>Coming Soon</Text>
            </View>
          </>
        ) : (
          <>
            <Header onBackPress={() => navigation.goBack()} />
            <LinearGradient 
              colors={['#FFD1DC', '#FFF5F5', '#FFEFE5']} 
              style={styles.contentContainer}
            >
              <MaskedView
                style={styles.maskedView}
                maskElement={
                  <View style={styles.maskWrapper}>
                    <Text style={styles.comingSoonText}>Coming Soon</Text>
                  </View>
                }
              >
                <LinearGradient
                  colors={['#FF0069', '#FF9966']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientFill}
                />
              </MaskedView>
            </LinearGradient>
          </>
        )}
      </SafeAreaView>

      <BottomNavBar 
        activeTab="new" 
        onTabPress={handleTabPress} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  maskedView: {
    height: scalev(100),
    width: '100%',
  },
  maskWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: scaleh(36),
    fontWeight: '800',
    textAlign: 'center',
  },
  gradientFill: {
    flex: 1,
  },
  cosmeticsComingSoon: {
    fontFamily: AppTheme.fonts.logo,
    fontSize: scaleh(38),
    fontStyle: 'italic',
    color: '#FFB2C9',
    fontWeight: '300',
    marginTop: scalev(-50),
  },
});

export default NewScreen;
