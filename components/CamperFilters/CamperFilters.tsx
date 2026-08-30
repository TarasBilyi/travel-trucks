"use client";

import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import css from "./CamperFilters.module.css";
import { IconClose, IconLocation } from "@/components/Icons/Icons";
import { CamperFiltersOptions } from "@/types/camper";
import { humanize } from "@/lib/format";

interface CamperFiltersProps {
  options: CamperFiltersOptions;
}

function RadioGroup({
  title,
  name,
  values,
  selected,
  onChange,
}: {
  title: string;
  name: string;
  values: string[];
  selected: string | undefined;
  onChange: (value: string | undefined) => void;
}) {
  return (
    <fieldset className={css.group}>
      <legend className={css.groupTitle}>{title}</legend>
      <div className={css.options}>
        {values.map((value) => (
          <label key={value} className={css.option}>
            <input
              className={css.radio}
              type="radio"
              name={name}
              checked={selected === value}
              onChange={() => onChange(selected === value ? undefined : value)}
            />
            <span className={css.radioMark} />
            {humanize(value)}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

const CamperFilters = ({ options }: CamperFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [form, setForm] = useState<string | undefined>(
    searchParams.get("form") || undefined,
  );
  const [transmission, setTransmission] = useState<string | undefined>(
    searchParams.get("transmission") || undefined,
  );
  const [engine, setEngine] = useState<string | undefined>(
    searchParams.get("engine") || undefined,
  );

  const navigate = (params: {
    location?: string;
    form?: string;
    transmission?: string;
    engine?: string;
  }) => {
    const next = new URLSearchParams();
    if (params.location) next.set("location", params.location);
    if (params.form) next.set("form", params.form);
    if (params.transmission) next.set("transmission", params.transmission);
    if (params.engine) next.set("engine", params.engine);

    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate({ location: location.trim(), form, transmission, engine });
  };

  const handleClear = () => {
    setLocation("");
    setForm(undefined);
    setTransmission(undefined);
    setEngine(undefined);
    router.push(pathname);
  };

  return (
    <form className={css.sidebar} onSubmit={handleSubmit}>
      <label className={css.locationLabel}>
        Location
        <span className={css.locationField}>
          <IconLocation className={css.locationIcon} />
          <input
            className={css.locationInput}
            type="text"
            placeholder="City"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </span>
      </label>

      <div className={css.filters}>
        <p className={css.filtersTitle}>Filters</p>

        <RadioGroup
          title="Camper form"
          name="form"
          values={options.forms}
          selected={form}
          onChange={setForm}
        />

        <RadioGroup
          title="Engine"
          name="engine"
          values={options.engines}
          selected={engine}
          onChange={setEngine}
        />

        <RadioGroup
          title="Transmission"
          name="transmission"
          values={options.transmissions}
          selected={transmission}
          onChange={setTransmission}
        />
      </div>

      <div className={css.actions}>
        <button className="greenButton" type="submit">
          Search
        </button>
        <button className={css.clear} type="button" onClick={handleClear}>
          <IconClose size={20} className={css.closeIcon} />
          Clear filters
        </button>
      </div>
    </form>
  );
};

export default CamperFilters;
