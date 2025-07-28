export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  color: 'black' | 'white';
  sizes: string[];
  stock: number;
  images: string[];
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  color: 'black' | 'white';
  size: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  sku: string;
  shipping_info: ShippingInfo;
  created_at: string;
  updated_at: string;
}

export interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}