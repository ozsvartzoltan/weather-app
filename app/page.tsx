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
                {dayData.date}
              </ModalHeader>
              <ModalBody className="pt-0">
                <p className="flex justify-center">
                  {
                    daysOfWeek[
                      new Date(dayData.date).getDay() as
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
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
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
