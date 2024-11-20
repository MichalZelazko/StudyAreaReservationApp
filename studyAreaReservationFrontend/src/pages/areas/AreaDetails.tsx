import { buildings } from "@/data/buildings";
import { useParams } from "react-router-dom";

const AreaDetailsPage = () => {
  const { id, areaId } = useParams<{ id: string; areaId: string }>();
  if (!id || !areaId) {
    return <div>Invalid URL</div>;
  }
  const building = buildings.find((b) => b.id === parseInt(id));
  const area = building?.areas.find((a) => a.id === parseInt(areaId));

  if (!building || !area) {
    return <div>Area not found</div>;
  }

  return (
    <div className="flex flex-col flex-grow p-6">
      <a href={`/buildings/${building.id}`} className="text-3xl font-bold">
        {building.name}
      </a>
      <h2 className="text-2xl font-bold">{area.name}</h2>
      <div className="flex flex-row gap-6">
        <div className="w-1/5">
          <img src={area.photoUrl} alt={area.name} className="mt-4 " />
        </div>
        <div className="w-4/5">
          <p className="text-xl mt-4">{area.description}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col flex-grow">
        <h3 className="text-xl font-bold my-2">Availability</h3>
        <div className="flex flex-grow items-center justify-center rounded-lg border ">
          <p className="text-3xl">Availability Calendar</p>
        </div>
      </div>
    </div>
  );
};

export default AreaDetailsPage;
