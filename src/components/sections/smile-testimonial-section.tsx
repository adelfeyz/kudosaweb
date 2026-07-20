export default function SmileTestimonialSection() {
  return (
    <section className="py-20 lg:py-32 !bg-transparent">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 items-center rounded-md">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <img
              src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6d7d7dd9e54f7b602beec_Menlo-Park-S8e8-201.jpg"
              alt="Hygienist speaking with a patient"
              className="w-full h-auto rounded-sm shadow-lg" />

          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 !bg-white !opacity-90 !rounded-sm px-6 h-full py-4">
            <div className="font-heading-script text-4xl md:text-4xl text-primary">
              We Love to See You Smile
            </div>
            <blockquote className="space-y-4">
              <p className="text-lg md:text-xl text-foreground/90 italic leading-relaxed">
                "I'm generally nervous about going to the dentist, but the team at Menlo Park Smiles 
                immediately set me at ease and were incredibly professional. I highly recommend!"
              </p>
              <cite className="block text-primary font-bold not-italic">
                Jasmine R.
              </cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>);

}