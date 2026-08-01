import { WhiteBox } from "../kit"

export default function EngineeringSection() {
  return (
    <section className=" bg-warm-beige">
      <div className="!bg-[#ead3a9] flex flex-col md:flex-row p-6 gap-6">
        {/* Image */}
        <div>
          <img
            src="https://cdn.prod.website-files.com/62d6cffd9ca2f2d0ed53e65b/62d6eac46a3808aa1607da09_Menlo-Park-S8e8-120.jpg"
            alt="Vel Scope VX being used by Dr. Daftarian at Menlo Park Smiles"
            className="w-full h-auto rounded-lg shadow-lg" />

        </div>

        {/* Content */}
        <WhiteBox
          header='Engineering'
          body="We're committed to consistently investing in cutting-edge dental technology and advanced training to engineer smiles that last a lifetime."
        />
      </div>
    </section>);

}