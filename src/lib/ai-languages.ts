export interface AILanguageOption {
  code: string;
  label: string;
}

export const AI_LANGUAGES: AILanguageOption[] = [
  { code: 'fa', label: 'Farsi (Persian)' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'Arabic' },
  { code: 'de', label: 'German' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
  { code: 'tr', label: 'Turkish' },
];

export const DEFAULT_AI_LANGUAGE = 'fa';

export function getLanguageLabel(code: string): string {
  return AI_LANGUAGES.find((lang) => lang.code === code)?.label ?? code;
}
