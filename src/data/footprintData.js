import footprintImages from "./footprintImages.json";

const mineImages = import.meta.glob("../assets/mines/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

export const mineImpactSegments = [
  { key: "land", label: "Land Acquisition", unit: "acres acquired" },
  { key: "workforce", label: "Mining Workforce", unit: "people deployed" },
  { key: "equipment", label: "Mining Equipment", unit: "machines deployed" },
  { key: "repurposing", label: "Mine Repurposing", unit: "acres restored" },
];

// Populate with verified district mine profiles, keyed by "State/District".
// Each profile supplies name, image, imageAlt, isSample and the four impact values.
export const districtMines = {};

export function getDistrictMine(stateName, district) {
  const photo = footprintImages[`${stateName}/${district}`];
  return districtMines[`${stateName}/${district}`] ?? {
    name: `${district} · Sample mine`,
    imageAlt: "Illustrative open-cast mine with terraced excavation",
    ...photo,
    image: photo ? mineImages[`../assets/mines/${photo.image}`] : `${import.meta.env.BASE_URL}coral/coral-mine-hero.png`,
    isSample: true,
    impact: { land: 1250, workforce: 480, equipment: 64, repurposing: 120 },
  };
}
