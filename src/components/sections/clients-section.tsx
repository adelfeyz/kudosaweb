'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const clients = [
  { name: 'Saderat Bank', image: '/clients/SaderatBank200.jpg' },
  { name: 'Sina Bank', image: '/clients/SinaBank200.jpg' },
  { name: 'Simab Resin', image: '/clients/SimabResin200.jpg' },
  { name: 'Tourism Financial Group', image: '/clients/TourismFinancialGroup200.jpg' },
  { name: 'Agah', image: '/clients/Agah200.jpg' },
  { name: 'Aptasys', image: '/clients/Aptasys200.jpg' },
  { name: 'Bakhtar Group', image: '/clients/BakhtarGroup200.jpg' },
  { name: 'Burux', image: '/clients/Burux200.jpg' },
  { name: 'Damavand', image: '/clients/Damavand200.jpg' },
  { name: 'DownTown Burger', image: '/clients/DownTownBurger200.jpg' },
  { name: 'Maskan Bank', image: '/clients/MaskanBank200.jpg' },
  { name: 'Kago Pub', image: '/clients/KagoPub200.jpg' },
  { name: 'Pars Olang', image: '/clients/ParsOlang200.jpg' },
  { name: 'Saman Insurance', image: '/clients/SamanIns200.jpg' },
  { name: 'Sandogh Hemayat', image: '/clients/SandoghHemayat200.jpg' },
  { name: 'Shimi Keshavarz', image: '/clients/ShimiKeshavarz200.jpg' },
];

export default function ClientsSection() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-iran-sans text-4xl md:text-5xl font-bold text-charcoal-black mb-4">
            مشتریان ما
          </h2>
        </div>

        {/* Logo Carousel */}
        <div className="relative overflow-hidden" style={{ height: '140px', overflowY: 'hidden' }}>
          <Marquee
            direction="right"
            speed={40}
            gradient={true}
            gradientColor="255,255,255"
            gradientWidth={80}
            pauseOnHover={true}
            className="py-8"
            style={{ height: '100%', overflow: 'hidden' }}
          >
            {[...clients, ...clients].map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex items-center justify-center mx-6 md:mx-8 h-20 md:h-24 w-28 md:w-32 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              >
                <Image
                  src={client.image}
                  alt={client.name}
                  width={150}
                  height={150}
                  className="object-contain max-h-20 md:max-h-24 w-auto"
                  loading="lazy"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

