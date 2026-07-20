import Image from "next/image";

const DoctorProfileSection = () => {
  return (
    <section className="bg-muted py-16 md:py-24">
      <div className="container mx-auto px-6">
        {/* Dr. Samaneh Daftarian */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62dadafb43c2763295fe95bb_Menlo-Park-S8e8-106.jpg"
                  alt="Dr. Samaneh Daftarian"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Dr. Samaneh Daftarian
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Family and Cosmetic Dentist
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Top Dental School in the Nation */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Top Dental School in the Nation
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Following graduation with honors from the University of Houston, Dr. Samaneh Daftarian went on to earn her Doctor of Dental Surgery degree from the top ranked dental school in the nation – UT Health Science Center in San Antonio.
                </p>
              </div>

              {/* Advanced Training and Invisalign® Certification */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Advanced Training and Invisalign® Certification
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Achieving the status of an Invisalign Platinum Provider, she has distinguished herself among the elite in orthodontic care, demonstrating a superior level of expertise and commitment to excellence in providing Invisalign treatment to over 300 patients. She also received her Invisalign certification and training from the top Invisalign provider in the world and has advanced training in the areas of Oral Sedation, Cosmetic Dentistry, Dental Implants, and the use of Botox® for Temporomandibular pain.
                </p>
              </div>

              {/* Treatment Approach */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Treatment Approach
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed italic">
                  "For over two decades, dentistry has allowed me to pursue my calling to help and nurture people. Serving people fuels my passion to deliver the best possible solutions. And there's nothing like seeing people experience the confidence of a beautifully, healthy smile. I think it changes my life as much as it does their life."
                </p>
              </div>

              {/* Home Life */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  After spending many years in Houston, she fell in love with the Bay Area. She enjoys spending time with her husband, their two children, and their precious dog Coconut.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dr. Shantia Kazemi */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6fdef34bda54e47861ff5_Menlo-Park-S8e8-179-p-1080.jpg"
                  alt="Dr. Shantia Kazemi"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Dr. Shantia Kazemi
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Board Certified Periodontist & Implant Surgeon
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Specialized Education */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Specialized Education
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Dr. Kazemi completed her certificate in Periodontal Surgery & Implant dentistry at the University of Southern California, Los Angeles. During her time at USC, she was the President of ''Advanced Periodontology Residents Study Club'' and was selected to receive the ''Associate endowed scholarship'' from USC School of Dentistry. Before her time at USC, she earned a MS degree in Clinical Translational Sciences from the University of Illinois at Chicago where she received the ''Board of trustees Scholarship'' for academic excellence.
                </p>
              </div>

              {/* Author and Speaker */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Author and Speaker
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  A recipient of several awards and honors, she has also lectured nationally and internationally on implant dentistry and laser dentistry. Dr. Kazemi has published several articles in peer-reviewed journals and serves as peer reviewer and associate editor of scientific journals in the field of implant dentistry and periodontology.
                </p>
              </div>

              {/* Clinical Approach */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Clinical Approach
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  As a periodontist and implant surgeon, Dr. Kazemi focuses on minimally invasive treatment using micro-surgery instruments and techniques to minimize discomfort, maximize success, and speed healing. She takes pride in providing high quality evidence-based care to each patient based on their unique individual needs.
                </p>
              </div>

              {/* Home Life */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Beyond dentistry, she loves to spend time with her family & friends, hiking, working out, cooking, and traveling.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dr. Sohail Saghezchi */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d703046966b245644641e6_Group 84-p-1080.jpg"
                  alt="Dr. Sohail Saghezchi"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Dr. Sohail Saghezchi
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Board Certified Oral and Maxillofacial Surgeon
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Respected Educator */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Respected Educator
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  In addition to serving patients, Dr. Sohail Saghezchi currently serves as the Clinical Director of Oral Surgery Residents at UCSF Associate Professor at UCSF
                </p>
              </div>

              {/* Specialized Education */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Specialized Education
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Dr. Sohail Saghezchi earned his D.D.S. degree from the University of the Pacific School of Dentistry and was honored with the Dean's Award for graduating salutatorian of his class. He subsequently went into private practice as a general dentist with his father for eight years. In 2010, he returned to formal education to begin a one-year Oral and Maxillofacial Surgery internship at UCSF. The following year he began the 6-year Oral and Maxillofacial Surgery residency program at UCSF. He went on to receive his Medical Degree from UCSF School of Medicine followed by a one-year General Surgery internship at UCSF.
                </p>
              </div>

              {/* Clinical Scope */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Clinical Scope
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  As a clinician, he practices full scope Oral and Maxillofacial Surgery including dental extractions, sedation and anesthesia, dental implant surgery including zygomatic implants and bone grafting, orthognathic and sleep apnea surgery, maxillofacial trauma, benign pathology and reconstruction, TMJ surgery, and nerve injury with microvascular nerve repair.
                </p>
              </div>

              {/* Home Life */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  When not working, Dr. Saghezchi enjoys traveling and spending as much time as he can with his wife and two daughters.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dr. Tanya Zaghi */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/63c852b8dc6353787f43bad1_Unknown.png"
                  alt="Dr. Tanya Zaghi"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Dr. Tanya Zaghi
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Endodontist
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Academic Excellence Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Academic Excellence
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  An avid and passionate educator, Dr. Tanya Zaghi taught various courses at UCSF including Endodontics, Gross Anatomy & Embryology, and Cellular Structure and Function in addition to Bioenergetics and Metabolism, and Principles of Nutrition at UC Davis.
                </p>
              </div>

              {/* Specialized Treatment Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Specialized Treatment
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  From difficult root canal retreatments to the most basic cases, Dr. Zaghi is extensively trained in endodontic care and highly skilled at the most delicate micro-surgery of the root. She is dedicated to providing the highest standard of care to patients and is a proud recipient of the American Association of Endodontist Achievement award.
                </p>
              </div>

              {/* Advanced Research Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Advanced Research
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  After graduating from the University of California, Davis, and earning her D.D.S. degree from the highly regarded University of California, San Francisco, Dr. Tanya Zaghi became one of the few residents accepted into the USCF Endodontic Program, where she completed specialty training and was involved in research studies investigating pain management and the response of teeth and dental pulp to different stimuli.
                </p>
              </div>

              {/* Home Life Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  When she's not serving patients, you can find Dr. Zaghi cozying up with endodontic journals, snowboarding, swimming, or cheering on her two children from the sidelines at their sporting events. She's also a HELP International volunteer medical aide and a Make a Difference, Change Our World member.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dr. Alex Targ */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/6476316fdbaa714274fd0b1b_Mask%20Group%201.jpg"
                  alt="Dr. Alex Targ"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Dr. Alex Targ
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Board Certified Anesthesiologist
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Academic Excellence and Authorship Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Academic Excellence and Authorship
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Dr. Alex Targ received medical training from the University of California at San Francisco (UCSF), including anesthesia residency, research fellowship, and faculty appointments to the UCSF Anesthesia Department. He went on to hold a similar faculty position at the Stanford Anesthesia Department and prior to his time at UCSF, earned a degree in Biophysics and Biochemistry from Stanford University. He's published over 30 peer-reviewed scientific publications including anesthesiology articles, book chapters, and abstracts.
                </p>
              </div>

              {/* Efficient Treatment Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Efficient Treatment
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Using ultra-compact anesthesia and monitoring equipment, Dr. Targ has safely and efficiently sedated upwards of 15,000 patients with sevoflurane inhalation over the past 20 years. He's passionate about providing convenient care in a comfortable and familiar setting.
                </p>
              </div>

              {/* Memberships and Certifications Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Memberships and Certifications
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Dr. Targ is also certified in advanced cardiac life support (ACLS/PALS) and has a current California Dental Board "General Anesthesia Permit." He's also been a member of the Anesthesiology Department at O'Connor Hospital in San Jose for 24 years.
                </p>
              </div>

              {/* Home Life Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  He's a proud father to three daughters and loves windsurfing San Francisco Bay. Racing a squadron of pelicans three miles offshore is his personal paradise.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Arlyn A. Lucido */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-12 items-start">
            {/* Image */}
            <div className="w-full md:w-2/5 flex-shrink-0">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62fd4e6133427d3e821e08bb_Menlo-Park-S8e8-30-p-1080.jpg"
                  alt="Arlyn A. Lucido"
                  fill
                  className="object-cover" />

              </div>
            </div>

            {/* Content */}
            <div className="w-full md:w-3/5">
              <h3 className="font-heading-script text-charcoal-black text-5xl md:text-6xl mb-2 !leading-tight">
                Arlyn A. Lucido
              </h3>
              <p className="font-body-sans text-primary text-xl font-semibold mb-6">
                Office Manager
              </p>
              <div className="w-24 h-[2px] bg-primary mb-8" />

              {/* Passion for Others Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Passion for Others
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Arlyn is known for being passionate about everything she does. Her management and level of care is exemplified whenever she helps a patient. She is a self-driven person who always aims for perfection and satisfaction. She bases her life around the Golden Rule: "Do unto others as you would have them do unto you."
                </p>
              </div>

              {/* Specialized Education Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Specialized Education
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  She received a Bachelor's degree in Commerce majoring in Accounting while also being a post-graduate intern in Physical Therapy. In addition, she has also completed Hospital Administration courses that helped her managed her late husband's practice as a physician in the Philippines.
                </p>
              </div>

              {/* Clinical Care Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Clinical Care
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  Considered a veteran in both the dental and medical industry, Arlyn has over 25 years of experience in the healthcare field and has seen countless success in her career as a practice manager.
                </p>
              </div>

              {/* Home Life Section */}
              <div className="mb-8">
                <h4 className="font-body-sans text-charcoal-black text-2xl font-bold mb-4">
                  Home Life
                </h4>
                <p className="font-body-sans text-charcoal-black/80 text-lg leading-relaxed">
                  On her days off, Arlyn loves to unwind and listen to Enya, Clannad, and the Celtic Woman while enjoying her time making arts and crafts for her home in San Jose. She also loves using her pastry chef skills to whip up the most wonderful desserts for her family and friends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default DoctorProfileSection;