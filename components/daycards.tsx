import DayCard from "./daycard";

interface DayCardsProps {
  data: any;
  setDayData: (value: any) => void;
  onOpen: () => void;
}

export default function DayCards({ data, setDayData, onOpen }: DayCardsProps) {
  return (
    <div className=" items-center mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
      {data.slice(0, 14).map((day: any) => (
        <DayCard
          day={day}
          setDayData={setDayData}
          onOpen={onOpen}
          key={day.date_epoch}
        />
      ))}
    </div>
  );
}
