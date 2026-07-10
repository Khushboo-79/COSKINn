import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

// SVG for the customized COSKINn logo
const Logo = () => (
  <View style={styles.logoContainer}>
    <Text style={styles.logoTextMain}>
      <Text style={styles.logoTextC}>C</Text>OSKINn
    </Text>
    <View style={styles.logoHeart}>
      <Svg height="14" width="14" viewBox="0 0 24 24">
        <Defs>
          <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#FF0069" stopOpacity="1" />
            <Stop offset="1" stopColor="#FF9966" stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="url(#grad)" />
      </Svg>
    </View>
  </View>
);

const dummyTransactions = Array.from({ length: 8 }, (_, i) => ({
  id: i.toString(),
  orderNo: 'CSKN-123456789-123456',
  txnId: '987654321',
  amount: '+₹4.72',
  date: '6th Jun, 2026',
  points: '442 Points',
}));

const RewardsScreen = () => {
  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    if (tabId === 'home') navigation.navigate('Dashboard');
    if (tabId === 'shop') navigation.navigate('Shop');
    if (tabId === 'new') navigation.navigate('NewScreen');
    if (tabId === 'rewards') navigation.navigate('RewardsScreen');
  };

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionCard}>
      <View style={styles.txnLeft}>
        <Text style={styles.txnLabel}>Order No</Text>
        <Text style={styles.txnValue}>{item.orderNo}</Text>
        <Text style={styles.txnLabel}>Txn ID {item.txnId}</Text>
        <Text style={styles.txnLabel}>COSKINn</Text>
      </View>
      <View style={styles.txnRight}>
        <Text style={styles.txnAmount}>{item.amount}</Text>
        <Text style={styles.txnDate}>{item.date}</Text>
        <Text style={styles.txnPoints}>{item.points}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1a1a1a" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Logo />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Search')}>
              <Icon name="search" size={scaleh(22)} color="#1a1a1a" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitle}>My Rewards</Text>
        </View>
        <View style={styles.divider} />

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.totalRewardsRow}>
            <Text style={styles.totalRewardsText}>Total rewards (1234 points)</Text>
            <Text style={styles.totalRewardsValue}>₹34.12</Text>
          </View>

          <Text style={styles.sectionTitle}>Transaction History</Text>

          <FlatList
            data={dummyTransactions}
            keyExtractor={(item) => item.id}
            renderItem={renderTransaction}
            scrollEnabled={false}
            contentContainerStyle={styles.transactionList}
          />

        </ScrollView>

        <BottomNavBar 
          activeTab="rewards" 
          onTabPress={handleTabPress} 
        />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA', // Slightly off-white for the background to make white cards pop
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(10),
    backgroundColor: '#FFFFFF',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    paddingLeft: scaleh(20),
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    padding: scaleh(5),
    marginLeft: scaleh(10),
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoTextMain: {
    fontSize: scaleh(24),
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  logoTextC: {
    color: '#FF0069',
    fontSize: scaleh(28),
  },
  logoHeart: {
    position: 'absolute',
    top: scalev(2),
    right: scaleh(12),
  },
  pageTitleContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(15),
  },
  pageTitle: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    width: '100%',
  },
  contentScroll: {
    flex: 1,
  },
  totalRewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(25),
  },
  totalRewardsText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#333333',
  },
  totalRewardsValue: {
    fontSize: scaleh(15),
    fontWeight: '600',
    color: '#333333',
  },
  sectionTitle: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#333333',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  transactionList: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(20),
    gap: scalev(10),
  },
  transactionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    padding: scaleh(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  txnLeft: {
    flex: 1,
  },
  txnRight: {
    alignItems: 'flex-end',
  },
  txnLabel: {
    fontSize: scaleh(10),
    color: '#888888',
    marginBottom: scalev(2),
  },
  txnValue: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: scalev(2),
  },
  txnAmount: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#4CAF50', // Green
    marginBottom: scalev(2),
  },
  txnDate: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: scalev(2),
  },
  txnPoints: {
    fontSize: scaleh(10),
    color: '#888888',
  },
});

export default RewardsScreen;
