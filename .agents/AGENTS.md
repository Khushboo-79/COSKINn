# Global Branding Rule: COSKINn Prefix

Throughout the entire website—including Hero Sections, Featured Categories, Shop pages, Product Cards, Cart, Wishlist, Checkout, My Orders, Search Results, Recommendations, Mega Menu, and all future pages—every product must always be displayed with the **COSKINn** brand prefix. The branding should be consistent across the entire application, with no exceptions.

**Correct Examples:**
- COSKINn Strawberry Glow Cleanser
- COSKINn Vitamin C Sunscreen SPF 50
- COSKINn Magnetic Lipstick
- COSKINn Velvet Blush
- COSKINn Blueberry Overnight Mask
- COSKINn Green Tea Face Mist
- COSKINn Mango Lip Balm SPF 30
- COSKINn Pomegranate Under Eye Patches
- COSKINn Precision Lip Liner
- COSKINn Lift & Curl Mascara
- COSKINn Eyeshadow Palette
- COSKINn Professional Makeup Brush Set
- COSKINn Pocket Perfume Collection

**Important:** Do NOT display any product without the COSKINn prefix.

---

# Global Development Requirements (Mandatory)

These requirements apply to every page and every section of the COSKINn website.

## 1. Fully Responsive
Every section must be completely responsive and optimized for all screen sizes (Mobile 320px+, Large Mobile, Tablet, Laptop, Desktop, Ultra-wide 1920px+).
- No horizontal scrolling
- No overflow issues or broken layouts
- No overlapping elements
- Proper spacing on every device
- Responsive typography, images, cards, navigation, modals, forms, and grids

## 2. Fully Functional
Every component must be fully working. Do NOT create static UI only. Everything should be interactive and functional (e.g., Navigation, Dropdowns, Mega Menu, Search, Filters, Category Switching, Add to Cart, Wishlist, Login, Logout, OTP Verification, Profile, Address Management, Orders, Forms, Buttons, Modals, Sliders, Carousels, Tabs, Accordions).

## 3. Smooth Performance
The website must feel extremely smooth (60 FPS).
- No lag, flickering, stuttering, layout shifts, or heavy/janky animations.
- Scrolling, hover effects, page transitions, modal animations, image loading, and carousel movements must feel premium.

## 4. Performance Optimization
Write production-quality React code optimized for speed.
- Lazy load images and heavy components
- Use WebP images where possible
- Use React.memo where appropriate to prevent unnecessary re-renders
- Optimize Framer Motion animations (keep them GPU-accelerated)
- Minimize JavaScript execution and reduce CLS (Cumulative Layout Shift)
- Ensure fast initial page load and fast route transitions

## 5. Code Quality
Write clean, scalable, and reusable code.
- Modular components and reusable UI elements
- Proper folder structure and clean naming conventions
- No duplicate code; ensure easy maintenance
- Production-ready architecture

## 6. Theme Support
Every page must automatically use the active theme from `theme.js`.
- Never hardcode colors or fonts. Use only the colors and fonts defined in `theme.js`.
- Theme switching between Skincare and Cosmetics should update the entire UI smoothly without requiring a page refresh.

## 7. Brand Consistency & Final Goal
Build a production-ready, luxury beauty e-commerce website that is visually premium, fully responsive, fully functional, highly optimized, and extremely smooth across all devices. Every section should feel polished, interactive, and maintain a consistent COSKINn brand experience.
