import { lazy, ComponentType } from "react";

export const componentRegistry: Record<string, ComponentType<any>> = {
  // headers
  header1: lazy(() => import("@/components/registry/header1")),
  header2: lazy(() => import("@/components/registry/header2")),
  header3: lazy(() => import("@/components/registry/header3")),

  // heroes
  hero1: lazy(() => import("@/components/registry/hero1")),
  hero2: lazy(() => import("@/components/registry/hero2")),
  hero3: lazy(() => import("@/components/registry/hero3")),

  // features
  features1: lazy(() => import("@/components/registry/features1")),
  features2: lazy(() => import("@/components/registry/features2")),
  features3: lazy(() => import("@/components/registry/features3")),

  // courses
  courses1: lazy(() => import("@/components/registry/courses1")),
  courses2: lazy(() => import("@/components/registry/courses2")),
  courses3: lazy(() => import("@/components/registry/courses3")),

  // ctas
  cta1: lazy(() => import("@/components/registry/cta1")),
  cta2: lazy(() => import("@/components/registry/cta2")),
  cta3: lazy(() => import("@/components/registry/cta3")),

  // footers
  footer1: lazy(() => import("@/components/registry/footer1")),
  footer2: lazy(() => import("@/components/registry/footer2")),
  footer3: lazy(() => import("@/components/registry/footer3")),
};
