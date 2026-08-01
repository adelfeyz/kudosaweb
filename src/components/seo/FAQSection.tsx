'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { generateFAQPageSchema, FAQItem } from '@/lib/seo';

interface FAQSectionProps {
  faqs: FAQItem[];
  title?: string;
  className?: string;
}

export default function FAQSection({ faqs, title = "Frequently Asked Questions", className = "" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = generateFAQPageSchema(faqs);

  return (
    <>
      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section id="faq" dir="rtl" className={`py-16 md:py-24 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-iran-sans text-4xl md:text-5xl leading-tight text-charcoal-black font-bold">
              {title}
            </h2>
          </div>

          <div className="max-w-[950px] mx-auto space-y-5">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-[40px] overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center p-5 text-end hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  {openIndex === index ? (
                    <Minus className="w-10 h-10 flex-shrink-0 text-primary ms-4" />
                  ) : (
                    <Plus className="w-10 h-10 flex-shrink-0 text-primary ms-4" />
                  )}
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg flex-shrink-0 ms-4">
                    {index + 1}
                  </div>
                  <p className="font-iran-sans font-medium text-sm md:text-base flex-1 text-end">
                    {faq.question}
                  </p>
                </button>
                {openIndex === index && (
                  <div id={`faq-answer-${index}`} className="px-5 pb-5">
                    <div className="pt-2 pb-2 px-5">
                      <p className="text-base leading-[1.7] font-iran-sans text-end">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

