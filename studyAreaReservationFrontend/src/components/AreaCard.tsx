import { IArea } from "@/data/buildings";

export interface AreaCardProps {
  area: IArea;
  buildingId: number;
}

const AreaCard = ({ area, buildingId }: AreaCardProps) => {
  return (
    <a
      href={`/buildings/${buildingId}/area/${area.id}`}
      className="group flex flex-row items-center border rounded-xl hover:shadow-2xl transition-all duration-300 max-h-32 overflow-hidden"
    >
      <img
        src={area.photoUrl}
        alt={area.name}
        className="h-full object-cover"
      />
      <div className="flex flex-col flex-grow justify-center p-3 h-full bg-blue-700 group-hover:bg-white text-white group-hover:text-blue-700 transition-colors duration-300">
        <h2 className="font-bold text-3xl">{area.name}</h2>
        <p className="text-xl">{area.description}</p>
      </div>
    </a>
  );
};

export default AreaCard;
