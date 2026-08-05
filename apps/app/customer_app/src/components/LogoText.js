import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme } from '../constants/AppTheme';

const LogoText = ({ style }) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[styles.text, style]}>
          airenne
        </Text>
      }
    >
      <LinearGradient
        colors={['#C4877A', '#a26557ff']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <Text style={[styles.text, style, { opacity: 0 }]}>
          airenne
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: AppTheme.fonts.logo,
    includeFontPadding: false,
    color: '#000', // Need solid color for masking
  }
});

export default LogoText;
