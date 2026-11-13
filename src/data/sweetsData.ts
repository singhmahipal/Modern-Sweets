export interface SweetProduct {
  id: string;
  name: string;
  hindiName: string;
  category: "pure-ghee" | "dry-fruit" | "bengali" | "namkeen" | "hampers";
  categoryLabel: string;
  price: number; // base price for 500g
  originalPrice?: number;
  weightOptions: { label: string; multiplier: number }[];
  rating: number;
  reviewsCount: number;
  image: string;
  badge?: string;
  isBestSeller?: boolean;
  isPureGhee?: boolean;
  description: string;
  ingredients: string[];
  shelfLife: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  tagline: string;
  filterKey:
    | "all"
    | "pure-ghee"
    | "dry-fruit"
    | "bengali"
    | "namkeen"
    | "hampers";
  image: string;
  itemCount: number;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Pure Desi Ghee Sweets",
    tagline: "Crafted with 100% pure churned cow ghee",
    filterKey: "pure-ghee",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    itemCount: 18,
  },
  {
    id: "cat-2",
    name: "Royal Dry Fruit Delights",
    tagline: "Premium cashews, pistachios, almonds & figs",
    filterKey: "dry-fruit",
    image:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    itemCount: 14,
  },
  {
    id: "cat-3",
    name: "Authentic Bengali Mithai",
    tagline: "Fresh chhena & aromatic cardamom syrups",
    filterKey: "bengali",
    image:
      "https://images.unsplash.com/photo-1505253758473-96b3d5ebcd96?auto=format&fit=crop&w=800&q=80",
    itemCount: 12,
  },
  {
    id: "cat-4",
    name: "Royal Namkeen & Savories",
    tagline: "Crispy, crunchy Rajasthani spices & sev",
    filterKey: "namkeen",
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    itemCount: 16,
  },
  {
    id: "cat-5",
    name: "Festive Gift Hampers",
    tagline: "Royal packaging for weddings & celebrations",
    filterKey: "hampers",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    itemCount: 10,
  },
];

export const PRODUCTS: SweetProduct[] = [
  {
    id: "sw-1",
    name: "Shahi Kaju Katli",
    hindiName: "शाही काजू कतली",
    category: "dry-fruit",
    categoryLabel: "Royal Dry Fruit",
    price: 480,
    originalPrice: 550,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.9,
    reviewsCount: 1420,
    image:
      "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    isBestSeller: true,
    isPureGhee: true,
    description:
      "Diamond-shaped delicate fudge made with premium Goan cashews, pure cardamom, and edible silver vark. Melt-in-mouth luxury.",
    ingredients: [
      "Premium Cashews (72%)",
      "Sugar",
      "Cardamom",
      "Pure Silver Leaf",
    ],
    shelfLife: "25 Days",
  },
  {
    id: "sw-2",
    name: "Pure Desi Ghee Motichoor Ladoo",
    hindiName: "देसी घी मोतीचूर लड्डू",
    category: "pure-ghee",
    categoryLabel: "Pure Ghee Sweets",
    price: 340,
    originalPrice: 380,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.9,
    reviewsCount: 1980,
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    badge: "Heritage Recipe",
    isBestSeller: true,
    isPureGhee: true,
    description:
      "Tiny gram flour pearls fried in 100% churned cow desi ghee, infused with Kashmiri saffron, melon seeds, and pistachios.",
    ingredients: [
      "Gram Flour (Besan)",
      "Pure Cow Desi Ghee",
      "Saffron",
      "Magaz Seeds",
      "Pistachios",
    ],
    shelfLife: "12 Days",
  },
  {
    id: "sw-3",
    name: "Royal Gulab Jamun",
    hindiName: "शाही गुलाब जामुन",
    category: "pure-ghee",
    categoryLabel: "Pure Ghee Sweets",
    price: 290,
    originalPrice: 330,
    weightOptions: [
      { label: "500g (10 pcs)", multiplier: 1 },
      { label: "1kg (20 pcs)", multiplier: 1.9 },
    ],
    rating: 4.8,
    reviewsCount: 1120,
    image:
      "https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&w=800&q=80",
    badge: "Chef Choice",
    isBestSeller: true,
    isPureGhee: true,
    description:
      "Slow-cooked condensed whole milk dumplings fried golden in desi ghee and steeped in rose-scented cardamom saffron nectar.",
    ingredients: [
      "Fresh Khoya / Mawa",
      "Chhena",
      "Pure Cow Ghee",
      "Rose Petal Extract",
      "Kashmiri Saffron",
    ],
    shelfLife: "8 Days",
  },
  {
    id: "sw-4",
    name: "Spongy Bengali Rasgulla",
    hindiName: "बंगाली रसगुल्ला",
    category: "bengali",
    categoryLabel: "Bengali Delights",
    price: 260,
    originalPrice: 300,
    weightOptions: [
      { label: "500g (8 pcs)", multiplier: 1 },
      { label: "1kg (16 pcs)", multiplier: 1.9 },
    ],
    rating: 4.8,
    reviewsCount: 890,
    image:
      "https://images.unsplash.com/photo-1505253758473-96b3d5ebcd96?auto=format&fit=crop&w=800&q=80",
    badge: "Traditional",
    isBestSeller: false,
    isPureGhee: false,
    description:
      "Feather-light cottage cheese roundels hand-kneaded to perfection and simmered in crystalline light sugar syrup.",
    ingredients: [
      "Fresh Cow Milk Chhena",
      "Purified Cane Sugar",
      "Cardamom",
      "Rose Water",
    ],
    shelfLife: "5 Days (Keep Refrigerated)",
  },
  {
    id: "sw-5",
    name: "Kesar Peda (Mathura Style)",
    hindiName: "केसर पेड़ा",
    category: "pure-ghee",
    categoryLabel: "Pure Ghee Sweets",
    price: 360,
    originalPrice: 400,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.9,
    reviewsCount: 760,
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    isBestSeller: true,
    isPureGhee: true,
    description:
      "Caramelized reduced milk fudge infused with threads of saffron, studded with roasted pistachio and aromatic nutmeg.",
    ingredients: [
      "Slow-Cooked Mawa",
      "Kashmiri Kesar",
      "Desi Ghee",
      "Cardamom",
      "Pistachio",
    ],
    shelfLife: "15 Days",
  },
  {
    id: "sw-6",
    name: "Anjeer Dry Fruit Barfi (Sugar-Free)",
    hindiName: "अंजीर ड्राई फ्रूट बर्फी",
    category: "dry-fruit",
    categoryLabel: "Royal Dry Fruit",
    price: 590,
    originalPrice: 650,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.95,
    reviewsCount: 640,
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=800&q=80",
    badge: "Zero Sugar",
    isBestSeller: true,
    isPureGhee: false,
    description:
      "Naturally sweetened with sun-dried Afghan figs, California almonds, cashews, and golden pistachios. Guilt-free royal treat.",
    ingredients: [
      "Sun-dried Afghan Figs",
      "California Almonds",
      "Cashews",
      "Pistachios",
      "Desi Ghee (touch)",
    ],
    shelfLife: "30 Days",
  },
  {
    id: "sw-7",
    name: "Shahi Milk Cake (Kalakand)",
    hindiName: "शाही मिल्क केक",
    category: "pure-ghee",
    categoryLabel: "Pure Ghee Sweets",
    price: 380,
    originalPrice: 420,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.85,
    reviewsCount: 820,
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Artisanal",
    isBestSeller: false,
    isPureGhee: true,
    description:
      "Traditional slow-browned grainy fudge made by simmering whole milk for hours with pure ghee and pistachio topping.",
    ingredients: ["Fresh Whole Milk", "Pure Cow Ghee", "Cardamom", "Pistachio"],
    shelfLife: "10 Days",
  },
  {
    id: "sw-8",
    name: "Kaju Pista Roll",
    hindiName: "काजू पिस्ता रोल",
    category: "dry-fruit",
    categoryLabel: "Royal Dry Fruit",
    price: 520,
    originalPrice: 580,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.9,
    reviewsCount: 530,
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    badge: "Royal Special",
    isBestSeller: false,
    isPureGhee: false,
    description:
      "Silky cashew sheet wrapped around an emerald filling of roasted Iranian pistachios and cardamom essence.",
    ingredients: [
      "Cashews",
      "Pistachios",
      "Sugar",
      "Cardamom",
      "Natural Green Saffron",
    ],
    shelfLife: "20 Days",
  },
  {
    id: "sw-9",
    name: "Ratlami Sev & Shahi Mixture",
    hindiName: "रतलामी सेव एवं शाही मिश्रण",
    category: "namkeen",
    categoryLabel: "Namkeen & Savories",
    price: 180,
    originalPrice: 210,
    weightOptions: [
      { label: "250g", multiplier: 0.55 },
      { label: "500g", multiplier: 1 },
      { label: "1kg", multiplier: 1.9 },
    ],
    rating: 4.75,
    reviewsCount: 940,
    image:
      "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    badge: "Crispy Favorite",
    isBestSeller: true,
    isPureGhee: false,
    description:
      "Spicy clove-flavored Rajasthani sev tossed with roasted peanuts, curry leaves, and crunchy lentil crisps.",
    ingredients: [
      "Gram Flour",
      "Clove & Black Pepper Powder",
      "Peanuts",
      "Curry Leaves",
      "Groundnut Oil",
    ],
    shelfLife: "60 Days",
  },
  {
    id: "sw-10",
    name: "Maharaja Heritage Gift Hamper",
    hindiName: "महाराजा हेरिटेज गिफ्ट हैंपर",
    category: "hampers",
    categoryLabel: "Festive Hampers",
    price: 1499,
    originalPrice: 1799,
    weightOptions: [
      { label: "Deluxe Box (1.2 kg)", multiplier: 1 },
      { label: "Grand Royal Box (2.0 kg)", multiplier: 1.7 },
    ],
    rating: 5.0,
    reviewsCount: 310,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
    badge: "Luxury Box",
    isBestSeller: true,
    isPureGhee: true,
    description:
      "Handcrafted velvet gold box containing Kaju Katli, Motichoor Ladoo, Anjeer Barfi, Shahi Mixture, 2 Handcrafted Brass Diyas, and a personalized message.",
    ingredients: [
      "Assorted Signature Sweets",
      "Premium Dry Fruits",
      "Brass Diya Pair",
      "Custom Greeting Card",
    ],
    shelfLife: "20 Days",
  },
];

export const TESTIMONIALS = [
  {
    id: "t-1",
    name: "Pooja Agarwal",
    location: "Mumbai, Maharashtra",
    comment:
      "The Motichoor Ladoo tastes just like what my grandmother used to make with pure cow ghee. The fragrance as soon as you open the box is unforgettable!",
    rating: 5,
    occasion: "Diwali Gifting",
    date: "2 weeks ago",
  },
  {
    id: "t-2",
    name: "Vikramaditya Rathore",
    location: "Jaipur, Rajasthan",
    comment:
      "Ordered 150 Maharaja Hampers for my sister’s royal wedding. Every guest was blown away by the Kaju Katli and luxury velvet packaging. Truly world-class.",
    rating: 5,
    occasion: "Wedding Celebration",
    date: "1 month ago",
  },
  {
    id: "t-3",
    name: "Ananya Roy",
    location: "Kolkata, West Bengal",
    comment:
      "Being Bengali, I am very picky about Rasgulla and Sandesh. Modern Sweets delivers pristine authenticity. Pure, soft, and balanced sweetness.",
    rating: 5,
    occasion: "Family Festival",
    date: "3 weeks ago",
  },
  {
    id: "t-4",
    name: "Sameer Malhotra",
    location: "Delhi NCR",
    comment:
      "The sugar-free Anjeer Barfi is a blessing for my diabetic parents. Natural sweetness, rich crunch of almonds, and zero artificial aftertaste. Highly recommended!",
    rating: 5,
    occasion: "Health & Everyday Treat",
    date: "Just recently",
  },
];

export const PURITY_PILLARS = [
  {
    title: "100% Shuddh Cow Desi Ghee",
    desc: "Never vanaspati, never palm oil. Churned traditional ghee for uncompromised aroma and royal taste.",
    icon: "Flame",
  },
  {
    title: "Generational Craft Since 2006",
    desc: "Over four decades of heritage recipes guarded and perfected by master halwais.",
    icon: "Award",
  },
  {
    title: "0 Artificial Preservatives",
    desc: "Prepared fresh every single morning using organic milk, khoya, and hand-picked dry fruits.",
    icon: "ShieldCheck",
  },
  {
    title: "Express Temperature-Controlled Delivery",
    desc: "Packed in vacuum-sealed food-grade insulated boxes to guarantee doorstep freshness.",
    icon: "Truck",
  },
];

export const FAQS = [
  {
    q: "How fresh are the sweets when delivered?",
    a: "Every single order is packaged from the morning’s fresh batch. Sweets are sealed in airtight, food-grade packaging to keep aroma and softness intact.",
  },
  {
    q: "Do you offer bulk orders for weddings and corporate events?",
    a: "Yes! We specialize in custom festive boxes, wedding invitations, and corporate gifting with custom branding, ribbon detailing, and bulk discounts.",
  },
  {
    q: "Which sweets are suitable for diabetic or health-conscious guests?",
    a: "Our Sugar-Free Anjeer Dry Fruit Barfi and Roasted Dry Fruit Mixtures have no refined sugar, made solely with sun-dried figs and premium nuts.",
  },
  {
    q: "What is the shipping timeline across India?",
    a: "Metro cities receive delivery within 24 to 48 hours via express air logistics. Same-day local delivery is available across our store zones.",
  },
];
