import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';

const OrdersListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Orders List</Text>
          <View style={{ width: scaleh(24) }} />
        </View>
        <View style={styles.headerDivider} />

        {/* Content Area */}
        <LinearGradient
          colors={['#FF006926', '#FFD49826']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.contentContainer}
        >
          {/* Apply a subtle white overlay to simulate the 15% opacity if needed, OR just use RGBA colors for the gradient itself! */}
          {/* Actually, it's easier to use the exact colors with 15% opacity straight in the hex code: #FF006926 and #FFD49826 */}
          
          <View style={styles.centerContent}>
            <View style={styles.iconCircle}>
              <Icon name="frown" size={scaleh(40)} color="#FFFFFF" />
            </View>
            <Text style={styles.titleText}>No order found</Text>
            <Text style={styles.subtitleText}>You have not placed any orders</Text>
          </View>

          {/* Start Shopping Button */}
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity 
              style={styles.shoppingButton} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Shop')}
            >
              <Text style={styles.shoppingButtonText}>Start Shopping</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

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
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  gradientBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.15, // Creates the very soft pastel pink-to-peach look from the design
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scaleh(30),
  },
  iconCircle: {
    width: scaleh(80),
    height: scaleh(80),
    borderRadius: scaleh(40),
    backgroundColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(25),
    elevation: 4,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  titleText: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(10),
  },
  subtitleText: {
    fontSize: scaleh(14),
    color: '#4A4A4A',
    fontWeight: '400',
  },
  bottomButtonContainer: {
    paddingHorizontal: scaleh(20),
    paddingBottom: Platform.OS === 'ios' ? scalev(10) : scalev(30),
    paddingTop: scalev(10),
  },
  shoppingButton: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: scaleh(12),
    height: scalev(50),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: AppTheme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  shoppingButtonText: {
    color: '#FFFFFF',
    fontSize: scaleh(16),
    fontWeight: '700',
  },
});

export default OrdersListScreen;
