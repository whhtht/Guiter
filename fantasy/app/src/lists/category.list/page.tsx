const list = [
  {
    id: "1",
    name: "Classical Guitar",
    image: "",
  },
  {
    id: "2",
    name: "Acoustic Guitar",
    image: "",
  },
  {
    id: "3",
    name: "Semi-Acoustic Guitar",
    image: "",
  },
  {
    id: "4",
    name: "Ukulele",
    image: "",
  },

  {
    id: "5",
    name: "Banjo",
    image: "",
  },
];

const classical = list[0];

const filterCategory = list.filter((item) => item.id !== "1");

export const table = {
  list,
  classical,
  filterCategory,
};
