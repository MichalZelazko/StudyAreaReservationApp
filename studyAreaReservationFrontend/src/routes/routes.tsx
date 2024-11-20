import HomePage from "@/pages/home";
import BuildingsPage from "@/pages/buildings";
import AreasPage from "@/pages/areas";
import { Home, Building } from "lucide-react";
import AreaDetailsPage from "@/pages/areas/AreaDetails";

export interface IRoute {
  path: string;
  name?: string;
  icon?: JSX.Element;
  element: JSX.Element;
  inNav: boolean;
}

export const routes: IRoute[] = [
  {
    path: "/",
    name: "Home",
    icon: (
      <Home color="rgb(29, 78, 216)" height={30} width={30} strokeWidth={2.5} />
    ),
    element: <HomePage />,
    inNav: true,
  },
  {
    path: "/buildings",
    name: "Buildings",
    icon: (
      <Building
        color="rgb(29, 78, 216)"
        height={30}
        width={30}
        strokeWidth={2.5}
      />
    ),
    element: <BuildingsPage />,
    inNav: true,
  },
  {
    path: "/buildings/:id",
    element: <AreasPage />,
    inNav: false,
  },
  {
    path: "/buildings/:id/area/:areaId",
    element: <AreaDetailsPage />,
    inNav: false,
  },
];
