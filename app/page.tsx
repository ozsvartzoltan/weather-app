"use client";
import DayCards from "@/components/daycards";
import LocationSearch from "@/components/locationsearch";
import { convertToMilitaryTime, daysOfWeek, siteConfig } from "@/config/site";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [dayData, setDayData] = useState<any>(null);

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

  function handleModelClose() {
    console.log(dayData);

    onOpenChange();
    setDayData(null);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 ">
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
      {data && (
        <DayCards
          data={data.forecast.forecastday}
          onOpen={onOpen}
          setDayData={setDayData}
        />
      )}

      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={handleModelClose}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(handleModelClose) => (
            <>
              <ModalHeader className="flex justify-center pb-2">
                {dayData?.date}
              </ModalHeader>
              <ModalBody className="pt-0">
                <p className="flex justify-center text-lg font-semibold mb-4">
                  {
                    daysOfWeek[
                      new Date(dayData?.date).getDay() as
                        | 0
                        | 1
                        | 2
                        | 3
                        | 4
                        | 5
                        | 6
                    ]
                  }
                </p>
                <div className="flex overflow-x-auto gap-4">
                  {dayData?.hour?.map((hour: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center p-3 rounded-md shadow-sm min-w-[100px]"
                    >
                      <Image
                        src={hour.condition.icon}
                        alt={hour.condition.text}
                        width={32}
                        height={32}
                        className="rounded-full mb-2"
                      />
                      <span className="font-medium mb-1">
                        {convertToMilitaryTime(hour.time.split(" ")[1])}
                      </span>
                      <span className="text-blue-600 font-bold">
                        {hour.temp_c}°C
                      </span>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={handleModelClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
