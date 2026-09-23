import type { CollectionBeforeValidateHook } from "payload";
import { PAGE_TEMPLATE_PATHS } from "./fields";

const UNIQUE_KEYS = ["slug", "path", "legacyId"] as const;

function nullEmptyUniques<T extends Record<string, unknown>>(data: T): T {
  for (const key of UNIQUE_KEYS) {
    if (data[key] === "") {
      (data as Record<string, unknown>)[key] = null;
    }
  }
  return data;
}

export const emptyToNull: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data;
  return nullEmptyUniques(data);
};

function joinPath(prefix: string, slug: string): string {
  if (!prefix) return slug === "home" ? "/" : `/${slug}`;
  return `${prefix}/${slug}`;
}

export function generatePrefixedPath(
  prefix: string,
): CollectionBeforeValidateHook {
  return ({ data }) => {
    if (!data) return data;
    if ((!data.path || data.path === "") && typeof data.slug === "string" && data.slug) {
      data.path = joinPath(prefix, data.slug);
    }
    return nullEmptyUniques(data);
  };
}

export const generatePagePath: CollectionBeforeValidateHook = ({ data }) => {
  if (!data) return data;
  if ((!data.path || data.path === "") && typeof data.template === "string") {
    data.path =
      PAGE_TEMPLATE_PATHS[data.template] ??
      (typeof data.slug === "string" && data.slug ? `/${data.slug}` : undefined);
  }
  if ((!data.slug || data.slug === "") && typeof data.template === "string") {
    data.slug = data.template === "home" ? "home" : data.template;
  }
  return nullEmptyUniques(data);
};

export const generateServiceAreaPath: CollectionBeforeValidateHook = ({
  data,
}) => {
  if (!data) return data;
  const city = typeof data.citySlug === "string" ? data.citySlug : undefined;
  const service =
    typeof data.serviceSlug === "string" ? data.serviceSlug : undefined;
  if (city && service) {
    if (!data.path) data.path = `/areas-we-serve/${city}/${service}`;
    if (!data.slug) data.slug = `${city}--${service}`;
  }
  return nullEmptyUniques(data);
};
