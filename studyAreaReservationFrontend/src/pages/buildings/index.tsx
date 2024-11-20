import { buildings } from "@/data/buildings";
import BuildingCard from "@/components/BuildingCard";

const BuildingsPage = () => {
  return (
    <div className="flex flex-col flex-grow p-6">
      <h1 className="text-3xl font-bold">Buildings on the campus</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {buildings.map((b) => (
          <BuildingCard key={b.id} building={b} />
        ))}
      </div>
    </div>
  );
};

export default BuildingsPage;
