// import AreaCard from "@/components/AreaCard";
// import { buildings } from "@/data/buildings";
// import { useParams } from "react-router-dom";

// const AreasPage = () => {
//   const { id } = useParams<{ id: string }>();
//   if (!id) {
//     return <div>Invalid URL</div>;
//   }
//   const building = buildings.find((b) => b.id === parseInt(id));
//   const areas = building?.areas;

//   if (!building) {
//     return <div>Building not found or </div>;
//   }

//   if (!areas) {
//     return <div>No studying areas in {building.name} found</div>;
//   }

//   return (
//     <div className="flex flex-col p-6">
//       <h1 className="text-2xl font-bold">Areas in {building.name}</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
//         {areas.map((a) => (
//           <AreaCard key={a.id} area={a} buildingId={building.id} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AreasPage;
import { useParams, useNavigate } from "react-router-dom";
import { buildings, IBuilding } from "@/data/buildings";
import { useEffect, useState } from "react";

const AreasPage = () => {
  const { id } = useParams(); // Assuming this is for the building ID
  const navigate = useNavigate();
  const [building, setBuilding] = useState<IBuilding | null>(null);

  useEffect(() => {
    const foundBuilding = buildings.find((b) => b.id === parseInt(id || ""));
    setBuilding(foundBuilding || null);
  }, [id]);

  if (!building) {
    return <div>Building not found</div>;
  }

  return (
    <div className="relative w-full mx-auto">
      <svg
        viewBox="0 0 100 100"
        className="w-full min-w-[1000px] overflow-x-scroll"
        xmlns="http://www.w3.org/2000/svg"
      >
        <image href="/map.svg" width="100" height="100" />
        {building.areas.map((area) => (
          <g key={area.id}>
            {/* Circle */}
            <circle
              cx={area.x_position}
              cy={area.y_position}
              r="1"
              fill="rgb(29 78 216)"
              className="cursor-pointer"
              onClick={() => {
                const path = `/buildings/${building.id}/area/${area.id}`;
                navigate(path);
              }}
            >
              <title>{area.name}</title>
            </circle>

            <text
              x={area.x_position}
              y={area.y_position}
              fontSize="1"
              fill="white"
              textAnchor="middle"
              dominantBaseline="middle"
              className="pointer-events-none" // Prevents text from intercepting click events
            >
              {area.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default AreasPage;
