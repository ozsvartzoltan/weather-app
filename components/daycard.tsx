import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { useEffect } from "react";
import { Image } from "@nextui-org/image";
import { daysOfWeek } from "@/config/site";
import { SunRiseIcon, SunSetIcon } from "./icons";

interface DayCardProps {
  day: any;
}

export default function DayCard({ day }: DayCardProps) {
  useEffect(() => {
    console.log(day);
    console.log(new Date(day.date).getDay());

    console.log(day.date);
  }, []);
  return (
    <div>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
          <h1 className="text-large font-bold">
            {daysOfWeek[new Date(day.date).getDay()]}
          </h1>
          <div className="flex flex-col gap-2">
            <div className="flex ">
              <div>
                <span className="text-sm font-medium">Min </span>
                <span className="text-blue-700">{day.day.mintemp_c}°C</span>
              </div>
              <div>
                <span className="text-sm font-medium">Max </span>
                <span className="text-red-700">{day.day.maxtemp_c}°C</span>
              </div>
            </div>
            <div className="flex">
              <div>
                <SunRiseIcon />
                {day.astro.sunrise}
              </div>
              <div>
                <SunSetIcon />
                {day.astro.sunset}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={day.day.condition.icon}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
}
