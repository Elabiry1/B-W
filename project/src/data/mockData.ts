import { Product, Review, NextCollection } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Essential Black Tee',
    slug: 'essential-black-tee',
    color: 'black',
    images: [
      'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 85,
    stock: 12,
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['black', 'essential', 'premium'],
    description: 'Premium quality black t-shirt made from 100% organic cotton. Designed for everyday comfort with a minimalist aesthetic that never goes out of style.'
  },
  {
    id: '2',
    name: 'Pure White Tee',
    slug: 'pure-white-tee',
    color: 'white',
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5698357/pexels-photo-5698357.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 85,
    stock: 8,
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['white', 'essential', 'premium'],
    description: 'Crisp white t-shirt crafted from the finest organic cotton. A timeless piece that embodies simplicity and sophistication in every thread.'
  },
  {
    id: '3',
    name: 'Midnight Black Premium',
    slug: 'midnight-black-premium',
    color: 'black',
    images: [
      'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    price: 95,
    stock: 0,
    sizes: ['M', 'L', 'XL', 'XXL'],
    tags: ['black', 'premium', 'limited'],
    description: 'Limited edition midnight black tee with enhanced premium fabric blend.'
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Absolutely love the quality! The fabric is incredibly soft and the fit is perfect. Worth every penny.',
    productId: '1'
  },
  {
    id: '2',
    name: 'Mike Chen',
    image: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Best white tee I\'ve ever owned. The minimalist design is exactly what I was looking for.',
    productId: '2'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    comment: 'Premium quality and authentic SKU verification gave me confidence in my purchase. Highly recommended!',
    productId: '1'
  }
];

export const nextCollection: NextCollection[] = [
  {
    id: '1',
    images: [
      'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    color: 'black',
    releaseDate: '2025-02-01'
  },
  {
    id: '2',
    images: [
      'https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=400',
      'https://images.pexels.com/photos/5698357/pexels-photo-5698357.jpeg?auto=compress&cs=tinysrgb&w=400'
    ],
    color: 'white',
    releaseDate: '2025-02-01'
  }
];