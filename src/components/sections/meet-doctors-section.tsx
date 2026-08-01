const MeetDoctorsSection = () => {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-6">
        <h2 className="font-heading-script text-charcoal-black text-5xl md:text-6xl text-center mb-12">
          Meet the Doctors
        </h2>
        
        {/* Video Embed */}
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src="https://player.vimeo.com/video/715342242?h=2b13912e8e&app_id=122963"
              className="absolute top-0 start-0 w-full h-full rounded-lg shadow-lg"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Meet the Doctors"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetDoctorsSection;