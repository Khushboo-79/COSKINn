import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import Header from '../../../../components/Header';

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
    if (tabId === 'account') navigation.navigate('AccountScreen');
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <Header onBackPress={() => navigation.goBack()} />

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
      </SafeAreaView>

      <BottomNavBar 
        activeTab="rewards" 
        onTabPress={handleTabPress} 
      />
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
