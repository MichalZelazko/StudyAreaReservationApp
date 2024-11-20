import { IBuilding } from "@/data/buildings";

export interface BuildingCardProps {
  building: IBuilding;
}

const BuildingCard = ({ building }: BuildingCardProps) => {
  return (
    <a
      href={`/buildings/${building.id}`}
      className="group flex flex-col items-center border rounded-xl hover:shadow-2xl transition-all duration-300 max-h-64 overflow-hidden"
    >
      <img
        src={building.photoUrl}
        alt={building.name}
        className="h-[80%] object-cover w-full"
      />
      <div className="flex items-center justify-center w-full h-[20%] bg-blue-700 group-hover:bg-white transition-colors duration-300">
        <h2 className="font-bold text-white group-hover:text-blue-700 text-3xl transition-colors duration-300">
          {building.name}
        </h2>
      </div>
    </a>
  );
};

export default BuildingCard;
