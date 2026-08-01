import React from 'react';
import Image from 'next/image';
import { WhiteBox } from '../kit';

const CoconutSection = () => {
  return (
    <section className="w-full bg-[#df8d53] flex lfex-col md:flex-row">
        {/* Image Side */}
        <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden flex-2">
            <Image
              src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6f92626fc33c5528026aa_Menlo-Park-S8e8-136.jpg"
              alt="Patient holding coconut"
              fill
              className="object-cover" />

        </div>

        {/* Content Side */}
        <div className="relative flex items-center justify-center h-full flex-1 p-6">
          <WhiteBox
            className='h-full'
            header='Coconut'
            body="Patients of all ages love our emotional support dog."
          />
        </div>
    </section>)

};

export default CoconutSection;