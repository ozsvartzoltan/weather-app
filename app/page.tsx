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
  const [locations, setLocations] = useState<Location[]>([]);
  const [data, setData] = useState();
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    if (search.length > 3) {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/search.json?key=6da08b5b980045bfadb121929240711&q=${search}&lang=en`,
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
          setLocations(data);
          setLoading(false);
          console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [search]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <Input
          aria-label="Search"
          classNames={{
            inputWrapper: "bg-default-100",
            input: "text-sm",
          }}
          placeholder="City..."
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
          value={search}
          onValueChange={setSearch}
        />
        {loading && (
          <div className="absolute right-4 top-2 text-gray-400">Loading...</div>
        )}
      </div>
    </section>
  );
}
