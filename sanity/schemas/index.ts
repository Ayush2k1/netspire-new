//document types
import page from "./documents/page";
import category from "./documents/category";
import author from "./documents/author";
import blog from "./documents/blog";
import sections from "./objects/sections";
import careers from "./documents/careers";
import team from "./documents/team";
import gradients from "./documents/gradients";

const documents = [
  page,
  category,
  author,
  blog,
  careers,
  team,
  gradients,
  contactSubmissions,
  newsletterSubmissions,
];

//singletons
import settings from "./singletons/settings";

const singleton = [settings];

//object types
import link from "./objects/global/link";
import contact from "./objects/contact";
import blockContent from "./objects/blockContent";
import accordion from "./objects/accordion";
import imageAccordion from "./objects/imageAccordion";
import columnGridArray from "./objects/columnGridArray";
import footer from "./objects/global/footer";
import menu from "./objects/global/menu";
import footerLinkGroup from "./objects/navigation/footerLinkGroup";
import navLinkGroup from "./objects/navigation/navLinkGroup";
import multipleLinks from "./objects/navigation/multipleLinks";
import links from "./objects/global/links";
import serviceCards from "./objects/cards/serviceCards";
import seoField from "./objects/seo-field";
import testimonials from "./objects/testimonials";
import teamConfig from "./documents/teamConfig";
import teamPositions from "./documents/teamPositions";
import contactSubmissions from "./documents/contactSubmissions";
import newsletterSubmissions from "./documents/newsletterSubmissions";
import { ogImage } from "./objects/og-image";
import { seo } from "./objects/seo";
import { ptBody } from "./objects/global/pt-body";
import { lightPtBody } from "./objects/global/pt-body";

const objects = [
  serviceCards,
  link,
  ogImage,
  seo,
  links,
  blockContent,
  accordion,
  imageAccordion,
  columnGridArray,
  contact,
  footer,
  menu,
  footerLinkGroup,
  multipleLinks,
  navLinkGroup,
  seoField,
  testimonials,
  teamConfig,
  teamPositions,
  ptBody,
  lightPtBody,
];

export const schema: { types: any[] } = {
  types: [...documents, ...objects, ...singleton, ...sections],
};
