import { Facebook } from "lucide-react";

interface Review {
  id: string;
  author: string;
  content: string;
}

const reviews: Review[] = [
  {
    id: "1",
    author: "Fred T.",
    content:
      "I really enjoyed my visit to Menlo Park Smiles! I was there for a standard cleaning, but I felt so well taken care of. The staff are super duper friendly and went out of their way to make sure my insurance covered what they were doing. I'm so happy to have such a great local dentist office!",
  },
  {
    id: "2",
    author: "William K.",
    content:
      "I've been getting my teeth straightened and had regular teeth cleaning as well as occasional dental maintenance here for many years. Dr. Daftarian and her staff have given me excellent service whenever I had an appointment. Special mentions for her excellent assistant Camille and hygienist Arlyn. Very efficient and friendly!",
  },
  {
    id: "3",
    author: "Maeve S.",
    content:
      "I've been a patient at Menlo Park Smiles for years and can't say enough good things about them. From the front desk staff to the hygienists to the doctors, everyone is professional, kind, and clearly invested in providing excellent care. They use cutting edge technology and take a comprehensive approach to dental health. Highly recommend!",
  },
  {
    id: "4",
    author: "Sarah L.",
    content:
      "Dr. Daftarian and her team are amazing! I had been avoiding the dentist for years due to anxiety, but they made me feel so comfortable and at ease. They explained every step of the process and were incredibly patient with all my questions. The office is beautiful and clean, and they have the latest technology. I actually look forward to my appointments now!",
  },
  {
    id: "5",
    author: "Michael R.",
    content:
      "Outstanding dental practice! I came in for a complex procedure and was impressed by the level of expertise and care I received. Dr. Daftarian is highly skilled and her attention to detail is remarkable. The entire team works together seamlessly to ensure the best patient experience. Five stars all around!",
  },
  {
    id: "6",
    author: "Jennifer P.",
    content:
      "After moving to the area, I was looking for a new dentist and so glad I found Menlo Park Smiles. The office has a warm, welcoming atmosphere that immediately puts you at ease. The hygienists are thorough yet gentle, and Dr. Daftarian is fantastic - knowledgeable, caring, and takes time to really listen to your concerns. Highly recommend to anyone in the area!",
  },
];

export const ReviewsContentSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        {/* Leave a Review Section */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-heading-script text-primary mb-6">
            If you loved your visit with us
          </h2>
          <p className="text-lg md:text-xl text-foreground mb-8">
            Please leave us a review on one of the following sites:
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.facebook.com/Menlo-Park-Smiles-Dr-Samaneh-Daftarian-107729881150478/reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white px-8 py-3 rounded-full button-text transition-colors"
            >
              <Facebook className="w-5 h-5" />
              FACEBOOK
            </a>
            <a
              href="http://search.google.com/local/writereview?placeid=ChIJ5QJpw7Gkj4ARUW9SOASaOts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-foreground border-2 border-gray-300 px-8 py-3 rounded-full button-text transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              GOOGLE
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mb-16 md:mb-20" />

        {/* Reviews Grid */}
        <div className="grid gap-8 md:gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-foreground text-base md:text-lg leading-relaxed mb-4">
                {review.content}
              </p>
              <p className="text-primary font-semibold button-text">
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};