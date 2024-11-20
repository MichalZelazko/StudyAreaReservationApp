export interface IArea {
  id: number;
  name: string;
  description: string;
  photoUrl: string;
}

export interface IBuilding {
  id: number;
  name: string;
  areas: IArea[];
  photoUrl: string;
}

export const buildings: IBuilding[] = [
  {
    id: 1,
    name: "IFE",
    photoUrl:
      "https://ife.edu.p.lodz.pl/pluginfile.php/1/theme_modernwikamp/marketingblocksimage11/1731590051/ife.jpg",
    areas: [
      {
        id: 11,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 12,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 13,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 2,
    name: "WEEIA",
    photoUrl: "https://zsp9.pl/wp-content/uploads/2021/04/weeia.jpg",
    areas: [
      {
        id: 21,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 22,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 23,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 3,
    name: "WBINOŻ",
    photoUrl: "https://photos.wikimapia.org/p/00/06/66/17/00_big.jpg",
    areas: [
      {
        id: 31,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 32,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 33,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 4,
    name: "WM",
    photoUrl: "https://www.urbanity.pl/photos/24/31/2431.jpg?v=1517954331",
    areas: [
      {
        id: 41,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 42,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 43,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 5,
    name: "WCH",
    photoUrl:
      "https://d-art.ppstatic.pl/kadry/k/r/1/73/76/63f49cf037de7_o_full.jpg",
    areas: [
      {
        id: 51,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 52,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 53,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 6,
    name: "WFTIMS",
    photoUrl:
      "https://ftims.edu.p.lodz.pl/pluginfile.php/1/theme_modernwikamp/marketingblocksimage11/1731589547/ftims.jpg",
    areas: [
      {
        id: 61,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 62,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 63,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
  {
    id: 7,
    name: "WBAIŚ",
    photoUrl:
      "https://p.lodz.pl/sites/default/files/styles/max_1300x1300/public/2020-12/Politechnika_Lodzka_kampus-B_003.jpg",
    areas: [
      {
        id: 71,
        name: "Area 1",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 72,
        name: "Area 2",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
      {
        id: 73,
        name: "Area 3",
        description: "Area 1 description",
        photoUrl:
          "https://hips.hearstapps.com/hmg-prod/images/framery-q-1558470399.png",
      },
    ],
  },
];
