import ComfortSolutionSection from './comfortSolutionSection';
import WhyChooseUsSection from './whyChooseUsSection';
import EasyPurchaseSection from './easyPurchaseSection';
import TestimonialsSection from './testimonialsSection';


import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <ComfortSolutionSection />
      <WhyChooseUsSection />
      <EasyPurchaseSection />
      <TestimonialsSection />
    </>
  );
}