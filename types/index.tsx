import type { ComponentType } from "react";
import type { DocumentOptions } from "sanity";

export type SectionType = NonNullable<
  NonNullable<any>["sectionPicker"]
>[number]["_type"];

type SectionInRenderer = {
  _key: string;
  /**
   * Index in the parent array.
   * @remarks injected by SectionsRenderer.tsx
   */
  _sectionIndex?: number;
  /**
   * Sibling sections.
   * @remarks injected by SectionsRenderer.tsx
   */
  _sections?: SectionType[];
  _type: SectionType;
  /**
   * Data to be spread on the root HTML element of the block
   * @remarks injected by SectionsRenderer.tsx
   */
  rootHtmlAttributes: {
    "data-section": string;
    id: string;
  };
};

export type SectionProps = NonNullable<
  NonNullable<any>["sectionPicker"]
>[number];

export type ModularPageSection<T extends SectionType> = Omit<
  Extract<SectionProps, { _type: T }>,
  "_type"
> &
  SectionInRenderer;

export type SectionList = {
  [K in SectionType]: ComponentType<ModularPageSection<K>>;
};

export type ExtendedDocumentOptions = DocumentOptions & {
  disableCreation?: true;
};

export type RiveCompProps = {
  riveFile: string | { asset: { url: string } };
  isPublic?: boolean;
};
