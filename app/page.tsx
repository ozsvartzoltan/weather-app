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
  const [data, setData] = useState();
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

  useEffect(() => {
    console.log(search);
    if (shouldFetch && search.length > 2) {
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
          setSuggestions(data);
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
      <div className="inline-block max-w-xl text-center justify-center w-4/12">
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
          onValueChange={(e) => {
            setSearch(e);
            setShouldFetch(true);
          }}
        />
        {loading && (
          <div className="absolute right-4 top-2 text-gray-400">Loading...</div>
        )}
        {suggestions.length > 0 && (
          <div className="rounded-xl shadow-md mt-2 bg-default-100 ">
            <ul className="p-0.5">
              {suggestions.map((location) => (
                <li
                  key={location.id}
                  className="p-1 rounded-2xl hover:bg-default-200 my-1 cursor-pointer px-4"
                  onClick={() => {
                    console.log(location);
                    setSearch(location.name);
                    setSuggestions([]);
                    setShouldFetch(false);
                  }}
                >
                  {location.name}, {location.region}, {location.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
