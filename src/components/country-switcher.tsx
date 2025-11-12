"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { COUNTRIES, pickCountryName } from "@/lib/format";

export function CountrySwitcher({ country }: { country: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  return (
    <label className="inline-flex items-center gap-2 text-sm text-slate-300">
      Region
      <select
        className="rounded-md border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-100 transition hover:border-brand-500 focus:border-brand-400 focus:outline-none"
        value={country.toLowerCase()}
        onChange={(event) => {
          const nextCountry = event.target.value;
          const params = new URLSearchParams(searchParams.toString());
          if (nextCountry === "us") {
            params.delete("country");
          } else {
            params.set("country", nextCountry);
          }
          const query = params.toString();
          startTransition(() => {
            router.replace(query ? `${pathname}?${query}` : pathname);
          });
        }}
        aria-label="Select App Store region"
      >
        {COUNTRIES.map((option) => (
          <option key={option.code} value={option.code}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="text-xs text-slate-500">
        {isPending ? "Updating…" : pickCountryName(country)}
      </span>
    </label>
  );
}
