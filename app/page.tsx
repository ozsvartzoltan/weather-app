"use client";
import { SearchIcon } from "@/components/icons";
import LocationSearch from "@/components/locationsearch";
import { Input } from "@nextui-org/input";
import { useState, useEffect } from "react";

interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  // useEffect(() => {
  //   fetch(
  //     "https://api.weatherapi.com/v1/forecast.json?key=6da08b5b980045bfadb121929240711&q=Budapest&days=14&lang=en",
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, []);

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
      />
    </section>
  );
}
