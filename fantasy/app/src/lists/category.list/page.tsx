export const categoryList = [
  {
    id: "1",
    name: "Classical Guitar",
    image: " ",
    color: "#E0E0E0",
  },
  {
    id: "2",
    name: "Acoustic Guitar",
    image: " ",
    color: "#E0E0E0",
  },
  {
    id: "3",
    name: "Ukulele",
    image: " ",
    color: "#E0E0E0",
  },
  {
    id: "4",
    name: "Semi-Acoustic Guitar",
    image: " ",
    color: "#E0E0E0",
  },
  {
    id: "5",
    name: "Banjo",
    image: " ",
    color: "#E0E0E0",
  },
];

export const classical = categoryList[0];

export const filterCategory = categoryList.filter((item) => item.id !== "1");
