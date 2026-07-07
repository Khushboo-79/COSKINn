import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { scaleh, scalev } from '../constants/AppTheme';

const CustomToggle = ({
  value,
  onValueChange,
  activeTrackImage,
  inactiveTrackImage,
  activeThumbImage,
  inactiveThumbImage,
  trackWidth = scaleh(80),
  trackHeight = scalev(40),
  thumbSize = scalev(50),
}) => {
  // We use Animated.Value to ensure 60fps native driven animations (no lag)
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(animatedValue, {
      toValue: value ? 1 : 0,
      useNativeDriver: true, // This guarantees the animation runs on the native UI thread, meaning 0 lag!
      bounciness: 8,
      speed: 12,
    }).start();
  }, [value]);

  // Calculate how far the thumb needs to move
  const thumbTravelDistance = trackWidth - thumbSize;
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, thumbTravelDistance],
  });

  return (
    <TouchableWithoutFeedback onPress={() => onValueChange(!value)}>
      <View style={[styles.container, { width: trackWidth, height: thumbSize }]}>
        
        {/* Track */}
        <View style={[styles.trackWrapper, { width: trackWidth, height: trackHeight }]}>
          <LinearGradient
            colors={value ? ['#FF0069', '#FFD498'] : ['#B8A2D3', '#B8A2D3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.trackInner}>
              <Image 
                source={value ? activeTrackImage : inactiveTrackImage} 
                style={styles.trackImage} 
                resizeMode="cover"
              />
            </View>
          </LinearGradient>
        </View>

        {/* Thumb (Knob) */}
        <Animated.View style={[
          styles.thumbWrapper, 
          { 
            width: thumbSize, 
            height: thumbSize,
            transform: [{ translateX }]
          }
        ]}>
          <LinearGradient
            colors={value ? ['#FF0069', '#FFD498'] : ['#B8A2D3', '#D3C6E5']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBorder}
          >
            <View style={styles.thumbInner}>
              <Image 
                source={value ? activeThumbImage : inactiveThumbImage} 
                style={styles.thumbImage} 
                resizeMode="cover"
              />
            </View>
          </LinearGradient>
        </Animated.View>

      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  trackWrapper: {
    position: 'absolute',
    borderRadius: 50,
    overflow: 'hidden',
  },
  trackInner: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  trackImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  thumbWrapper: {
    position: 'absolute',
    borderRadius: 100,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  thumbInner: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  gradientBorder: {
    flex: 1,
    padding: 2.5, // This controls the thickness of the gradient border
    borderRadius: 100,
  }
});

export default CustomToggle;
