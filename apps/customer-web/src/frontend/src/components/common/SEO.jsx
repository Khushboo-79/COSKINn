import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  name = "COSKINn", 
  type = "website",
  image = "https://www.coskinn.com/bg-orange.webp",
  url = "https://www.coskinn.com"
}) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title ? `${title} | COSKINn` : 'COSKINn | Premium Skincare & Cosmetics'}</title>
      <meta name='description' content={description || "Discover premium skincare and cosmetics. Shop clean, ethical, and effective beauty products for your daily routine."} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags for Facebook, WhatsApp, etc. */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || "COSKINn | Premium Skincare & Cosmetics"} />
      <meta property="og:description" content={description || "Premium clean and ethical skincare."} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || "COSKINn"} />
      <meta name="twitter:description" content={description || "Premium clean and ethical skincare."} />
      <meta name="twitter:image" content={image} />
      
      {/* Structured Data / JSON-LD for Google Rich Snippets */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "COSKINn",
            "url": "https://www.coskinn.com/",
            "description": "Premium skincare and cosmetics brand."
          }
        `}
      </script>
    </Helmet>
  );
}
