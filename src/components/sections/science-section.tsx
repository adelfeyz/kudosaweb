export default function ScienceSection() {
  return (
    <section className="relative min-h-[50vw] py-20 lg:py-32 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6ea3b6672f74e671e2b17_Menlo-Park-S8e8-57.jpg')`
        }}>

        <div className="absolute inset-0 bg-white/87" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading-script text-5xl md:text-6xl text-charcoal-black mb-8 pb-4 border-b-2 border-charcoal-black inline-block">
            Science
          </h2>
          <p className="text-lg md:text-xl text-charcoal-black leading-relaxed !px-[54px]">
            As dedicated dental scientists, we focus on precision diagnostics and evidence-based treatment planning to help you maintain a healthy smile.
          </p>
        </div>
      </div>
    </section>);

}