import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { scaleh, scalev } from '../../../constants/AppTheme';

const HELP_ITEMS = [
  {
    title: 'Boosts Glow',
    description: 'With Triple Vitamin C, it reduces dullness caused by sun exposures to visiblily boost glow.',
  },
  {
    title: 'High UV Protection',
    description: 'With New-Age UV Filters, it provides long-lasting protection against UVA & UVB rays.',
  },
  {
    title: 'Even-Toned Skin',
    description: 'Helps reduce dark spots & uneven skin tone Caused by sun exposure.',
  },
  {
    title: 'Light Hydration',
    description: "Delivers weightless hydration with water-light Texture that's quick-absorbing & non-sticky too.",
  },
];

const HelpsSection = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <View style={styles.sectionBlock}>
      <Text style={styles.sectionTitle}>Helps</Text>
      
      <View style={styles.helpsGridContainer}>
        {/* The Grid of Buttons */}
        <View style={styles.helpsGrid}>
          {HELP_ITEMS.map((item, idx) => (
            <TouchableOpacity 
              key={idx} 
              style={styles.helpsBtn}
              activeOpacity={0.8}
              onPress={() => setActiveItem(item)}
            >
              <Icon name="sun" size={scaleh(14)} color="#E67E22" style={styles.helpsIcon} />
              <Text style={styles.helpsBtnText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Absolute Overlay Popup */}
        {activeItem && (
          <View style={styles.popupOverlay}>
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>{activeItem.title}</Text>
              <TouchableOpacity onPress={() => setActiveItem(null)} style={styles.closeBtn}>
                <Icon name="x" size={scaleh(18)} color="#1A1A1A" />
              </TouchableOpacity>
            </View>
            <Text style={styles.popupDesc}>{activeItem.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionBlock: {
    marginBottom: scalev(25),
  },
  sectionTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(15),
  },
  helpsGridContainer: {
    position: 'relative',
  },
  helpsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  helpsBtn: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E67E22',
    borderRadius: scaleh(20),
    paddingVertical: scalev(8),
    paddingHorizontal: scaleh(12),
    marginBottom: scalev(12),
  },
  helpsIcon: {
    marginRight: scaleh(8),
  },
  helpsBtnText: {
    color: '#E67E22',
    fontSize: scaleh(11),
    fontWeight: '600',
  },
  
  // Popup Styles
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(12),
    padding: scaleh(15),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    zIndex: 10,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(10),
  },
  popupTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeBtn: {
    padding: scaleh(4),
  },
  popupDesc: {
    fontSize: scaleh(12),
    color: '#333',
    lineHeight: scalev(18),
  },
});

export default HelpsSection;
