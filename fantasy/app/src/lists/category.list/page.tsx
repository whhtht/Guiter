const list = [
  {
    id: "1",
    name: "Classical Guitar",
    image: "/src/images/category.images/classicalGuitar.png",
  },
  {
    id: "2",
    name: "Acoustic Guitar",
    image: "/src/images/category.images/acousticGuitar.png",
  },
  {
    id: "3",
    name: "Ukulele",
    image: "/src/images/category.images/ukulele.png",
  },
  {
    id: "4",
    name: "Semi-Acoustic Guitar",
    image: "/src/images/category.images/semi-AcousticGuitar.png",
  },
  {
    id: "5",
    name: "Banjo",
    image: "/src/images/category.images/banjo.png",
  },
];

const classical = list[0];

const filterCategory = list.filter((item) => item.id !== "1");

export const table = {
  list,
  classical,
  filterCategory,
};
