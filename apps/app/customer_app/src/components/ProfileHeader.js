import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../constants/AppTheme';

const ProfileHeader = ({ name, phone, onBackPress }) => {
  return (
    <LinearGradient
      colors={['#FF0069', '#FFD498']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.headerContainer}
    >
      {/* Optional Back Button */}
      {onBackPress && (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Icon name="chevron-left" size={scaleh(28)} color="#000000" />
        </TouchableOpacity>
      )}

      {/* User Info Section */}
      <View style={styles.userInfoContainer}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Icon name="user" size={scaleh(32)} color={AppTheme.colors.primary} />
        </View>

        {/* Text Details */}
        <View style={styles.textContainer}>
          <Text style={styles.greetingText}>Hi, {name}</Text>
          <Text style={styles.phoneText}>{phone}</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: scalev(45), // Matches DashboardScreen marginTop(35) + paddingTop(10)
    paddingBottom: scalev(40), // Extra padding at bottom so white content overlaps nicely
    paddingHorizontal: scaleh(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: scaleh(15),
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: scaleh(60),
    height: scaleh(60),
    borderRadius: scaleh(30),
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: AppTheme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(15),
  },
  textContainer: {
    flex: 1,
  },
  greetingText: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(4),
  },
  phoneText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#1A1A1A',
  },
});

export default ProfileHeader;
