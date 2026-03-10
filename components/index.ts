import Accordion from "./SectionPicker/Accordion";
import CallToAction from "./SectionPicker/CallToAction";
import FeaturedLogos from "./SectionPicker/FeaturedLogos";
import FloatingGallery from "./SectionPicker/FloatingGallery";
import Hero from "./SectionPicker/Hero";
import Hero2 from "./SectionPicker/Hero2";
import ImageAccordion from "./SectionPicker/ImageAccordion";
import PageHeader from "./SectionPicker/PageHeader";
import RichTextBody from "./SectionPicker/RichTextBody";
import Services from "./SectionPicker/Services";
import Teams from "./SectionPicker/Teams";
import Testimonial from "./SectionPicker/Testimonial";
import TwoColumn from "./SectionPicker/TwoColumn";

export const sectionsList = {
  "block.hero": Hero,
  "block.hero2": Hero2,
  "block.accordions": Accordion,
  "block.imageAccordion": ImageAccordion,
  "block.callToAction": CallToAction,
  "block.richTextBody": RichTextBody,
  "block.featuredLogos": FeaturedLogos,
  "block.services": Services,
  "block.team": Teams,
  "block.twoColumn": TwoColumn,
  "block.testimonials": Testimonial,
  "block.pageHeader": PageHeader,
  "block.floatingGallery": FloatingGallery,
};
