import React from "react";
import { PortableText } from "@portabletext/react";
import { RichTextBlockComponents } from "@/sanity/richText/RichTextBlock";
import { ModularPageSection } from "@/types";

const RichTextBody = (props: ModularPageSection<"block.richTextBody">) => {
  return (
    <section className="section-padding relative" id="richTextBody">
      {props?.body && props?.body?.length > 0 && (
        <div className="max-w-container mx-auto w-full ">
          <PortableText
            value={props.body}
            components={RichTextBlockComponents}
          />
        </div>
      )}
    </section>
  );
};

export default RichTextBody;
