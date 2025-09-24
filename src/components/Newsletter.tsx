import React from 'react';
import Image from 'next/image';
import { Mail, ArrowRight } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="relative py-20 px-8 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-10">
        <Image
          src="https://themewagon.github.io/delicious/img/bg-img/insta5.jpg"
          alt="Newsletter background"
          fill
          className="object-cover object-center"
        />
      </div>
      
      {/* Content */}
      <div className="relative z-30 max-w-4xl mx-auto text-center">
        <Mail className="w-16 h-16 text-gray-800 mx-auto mb-6" />
        <h2 className="text-5xl md:text-6xl font-bold mb-4 text-gray-800" style={{ fontFamily: 'Caveat, cursive' }}>
          Subscribe to Our Newsletter
        </h2>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Get the latest recipes, cooking tips, and food trends delivered straight to your inbox every week.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          />
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2" style={{ fontFamily: 'Caveat, cursive' }}>
            Subscribe
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-600 text-sm mt-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
          No spam, unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
