export default function ComfortCoconutSection() {
  return (
    <section className="py-20 lg:py-32 !bg-[#ead3a9]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="!bg-white !opacity-90 !px-[26px] !py-[51px]">
            <h2 className="font-heading-script text-5xl md:text-6xl text-primary mb-8">
              Comfort & Coconut
            </h2>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              Guests enjoy a comfort-driven dental experience and our emotional support dog, Coconut. 
              More than just a saying, we actually treat our patients like family.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6cffd9ca2f2bfc653e6c8_Untitled-1.jpg"
              alt="A patient holds Coconut, our emotional support dog"
              className="w-full h-auto rounded-lg shadow-lg" />

            {/* Video Play Button Overlay (optional) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-xl"
                aria-label="Play video">

                <svg
                  className="w-8 h-8 text-primary ms-1"
                  fill="currentColor"
                  viewBox="0 0 24 24">

                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>);

}