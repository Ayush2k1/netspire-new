import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ContactRound, Mails, SendIcon } from "lucide-react";

const hiddenDocTypes = [
  "settings",
  "page",
  "team",
  "careers",
  "gradients",
  "teamConfig",
  "media.tag",
  "positions",
  "blog",
  "author",
  "category",
  "contactSubmissions",
  "newsletterSubmissions",
];

export const structure: StructureResolver = (S, context: any) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Page")
        .schemaType("page")
        .child(S.documentTypeList("page")),

      S.listItem()
        .title("Team")
        .schemaType("team")
        .child(
          S.list()
            .title("Team")
            .items([
              S.listItem()
                .title("All Team Members")
                .schemaType("team")
                .child(S.documentTypeList("team").title("All Team Members")),

              orderableDocumentListDeskItem({
                type: "positions",
                title: "Positions",
                icon: ContactRound,
                menuItems: [],
                S,
                context,
              }),

              S.divider(),

              S.listItem()
                .title("Configuration")
                .schemaType("teamConfig")
                .id("teamConfig")
                .child(
                  S.document()
                    .schemaType("teamConfig")
                    .documentId("teamConfig"),
                ),
            ]),
        ),

      S.listItem()
        .title("Careers")
        .schemaType("careers")
        .child(
          S.list()
            .title("Careers")
            .items([
              S.listItem()
                .title("All Careers")
                .schemaType("careers")
                .child(S.documentTypeList("careers").title("All Careers")),

              S.divider(),

              S.listItem()
                .title("Configuration")
                .schemaType("teamConfig")
                .id("careersConfig")
                .child(
                  S.document()
                    .schemaType("teamConfig")
                    .documentId("careersConfig"),
                ),
            ]),
        ),

      S.listItem()
        .title("Blog")
        .icon(SendIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("All Blogs")
                .schemaType("blog")
                .child(S.documentTypeList("blog").title("All Blogs")),

              S.listItem()
                .title("Authors")
                .schemaType("author")
                .child(S.documentTypeList("author").title("Authors")),

              S.listItem()
                .title("Categories")
                .schemaType("category")
                .child(S.documentTypeList("category").title("Categories")),

              S.divider(),

              S.listItem()
                .title("Configuration")
                .schemaType("teamConfig")
                .id("blogConfig")
                .child(
                  S.document()
                    .schemaType("teamConfig")
                    .documentId("blogConfig"),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Form Submissions")
        .icon(Mails)
        .child(
          S.list()
            .title("Form Submissions")
            .items([
              S.listItem()
                .title("Contact Form Submissions")
                .schemaType("contactSubmissions")
                .child(
                  S.documentTypeList("contactSubmissions").title(
                    "Contact Form Submissions",
                  ),
                ),

              S.listItem()
                .title("Newsletter Form Submissions")
                .schemaType("newsletterSubmissions")
                .child(
                  S.documentTypeList("newsletterSubmissions").title(
                    "Newsletter Form Submissions",
                  ),
                ),
            ]),
        ),

      S.divider(),

      S.listItem()
        .title("Gradients")
        .schemaType("gradients")
        .child(S.documentTypeList("gradients")),

      S.listItem()
        .title("Settings")
        .schemaType("settings")
        .child(
          S.editor()
            .title("Settings")
            .schemaType("settings")
            .documentId("settings"),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !hiddenDocTypes.includes(item.getId()!),
      ),
    ]);
