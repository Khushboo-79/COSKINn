import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { scaleh, scalev } from '../../../../constants/AppTheme';

const FilterScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Which filter category is currently selected on the left
  const [activeCategory, setActiveCategory] = useState(route.params?.activeCategory || 'Product Type');
  
  const categories = [
    'Product Type',
    'Skin Type',
    'Skin Concern',
    'Ingredients',
    'Guides'
  ];

  // Dummy data for the checkboxes on the right
  const filterOptions = Array(8).fill('Skin Type');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (index) => {
    if (selectedOptions.includes(index)) {
      setSelectedOptions(selectedOptions.filter(i => i !== index));
    } else {
      setSelectedOptions([...selectedOptions, index]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity style={styles.resetBtn}>
          <Text style={styles.resetText}>Reset Filters</Text>
          <Icon name="refresh-cw" size={scaleh(16)} color="#666666" />
        </TouchableOpacity>
      </View>
      <View style={styles.headerDivider} />

      {/* Main Content: Left Sidebar and Right List */}
      <View style={styles.contentRow}>
        
        {/* Left Sidebar */}
        <View style={styles.sidebar}>
          {categories.map((cat, index) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={index}
                style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.sidebarItemText, isActive && styles.sidebarItemTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Content */}
        <View style={styles.rightContent}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={scaleh(16)} color="#999999" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Type to search..."
              placeholderTextColor="#999999"
            />
          </View>
          
          <Text style={styles.rightContentTitle}>Top Products</Text>
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.optionsScroll}>
            {filterOptions.map((opt, idx) => {
              const isChecked = selectedOptions.includes(idx);
              return (
                <TouchableOpacity 
                  key={idx} 
                  style={styles.checkboxRow}
                  activeOpacity={0.8}
                  onPress={() => toggleOption(idx)}
                >
                  <Text style={styles.checkboxText}>{opt}</Text>
                  <View style={[styles.checkbox, isChecked && styles.checkboxActive]}>
                    {isChecked && <Icon name="check" size={scaleh(14)} color="#FFFFFF" />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* Bottom Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.applyBtnText}>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(15),
    paddingBottom: scalev(15),
    marginTop: scalev(35),
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#000000',
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resetText: {
    fontSize: scaleh(12),
    color: '#666666',
    marginRight: scaleh(6),
    fontWeight: '500',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#EEEEEE',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '35%',
    backgroundColor: '#FDEEF4', // Light pink background
  },
  sidebarItem: {
    paddingVertical: scalev(20),
    paddingHorizontal: scaleh(15),
  },
  sidebarItemActive: {
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: scaleh(15),
    borderBottomRightRadius: scaleh(15),
  },
  sidebarItemText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#333333',
  },
  sidebarItemTextActive: {
    color: '#000000',
  },
  rightContent: {
    width: '65%',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(15),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF0069',
    borderRadius: scaleh(8),
    paddingHorizontal: scaleh(10),
    height: scalev(40),
    marginBottom: scalev(20),
  },
  searchInput: {
    flex: 1,
    marginLeft: scaleh(8),
    fontSize: scaleh(12),
    color: '#333333',
  },
  rightContentTitle: {
    fontSize: scaleh(14),
    fontWeight: '600',
    color: '#000000',
    marginBottom: scalev(15),
  },
  optionsScroll: {
    paddingBottom: scalev(20),
  },
  checkboxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scalev(12),
  },
  checkboxText: {
    fontSize: scaleh(12),
    color: '#333333',
    fontWeight: '500',
  },
  checkbox: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(4),
    borderWidth: 1,
    borderColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#FF0069',
    borderColor: '#FF0069',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  closeBtn: {
    flex: 1,
    marginRight: scaleh(10),
    height: scalev(45),
    borderRadius: scaleh(8),
    borderWidth: 1,
    borderColor: '#FF0069',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  closeBtnText: {
    color: '#FF0069',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
  applyBtn: {
    flex: 2,
    marginLeft: scaleh(10),
    height: scalev(45),
    borderRadius: scaleh(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0069',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
});

export default FilterScreen;
