import AreaCard from "@/components/AreaCard";
import { buildings } from "@/data/buildings";
import { useParams } from "react-router-dom";

const AreasPage = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    return <div>Invalid URL</div>;
  }
  const building = buildings.find((b) => b.id === parseInt(id));
  const areas = building?.areas;

  if (!building) {
    return <div>Building not found or </div>;
  }

  if (!areas) {
    return <div>No studying areas in {building.name} found</div>;
  }

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold">Areas in {building.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {areas.map((a) => (
          <AreaCard key={a.id} area={a} buildingId={building.id} />
        ))}
      </div>
    </div>
  );
};

export default AreasPage;
