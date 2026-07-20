export type PresentationSlideLayout =
  | 'title'
  | 'content'
  | 'image'
  | 'split'
  | 'comparison'
  | 'qa';

export interface PresentationSlide {
  id: number;
  layout: PresentationSlideLayout;
  title?: string;
  subtitle?: string;
  bullets?: string[];
  body?: string;
  image?: string;
  images?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  qa?: Array<{ question: string; answer: string }>;
  imageLayout?: 'side' | 'row';
  imageBg?: 'white' | 'dark';
}

export type PresentationTheme = 'emerald' | 'violet' | 'blue' | 'indigo';

/** @deprecated Use PresentationSlide */
export type LabkhandSlide = PresentationSlide;

/** @deprecated Use PresentationSlideLayout */
export type LabkhandSlideLayout = PresentationSlideLayout;
