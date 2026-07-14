import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { scaleh, scalev } from '../constants/AppTheme';
import CustomToggle from './CustomToggle';
import { toggleDomain } from '../redux/slices/appSlice';

const TopHeader = () => {
  const dispatch = useDispatch();
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isThemeDark = activeDomain === 'skincare';
  
  // Local state for instant toggle animation
  const [localTheme, setLocalTheme] = React.useState(isThemeDark);

  // Sync local state if Redux state changes externally
  React.useEffect(() => {
    setLocalTheme(isThemeDark);
  }, [isThemeDark]);

  const handleToggle = () => {
    const nextVal = !localTheme;
    setLocalTheme(nextVal); // Update UI instantly to start toggle animation
    
    // Defer heavy Redux update slightly so the UI thread can initiate the animation
    setTimeout(() => {
      dispatch(toggleDomain());
    }, 10);
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.locationContainer}>
        <Image source={require('../images/icons/Location.webp')} style={{ width: scaleh(18), height: scaleh(18), tintColor: '#1a1a1a' }} resizeMode="contain" />
        <Text style={styles.locationText} numberOfLines={1}>Deliver to <Text style={{ fontWeight: '600' }}>Ayushi Sinha - Ibus stop...</Text></Text>
        <Icon name="chevron-down" size={scaleh(16)} color="#1a1a1a" />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CustomToggle
          value={localTheme}
          onValueChange={handleToggle}
          activeTrackImage={require('../images/bgImages/skincareToggle.webp')}
          inactiveTrackImage={require('../images/bgImages/makeupToggle.webp')}
          activeThumbImage={require('../images/bgImages/skincareToggle.webp')}
          inactiveThumbImage={require('../images/bgImages/makeupToggle.webp')}
          trackWidth={scaleh(60)}
          trackHeight={scalev(30)}
          thumbSize={scalev(32)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(25),
    paddingBottom: scalev(15),
    width: '100%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexShrink: 1,
    marginRight: scaleh(10),
  },
  locationText: {
    fontSize: scaleh(14),
    color: '#1a1a1a',
    marginHorizontal: scaleh(5),
    flex: 1,
    flexShrink: 1,
  },
});

export default TopHeader;
