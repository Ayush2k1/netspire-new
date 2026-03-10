import { defineQuery } from "next-sanity";

export const SECTIONS_BODY_FRAGMENT = defineQuery(`{
    ...,
    'members': members[] -> {
      ...,
      'gradient': gradient -> {
       ...
      },
      'position': position->position,
    },
    'gradient': gradient -> {
      ...,
      "image":image.asset->url
    },
    'serviceCards': serviceCards[] {
      ...,

     'gradient': gradient -> {
        ...,
       },
      }
    }`);

export const CUSTOM_PAGES_QUERY = defineQuery(
  `*[_type == "page" && defined(pathname.current)]`,
);

export const CUSTOM_PAGE_QUERY =
  defineQuery(`*[ _type == "page" &&  pathname.current ==  '/' + $slug ][0]{
    ...,
  "sectionPicker" : sectionPicker[] {
    ...,
    'members': members[] -> {
      ...,
      'gradient': gradient -> {
       ...
      },
      'position': position->position,
    },
    'gradient': gradient -> {
    ...,
      "image":image.asset->url
    },
    'serviceCards': serviceCards[] {
      ...,

     'gradient': gradient -> {
      ...,
       },
    }
    
  }
}`);

export const HOMEPAGE_QUERY =
  defineQuery(`*[ _type == "page" &&  pathname.current == "/" ][0]{
  ...,
"sectionPicker" : sectionPicker[] {
  ...,
  'members': members[] -> {
    ...,
    'gradient': gradient -> {
    ...,
    },
   'position': position->position,
  },
  'gradient': gradient -> {
  ...
  },
  'serviceCards': serviceCards[] {
...,

   'gradient': gradient -> {
  ...,
  },
  }
  
}
}`);

export const BLOGS_QUERY =
  defineQuery(`*[_type == "blog" && defined(pathname.current)]{
    ...,
    "author": author -> {
        ...
      },  
       "categories": categories[] -> {
        ...
      },
      "body": body[]{
        ...,
       "team": team[]->{
            ...,
            'position': position->position,
              'gradient': gradient -> {
        ...,
        },
        },
        "careers":careers[]->{
         ...,
         },
        "blogs":blogs[]->{
        ...,
        "categories": categories[] -> {
        ...
      },
        },
      },
}`);

export const BLOG_QUERY =
  defineQuery(`*[_type == "blog" && pathname.current == '/blog' + "/" + $slug][0]{
    ...,
    "author": author -> {
        ...
      },  
       "categories": categories[] -> {
        ...
      },
      "body": body[]{
        ...,
       "team": team[]->{
            ...,
              'position': position->position,
              'gradient': gradient -> {
        ...,
        },
        },
        "careers":careers[]->{
         ...,
         },
        "blogs":blogs[]->{
        ...,
        "categories": categories[] -> {
        ...
      },
        },
      },
}`);

export const CAREERS_QUERY = defineQuery(
  `*[_type == "careers" && defined(pathname.current)]`,
);

export const CAREER_QUERY =
  defineQuery(`*[_type == "careers" && pathname.current == '/careers' + "/" + $slug][0]{
    ...,
    "gradient": gradient -> {
        ...
      },
      "jobDescription": jobDescription[]{
        ...,
       "team": team[]->{
            ...,
             'position': position->position,
              'gradient': gradient -> {
               ...,
    
            },
        },
        "careers":careers[]->{
         ...,
         },
        "blogs":blogs[]->{
        ...,
        "categories": categories[] -> {
        ...
      },
        },
      }
}`);

export const SETTINGS_QUERY = defineQuery(`*[_type == "settings"][0]{
...,
'gradient': gradient -> {
  ...
  },
}`);

export const TEAM_QUERY = defineQuery(`
  *[_type == "team"]|order(position->orderRank) {
    ...,
    'position': position->position,
      'gradient': gradient -> {
  ...
  },
  }
`);

export const TEAM_PAGE_DATA =
  defineQuery(`*[_type == "teamConfig" && _id == "teamConfig"][0]{
  ...,
  'gradient': gradient -> {
  ...,
    }
}`);

export const CAREER_PAGE_DATA =
  defineQuery(`*[_type == "teamConfig" && _id == "careersConfig"][0]{
  ...,
  'gradient': gradient -> {
  ...,
    }
}`);

export const BLOG_PAGE_DATA =
  defineQuery(`*[_type == "teamConfig" && _id == "blogConfig"][0]{
  ...,
  'gradient': gradient -> {
  ...,
    }
}`);

export const MEMBER_QUERY =
  defineQuery(`*[_type == "team"  && pathname.current =='/team' + "/" + $slug][0]{
    ...,
    position->{
      ...
    },
   'gradient': gradient -> {
    ...,
    "image":image.asset->url,
  }}`);

export const TEXT_PAGE_QUERY = defineQuery(
  `*[_type == "text.page" && pathname.current == $pathname][0]`,
);

export const HOME_QUERY =
  defineQuery(`*[_type == "page" && pathname.current == "/"][0]{
  ...,
  sectionPicker[] ${SECTIONS_BODY_FRAGMENT},
}`);

export const MODULAR_PAGE_QUERY =
  defineQuery(`*[slug.current == $pathname && _type == "page"][0]{
  ...,
  sectionPicker[] ${SECTIONS_BODY_FRAGMENT},
}`);

export const ROUTE_QUERY = defineQuery(`
  *[slug.current == $pathname][0] {
    'routeData': {
      ...,
      'pathname': pathname.current,
    },
  }
`);

export const ALL_PATHNAMES_QUERY = defineQuery(`*[_type=='page']{
  "pathname":pathname.current
}`);
