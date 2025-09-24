import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PopularRecipes from '@/components/PopularRecipes';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <HeroSection />
      <PopularRecipes />
      <Features />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}
