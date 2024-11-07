"use client";
import LocationSearch from "@/components/locationsearch";
import { useState, useEffect } from "react";

export default function Home() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      "https://api.weatherapi.com/v1/forecast.json?key=6da08b5b980045bfadb121929240711&q=Budapest&days=14&lang=en",
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
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <LocationSearch />
    </section>
  );
}
