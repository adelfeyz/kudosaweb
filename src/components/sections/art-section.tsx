import { WhiteBox } from "../kit";

export default function ArtSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#DF8D53]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6e8565fb221f050ed22b5_Menlo-Park-S8e8-7.jpg"
              alt="Dr. Daftarian working with her team members"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Content */}
          <WhiteBox
            header='Art'
            body="As passionate dental artists, we specialize in designing and creating beautiful smiles you'll love to share."
          />
        </div>
      </div>
    </section>
  );
}