import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/components/icons";

export default function LocationSearch() {
  return (
    <div className="inline-block max-w-xl text-center justify-center">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />
    </div>
  );
}
