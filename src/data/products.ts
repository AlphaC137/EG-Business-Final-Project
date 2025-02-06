// Sample product data
export interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  farm: string;
  location: string;
  harvestedAt: string;
  organic: boolean;
  quantity: number;
  category: string;
  season: string;
}

export const products: Product[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1566842600175-97dca489844f?auto=format&fit=crop&w=800&q=80",
    name: "Organic Carrots",
    price: 2.99,
    farm: "Green Valley Farm",
    location: "Vermont",
    harvestedAt: "Today",
    organic: true,
    quantity: 50,
    category: "Vegetables",
    season: "All Season"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=800&q=80",
    name: "Fresh Tomatoes",
    price: 3.99,
    farm: "Sunshine Acres",
    location: "California",
    harvestedAt: "Yesterday",
    organic: true,
    quantity: 30,
    category: "Vegetables",
    season: "Summer"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?auto=format&fit=crop&w=800&q=80",
    name: "Mixed Lettuce",
    price: 2.49,
    farm: "River Valley Gardens",
    location: "Oregon",
    harvestedAt: "Today",
    organic: false,
    quantity: 40,
    category: "Vegetables",
    season: "Spring"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1550828520-4cb496926fc9?auto=format&fit=crop&w=800&q=80",
    name: "Fresh Strawberries",
    price: 4.99,
    farm: "Berry Fields Forever",
    location: "California",
    harvestedAt: "Today",
    organic: true,
    quantity: 25,
    category: "Fruits",
    season: "Spring"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
    name: "Honey Crisp Apples",
    price: 3.49,
    farm: "Orchard Hills",
    location: "Washington",
    harvestedAt: "Yesterday",
    organic: true,
    quantity: 60,
    category: "Fruits",
    season: "Fall"
  }
];