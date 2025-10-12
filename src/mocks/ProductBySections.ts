// src/mocks/productsBySection.ts

import { SectionEnum } from "@/utils/global/globalTypes";


export const productsBySection = {
  [SectionEnum.TERROR]: [
    {
      id: "t1",
      name: "It",
      price: 22.5,
      image: "https://picsum.photos/id/1011/300/400",
    },
    {
      id: "t2",
      name: "El resplandor",
      price: 18.0,
      image: "https://picsum.photos/id/1025/300/400",
    },
  ],
  [SectionEnum.AUTHOR]: [
    {
      id: "a1",
      name: "Cien años de soledad",
      price: 25.0,
      image: "https://picsum.photos/id/1005/300/400",
    },
  ],
  [SectionEnum.CLUB]: [
    {
      id: "c1",
      name: "Libro del mes",
      price: 20.0,
      image: "https://picsum.photos/id/1016/300/400",
    },
  ],
  [SectionEnum.KIDS]: [
    {
      id: "k1",
      name: "El principito",
      price: 15.0,
      image: "https://picsum.photos/id/1018/300/400",
    },
  ],
  [SectionEnum.NEW]: [
    {
      id: "n1",
      name: "Novedades del mes",
      price: 30.0,
      image: "https://picsum.photos/id/1020/300/400",
    },
  ],
};
