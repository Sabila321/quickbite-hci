// QuickBite 2026 Next-Gen Data Source
// Designed for Sabila Memon - HCI Semester Project

const APP_DATA = {
  user: {
    name: "Sabila Memon",
    role: "HCI Project Lead & Foodie VIP",
    email: "sabila.memon@university.edu",
    phone: "+1 (555) 782-9410",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    vipTier: "Diamond VIP Epicurean",
    loyaltyPoints: 1250,
    totalOrders: 38,
    savedMoney: 142.50,
    savedAddresses: [
      { id: "addr_1", label: "Home Loft", tag: "Primary", icon: "🏠", address: "Apt 12B, Skyline Towers, 45 Grand Avenue", isDefault: true },
      { id: "addr_2", label: "University Campus", tag: "Study", icon: "🏛️", address: "HCI Innovation Lab, Building 4, Dept of Computer Science", isDefault: false },
      { id: "addr_3", label: "Tech Studio", tag: "Work", icon: "💼", address: "800 Cyber Boulevard, Suite 300", isDefault: false }
    ]
  },

  stories: [
    { id: "st_1", name: "Chef's Cut", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=150&auto=format&fit=crop&q=80", tag: "HOT" },
    { id: "st_2", name: "Artisan Pizza", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=150&auto=format&fit=crop&q=80", tag: "NEW" },
    { id: "st_3", name: "Matcha & Boba", image: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=150&auto=format&fit=crop&q=80", tag: "TREND" },
    { id: "st_4", name: "Smash Wagyu", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=150&auto=format&fit=crop&q=80", tag: "DEAL" },
    { id: "st_5", name: "Tokyo Ramen", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=150&auto=format&fit=crop&q=80", tag: "4.9★" },
    { id: "st_6", name: "Açai Bowls", image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=150&auto=format&fit=crop&q=80", tag: "VEGAN" }
  ],

  categories: [
    { id: "all", name: "Curated All", icon: "✨", count: 32 },
    { id: "pizza", name: "Woodfire Pizza", icon: "🍕", count: 12 },
    { id: "burgers", name: "Wagyu & Smashed", icon: "🍔", count: 9 },
    { id: "asian", name: "Ramen & Wok", icon: "🍜", count: 8 },
    { id: "sushi", name: "Sashimi & Poke", icon: "🍣", count: 7 },
    { id: "tacos", name: "Birria & Tacos", icon: "🌮", count: 6 },
    { id: "healthy", name: "Organic Greens", icon: "🥗", count: 8 },
    { id: "desserts", name: "French Patisserie", icon: "🥐", count: 6 }
  ],

  restaurants: [
    {
      id: "rest_1",
      name: "L'Artigiano Woodfire Pizzeria",
      tagline: "Authentic Neapolitan sourdough fermented for 48 hours & imported bufala.",
      rating: 4.95,
      reviewCount: 684,
      deliveryTime: "20-25 min",
      deliveryFee: 1.99,
      priceRange: "$$$",
      cuisine: "Italian • Neapolitan • Fine Dining",
      distance: "1.2 km away",
      image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=900&auto=format&fit=crop&q=80",
      featured: true,
      freeDelivery: false,
      isVegFriendly: true,
      badge: "Michelin Guide 2026",
      categories: ["pizza", "desserts"],
      menu: [
        {
          id: "item_101",
          name: "Black Truffle & Fresh Burrata Tartufata",
          category: "pizza",
          price: 18.50,
          description: "Whole Puglia burrata, San Marzano tomato coulis, black winter truffle carpaccio, and cold-pressed olive oil.",
          image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&auto=format&fit=crop&q=80",
          calories: "820 kcal",
          rating: 4.98,
          tags: ["Vegetarian", "Chef Signature"],
          isSpicy: false,
          isVeg: true,
          options: {
            sizes: [
              { name: "Regular 11\" Sourdough", extra: 0 },
              { name: "Large 14\" Family Crust", extra: 4.50 }
            ],
            addons: [
              { name: "Extra Fresh Burrata (125g)", extra: 4.00 },
              { name: "Organic Wild Arugula", extra: 1.50 },
              { name: "Gluten-Free Charcoal Base", extra: 3.00 }
            ]
          }
        },
        {
          id: "item_102",
          name: "Calabrian Diavola & Hot Honey",
          category: "pizza",
          price: 16.90,
          description: "Artisan spicy soppressata, smoked provola cheese, roasted chili crisps, and wildflower hot honey infusion.",
          image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80",
          calories: "910 kcal",
          rating: 4.9,
          tags: ["Fiery", "Customer Favorite"],
          isSpicy: true,
          isVeg: false,
          options: {
            sizes: [
              { name: "Regular 11\"", extra: 0 },
              { name: "Large 14\"", extra: 4.50 }
            ],
            addons: [
              { name: "Double Soppressata", extra: 3.00 },
              { name: "Extra Chili Honey Drizzle", extra: 1.25 }
            ]
          }
        },
        {
          id: "item_103",
          name: "Piedmont Hazelnut & Dark Chocolate Cannoli",
          category: "desserts",
          price: 8.50,
          description: "Crisp cinnamon pastry shells piped with sweet sheep ricotta, roasted hazelnuts, and 70% dark chocolate pearls.",
          image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80",
          calories: "380 kcal",
          rating: 4.92,
          tags: ["Sweet", "Handmade"],
          isSpicy: false,
          isVeg: true
        }
      ]
    },
    {
      id: "rest_2",
      name: "Prime Wagyu & Truffle Lab",
      tagline: "A5 Japanese Wagyu smashed on chrome planchas with butter brioche.",
      rating: 4.92,
      reviewCount: 890,
      deliveryTime: "15-20 min",
      deliveryFee: 0.00,
      priceRange: "$$",
      cuisine: "American Gourmet • Smashed Burgers",
      distance: "0.8 km away",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=900&auto=format&fit=crop&q=80",
      featured: true,
      freeDelivery: true,
      isVegFriendly: true,
      badge: "FREE Ultra-Fast Delivery",
      categories: ["burgers", "desserts"],
      menu: [
        {
          id: "item_201",
          name: "Double Wagyu Truffle Melt",
          category: "burgers",
          price: 15.50,
          description: "Two 150g dry-aged Wagyu patties, cave-aged Gruyère, black garlic umami glaze, and crispy onion straw nests.",
          image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&auto=format&fit=crop&q=80",
          calories: "980 kcal",
          rating: 4.96,
          tags: ["Bestseller", "Double Wagyu"],
          isSpicy: false,
          isVeg: false,
          options: {
            sizes: [
              { name: "Double Patty (Standard)", extra: 0 },
              { name: "Triple Stack Beast", extra: 4.50 }
            ],
            addons: [
              { name: "Truffle Parm Fries on Side", extra: 4.00 },
              { name: "Crisp Bacon Jam", extra: 2.00 }
            ]
          }
        },
        {
          id: "item_202",
          name: "Truffle Parmesan Hand-Cut Frites",
          category: "burgers",
          price: 6.50,
          description: "Double-fried Idaho russet potatoes, shaved 24-month Parmigiano Reggiano, rosemary sea salt, and truffle emulsion.",
          image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=600&auto=format&fit=crop&q=80",
          calories: "490 kcal",
          rating: 4.88,
          tags: ["Sides", "Must Try"],
          isSpicy: false,
          isVeg: true
        }
      ]
    },
    {
      id: "rest_3",
      name: "Kyoto Botan & Noodle Atelier",
      tagline: "24-hour pork marrow collagen broth with handmade wheat noodles.",
      rating: 4.98,
      reviewCount: 1120,
      deliveryTime: "20-30 min",
      deliveryFee: 2.50,
      priceRange: "$$$",
      cuisine: "Japanese • Tonkotsu Ramen • Poke",
      distance: "1.9 km away",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&auto=format&fit=crop&q=80",
      featured: false,
      freeDelivery: false,
      isVegFriendly: true,
      badge: "Top Rated 4.98★",
      categories: ["asian", "sushi", "healthy"],
      menu: [
        {
          id: "item_301",
          name: "Kyoto Black Garlic Tonkotsu Special",
          category: "asian",
          price: 18.00,
          description: "Torched slow-braised chashu pork belly, molten marinated nitamago egg, menma bamboo, and roasted black garlic sesame oil.",
          image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=600&auto=format&fit=crop&q=80",
          calories: "890 kcal",
          rating: 4.98,
          tags: ["Signature", "Collagen Broth"],
          isSpicy: false,
          isVeg: false,
          options: {
            sizes: [
              { name: "Full Ramen Bowl", extra: 0 },
              { name: "Double Noodle Kaedama", extra: 3.00 }
            ],
            addons: [
              { name: "Extra Chashu (2 Thick Slices)", extra: 4.00 },
              { name: "Japanese Spice Bomb", extra: 1.00 }
            ]
          }
        },
        {
          id: "item_302",
          name: "King Salmon & Ahi Tuna Poke Bowl",
          category: "sushi",
          price: 17.50,
          description: "Fresh sashimi cuts, warm seasoned sushi rice, Hass avocado cubes, edamame, tobiko caviar, and yuzu shoyu marinade.",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
          calories: "580 kcal",
          rating: 4.91,
          tags: ["Omega-3 Rich", "Raw"],
          isSpicy: false,
          isVeg: false
        }
      ]
    },
    {
      id: "rest_4",
      name: "Solstice Botanics & Superbowls",
      tagline: "Cold-pressed elixirs, colorful organic superfood bowls, and adaptogens.",
      rating: 4.86,
      reviewCount: 340,
      deliveryTime: "15-20 min",
      deliveryFee: 0.00,
      priceRange: "$$",
      cuisine: "Plant-Based • Organic • Clean",
      distance: "0.9 km away",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=80",
      featured: false,
      freeDelivery: true,
      isVegFriendly: true,
      badge: "Zero Emission Eco-Delivery",
      categories: ["healthy"],
      menu: [
        {
          id: "item_401",
          name: "Rainbow Quinoa & Roasted Tahini Glow Bowl",
          category: "healthy",
          price: 14.50,
          description: "Warm tri-color quinoa, maple roasted sweet potato, pickled red cabbage, avocado rose, hemp hearts, and creamy golden tahini.",
          image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
          calories: "460 kcal",
          rating: 4.89,
          tags: ["100% Plant Based", "Gluten Free"],
          isSpicy: false,
          isVeg: true
        }
      ]
    }
  ],

  promotions: [
    {
      code: "SABILA25",
      discountType: "percent",
      discountValue: 25,
      description: "25% VIP Student Discount (Exclusive to Sabila Memon)",
      minOrder: 20
    },
    {
      code: "QUICK20",
      discountType: "percent",
      discountValue: 20,
      description: "20% OFF on all orders above $20",
      minOrder: 20
    }
  ],

  pastOrders: [
    {
      id: "QB-99412",
      date: "Today, 1:20 PM",
      restaurantName: "L'Artigiano Woodfire Pizzeria",
      restaurantImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&auto=format&fit=crop&q=80",
      itemsSummary: "1x Black Truffle & Fresh Burrata, 1x Hazelnut Cannoli",
      total: 27.00,
      status: "Delivered",
      ratingGiven: 5
    },
    {
      id: "QB-98104",
      date: "09 Nov 2026, 7:45 PM",
      restaurantName: "Prime Wagyu & Truffle Lab",
      restaurantImage: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80",
      itemsSummary: "2x Double Wagyu Truffle Melt, 1x Truffle Parmesan Frites",
      total: 37.50,
      status: "Delivered",
      ratingGiven: 5
    }
  ],

  hciPrinciples: [
    {
      id: "h1_status",
      name: "Visibility of System Status",
      heuristicNumber: "Nielsen #1",
      description: "The system always keeps users informed about what is going on through appropriate feedback within a reasonable time.",
      implementationInApp: "Dynamic Island active telemetry pill, animated vector courier on live GPS route, countdown arrival clock, and live badge counter recalculations."
    },
    {
      id: "h2_realworld",
      name: "Match Between System & Real World",
      heuristicNumber: "Nielsen #2",
      description: "The system speaks the users' language with familiar words, concepts, and physical analogies rather than system-oriented jargon.",
      implementationInApp: "Real-world visual credit card that renders live embossed text as you type, appetizing high-res dish photography, and culinary dietary badges (🌱 Veg, 🌶️ Spicy)."
    },
    {
      id: "h3_control",
      name: "User Control and Freedom",
      heuristicNumber: "Nielsen #3",
      description: "Users often make mistakes and need a clearly marked 'emergency exit' to leave unwanted states without an extended process.",
      implementationInApp: "Instant animated 'Undo' snackbar when deleting a dish, rapid back-breadcrumbs, modal backdrop exit, and instant order cancellation option."
    },
    {
      id: "h4_consistency",
      name: "Consistency and Standards",
      heuristicNumber: "Nielsen #4",
      description: "Users should not have to wonder whether different words, situations, or actions mean the same thing (follows platform conventions).",
      implementationInApp: "Modern unified glassmorphism design tokens, consistent neon accents for CTAs, standard 3-phase checkout, and uniform button hierarchies."
    },
    {
      id: "h5_error_prev",
      name: "Error Prevention",
      heuristicNumber: "Nielsen #5",
      description: "Better than good error messages is a careful design that prevents a problem from occurring in the first place.",
      implementationInApp: "Confirmation modal before wiping the entire bag, automatic input formatting for credit cards, and disabling checkout if cart is empty."
    },
    {
      id: "h6_recognition",
      name: "Recognition Rather Than Recall",
      heuristicNumber: "Nielsen #6",
      description: "Minimize user memory load by making elements, actions, and options visible. Information should be readily accessible when needed.",
      implementationInApp: "Pre-populated saved addresses, live persistent cart total bar, fast 1-Click Reorder from past orders, and instant search autocomplete."
    },
    {
      id: "h7_fitts",
      name: "Fitts's Law & Touch Ergonomics",
      heuristicNumber: "Ergonomics / Fitts's Law",
      description: "The time required to rapidly move to a target area is a function of the ratio between distance and width of the target.",
      implementationInApp: "Full-width thumb-friendly glass CTAs, oversized category chips, and large quantity stepper touch targets."
    },
    {
      id: "h8_minimalist",
      name: "Aesthetic and Minimalist Design",
      heuristicNumber: "Nielsen #8",
      description: "Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information competes with relevant units.",
      implementationInApp: "Generous whitespace, progressive disclosure for dish personalizations, and clean card segmentation with smooth border gradients."
    }
  ]
};
