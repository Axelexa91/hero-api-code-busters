import { Images } from "./hero";

// URLs
const STANDARD = "https://akabab.github.io/superhero-api/api";
const CACHED = "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api";

//URL in use
export const BASE_URL = STANDARD;

//Endpoints
export const ALL = "/all.json";
export const ID = "/id/";
export const POWERSTATS = "/powerstats/";
export const APPEARANCE = "/appearance/";
export const BIOGRAPHY = "/biography/";
export const CONNECTIONS = "/connections/";
export const WORK = "/work/";
export const IMAGES = "/images/";

//Special tokens
export const END_URL = ".json";
export const END_IMAGES_URL = ".jpg";
export const ENDPOINTS = {
  ALL,
  ID,
  POWERSTATS,
  APPEARANCE,
  BIOGRAPHY,
  CONNECTIONS,
  WORK,
} as const;

const test = {
  id: 4,
  name: "Abomination",
  slug: "4-abomination",
  powerstats: {
    intelligence: 63,
    strength: 80,
    speed: 53,
    durability: 90,
    power: 62,
    combat: 95,
  },
  appearance: {
    gender: "Male",
    race: "Human / Radiation",
    height: ["6'8", "203 cm"],
    weight: ["980 lb", "441 kg"],
    eyeColor: "Green",
    hairColor: "No Hair",
  },
  biography: {
    fullName: "Emil Blonsky",
    alterEgos: "No alter egos found.",
    aliases: ["Agent R-7", "Ravager of Worlds"],
    placeOfBirth: "Zagreb, Yugoslavia",
    firstAppearance: "Tales to Astonish #90",
    publisher: "Marvel Comics",
    alignment: "bad",
  },
  work: {
    occupation: "Ex-Spy",
    base: "Mobile",
  },
  connections: {
    groupAffiliation: "former member of the crew of the Andromeda Starship, ally of the Abominations and Forgotten",
    relatives: "Nadia Dornova Blonsky (wife, separated)",
  },
  images: {
    xs: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/xs/4-abomination.jpg",
    sm: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/sm/4-abomination.jpg",
    md: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/4-abomination.jpg",
    lg: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/4-abomination.jpg",
  },
};
