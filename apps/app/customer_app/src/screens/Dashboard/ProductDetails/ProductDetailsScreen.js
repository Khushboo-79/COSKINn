import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, Image, TextInput, Platform, Animated, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { AppTheme, scaleh, scalev } from '../../../constants/AppTheme';
import HelpsSection from './HelpsSection';

const { width } = Dimensions.get('window');

const ProductDetailsScreen = () => {
  const navigation = useNavigation();
  const [selectedSize, setSelectedSize] = useState('50g');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAccordionExpanded, setIsAccordionExpanded] = useState(false);
  const [isProductDetailsExpanded, setIsProductDetailsExpanded] = useState(false);
  const [activeOfferIndex, setActiveOfferIndex] = useState(0);
  const [isHeroExpanded, setIsHeroExpanded] = useState(false);
  const [isHowToUseExpanded, setIsHowToUseExpanded] = useState(false);
  const [isBenefitsExpanded, setIsBenefitsExpanded] = useState(false);
  const [isFaqsExpanded, setIsFaqsExpanded] = useState(false);
  const [isFullIngredientsExpanded, setIsFullIngredientsExpanded] = useState(false);
  const [isMoreInfoExpanded, setIsMoreInfoExpanded] = useState(false);

  const handleImageScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveImageIndex(index);
  };

  const handleOfferScroll = (event) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
    setActiveOfferIndex(index);
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [scalev(15), 0],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="chevron-left" size={scaleh(24)} color="#1A1A1A" />
          </TouchableOpacity>

          <View style={styles.headerIconsRow}>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" size={scaleh(20)} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn} onPress={() => navigation.navigate('Wishlist')}>
              <Icon name="heart" size={scaleh(20)} color="#1A1A1A" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIconBtn}>
              <Icon name="search" size={scaleh(20)} color="#1A1A1A" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.headerDivider} />

        <Animated.ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        >
          {/* 0: Top Section (Before Sticky Tabs) */}
          <View style={styles.topSection}>
            {/* Title & Ratings */}
            <Text style={styles.productTitle}>
              Vitamin C + E Sunscreen SPF 50+ PA++++ With New-Age UV Filters
            </Text>

            <Text style={styles.suitableText}>
              Suitable for: <Text style={styles.suitableBold}>All Skin Types</Text>
            </Text>

            <View style={styles.ratingsRow}>
              <View style={styles.starsContainer}>
                <MaterialIcons name="star" size={scaleh(14)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(14)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(14)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(14)} color="#32CD32" />
                <MaterialIcons name="star-outline" size={scaleh(14)} color="#32CD32" />
              </View>
              <View style={styles.ratingDivider} />
              <MaterialIcons name="verified" size={scaleh(14)} color="#1E90FF" />
              <Text style={styles.verifiedText}>3337 Verified ratings</Text>
            </View>

            {/* Image Gallery */}
            <View style={styles.galleryContainer}>
              <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleImageScroll}
                scrollEventThrottle={16}
              >
                {[...Array(9)].map((_, index) => (
                  <View key={index} style={{ width: width - scaleh(40) }}>
                    <LinearGradient
                      colors={['#FF006926', '#FFD49826']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 0, y: 1 }}
                      style={styles.imageBackground}
                    >
                      <Image
                        source={require('../../../images/bgImages/productImg.webp')}
                        style={styles.productImage}
                        resizeMode="contain"
                      />
                    </LinearGradient>
                  </View>
                ))}
              </ScrollView>

              {/* Pagination Dots */}
              <View style={styles.paginationRow}>
                {[...Array(9)].map((_, i) => (
                  <View key={i} style={[styles.dot, activeImageIndex === i && styles.activeDot]} />
                ))}
              </View>
            </View>

            {/* Tags & Share */}
            <View style={styles.tagsAndShareRow}>
              <View style={styles.tagsContainer}>
                <View style={styles.bestsellerTag}>
                  <Text style={styles.bestsellerText}>BESTSELLERS</Text>
                </View>
                <View style={styles.outlineTag}>
                  <Text style={styles.outlineTagText}>NEW AGE UV FILTERS</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.shareBtn}>
                <Icon name="share" size={scaleh(18)} color="#1A1A1A" />
              </TouchableOpacity>
            </View>

            {/* Size Selection */}
            <View style={styles.sizeSelectionRow}>
              {['80g', '50g'].map((size) => {
                const isActive = selectedSize === size;
                return (
                  <TouchableOpacity
                    key={size}
                    activeOpacity={0.8}
                    onPress={() => setSelectedSize(size)}
                    style={[styles.sizeBtn, isActive && styles.sizeBtnActive]}
                  >
                    <Text style={[styles.sizeBtnText, isActive && styles.sizeBtnTextActive]}>
                      {size}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Pricing */}
            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
                <Text style={styles.currentPrice}>₹476</Text>
                <Text style={styles.originalPrice}>₹899</Text>
              </View>
              <Text style={styles.taxesText}>inclusive of all taxes</Text>
            </View>
          </View>

          {/* 2: Bottom Section */}
          <View style={styles.bottomSection}>
            {/* Delivery Check Card */}
            <View style={styles.deliveryCard}>
              <Text style={styles.deliveryTitle}>Check for delivery</Text>
              <View style={styles.deliveryInputContainer}>
                <TextInput
                  style={styles.pincodeInput}
                  placeholder="Enter Pincode"
                  placeholderTextColor="#999"
                  keyboardType="numeric"
                  maxLength={6}
                  value={pincode}
                  onChangeText={setPincode}
                />
                <TouchableOpacity style={styles.checkBtn}>
                  <Text style={styles.checkBtnText}>Check</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.estimatedDeliveryText}>Estimated delivery by 11 July</Text>
            </View>

            {/* Enable Location Card */}
            <View style={styles.locationCard}>
              <Icon name="map-pin" size={scaleh(20)} color="#1A1A1A" style={styles.locationIcon} />
              <View style={styles.locationTextContainer}>
                <Text style={styles.locationTitle}>Enable Location</Text>
                <Text style={styles.locationSubtitle}>Discover skincare recommendations based on your local UV index.</Text>
              </View>
              <TouchableOpacity style={styles.enableBtn}>
                <Text style={styles.enableBtnText}>Enable</Text>
              </TouchableOpacity>
            </View>

            {/* Helps Section */}
            <HelpsSection />

            {/* Targets Section */}
            <View style={styles.sectionBlock}>
              <Text style={styles.sectionTitle}>Targets</Text>
              <View style={styles.targetsRow}>
                {['Tanning', 'Dark Spots', 'Dullness'].map((item, idx) => (
                  <View key={idx} style={styles.targetPill}>
                    <Text style={styles.targetPillText}>{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* In-Vivo SPF Accordion */}
            <View style={styles.accordionContainer}>
              <TouchableOpacity 
                style={[styles.accordionCard, isAccordionExpanded && styles.accordionCardExpanded]} 
                activeOpacity={0.8}
                onPress={() => setIsAccordionExpanded(!isAccordionExpanded)}
              >
                <Text style={styles.accordionTitle}>In-Vivo SPF Test Results</Text>
                <Icon name={isAccordionExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              
              {isAccordionExpanded && (
                <View style={styles.accordionContent}>
                  <Text style={styles.accLabel}>Clinical Results:</Text>
                  <Text style={styles.accText}>This sunscreen is tested in an independent third-party laboratory to confirm the level of protection it provides below is the lab report and data points.</Text>

                  <Text style={styles.accLabel}>Test Type:</Text>
                  <Text style={styles.accText}>IN-VIVO SPF Testing as pe international standards - IS 123456 : 1234 (ISO 12345 : 1234, MOD)</Text>
                  <Text style={styles.accText}>In-Vitro analysis as per COLIPA Guidelines</Text>

                  <Text style={styles.accRow}>
                    <Text style={styles.accLabel}>Study Number:</Text>
                    <Text style={styles.accText}> TTTH/COS/SPF/2026-27 SPF-131</Text>
                  </Text>

                  <Text style={styles.accLabel}>SPF values obtained:</Text>
                  <Text style={styles.accText}>IN-VIVO SPF Testing as pe international standards - IS 123456 : 1234 (ISO 12345 : 1234, MOD)</Text>
                  <Text style={styles.accText}>In-Vitro analysis as per COLIPA Guidelines</Text>

                  <Text style={styles.accRow}>
                    <Text style={styles.accLabel}>PA rating:</Text>
                    <Text style={styles.accText}> PA++++</Text>
                  </Text>

                  <Text style={styles.accLabel}>Other results:</Text>
                  <Text style={styles.accText}>Broad Spectrum Protection: Yes</Text>

                  <Text style={[styles.accText, { marginTop: scalev(15) }]}>
                    (Dta based on tests conducted by CCFT Laboratories pvt. Ltd, an independent third-party testing lab)
                  </Text>
                  <Text style={styles.accText}>
                    Note: The product on tests has been evaluated for efficacy throgh standardized in-vivo and in-vitro testing under international guidelines.
                  </Text>

                  <TouchableOpacity style={styles.certPhotoBtn}>
                    <Text style={styles.certPhotoText}>CERTIFICATE PHOTO</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Product Details Accordion */}
            <View style={styles.accordionContainer}>
              <TouchableOpacity 
                style={[styles.accordionCard, isProductDetailsExpanded && styles.accordionCardExpanded]} 
                activeOpacity={0.8}
                onPress={() => setIsProductDetailsExpanded(!isProductDetailsExpanded)}
              >
                <Text style={styles.accordionTitle}>Product Details</Text>
                <Icon name={isProductDetailsExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              
              {isProductDetailsExpanded && (
                <View style={styles.productDetailsContent}>
                  <View style={styles.pdGrid}>
                    {[
                      { name: 'water-Light', icon: 'droplet' },
                      { name: 'Boosts Glow', icon: 'sun' },
                      { name: 'New Age UV Filters', icon: 'shield' },
                      { name: 'Reduces Dark Spots', icon: 'aperture' },
                      { name: 'Quick Absorbing', icon: 'wind' },
                      { name: 'No White Cast', icon: 'eye-off' },
                      { name: 'Non-Comedogenic', icon: 'check-circle' },
                      { name: 'Fragrance-Free', icon: 'feather' },
                    ].map((item, idx) => (
                      <View key={idx} style={styles.pdGridItem}>
                        <Icon name={item.icon} size={scaleh(14)} color="#E67E22" style={styles.pdGridIcon} />
                        <Text style={styles.pdGridText}>{item.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>

            {/* Customers Also Bought Card */}
            <View style={styles.alsoBoughtCard}>
              <Text style={styles.alsoBoughtTitle}>Customers Also Bought</Text>
              <Text style={styles.alsoBoughtSubtitle}>Based on products bought together.</Text>
              
              <View style={styles.alsoBoughtProductsRow}>
                {/* Product 1 */}
                <View style={styles.alsoBoughtProduct}>
                  <LinearGradient colors={['#FFD1DC', '#FFF5F5']} style={styles.alsoBoughtImageBg}>
                    <Image source={require('../../../images/bgImages/productImg.webp')} style={styles.alsoBoughtImg} resizeMode="contain" />
                  </LinearGradient>
                  <View style={styles.alsoBoughtDetails}>
                    <Text style={styles.alsoBoughtProductTitle} numberOfLines={2}>Vitamin C + E Sunscreen SPF 50 PA++++ with New...</Text>
                    <Text style={styles.alsoBoughtSizeText}>3 Sizes</Text>
                    <View style={styles.alsoBoughtPriceRow}>
                      <Text style={styles.alsoBoughtCurrentPrice}>₹699</Text>
                      <Text style={styles.alsoBoughtOldPrice}>₹899</Text>
                    </View>
                    <View style={styles.alsoBoughtPill}><Text style={styles.alsoBoughtPillText}>80g</Text></View>
                  </View>
                </View>

                {/* Plus Icon */}
                <View style={styles.alsoBoughtPlusWrapper}>
                  <Icon name="plus" size={scaleh(16)} color="#000" />
                </View>

                {/* Product 2 */}
                <View style={styles.alsoBoughtProduct}>
                  <LinearGradient colors={['#FFD1DC', '#FFF5F5']} style={styles.alsoBoughtImageBg}>
                    <Image source={require('../../../images/bgImages/productImg.webp')} style={styles.alsoBoughtImg} resizeMode="contain" />
                  </LinearGradient>
                  <View style={styles.alsoBoughtDetails}>
                    <Text style={styles.alsoBoughtProductTitle} numberOfLines={2}>Vitamin C + E Sunscreen SPF 50 PA++++ with New...</Text>
                    <Text style={styles.alsoBoughtSizeText}>3 Sizes</Text>
                    <View style={styles.alsoBoughtPriceRow}>
                      <Text style={styles.alsoBoughtCurrentPrice}>₹699</Text>
                      <Text style={styles.alsoBoughtOldPrice}>₹899</Text>
                    </View>
                    <View style={styles.alsoBoughtPill}><Text style={styles.alsoBoughtPillText}>80g</Text></View>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.alsoBoughtBtn}>
                <Text style={styles.alsoBoughtBtnLabel}>Add 2</Text>
                <Text style={styles.alsoBoughtBtnPrice}>₹1271 <Text style={styles.alsoBoughtBtnOldPrice}>₹999</Text></Text>
              </TouchableOpacity>
            </View>

            {/* Available Offers */}
            <View style={styles.offersContainer}>
              <View style={styles.offersHeader}>
                <Text style={styles.offersTitle}>Available Offers</Text>
              </View>
              <ScrollView 
                horizontal 
                pagingEnabled 
                showsHorizontalScrollIndicator={false}
                onScroll={handleOfferScroll}
                scrollEventThrottle={16}
              >
                {[1, 2, 3, 4].map((_, index) => (
                  <View key={index} style={[styles.offerCardWrapper, { width: width - scaleh(40) }]}>
                    <View style={styles.offerCard}>
                      <View style={styles.offerCardTop}>
                        <Text style={styles.offerCardTitle}>Buy Any 2@699</Text>
                        <Text style={styles.offerCardSubtitle}>Sitewide</Text>
                      </View>
                      <View style={styles.offerCardBottom}>
                        <Text style={styles.offerCardBottomText}>No code required</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
              
              <View style={styles.offerPaginationRow}>
                {[0, 1, 2, 3].map((_, i) => (
                  <View key={i} style={[styles.offerDot, activeOfferIndex === i && styles.offerActiveDot]} />
                ))}
              </View>
            </View>

            {/* Banner Section Placeholder */}
            <LinearGradient
              colors={['#FFD1DC', '#FFF5F5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.bannerImagePlaceholder}
            />

            {/* What's Going On Section */}
            <View style={styles.whatsGoingOnSection}>
              <Text style={styles.whatsGoingOnTitle}>What's Going On</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.whatsGoingOnScroll}>
                {[1, 2, 3].map((_, index) => (
                  <LinearGradient
                    key={index}
                    colors={['#FFD1DC', '#FFF5F5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.whatsGoingOnCard}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Accordion List (Hero Ingredients, How To Use, Product Benefits, FAQs) */}
            <View style={styles.multiAccordionContainer}>
              {/* Hero Ingredients */}
              <TouchableOpacity 
                style={[styles.accListCard, isHeroExpanded && styles.accListCardExpanded]}
                activeOpacity={0.8}
                onPress={() => setIsHeroExpanded(!isHeroExpanded)}
              >
                <Text style={styles.accListTitle}>Hero Ingredients</Text>
                <Icon name={isHeroExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              {isHeroExpanded && (
                <View style={styles.accListContent}>
                  {[
                    'New Age UV Filters',
                    'Sicilian Blood Orange',
                    'Triple Vitamin C',
                    'Vitamin E',
                  ].map((ingredient, idx) => (
                    <View key={idx} style={{ marginBottom: idx === 3 ? 0 : scalev(30) }}>
                      <Text style={styles.heroSubTitle}>{ingredient}</Text>
                      <View style={styles.heroDescRow}>
                        <Text style={styles.heroDescText}>
                          This sunscreen is tested in an independent third laboratory to confirm the level of protection it provides below is the lab report and data points.
                        </Text>
                        <Icon name="chevron-right" size={scaleh(16)} color="#FF0069" />
                      </View>

                      <TouchableOpacity 
                        style={styles.fullIngredientsRow}
                        activeOpacity={0.8}
                        onPress={() => setIsFullIngredientsExpanded(!isFullIngredientsExpanded)}
                      >
                        <Text style={styles.fullIngredientsText}>See Full Ingredients</Text>
                        <Icon name={isFullIngredientsExpanded ? "chevron-up" : "chevron-down"} size={scaleh(16)} color="#1A1A1A" />
                      </TouchableOpacity>

                      <Text style={styles.accLabel}>Clinical Results:</Text>
                      <Text style={styles.accText}>This sunscreen is tested in an independent third-party laboratory to confirm the level of protection it provides below is the lab report and data points.</Text>

                      <Text style={styles.accLabel}>Test Type:</Text>
                      <Text style={styles.accText}>IN-VIVO SPF Testing as pe international standards - IS 123456 : 1234 (ISO 12345 : 1234, MOD)</Text>
                      <Text style={styles.accText}>In-Vitro analysis as per COLIPA Guidelines</Text>

                      <Text style={styles.accRow}>
                        <Text style={styles.accLabel}>Study Number:</Text>
                        <Text style={styles.accText}> TTTH/COS/SPF/2026-27 SPF-131</Text>
                      </Text>

                      <Text style={styles.accLabel}>SPF values obtained:</Text>
                      <Text style={styles.accText}>IN-VIVO SPF Testing as pe international standards - IS 123456 : 1234 (ISO 12345 : 1234, MOD)</Text>
                      <Text style={styles.accText}>In-Vitro analysis as per COLIPA Guidelines</Text>

                      <Text style={styles.accRow}>
                        <Text style={styles.accLabel}>PA rating:</Text>
                        <Text style={styles.accText}> PA++++</Text>
                      </Text>

                      <Text style={styles.accLabel}>Other results:</Text>
                      <Text style={styles.accText}>Broad Spectrum Protection: Yes</Text>
                    </View>
                  ))}
                </View>
              )}

              {/* How To Use */}
              <TouchableOpacity style={[styles.accListCard, isHowToUseExpanded && styles.accListCardExpanded]} activeOpacity={0.8} onPress={() => setIsHowToUseExpanded(!isHowToUseExpanded)}>
                <Text style={styles.accListTitle}>How To Use</Text>
                <Icon name={isHowToUseExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              {isHowToUseExpanded && (
                <View style={styles.accListContent}>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Use 15 minutes before stepping out.</Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Apply generously on the face, neck & other body parts.</Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Re-apply every 2-3 hours for maximum protection.</Text>
                  </View>
                  <Text style={styles.proTipText}>Pro Tip: Use it even when indoors, or out on a cloudy day. Great under makeup too.</Text>
                </View>
              )}
              
              {/* Product Benefits */}
              <TouchableOpacity style={[styles.accListCard, isBenefitsExpanded && styles.accListCardExpanded]} activeOpacity={0.8} onPress={() => setIsBenefitsExpanded(!isBenefitsExpanded)}>
                <Text style={styles.accListTitle}>Product Benefits</Text>
                <Icon name={isBenefitsExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              {isBenefitsExpanded && (
                <View style={styles.accListContent}>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Reduces <Text style={styles.boldText}>dullness & tan</Text></Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}><Text style={styles.boldText}>Water-Light</Text> fluid texture</Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Blocks <Text style={styles.boldText}>UVA, UVB & Blue Light Rays</Text></Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Fades <Text style={styles.boldText}>dark spots</Text></Text>
                  </View>
                  <View style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.bulletText}>Delivers lightweight hydration</Text>
                  </View>
                </View>
              )}
              
              {/* FAQs */}
              <TouchableOpacity style={[styles.accListCard, isFaqsExpanded && styles.accListCardExpanded]} activeOpacity={0.8} onPress={() => setIsFaqsExpanded(!isFaqsExpanded)}>
                <Text style={styles.accListTitle}>FAQs</Text>
                <Icon name={isFaqsExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              {isFaqsExpanded && (
                <View style={styles.accListContent}>
                  <Text style={styles.faqQuestion}>Is Dot & Key Vitamin C + E Sunscreen in vivo tested?</Text>
                  <Text style={styles.faqAnswer}>Yes, Dot & Key Vitamin C + E Sunscreen is clinically in vivo tested to verify its SPF 50+ PA++++ protection on real human skin under controlled laboratory conditions.</Text>
                  
                  <Text style={styles.faqQuestion}>What is Vitamin C sunscreen and how does it work?</Text>
                  <Text style={styles.faqAnswer}>Vitamin C sunscreen is a protective formula infused with Vitamin C (often as stable derivatives like ascorbyl glucoside) alongside SPF filters. It works by blocking UV rays while neutralizing free radicals from sun exposure and pollution, boosting collagen, and brightening skin.</Text>
                  
                  <Text style={styles.faqQuestion}>What are the benefits of using Vitamin C sunscreen?</Text>
                  <Text style={styles.faqAnswer}>Key Vitamin C sunscreen benefits include broad-spectrum UV protection, antioxidant defence against free radicals, skin brightening, collagen stimulation for firmness, and fading hyperpigmentation. It prevents photoageing, and provides hydration-perfect for glowing, youthful skin.</Text>
                </View>
              )}
            </View>

            {/* Customer Reviews Section */}
            <View style={styles.reviewsContainer}>
              <Text style={styles.reviewsTitle}>Customer Reviews</Text>
              <View style={styles.reviewsStarsContainer}>
                <MaterialIcons name="star" size={scaleh(16)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(16)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(16)} color="#32CD32" />
                <MaterialIcons name="star" size={scaleh(16)} color="#32CD32" />
                <MaterialIcons name="star-outline" size={scaleh(16)} color="#32CD32" />
              </View>
              <Text style={styles.reviewsBasedOnText}>Based on 1141 reviews</Text>

              <View style={styles.reviewsBarsContainer}>
                {[5, 4, 3, 2, 1].map((stars, idx) => (
                  <View key={idx} style={styles.reviewsBarRow}>
                    <View style={styles.reviewsRowStars}>
                      {[...Array(5)].map((_, i) => (
                        <MaterialIcons key={i} name={i < stars ? "star" : "star-outline"} size={scaleh(12)} color="#32CD32" />
                      ))}
                    </View>
                    <View style={styles.reviewsProgressBarBg}>
                      <View style={[styles.reviewsProgressBarFill, { width: stars === 5 ? '50%' : stars === 4 ? '20%' : '0%' }]} />
                    </View>
                    <Text style={styles.reviewsBarPerc}>64% (1234)</Text>
                  </View>
                ))}
              </View>
              
              <View style={styles.reviewDivider} />

              {/* Sample Review 1 */}
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewStars}>
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star-outline" size={scaleh(12)} color="#32CD32" />
                  </View>
                  <Text style={styles.reviewDate}>06/16/2025</Text>
                </View>
                <View style={styles.reviewUserRow}>
                  <View style={styles.reviewVerifiedPill}><Text style={styles.reviewVerifiedText}>Verified</Text></View>
                  <Text style={styles.reviewUserName}>Hemal Kapoor</Text>
                </View>
                <Text style={styles.reviewHeadline}>No Heavy Layer Feeling</Text>
                <Text style={styles.reviewBody}>Unlike many sunscreens I've tried, this one feels very lightly on the face.</Text>
              </View>

              <View style={styles.reviewDivider} />

              {/* Sample Review 2 */}
              <View style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewStars}>
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star" size={scaleh(12)} color="#32CD32" />
                    <MaterialIcons name="star-outline" size={scaleh(12)} color="#32CD32" />
                  </View>
                  <Text style={styles.reviewDate}>06/16/2025</Text>
                </View>
                <View style={styles.reviewUserRow}>
                  <View style={styles.reviewVerifiedPill}><Text style={styles.reviewVerifiedText}>Verified</Text></View>
                  <Text style={styles.reviewUserName}>Hemal Kapoor</Text>
                </View>
                <Text style={styles.reviewHeadline}>No Heavy Layer Feeling</Text>
                <Text style={styles.reviewBody}>Unlike many sunscreens I've tried, this one feels very lightly on the face.</Text>
              </View>

              <View style={styles.viewAllReviewsRow}>
                <TouchableOpacity onPress={() => navigation.navigate('AllReviewsScreen')}>
                  <Text style={styles.viewAllReviewsText}>View All Reviews <Icon name="chevron-right" size={scaleh(13)} color="#FF0069" /></Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* More Information */}
            <View style={[styles.multiAccordionContainer, { marginBottom: scalev(50) }]}>
              <TouchableOpacity style={[styles.accListCard, isMoreInfoExpanded && styles.accListCardExpanded]} activeOpacity={0.8} onPress={() => setIsMoreInfoExpanded(!isMoreInfoExpanded)}>
                <Text style={styles.accListTitle}>More Information</Text>
                <Icon name={isMoreInfoExpanded ? "chevron-up" : "chevron-down"} size={scaleh(20)} color="#1A1A1A" />
              </TouchableOpacity>
              {isMoreInfoExpanded && (
                <View style={styles.accListContent}>
                  <Text style={styles.moreInfoText}>Product Name: Dot & Key Vitamin C + E Sunscreen, IN-VIVO Tested SPF 50+ PA++++</Text>
                  <Text style={styles.moreInfoText}>Net Qty: 50g</Text>
                  <Text style={styles.moreInfoText}>MRP Rs. (Incl. of all taxes): Rs. 445.00</Text>
                  <Text style={styles.moreInfoText}>Manufacturer Details: HITECH FORMULATIONS PVT. LTD. Hitech Formulation Pvt. Ltd, Sai Road Baddi, Distt. Solan, Himachal Pradesh-173205, India, M.L. No.: HIM/ COS/16/241</Text>
                  <Text style={styles.moreInfoText}>Expiry Date: 24 months from manufacturing</Text>
                  <Text style={styles.moreInfoText}>Country of Origin: INDIA</Text>
                </View>
              )}
            </View>

          </View>
        </Animated.ScrollView>

        {/* Animated Sticky Tabs Bar (Overlays Content) */}
        <Animated.View
          style={[
            styles.stickyTabsContainerAbsolute,
            {
              transform: [{ translateY: headerTranslateY }],
              opacity: headerOpacity,
            }
          ]}
          pointerEvents="box-none"
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stickyTabsScroll}>
            {['Image', 'In-Vivo Tested', 'Details', 'Ingredients', 'Benefits', 'FAQs', 'Reviews'].map((tab, idx) => (
              <TouchableOpacity key={idx} style={styles.tabBtn}>
                <Text style={styles.tabText}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Bottom Fixed Footer */}
        <View style={styles.bottomFooter}>
          <Text style={styles.footerPrice}>₹699</Text>

          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.qtyBtnText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.qtyValue}>{quantity}</Text>

            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.qtyBtnText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(15),
    paddingTop: scalev(10),
    paddingBottom: scalev(15),
    marginTop: scalev(35),
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: scaleh(5),
  },
  headerIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconBtn: {
    marginLeft: scaleh(15),
    padding: scaleh(5),
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: scalev(100), // Space for bottom footer
  },

  // Title & Ratings
  productTitle: {
    fontSize: scaleh(22),
    fontWeight: '700',
    color: '#1A1A1A',
    paddingHorizontal: scaleh(20),
    marginTop: scalev(15),
    marginBottom: scalev(8),
    lineHeight: scalev(26),
  },
  suitableText: {
    fontSize: scaleh(14),
    color: '#333',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(10),
  },
  suitableBold: {
    fontWeight: '700',
  },
  ratingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingDivider: {
    width: 1,
    height: scalev(12),
    backgroundColor: '#CCC',
    marginHorizontal: scaleh(10),
  },
  verifiedText: {
    fontSize: scaleh(13),
    color: '#666',
    marginLeft: scaleh(5),
  },

  // Gallery
  galleryContainer: {
    width: '100%',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  imageBackground: {
    width: '100%',
    height: scalev(280),
    borderRadius: scaleh(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '80%',
    height: '80%',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scalev(15),
  },
  dot: {
    width: scaleh(8),
    height: scaleh(8),
    borderRadius: scaleh(4),
    backgroundColor: '#D3D3D3',
    marginHorizontal: scaleh(4),
  },
  activeDot: {
    backgroundColor: '#FF0069',
  },

  // Tags & Share
  tagsAndShareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bestsellerTag: {
    backgroundColor: '#FF0069',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(4),
    borderRadius: scaleh(20),
    marginRight: scaleh(10),
  },
  bestsellerText: {
    color: '#FFF',
    fontSize: scaleh(11),
    fontWeight: '700',
  },
  outlineTag: {
    borderWidth: 1,
    borderColor: '#FF0069',
    paddingHorizontal: scaleh(10),
    paddingVertical: scalev(4),
    borderRadius: scaleh(20),
  },
  outlineTagText: {
    color: '#FF0069',
    fontSize: scaleh(11),
    fontWeight: '700',
  },
  shareBtn: {
    padding: scaleh(5),
  },

  // Size Selection
  sizeSelectionRow: {
    flexDirection: 'row',
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(15),
  },
  sizeBtn: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: scaleh(15),
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(6),
    marginRight: scaleh(10),
    backgroundColor: '#FFF',
  },
  sizeBtnActive: {
    backgroundColor: '#FF0069',
    borderColor: '#FF0069',
  },
  sizeBtnText: {
    color: '#333',
    fontSize: scaleh(14),
    fontWeight: '600',
  },
  sizeBtnTextActive: {
    color: '#FFF',
  },

  // Pricing
  priceContainer: {
    paddingHorizontal: scaleh(20),
    marginBottom: scalev(20),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentPrice: {
    fontSize: scaleh(24),
    fontWeight: '800',
    color: '#1A1A1A',
    marginRight: scaleh(10),
  },
  originalPrice: {
    fontSize: scaleh(16),
    color: '#999',
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  taxesText: {
    fontSize: scaleh(13),
    color: '#666',
    marginTop: scalev(2),
  },

  // Top Section
  topSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: scalev(15),
  },

  // Sticky Tabs (Absolute Overlay)
  stickyTabsContainerAbsolute: {
    position: 'absolute',
    top: scalev(85), // Below header
    left: 0,
    right: 0,
    backgroundColor: '#FFD1DC',
    paddingVertical: scalev(12),
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  stickyTabsScroll: {
    paddingHorizontal: scaleh(15),
    alignItems: 'center',
  },
  tabBtn: {
    marginHorizontal: scaleh(10),
  },
  tabText: {
    fontSize: scaleh(14),
    color: '#333',
    fontWeight: '500',
  },

  // Bottom Section
  bottomSection: {
    paddingHorizontal: scaleh(20),
    paddingTop: scalev(20),
    paddingBottom: scalev(100), // Space for footer
  },

  // Delivery Card
  deliveryCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFF5F8',
    borderRadius: scaleh(12),
    padding: scaleh(15),
    marginBottom: scalev(20),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  deliveryTitle: {
    fontSize: scaleh(13),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(10),
  },
  deliveryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF0069',
    height: scalev(40),
  },
  pincodeInput: {
    flex: 1,
    paddingHorizontal: scaleh(15),
    fontSize: scaleh(14),
    color: '#333',
  },
  checkBtn: {
    paddingHorizontal: scaleh(20),
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    borderLeftWidth: 1,
    borderLeftColor: '#FF0069',
  },
  checkBtnText: {
    color: '#FF0069',
    fontWeight: '600',
    fontSize: scaleh(14),
  },
  estimatedDeliveryText: {
    color: '#32CD32',
    fontSize: scaleh(13),
    marginTop: scalev(10),
    fontWeight: '500',
  },

  // Location Card
  locationCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFF',
    borderRadius: scaleh(12),
    padding: scaleh(15),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(25),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  locationIcon: {
    marginRight: scaleh(12),
  },
  locationTextContainer: {
    flex: 1,
    marginRight: scaleh(10),
  },
  locationTitle: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(2),
  },
  locationSubtitle: {
    fontSize: scaleh(11.5),
    color: '#666',
    lineHeight: scalev(14),
  },
  enableBtn: {
    backgroundColor: '#FF0069',
    paddingHorizontal: scaleh(15),
    paddingVertical: scalev(6),
    borderRadius: scaleh(6),
  },
  enableBtnText: {
    color: '#FFF',
    fontSize: scaleh(12),
    fontWeight: '700',
  },

  // Sections
  sectionBlock: {
    marginBottom: scalev(25),
  },
  sectionTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(15),
  },

  // Helps Grid
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
    fontSize: scaleh(13),
    fontWeight: '600',
  },

  // Targets Row
  targetsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  targetPill: {
    backgroundColor: '#E67E22',
    borderRadius: scaleh(20),
    paddingVertical: scalev(6),
    paddingHorizontal: scaleh(16),
    marginRight: scaleh(10),
    marginBottom: scalev(10),
  },
  targetPillText: {
    color: '#FFF',
    fontSize: scaleh(13),
    fontWeight: '600',
  },

  // Accordion Card
  accordionContainer: {
    marginBottom: scalev(20),
  },
  accordionCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: scaleh(8),
    padding: scaleh(18),
  },
  accordionCardExpanded: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  accordionTitle: {
    fontSize: scaleh(16),
    fontWeight: '500',
    color: '#333',
  },
  accordionContent: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderTopWidth: 0,
    borderBottomLeftRadius: scaleh(8),
    borderBottomRightRadius: scaleh(8),
    padding: scaleh(18),
    paddingTop: scalev(5),
  },
  accRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scalev(12),
    marginBottom: scalev(4),
  },
  accLabel: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: scalev(12),
    marginBottom: scalev(4),
  },
  accText: {
    fontSize: scaleh(14),
    color: '#333',
    lineHeight: scalev(18),
  },
  certPhotoBtn: {
    marginTop: scalev(25),
    alignSelf: 'center',
  },
  certPhotoText: {
    fontSize: scaleh(14),
    fontWeight: '500',
    color: '#1A1A1A',
    textDecorationLine: 'underline',
  },

  // Bottom Footer
  bottomFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scaleh(20),
    paddingVertical: scalev(15),
    paddingBottom: Platform.OS === 'ios' ? scalev(25) : scalev(15),
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  footerPrice: {
    fontSize: scaleh(22),
    fontWeight: '800',
    color: '#1A1A1A',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF0069',
    borderRadius: scaleh(25),
    height: scalev(45),
    paddingHorizontal: scaleh(10),
    width: scaleh(140),
    justifyContent: 'space-between',
  },
  qtyBtn: {
    width: scaleh(35),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyBtnText: {
    color: '#FFF',
    fontSize: scaleh(22),
    fontWeight: '600',
    marginTop: Platform.OS === 'ios' ? 0 : scalev(-2),
  },
  qtyValue: {
    color: '#FFF',
    fontSize: scaleh(18),
    fontWeight: '700',
  },
  // Product Details Accordion
  productDetailsContent: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderTopWidth: 0,
    borderBottomLeftRadius: scaleh(8),
    borderBottomRightRadius: scaleh(8),
    padding: scaleh(18),
  },
  pdGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pdGridItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(12),
  },
  pdGridIcon: {
    marginRight: scaleh(8),
  },
  pdGridText: {
    fontSize: scaleh(15),
    color: '#333',
    fontWeight: '500',
  },

  // Customers Also Bought
  alsoBoughtCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: scaleh(8),
    padding: scaleh(18),
    marginBottom: scalev(20),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  alsoBoughtTitle: {
    fontSize: scaleh(18),
    fontWeight: '500',
    color: '#1A1A1A',
    marginBottom: scalev(4),
  },
  alsoBoughtSubtitle: {
    fontSize: scaleh(15),
    color: '#666',
    marginBottom: scalev(15),
  },
  alsoBoughtProductsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scalev(15),
  },
  alsoBoughtProduct: {
    width: '42%',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: scaleh(12),
    backgroundColor: '#FFF',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  alsoBoughtImageBg: {
    width: '100%',
    height: scalev(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  alsoBoughtImg: {
    width: '70%',
    height: '80%',
  },
  alsoBoughtDetails: {
    padding: scaleh(8),
    alignItems: 'center',
  },
  alsoBoughtProductTitle: {
    fontSize: scaleh(12),
    color: '#666',
    textAlign: 'center',
    marginBottom: scalev(4),
    lineHeight: scalev(14),
  },
  alsoBoughtSizeText: {
    fontSize: scaleh(13),
    color: '#333',
    marginBottom: scalev(2),
  },
  alsoBoughtPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(4),
  },
  alsoBoughtCurrentPrice: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#1A1A1A',
    marginRight: scaleh(4),
  },
  alsoBoughtOldPrice: {
    fontSize: scaleh(14),
    color: '#999',
    textDecorationLine: 'line-through',
  },
  alsoBoughtPill: {
    borderWidth: 1,
    borderColor: '#E67E22',
    borderRadius: scaleh(10),
    paddingHorizontal: scaleh(8),
    paddingVertical: scalev(2),
  },
  alsoBoughtPillText: {
    fontSize: scaleh(13),
    color: '#1A1A1A',
    fontWeight: '600',
  },
  alsoBoughtPlusWrapper: {
    width: scaleh(24),
    height: scaleh(24),
    borderRadius: scaleh(12),
    borderWidth: 1,
    borderColor: '#EFEFEF',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    zIndex: 2,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  alsoBoughtBtn: {
    backgroundColor: '#FF0069',
    borderRadius: scaleh(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scalev(12),
    paddingHorizontal: scaleh(15),
    elevation: 4,
    shadowColor: '#FF0069',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  alsoBoughtBtnLabel: {
    color: '#FFF',
    fontSize: scaleh(17),
    fontWeight: '700',
  },
  alsoBoughtBtnPrice: {
    color: '#FFF',
    fontSize: scaleh(17),
    fontWeight: '700',
  },
  alsoBoughtBtnOldPrice: {
    fontSize: scaleh(15),
    textDecorationLine: 'line-through',
    fontWeight: '400',
    marginLeft: scaleh(4),
  },

  // Available Offers
  offersContainer: {
    marginBottom: scalev(30),
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E6005C',
    borderRadius: scaleh(12),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#E6005C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  offersHeader: {
    padding: scaleh(15),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  offersTitle: {
    fontSize: scaleh(18),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  offerCardWrapper: {
    padding: scaleh(15),
    paddingBottom: scalev(5),
  },
  offerCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#FF0069',
    borderRadius: scaleh(12),
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FF0069',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  offerCardTop: {
    backgroundColor: '#FFF0F5',
    padding: scaleh(15),
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  offerCardTitle: {
    fontSize: scaleh(18),
    fontWeight: '700',
    color: '#E6005C',
    marginBottom: scalev(4),
  },
  offerCardSubtitle: {
    fontSize: scaleh(14),
    color: '#333',
    fontStyle: 'italic',
  },
  offerCardBottom: {
    backgroundColor: '#FFF',
    padding: scaleh(12),
  },
  offerCardBottomText: {
    fontSize: scaleh(15),
    color: '#666',
  },
  offerPaginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: scalev(15),
  },
  offerDot: {
    width: scaleh(6),
    height: scaleh(6),
    borderRadius: scaleh(3),
    borderWidth: 1,
    borderColor: '#FF0069',
    marginHorizontal: scaleh(4),
  },
  offerActiveDot: {
    backgroundColor: '#FF0069',
  },

  // Banner
  bannerImagePlaceholder: {
    width: '100%',
    height: scalev(250),
    marginBottom: scalev(20),
  },

  // What's Going On
  whatsGoingOnSection: {
    marginBottom: scalev(30),
  },
  whatsGoingOnTitle: {
    fontSize: scaleh(20),
    fontWeight: '800',
    color: '#FF6F61',
    textAlign: 'center',
    marginBottom: scalev(15),
  },
  whatsGoingOnScroll: {
    paddingHorizontal: scaleh(5),
  },
  whatsGoingOnCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: scaleh(120),
    height: scalev(160),
    borderRadius: scaleh(12),
    marginHorizontal: scaleh(10),
  },

  // Multi-Accordion List
  multiAccordionContainer: {
    marginBottom: scalev(30),
  },
  accListCard: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderRadius: scaleh(8),
    padding: scaleh(18),
    marginBottom: scalev(10),
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  accListCardExpanded: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  accListTitle: {
    fontSize: scaleh(18),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  accListContent: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EFEFEF',
    borderTopWidth: 0,
    borderBottomLeftRadius: scaleh(8),
    borderBottomRightRadius: scaleh(8),
    padding: scaleh(18),
    paddingTop: scalev(5),
    marginBottom: scalev(10),
  },
  heroSubTitle: {
    fontSize: scaleh(16),
    fontWeight: '700',
    color: '#E67E22', // orange
    marginBottom: scalev(4),
  },
  heroDescRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: scalev(15),
  },
  heroDescText: {
    flex: 1,
    fontSize: scaleh(15),
    color: '#333',
    lineHeight: scalev(18),
    marginRight: scaleh(10),
  },
  fullIngredientsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scalev(12),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    marginBottom: scalev(15),
  },
  fullIngredientsText: {
    fontSize: scaleh(16),
    fontWeight: '500',
    color: '#1A1A1A',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: scalev(12),
  },
  bulletDot: {
    width: scaleh(6),
    height: scaleh(6),
    borderRadius: scaleh(3),
    backgroundColor: '#1A1A1A',
    marginTop: scalev(6),
    marginRight: scaleh(10),
  },
  bulletText: {
    flex: 1,
    fontSize: scaleh(15),
    color: '#1A1A1A',
    lineHeight: scalev(20),
  },
  boldText: {
    fontWeight: '700',
  },
  proTipText: {
    fontSize: scaleh(14),
    color: '#FF6F61', // bright orange/pink
    fontStyle: 'italic',
    lineHeight: scalev(18),
    marginTop: scalev(10),
  },
  faqQuestion: {
    fontSize: scaleh(15),
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: scalev(8),
    lineHeight: scalev(18),
  },
  faqAnswer: {
    fontSize: scaleh(14),
    color: '#666',
    marginBottom: scalev(20),
    lineHeight: scalev(18),
  },

  // Customer Reviews
  reviewsContainer: {
    backgroundColor: '#FFF',
    paddingTop: scalev(20),
    paddingBottom: scalev(30),
  },
  reviewsTitle: {
    fontSize: scaleh(20),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: scalev(10),
  },
  reviewsStarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: scalev(5),
  },
  reviewsBasedOnText: {
    fontSize: scaleh(13),
    color: '#666',
    textAlign: 'center',
    marginBottom: scalev(25),
  },
  reviewsBarsContainer: {
    paddingHorizontal: scaleh(10),
  },
  reviewsBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  reviewsRowStars: {
    flexDirection: 'row',
    width: scaleh(70),
  },
  reviewsProgressBarBg: {
    flex: 1,
    height: scalev(6),
    backgroundColor: '#EFEFEF',
    borderRadius: scaleh(3),
    marginHorizontal: scaleh(10),
  },
  reviewsProgressBarFill: {
    height: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: scaleh(3),
  },
  reviewsBarPerc: {
    width: scaleh(60),
    fontSize: scaleh(12),
    color: '#333',
    textAlign: 'right',
  },
  reviewDivider: {
    height: 1,
    backgroundColor: '#EFEFEF',
    marginVertical: scalev(20),
  },
  reviewItem: {
    paddingHorizontal: scaleh(10),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scalev(8),
  },
  reviewStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: scaleh(13),
    color: '#999',
  },
  reviewUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewVerifiedPill: {
    backgroundColor: '#FF0069',
    paddingHorizontal: scaleh(6),
    paddingVertical: scalev(2),
    borderRadius: scaleh(4),
    marginRight: scaleh(8),
  },
  reviewVerifiedText: {
    color: '#FFF',
    fontSize: scaleh(11),
    fontWeight: '700',
  },
  reviewUserName: {
    fontSize: scaleh(14),
    color: '#1A1A1A',
    fontWeight: '600',
  },
  reviewHeadline: {
    fontSize: scaleh(14),
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: scalev(8),
    marginBottom: scalev(4),
  },
  reviewBody: {
    fontSize: scaleh(13),
    color: '#666',
    lineHeight: scalev(16),
  },
  viewAllReviewsRow: {
    alignItems: 'center',
    marginTop: scalev(20),
    paddingTop: scalev(15),
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
  },
  viewAllReviewsText: {
    fontSize: scaleh(15),
    fontWeight: '600',
    color: '#FF0069',
  },
  moreInfoText: {
    fontSize: scaleh(15),
    color: '#333',
    lineHeight: scalev(20),
    marginBottom: scalev(12),
  },
});

export default ProductDetailsScreen;
