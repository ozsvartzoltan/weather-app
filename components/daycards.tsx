import DayCard from "./daycard";

interface DayCardsProps {
  data: any;
}

export default function DayCards({ data }: DayCardsProps) {
  return (
    <div className="flex flex-col items-center gap-8 mt-4">
      {[0, 1].map((rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-4">
          {data
            .slice(rowIndex * 7, (rowIndex + 1) * 7)
            .map((day: any, index: number) => (
              <DayCard key={day.date_epoch} day={day} />
            ))}
        </div>
      ))}
    </div>
  );
}
