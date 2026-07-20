import Image from "next/image";
import { Button } from "@/components/ui/button";

export const ReviewsHeroSection = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d7052c8e1e3753026e11a2_Menlo-Park-S8e8-203.jpg"
          alt="Smiling patient"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 font-heading-script">
          Patient Reviews
        </h1>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 button-text"
        >
          SCHEDULE APPOINTMENT
        </Button>
      </div>
    </section>
  );
};