interface ProductSchemaProps {
  product: {
    id: string
    name: string
    description: string
    brand: string
    price: string
    originalPrice?: string
    rating: number
    reviewCount: number
    image: string
    category: string
    sku: string
    availability: string
    condition: string
  }
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    category: product.category,
    sku: product.sku,
    image: [`https://stylecar.co.kr${product.image}`],
    offers: {
      "@type": "Offer",
      url: `https://stylecar.co.kr/products/${product.id}`,
      priceCurrency: "KRW",
      price: product.price.replace(",", ""),
      priceValidUntil: "2024-12-31",
      availability: `https://schema.org/${product.availability}`,
      itemCondition: `https://schema.org/${product.condition}`,
      seller: {
        "@type": "Organization",
        name: "스타일카",
        url: "https://stylecar.co.kr",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "KRW",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
        },
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: 5,
      },
      author: {
        "@type": "Person",
        name: "스타일카 고객",
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
