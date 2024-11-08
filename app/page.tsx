"use client";
import DayCards from "@/components/daycards";
import LocationSearch from "@/components/locationsearch";
import { siteConfig } from "@/config/site";
import { useState, useEffect } from "react";

interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [city, setCity] = useState<Location>();
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (city) {
      fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${siteConfig.API_key}&q=${city.name}&days=14&lang=en`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [city]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <LocationSearch
        search={search}
        setSearch={setSearch}
        suggestions={suggestions}
        setSuggestions={setSuggestions}
        loading={loading}
        setLoading={setLoading}
        shouldFetch={shouldFetch}
        setShouldFetch={setShouldFetch}
        setCity={setCity}
      />
      {data && <DayCards data={data.forecast.forecastday} />}
    </section>
  );
}
