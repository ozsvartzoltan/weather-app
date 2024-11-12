import { Input } from "@nextui-org/input";
import { useEffect } from "react";
import { SearchIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/button";

interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
}

interface LocationSearchProps {
  search: string;
  setSearch: (value: string) => void;
  suggestions: Location[];
  setSuggestions: (value: Location[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  shouldFetch: boolean;
  setShouldFetch: (value: boolean) => void;
  setCity: (value: Location) => void;
}

export default function LocationSearch({
  search,
  setSearch,
  suggestions,
  setSuggestions,
  loading,
  setLoading,
  shouldFetch,
  setShouldFetch,
  setCity,
}: LocationSearchProps) {
  useEffect(() => {
    if (shouldFetch && search.length > 2) {
      setLoading(true);
      fetch(
        `https://api.weatherapi.com/v1/search.json?key=${siteConfig.API_key}&q=${search}&lang=en`,
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
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [search]);

  return (
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
          <ul className="p-0.5 ">
            {suggestions.map((location) => (
              <li key={location.id} className=" ">
                <Button
                  className="w-full p-1 cursor-pointer px-4 rounded-2xl bg-default-100 hover:bg-default-200 text-left"
                  onClick={() => {
                    setCity(location);
                    setSearch(location.name);
                    setSuggestions([]);
                    setShouldFetch(false);
                  }}
                >
                  {location.name}, {location.region}, {location.country}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
