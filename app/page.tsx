"use client";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Image } from "@nextui-org/image";
import DayCards from "@/components/daycards";
import LocationSearch from "@/components/locationsearch";
import { convertToMilitaryTime, daysOfWeek, siteConfig } from "@/config/site";

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
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }, [city]);

  function handleModelClose() {
    onOpenChange();
    setDayData(null);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8">
      <LocationSearch
        loading={loading}
        search={search}
        setCity={setCity}
        setLoading={setLoading}
        setSearch={setSearch}
        setShouldFetch={setShouldFetch}
        setSuggestions={setSuggestions}
        shouldFetch={shouldFetch}
        suggestions={suggestions}
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
              <ModalHeader className="flex justify-center pb-2 text-2xl font-bold ">
                {dayData?.date}
              </ModalHeader>
              <ModalBody className="pt-0">
                <p className="flex justify-center text-xl font-semibold mb-6">
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
                <div className="flex overflow-x-auto gap-6">
                  {dayData?.hour?.map((hour: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow-lg min-w-[120px] transform transition-transform hover:scale-105 hover:shadow-xl"
                    >
                      <Image
                        src={hour.condition.icon}
                        alt={hour.condition.text}
                        width={40}
                        height={40}
                        className="rounded-full mb-3"
                      />
                      <span className="font-medium text-lg text-gray-800 mb-1">
                        {convertToMilitaryTime(hour.time.split(" ")[1])}
                      </span>
                      <span className="text-blue-600 font-bold text-xl">
                        {hour.temp_c}°C
                      </span>
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={handleModelClose}
                  className="hover:bg-blue-100 transition-colors"
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
