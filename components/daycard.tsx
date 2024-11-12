import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { convertToMilitaryTime, daysOfWeek } from "@/config/site";
import { SunRiseIcon, SunSetIcon } from "./icons";

interface DayCardProps {
  day: any;
  setDayData: (value: any) => void;
  onOpen: () => void;
}

export default function DayCard({ day, setDayData, onOpen }: DayCardProps) {
  function handleCardClick() {
    setDayData(day);
    onOpen();
  }

  return (
    <div>
      <Card className="py-4" isPressable onPress={handleCardClick}>
        <CardHeader className="pb-0 pt-2 px-4 flex-col justify-center">
          <h1 className="text-large font-bold">
            {
              daysOfWeek[
                new Date(day.date).getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
              ]
            }
          </h1>
          <small>{day.date}</small>
          <div className="flex flex-col gap-2">
            <div className="flex justify-center whitespace-pre-wrap">
              <div>
                <span className="text-sm font-medium ">min{"  "}</span>
                <span className="text-blue-600">
                  {day.day.mintemp_c}°C{"  "}
                </span>
              </div>

              <div>
                <span className="text-sm font-medium ">max {"  "}</span>
                <span className="text-red-600">{day.day.maxtemp_c}°C</span>
              </div>
            </div>
            <div className="flex flex-row justify-center space-x-4">
              <div>
                <SunRiseIcon />
                {convertToMilitaryTime(day.astro.sunrise)}
              </div>
              <div>
                <SunSetIcon />
                {convertToMilitaryTime(day.astro.sunset)}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt={day.day.condition.text}
            className=" rounded-xl"
            src={day.day.condition.icon}
            width={270}
          />
        </CardBody>
      </Card>
    </div>
  );
}
