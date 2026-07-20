export default function SafetySection() {
  return (
    <section className="py-20 lg:py-32 bg-charcoal-black text-white relative min-h-[80vh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6d9c4d7eda36a5eeb8342_Menlo-Park-S8e8-135.jpg"
          alt="Hygienist speaking with a patient"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-heading-script text-5xl md:text-6xl md:!text-white">
                Safety
              </h2>

            </div>
            <h5 className="font-heading-script text-3xl md:text-3xl md:!text-white">
              Your safety is our priority.
            </h5>

            {/* Safety Points */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>A fully-vaccinated staff</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Doors on each operatory to ensure aerosols are contained</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Medical-grade HEPA filters in each operatory</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>A medical-grade HEPA filter installed in our AC unit, which runs continuously</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Isolite and Dryshield intraoral suction, which captures 99% of aerosols</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Full PPE for our team, including but not limited to N95, level 3 surgical masks, face shields, and eye-protective wear</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Doctors wear Max Air Capr during most procedures</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Multiple of the award-winning, Highest grade Air filtration, Surgical Clean Air Jade units in the office</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Curbside waiting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Hand sanitizer required for all patients prior to entering the office</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Only patients with appointments are allowed in</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Masks required for all patients at all times, except while being treated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Temperature checks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Covid disclosure forms within 24 hours prior to visit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary">•</span>
                <span>Patients required to swish with 2 mouth rinses prior to treatment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}