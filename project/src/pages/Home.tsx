import React from 'react';
import Hero from '../components/Hero';
import CollectionSection from '../components/CollectionSection';
import NextCollection from '../components/NextCollection';
import ProductVerificationSection from '../components/ProductVerificationSection';
import ReviewsSection from '../components/ReviewsSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <CollectionSection />
      <NextCollection />
      <ProductVerificationSection />
      <ReviewsSection />
    </div>
  );
};

export default Home;