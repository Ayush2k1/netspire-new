import { sanityFetch } from "./live";
import {
  HOME_QUERY,
  MODULAR_PAGE_QUERY,
  ROUTE_QUERY,
  TEXT_PAGE_QUERY,
} from "./queries";

export async function loadRoute(pathname: string) {
  const { data } = await sanityFetch({
    query: ROUTE_QUERY,
    params: { pathname },
  });

  return data;
}

export async function loadModularPage(pathname: string) {
  const { data } = await sanityFetch({
    query: MODULAR_PAGE_QUERY,
    params: { pathname: pathname },
  });

  return data;
}

export async function loadHome() {
  const { data } = await sanityFetch({
    query: HOME_QUERY,
  });

  return data;
}

export async function loadPageByPathname({
  params: { path },
}: {
  params: { path?: string[] };
}) {
  let pathname: string;

  if (Array.isArray(path) && path.length > 0) {
    pathname = "/" + path.join("/");
  } else if (path) {
    pathname = "/" + path;
  } else {
    pathname = "/";
  }

  const data = await loadRoute(pathname);

  const documentType = data?.routeData._type;

  switch (documentType) {
    case "page":
      return loadModularPage(pathname);
    // case "project":
    //   return loadProjectPage(pathname);
    // case "text.page":
    //   return loadTextPage(pathname);
    default:
      console.warn("Invalid document type:", documentType);
      return null;
  }
}

export async function loadTextPage(pathname: string) {
  const { data } = await sanityFetch({
    params: { pathname },
    query: TEXT_PAGE_QUERY,
  });

  return data;
}
