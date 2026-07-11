import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';

import Header from '../../../../components/Header';

const NewScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    if (tabId === 'home') navigation.navigate('Dashboard');
    if (tabId === 'shop') navigation.navigate('Shop');
    if (tabId === 'new') navigation.navigate('NewScreen');
    if (tabId === 'rewards') navigation.navigate('RewardsScreen');
    if (tabId === 'account') navigation.navigate('AccountScreen');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Header onBackPress={() => navigation.goBack()} />

        {/* Content */}
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
    backgroundColor: '#FFFFFF',
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
});

export default NewScreen;
