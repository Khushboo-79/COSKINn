import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scaleh, scalev, AppTheme } from '../../../../constants/AppTheme';
import { Dimensions } from 'react-native';
import { fetchMembershipTier } from '../../../../redux/slices/profileSlice';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.85;

const FaqItem = ({ question, answer }) => {
  const [expanded, setExpanded] = React.useState(true); // Default to open as per the reference images

  return (
    <View style={styles.faqItemContainer}>
      <TouchableOpacity 
        style={styles.faqQuestionRow} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Icon name={expanded ? "chevron-up" : "chevron-down"} size={scaleh(18)} color="#1a1a1a" />
      </TouchableOpacity>
      {expanded && (
        <Text style={styles.faqAnswerText}>{answer}</Text>
      )}
    </View>
  );
};

const MembershipScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  
  const activeDomain = useSelector(state => state.app?.activeDomain || 'skincare');
  const isCosmetics = activeDomain === 'cosmetics';
  const { membershipTier, data: userProfile, rewardPoints } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchMembershipTier());
  }, [dispatch]);
  
  const gradientColors = isCosmetics 
    ? ['#FFC2D1', '#FF6B9A'] 
    : ['#FFCFBA', '#FF6B9A'];
    
  const profileInitial = userProfile?.firstName ? userProfile.firstName[0].toUpperCase() : 'C';
  
  const [activeSlide, setActiveSlide] = React.useState(0);
  
  const handleScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + scaleh(15)));
    if (slide !== activeSlide) {
      setActiveSlide(slide);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scalev(40) }}>
        
        <LinearGradient
          colors={gradientColors}
          style={[styles.headerGradient, { paddingTop: insets.top + scalev(10) }]}
        >
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={scaleh(28)} color="#1a1a1a" />
          </TouchableOpacity>
          
          <View style={styles.profileAvatarContainer}>
            <LinearGradient
              colors={['#FF8EAF', '#FF3066']}
              style={styles.profileAvatar}
            >
              <Text style={styles.profileAvatarText}>{profileInitial}</Text>
            </LinearGradient>
            <View style={styles.crownBadge}>
              <Icon name="award" size={scaleh(16)} color="#FF4D85" />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.contentArea}>
          
          <View style={styles.progressCard}>
            <Text style={styles.progressCardTitle}>{membershipTier?.tier || 'Member'} Since {new Date(userProfile?.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', year: 'numeric'})}</Text>
            
            <View style={styles.progressSection}>
              <View style={styles.progressLineBg} />
              
              <LinearGradient 
                colors={['#A3003A', '#FF4D85']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressLineActive, { width: `${Math.min(((membershipTier?.currentSpend || 0) / 10000) * 100, 100)}%` }]}
              />
              
              <View style={styles.nodesContainer}>
                <View style={styles.nodeWrapper}>
                  <View style={[styles.nodeInner, { backgroundColor: (membershipTier?.currentSpend || 0) >= 2000 ? '#FF6B9A' : '#FFFFFF', borderColor: '#FF6B9A', borderWidth: (membershipTier?.currentSpend || 0) >= 2000 ? 0 : 3, justifyContent: 'center', alignItems: 'center' }]}>
                    {(membershipTier?.currentSpend || 0) >= 2000 && <Icon name="check" size={scaleh(12)} color="#FFFFFF" />}
                  </View>
                  <Text style={styles.nodeTitle}>Member</Text>
                  <Text style={styles.nodeValue}>₹2,000</Text>
                </View>

                <View style={styles.nodeWrapper}>
                  <View style={[styles.nodeInner, { borderColor: '#D4AF37', borderWidth: 3, backgroundColor: (membershipTier?.currentSpend || 0) >= 5000 ? '#D4AF37' : '#FFFFFF' }]} />
                  <Text style={styles.nodeTitle}>Gold</Text>
                  <Text style={styles.nodeValue}>₹5,000</Text>
                </View>
                
                <View style={styles.nodeWrapper}>
                  <View style={[styles.nodeInner, { borderColor: '#666', borderWidth: 3, backgroundColor: (membershipTier?.currentSpend || 0) >= 10000 ? '#666' : '#FFFFFF' }]} />
                  <Text style={styles.nodeTitle}>Platinum</Text>
                  <Text style={styles.nodeValue}>₹10,000</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.dottedDividerContainer}>
              <Text style={styles.dottedDivider} numberOfLines={1}>
                ................................................................................................................
              </Text>
            </View>
            
            <View style={styles.rewardsRow}>
              <View style={styles.rewardsLeft}>
                <View style={styles.rewardsIconBg}>
                  <Text style={styles.rewardsIconText}>//</Text>
                </View>
                <Text style={styles.rewardsText}>{rewardPoints || 0} Reward Points</Text>
              </View>
              
              <TouchableOpacity style={styles.viewHistoryBtn}>
                <Text style={styles.viewHistoryText}>View History </Text>
                <Icon name="chevron-right" size={scaleh(14)} color="#FF0069" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColTitle}>Upgrade to Gold Membership</Text>
                <Text style={styles.infoColDesc}>Shop for ₹1,588 by 30 Nov 2026</Text>
              </View>
              
              <View style={styles.infoDivider} />
              
              <View style={styles.infoColumn}>
                <Text style={styles.infoColTitle}>Retain your Prive Membership</Text>
                <Text style={styles.infoColDesc}>Shop for ₹2,000 by 13 Jul 2027</Text>
              </View>
            </View>
            
            <Text style={styles.infoFooterText}>
              Membership upgrades resulting from recent orders will take effect within 20 days from the date of delivery
            </Text>
          </View>

          <View style={styles.benefitsTitleContainer}>
            <Text style={styles.benefitsSubtitle}>ENJOY EXCLUSIVE BENEFITS WITH</Text>
            <Text style={styles.benefitsMainTitle}>Prive Membership</Text>
          </View>
          
          {/* Horizontal Scrollable Benefits Cards */}
          <View style={styles.carouselContainer}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + scaleh(15)}
              decelerationRate="fast"
              contentContainerStyle={styles.carouselContent}
              onScroll={handleScroll}
              scrollEventThrottle={16}
            >
              {/* Card 1: Prive */}
              <View style={[styles.benefitsCard, { width: cardWidth }]}>
                <LinearGradient 
                  colors={['#FFC2D1', '#FF6B9A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.benefitsHeader}
                >
                  <View style={styles.benefitsCrownContainer}>
                    <Icon name="award" size={scaleh(14)} color="#FF4D85" />
                  </View>
                  <Text style={styles.benefitsHeaderText}>Prive Membership Benefits</Text>
                </LinearGradient>
                
                <View style={styles.benefitsContent}>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItem}>
                       <View style={[styles.bIconBg, { backgroundColor: '#FF4D85' }]}>
                         <Icon name="star" size={scaleh(20)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitText}>Reward Points for every order</Text>
                     </View>
                     <View style={styles.benefitItem}>
                       <View style={[styles.bIconBg, { backgroundColor: '#FF4D85' }]}>
                         <Icon name="gift" size={scaleh(20)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitText}>Earn 1.5x Points in your Birthday Month</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItem}>
                       <View style={[styles.bIconBg, { backgroundColor: '#FF4D85' }]}>
                         <Icon name="tag" size={scaleh(20)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitText}>Exclusive Surprise Offers & Coupons</Text>
                     </View>
                     <View style={styles.benefitItem}>
                       <View style={[styles.bIconBg, { backgroundColor: '#FF4D85' }]}>
                         <Icon name="briefcase" size={scaleh(20)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitText}>Access to Beauty Bars& Masterclass</Text>
                     </View>
                   </View>
                </View>
                
                <View style={[styles.unlockMoreSection, { backgroundColor: '#FFF0F5' }]}>
                  <Text style={styles.unlockMoreTitle}>Unlock more with Gold</Text>
                  
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#FF4D85" />
                    <Text style={styles.bulletText}>Exclusive Prive Sale</Text>
                  </View>
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#FF4D85" />
                    <Text style={styles.bulletText}>Free Shipping on All Orders</Text>
                  </View>
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#FF4D85" />
                    <Text style={styles.bulletText}>Upto 1.5x Reward Points</Text>
                  </View>
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#FF4D85" />
                    <Text style={styles.bulletText}>Additional Discounts</Text>
                  </View>
                  
                  <View style={styles.upgradeRow}>
                    <Text style={styles.upgradeText}>Want to Upgrade to Gold?</Text>
                    <TouchableOpacity style={styles.shopNowBtn}>
                      <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Card 2: Gold */}
              <View style={[styles.benefitsCard, { width: cardWidth }]}>
                <LinearGradient 
                  colors={['#FDE694', '#C99723']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.benefitsHeader}
                >
                  <View style={styles.benefitsCrownContainer}>
                    <Icon name="award" size={scaleh(14)} color="#C99723" />
                  </View>
                  <Text style={styles.benefitsHeaderText}>Gold Membership Benefits</Text>
                </LinearGradient>
                
                <View style={styles.benefitsContent}>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="star" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Upto 1.5x Reward Points</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="truck" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Free shipping on all orders</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="gift" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Earn 2x Points in your Birthday Month</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="tag" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Exclusive Surprise Offers & Coupons</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="shopping-bag" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Exclusive Prive Sale</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#D4AF37' }]}>
                         <Icon name="briefcase" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Access to Beauty Bars & Masterclass</Text>
                     </View>
                   </View>
                </View>
                
                <View style={[styles.unlockMoreSection, { backgroundColor: '#F9F9F9' }]}>
                  <Text style={styles.unlockMoreTitle}>Unlock more with Platinum</Text>
                  
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#999" />
                    <Text style={styles.bulletText}>Up to 2x Points on every spend</Text>
                  </View>
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#999" />
                    <Text style={styles.bulletText}>Free Birthday Gift (Full Size)</Text>
                  </View>
                  <View style={styles.bulletItem}>
                    <Icon name="check-circle" size={scaleh(14)} color="#999" />
                    <Text style={styles.bulletText}>Priority Customer Support</Text>
                  </View>
                  
                  <View style={[styles.upgradeRow, { marginTop: scalev(15) }]}>
                    <Text style={styles.upgradeText}>Want to Upgrade to Platinum?</Text>
                    <TouchableOpacity style={styles.shopNowBtn}>
                      <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              {/* Card 3: Platinum */}
              <View style={[styles.benefitsCard, { width: cardWidth }]}>
                <LinearGradient 
                  colors={['#E0D4E7', '#938499']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.benefitsHeader}
                >
                  <View style={styles.benefitsCrownContainer}>
                    <Icon name="award" size={scaleh(14)} color="#938499" />
                  </View>
                  <Text style={styles.benefitsHeaderText}>Platinum Membership Benefits</Text>
                </LinearGradient>
                
                <View style={styles.benefitsContent}>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="star" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Upto 2x Reward Points</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="headphones" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Premium Customer Care</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="truck" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Free shipping on all orders</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="gift" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Earn 3x Points in your Birthday Month</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="tag" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Exclusive Surprise Offers & Coupons</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="briefcase" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Access to Beauty Bars& Masterclass</Text>
                     </View>
                   </View>
                   <View style={styles.benefitIconRow}>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="shopping-bag" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Exclusive Prive Sale</Text>
                     </View>
                     <View style={styles.benefitItemSmall}>
                       <View style={[styles.bIconBg, { backgroundColor: '#A195A8' }]}>
                         <Icon name="layers" size={scaleh(16)} color="#FFF" />
                       </View>
                       <Text style={styles.benefitTextSmall}>Point Multipliers Events</Text>
                     </View>
                   </View>
                </View>
                
                <View style={[styles.unlockMoreSection, { backgroundColor: '#FFFFFF' }]}>
                  <View style={[styles.upgradeRow, { marginTop: scalev(5) }]}>
                    <Text style={styles.upgradeText}>Want to Upgrade to Platinum?</Text>
                    <TouchableOpacity style={styles.shopNowBtn}>
                      <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ScrollView>
            
            {/* Pagination Dots */}
            <View style={styles.paginationDots}>
              {[0, 1, 2].map((i) => (
                <View 
                  key={i} 
                  style={[
                    styles.dot, 
                    i === activeSlide ? styles.activeDot : {}
                  ]} 
                />
              ))}
            </View>
          </View>
          
          {/* FAQs Section */}
          <View style={styles.faqsSection}>
            <Text style={styles.faqsTitle}>FAQS</Text>
            
            <FaqItem 
              question="What is the Nykaa Prive program?" 
              answer="Nykaa Prive program is our loyalty program designed to provide special benefits to our loyal customers. It is a tiered program with three different tier i.e. Member, Gold & Platinum. The only thing you need to do is to shop with us for a minimum amount to join our Prive program."
            />
            
            <FaqItem 
              question="How do I become a part of Nykaa Prive?" 
              answer="To join our Nykaa Prive program, you only need to spend a minimum of Rs. 2000 with us in the last 365 days."
            />
            
            <FaqItem 
              question="How do I move to the next tier?" 
              answer="You only need to keep shopping - spend Rs. 2,000 to become Prive Member, Rs. 5,000 to become Prive Gold and Rs. 10,000 to become Prive Platinum in last 365 days. As soon as you spend any of the above mentioned amount (and within 4 weeks from date of delivery), you will be automatically upgraded to the next tier."
            />
            
            <TouchableOpacity style={styles.viewMoreFaqsBtn}>
              <Text style={styles.viewMoreFaqsText}>View more FAQS</Text>
              <Icon name="arrow-right" size={scaleh(16)} color="#FF0069" style={styles.faqArrowIcon} />
            </TouchableOpacity>
          </View>
          
          {/* Terms & Conditions Section */}
          <TouchableOpacity style={styles.termsContainer} activeOpacity={0.8}>
            <Text style={styles.termsText}>Terms & Conditions</Text>
            <Icon name="arrow-right" size={scaleh(16)} color="#FF0069" style={styles.faqArrowIcon} />
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerGradient: {
    height: scalev(250),
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: scalev(40),
    left: scaleh(15),
    padding: scaleh(5),
    zIndex: 10,
  },
  profileAvatarContainer: {
    alignSelf: 'center',
    marginTop: scalev(20),
    position: 'relative',
  },
  profileAvatar: {
    width: scaleh(90),
    height: scaleh(90),
    borderRadius: scaleh(45),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  profileAvatarText: {
    fontSize: scaleh(36),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  crownBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: scaleh(28),
    height: scaleh(28),
    borderRadius: scaleh(14),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  contentArea: {
    marginTop: scalev(-60),
    paddingHorizontal: scaleh(15),
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    padding: scaleh(20),
    marginBottom: scalev(15),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  progressCardTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(30),
  },
  progressSection: {
    position: 'relative',
    height: scalev(50),
    marginBottom: scalev(10),
  },
  progressLineBg: {
    position: 'absolute',
    top: scalev(12),
    left: scaleh(20),
    right: scaleh(20),
    height: scalev(4),
    backgroundColor: '#E0E0E0',
    borderRadius: scalev(2),
  },
  progressLineActive: {
    position: 'absolute',
    top: scalev(12),
    left: scaleh(20),
    width: '25%', // Shows progress up to "Member"
    height: scalev(4),
    borderRadius: scalev(2),
  },
  nodesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(10),
  },
  nodeWrapper: {
    alignItems: 'center',
    width: scaleh(60),
  },
  nodeInner: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    marginBottom: scalev(5),
  },
  nodeTitle: {
    fontSize: scaleh(11),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  nodeValue: {
    fontSize: scaleh(10),
    color: '#666',
    marginTop: scalev(2),
  },
  dottedDividerContainer: {
    height: scalev(20),
    justifyContent: 'center',
    overflow: 'hidden',
    marginVertical: scalev(10),
  },
  dottedDivider: {
    color: '#FFB2C9',
    letterSpacing: 2,
    fontSize: scaleh(10),
  },
  rewardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardsIconBg: {
    width: scaleh(20),
    height: scaleh(20),
    borderRadius: scaleh(10),
    backgroundColor: '#FFE5ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(8),
  },
  rewardsIconText: {
    color: '#FF4D85',
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: scaleh(10),
  },
  rewardsText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  viewHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewHistoryText: {
    fontSize: scaleh(12),
    fontWeight: '600',
    color: '#FF0069',
  },
  infoCard: {
    backgroundColor: '#FFF5F8',
    borderRadius: scaleh(15),
    padding: scaleh(15),
    borderWidth: 1,
    borderColor: '#FFDCE6',
    marginBottom: scalev(20),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalev(15),
  },
  infoColumn: {
    flex: 1,
    paddingHorizontal: scaleh(5),
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#FFDCE6',
    marginHorizontal: scaleh(10),
  },
  infoColTitle: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(5),
  },
  infoColDesc: {
    fontSize: scaleh(12),
    color: '#666',
    lineHeight: scalev(18),
  },
  infoFooterText: {
    fontSize: scaleh(10),
    color: '#666',
    lineHeight: scalev(14),
    marginTop: scalev(5),
  },
  benefitsTitleContainer: {
    alignItems: 'center',
    marginVertical: scalev(20),
  },
  benefitsSubtitle: {
    fontSize: scaleh(10),
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
    marginBottom: scalev(5),
  },
  benefitsMainTitle: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  benefitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: scaleh(15),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginRight: scaleh(15),
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scaleh(15),
  },
  benefitsCrownContainer: {
    width: scaleh(26),
    height: scaleh(26),
    borderRadius: scaleh(13),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scaleh(10),
  },
  benefitsHeaderText: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
  },
  benefitsContent: {
    padding: scaleh(15),
    paddingBottom: scalev(5),
  },
  benefitIconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scalev(15),
  },
  benefitItem: {
    alignItems: 'center',
    width: '48%',
  },
  benefitItemSmall: {
    alignItems: 'center',
    width: '48%',
  },
  bIconBg: {
    width: scaleh(40),
    height: scaleh(40),
    borderRadius: scaleh(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  benefitText: {
    fontSize: scaleh(10),
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: scalev(14),
  },
  benefitTextSmall: {
    fontSize: scaleh(9),
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: scalev(12),
  },
  unlockMoreSection: {
    padding: scaleh(15),
    borderBottomLeftRadius: scaleh(15),
    borderBottomRightRadius: scaleh(15),
  },
  unlockMoreTitle: {
    fontSize: scaleh(13),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(12),
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  bulletText: {
    fontSize: scaleh(11),
    color: '#333',
    marginLeft: scaleh(8),
  },
  upgradeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scalev(20),
  },
  upgradeText: {
    fontSize: scaleh(11),
    fontWeight: '600',
    color: '#333',
  },
  shopNowBtn: {
    backgroundColor: '#FF0069',
    paddingVertical: scalev(6),
    paddingHorizontal: scaleh(15),
    borderRadius: scaleh(8),
  },
  shopNowText: {
    color: '#FFF',
    fontSize: scaleh(11),
    fontWeight: '700',
  },
  carouselContainer: {
    marginHorizontal: -scaleh(15),
  },
  carouselContent: {
    paddingHorizontal: scaleh(15),
  },
  paginationDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scalev(15),
  },
  dot: {
    width: scaleh(20),
    height: scalev(3),
    backgroundColor: '#E0E0E0',
    marginHorizontal: scaleh(4),
    borderRadius: scalev(2),
  },
  activeDot: {
    backgroundColor: '#1a1a1a',
  },
  faqItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingVertical: scalev(15),
  },
  faqQuestionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  faqQuestionText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#1a1a1a',
    flex: 1,
    marginRight: scaleh(10),
  },
  faqAnswerText: {
    fontSize: scaleh(11),
    color: '#666',
    lineHeight: scalev(18),
  },
  faqsSection: {
    marginTop: scalev(10),
    marginBottom: scalev(20),
  },
  faqsTitle: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: scalev(5),
  },
  viewMoreFaqsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scalev(20),
  },
  viewMoreFaqsText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#FF0069',
  },
  faqArrowIcon: {
    marginLeft: scaleh(8),
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    marginHorizontal: -scaleh(15),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(20),
  },
  termsText: {
    fontSize: scaleh(12),
    fontWeight: '700',
    color: '#FF0069',
  },
});

export default MembershipScreen;
