// ./components/AutomaticVisualEditing.tsx

"use client";

import { VisualEditing } from "next-sanity/visual-editing";
import { revalidatePath } from "next/cache";
import { draftMode } from "next/headers";
import { useEffect } from "react";

export function AutomaticVisualEditing() {
  useEffect(() => {
    // If not an iframe or a Vercel Preview deployment, turn off Draft Mode
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "preview" && window === parent) {
      location.href = "/api/disable-draft";
    }
  }, []);

  return (
    <VisualEditing
      refresh={async (payload) => {
        "use server";
        // Guard against a bad actor attempting to revalidate the page
        if (!(await draftMode()).isEnabled) {
          return;
        }
        if (payload.source === "manual") {
          await revalidatePath("/", "layout");
        }
        // Only revalidate on mutations if the route doesn't have loaders or preview-kit
        if (payload.source === "mutation" && !payload.livePreviewEnabled) {
          await revalidatePath("/", "layout");
        }
      }}
    />
  );
}
