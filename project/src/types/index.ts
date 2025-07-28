export interface Product {
  id: string;
  name: string;
  slug: string;
  color: 'black' | 'white';
  images: string[];
  price: number;
  stock: number;
  sizes: string[];
  tags: string[];
  description: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  name: string;
  image: string;
  rating: number;
  comment: string;
  productId: string;
}

export interface NextCollection {
  id: string;
  images: string[];
  color: 'black' | 'white';
  releaseDate: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  sku: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  createdAt: string;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  reason: string;
  newSize?: string;
  image?: string;
  status: 'pending' | 'approved' | 'rejected';
}