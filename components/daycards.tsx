import DayCard from "./daycard";

interface DayCardsProps {
  data: any;
  setDayData: (value: any) => void;
  onOpen: () => void;
}

export default function DayCards({ data, setDayData, onOpen }: DayCardsProps) {
  return (
    <div className=" items-center mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(7,minmax(220px,1fr))] gap-4 p-4">
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
