import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { AppTheme, scaleh, scalev } from '../../../../constants/AppTheme';

const FilterSortModal = ({ visible, onClose, initialTab = 'Filters' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      setActiveTab(initialTab);
    }
  }, [visible, initialTab]);

  const filterOptions = [
    { id: '1', title: 'Product Type' },
    { id: '2', title: 'Skin Type' },
    { id: '3', title: 'Ingredients' },
  ];

  const sortOptions = [
    { id: '1', title: 'Best Selling' },
    { id: '2', title: 'Prices, Low to High' },
    { id: '3', title: 'Prices, High to Low' },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        
        {/* Floating Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.8}>
          <Icon name="x" size={scaleh(20)} color="#000" />
        </TouchableOpacity>

        {/* Bottom Sheet Container */}
        <View style={styles.sheetContainer}>
          
          {/* Tabs Row */}
          <View style={styles.tabsRow}>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'Filters' ? styles.tabBtnActive : styles.tabBtnInactive]} 
              onPress={() => setActiveTab('Filters')}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabText, activeTab === 'Filters' ? styles.tabTextActive : styles.tabTextInactive]}>
                Filters
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'Sort By' ? styles.tabBtnActive : styles.tabBtnInactive]} 
              onPress={() => setActiveTab('Sort By')}
              activeOpacity={0.9}
            >
              <Text style={[styles.tabText, activeTab === 'Sort By' ? styles.tabTextActive : styles.tabTextInactive]}>
                Sort By
              </Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {activeTab === 'Filters' ? (
              <View style={styles.optionsList}>
                {filterOptions.map((option) => (
                  <TouchableOpacity 
                    key={option.id} 
                    style={styles.optionCard} 
                    activeOpacity={0.8}
                    onPress={() => {
                      onClose();
                      navigation.navigate('FilterScreen', { activeCategory: option.title });
                    }}
                  >
                    <Text style={styles.optionText}>{option.title}</Text>
                    <Icon name="chevron-right" size={scaleh(18)} color="#000" />
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.optionsList}>
                {sortOptions.map((option) => (
                  <TouchableOpacity key={option.id} style={styles.optionCard} activeOpacity={0.8}>
                    <Text style={styles.optionText}>{option.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </ScrollView>

          {/* Bottom Action Row */}
          <View style={styles.bottomRow}>
            <TouchableOpacity style={styles.resetBtn} activeOpacity={0.8}>
              <Text style={styles.resetBtnText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.doneBtn} activeOpacity={0.8} onPress={onClose}>
              <Text style={styles.doneBtnText}>Done (1)</Text>
            </TouchableOpacity>
          </View>
          
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)', // Light overlay as seen in the image
  },
  closeButton: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    width: scaleh(40),
    height: scaleh(40),
    borderRadius: scaleh(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(-20), // Pull it down to overlap the sheet
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    height: '75%', // Takes up 75% of screen height
    borderTopLeftRadius: scaleh(20),
    borderTopRightRadius: scaleh(20),
    paddingTop: scalev(20), // Space for close button overlap
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  tabsRow: {
    flexDirection: 'row',
    marginTop: scalev(10),
    marginBottom: scalev(20),
    marginHorizontal: scaleh(20),
    borderRadius: scaleh(10),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: scalev(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBtnActive: {
    backgroundColor: '#FF0069',
  },
  tabBtnInactive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: scaleh(14),
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  tabTextInactive: {
    color: '#000000',
  },
  scrollContent: {
    paddingHorizontal: scaleh(20),
    paddingBottom: scalev(20),
  },
  optionsList: {
    gap: scalev(15),
  },
  optionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: scalev(18),
    paddingHorizontal: scaleh(20),
    borderRadius: scaleh(12),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    fontWeight: '500',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(15),
    paddingBottom: scalev(30), // Extra padding for SafeArea
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  resetBtn: {
    flex: 1,
    marginRight: scaleh(10),
    paddingVertical: scalev(15),
    borderRadius: scaleh(8),
    borderWidth: 1,
    borderColor: '#FF0069',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  resetBtnText: {
    color: '#FF0069',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
  doneBtn: {
    flex: 1,
    marginLeft: scaleh(10),
    paddingVertical: scalev(15),
    borderRadius: scaleh(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0069',
  },
  doneBtnText: {
    color: '#FFFFFF',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
});

export default FilterSortModal;
