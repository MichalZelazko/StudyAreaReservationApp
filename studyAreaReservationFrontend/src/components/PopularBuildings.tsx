import { IBuilding, buildings } from "../data/buildings";
import BuildingCard from "./BuildingCard";

const PopularBuildings = () => {
  const firstThreeBuildings: IBuilding[] = buildings.filter(
    (building) => building.id <= 4
  );

  return (
    <div className="flex flex-col gap-2 border-t p-6">
      <h2 className="text-3xl font-bold">Popular Buildings</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        {firstThreeBuildings.map((b) => (
          <BuildingCard key={b.id} building={b} />
        ))}
      </div>
    </div>
  );
};

export default PopularBuildings;
