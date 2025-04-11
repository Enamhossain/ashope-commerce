import {
  FaMale,
  FaFemale,
  FaRunning,
  FaHiking,
  FaShoePrints,
} from "react-icons/fa";

import { ClipboardList, DiamondMinus, GemIcon, Snowflake, Stars } from "lucide-react"; // Import specific icons
export const options = [
  {
    label: "Bestsellers",
    link: "bestsellers",
    icon: <Stars />,
    subOptions: [
      {
        label: "Men's Wear",
        icon: <FaMale />,
        sub: [
          { label: "Panjabi", link: "Panjabi" },
          { label: "dropshoulder", link: "dropt-shirt" },
          { label: "polo t-shirt", link: "Polo t-shirt" },
          { label: "Ethnic", link: "ethnic" },
        ],
      },
      {
        label: "Beauty",
        icon: <FaFemale />,
        sub: [
          { label: "Cosmetics", link: "cosmetics" },
          { label: "Lipsticks", link: "lipsticks" },
          { label: "Haircare", link: "haircare" },
        ],
      },
      {
        label: "Accessories",
        icon: <GemIcon />,
        sub: [
          { label: "Rings", link: "rings" },
          { label: "Perfumes", link: "perfumes" },
          { label: "Sunglasses", link: "sunglasses" },
          { label: "Watches", link: "watches" },
        ],
      },
    ],
  },
  {
    label: "Daily Essentials",
    icon: <ClipboardList />,
    columnTitle: "Essentials",
    subOptions: [
      {
        label: "Men",
        sub: [
          { label: "T-Shirts", link: "t-shirts" },
          { label: "Casual T-Shirts", link: "casualtshirts" },
          { label: "Formal Shirts", link: "formalshirts" },
          { label: "Casual Shirts", link: "casualshirts" },
          { label: "Panjabi", link: "panjabi" },
        ],
      },
      {
        label: "Women",
        sub: [
          { label: "Saree", link: "saree" },
          { label: "Salwar Kameez", link: "salwar-kameez" },
          { label: "Orna & Dupatta", link: "orna-dupatta" },
          { label: "Shalwar Suit", link: "shalwar-suit" },
          { label: "Three-Piece", link: "three-piece" },
        ],
      },
      {
        label: "Beauty Care",
        sub: [
          { label: "Creams", link: "creams" },
          { label: "Masks", link: "masks" },
          { label: "Hand Creams", link: "hand-creams" },
        ],
      },
    ],
  },
  {
    label: "Gold & Accessories",
    icon: <DiamondMinus />,
    columnTitle: "Luxury",
    subOptions: [
      {
        label: "Gold",
        sub: [
          { label: "Bracelets", link: "bracelets" },
          { label: "Bangles", link: "bangles" },
          { label: "Pendants", link: "pendants" },
        ],
      },
      {
        label: "Accessories",
        sub: [
          { label: "Bags", link: "bags" },
          { label: "Watches", link: "watches" },
          { label: "Jewelry", link: "jewelry" },
        ],
      },
    ],
  },
  {
    label: "Outdoor",
    icon: <FaHiking />,
    columnTitle: "Adventure",
    subOptions: [
      {
        label: "Sportswear",
        icon: <FaRunning />,
        link: "sportswear",
        sub: [
          { label: "Running", link: "running" },
          { label: "Cycling", link: "cycling" },
          { label: "Yoga", link: "yoga" },
        ],
      },
      {
        label: "Hiking Boots",
        icon: <FaShoePrints />,
        link: "hiking-boots",
        sub: [
          { label: "Lightweight", link: "lightweight" },
          { label: "Waterproof", link: "waterproof" },
          { label: "Insulated", link: "insulated" },
        ],
      },
    ],
  },
  {
    label: "Seasonal",
    icon: <Snowflake />,
    columnTitle: "Seasonal Trends",
    subOptions: [
      {
        label: "Winter",
        sub: [
          { label: "Jackets", link: "jackets" },
          { label: "Sweaters", link: "sweaters" },
          { label: "Hoodies", link: "hoodies" },
          { label: "Thermals", link: "thermals" },
        ],
      },
      {
        label: "Summer",
        sub: [
          { label: "Shorts", link: "shorts" },
          { label: "Tank Tops", link: "tank-tops" },
          { label: "Cotton Wear", link: "cotton-wear" },
          
        ],
      },
      {
        label: "Monsoon",
        sub: [
          { label: "Raincoats", link: "raincoats" },
          { label: "Waterproof Shoes", link: "waterproof-shoes" },
          { label: "Umbrellas", link: "umbrellas" },
        ],
      },
    ],
  },
];
