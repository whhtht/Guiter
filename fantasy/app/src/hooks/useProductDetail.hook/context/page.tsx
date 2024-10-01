export type MayLikeType = {
  id: number;
  name: string;
  price: string;
  condition: string;
  image: string;
  Link: string;
};

export interface Product {
  id: string;
  name: string;
  condition: string;
  price: number;
  specificationDetail: {
    Condition: string;
    Brand: string;
    Model: string;
    Finish: string;
    Categories: string;
    Year: string;
    Series: string;
    "Fretboard Material": string;
    "Pickup Configuration": string;
    "Scale Length": string;
    "Body Shape": string;
    "Right/Left Handed": string;
    "Number of Strings": string;
    "Neck Material": string;
    "Color Family": string;
    "Model Family": string;
    "Finish Style": string;
    "Body Type": string;
    "Offset Body": string;
    "Bridge/Tailpiece Type": string;
    "Neck Construction": string;
    "Number of Frets": string;
  };
}
