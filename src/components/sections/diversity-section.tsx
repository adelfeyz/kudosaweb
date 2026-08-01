import { GlossyBox } from "../kit"

export default function DiversitySection() {
  return (
    <section className="relative min-h-[80vh] py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6eb9a0784db62bcee578c_Menlo-Park-S8e8-37.jpg')`,
        }}
      />

      {/* Content Card */}
      <div className="relative z-10 container mx-auto px-6 flex items-end justify-center min-h-[60vh]">
        <GlossyBox
          header='Diversity'
          body='Our experienced team offers a full menu of family, cosmetic, surgical, periodontal, and orthodontic solutions.'
        />
      </div>
    </section>
  );
}