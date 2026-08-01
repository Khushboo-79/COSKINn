import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, FlatList, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';
import BottomNavBar from '../../../../constants/BottomNavBar';
import Header from '../../../../components/Header';
import TopHeader from '../../../../components/TopHeader';
import SearchBarRow from '../../../../components/SearchBarRow';
import { useSelector, useDispatch } from 'react-redux';
import { Image } from 'react-native';
import { useEffect } from 'react';
import { fetchRewardPoints } from '../../../../redux/slices/profileSlice';

// Live transaction data fetched from Redux

const RewardsScreen = () => {
  const navigation = useNavigation();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const { rewardPoints, rewardHistory } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRewardPoints());
  }, [dispatch]);

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
        <Text style={styles.txnValue}>{item.orderId || 'N/A'}</Text>
        <Text style={styles.txnLabel}>Txn ID {item.id}</Text>
        <Text style={styles.txnLabel}>FAIRENNE</Text>
      </View>
      <View style={styles.txnRight}>
        <Text style={[styles.txnAmount, item.type === 'DEBIT' && { color: '#FF0000' }]}>
          {item.type === 'CREDIT' ? '+' : '-'}{item.points} Points
        </Text>
        <Text style={styles.txnDate}>{new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
        <Text style={styles.txnPoints}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isCosmetics && { backgroundColor: '#FFFFFF' }]}>
      {isCosmetics && (
        <Image
          source={require('../../../../images/makeup/CosmeticBackImg.webp')}
          style={[StyleSheet.absoluteFill, { width: '100%', height: '100%', opacity: 0.3 }]}
          resizeMode="cover"
        />
      )}
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent={true} />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        {isCosmetics ? (
          <View style={{ paddingTop: StatusBar.currentHeight || scalev(30) }}>
            <TopHeader />
            <SearchBarRow />
          </View>
        ) : (
          <Header onBackPress={() => navigation.goBack()} />
        )}

        <View style={[styles.pageTitleContainer, isCosmetics && { backgroundColor: 'transparent' }]}>
          <Text style={styles.pageTitle}>My Rewards</Text>
        </View>
        <View style={[styles.divider, isCosmetics && { backgroundColor: '#1a1a1a' }]} />

        <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
          
          <View style={styles.totalRewardsRow}>
            <Text style={styles.totalRewardsText}>Total rewards balance</Text>
            <Text style={styles.totalRewardsValue}>{rewardPoints} points</Text>
          </View>

          <Text style={styles.sectionTitle}>Transaction History</Text>

          {rewardHistory && rewardHistory.length > 0 ? (
            <FlatList
              data={rewardHistory}
              keyExtractor={(item) => item.id}
              renderItem={renderTransaction}
              scrollEnabled={false}
              contentContainerStyle={styles.transactionList}
            />
          ) : (
            <Text style={{ textAlign: 'center', marginTop: scalev(40), color: '#666' }}>No transactions found.</Text>
          )}

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
