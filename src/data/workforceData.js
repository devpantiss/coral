export const workforceRoles = [
  { key: "dumper", label: "Dumper / Tipper Operator", shortLabel: "Dumper / Tipper" },
  { key: "excavator", label: "Excavator Operator", shortLabel: "Excavator" },
  { key: "loader", label: "Loader Operator", shortLabel: "Loader" },
  { key: "mechanic", label: "HEMM Mechanic", shortLabel: "HEMM Mechanic" },
  { key: "electrician", label: "HEMM Electrician", shortLabel: "HEMM Electrician" },
  { key: "welder", label: "Mine Welder", shortLabel: "Mine Welder" },
];

export const workforceDistricts = [
  { name: "Jajapur", dumper: 48, excavator: 22, loader: 20, mechanic: 15, electrician: 11, welder: 10 },
  { name: "Angul", dumper: 42, excavator: 18, loader: 16, mechanic: 12, electrician: 8, welder: 7 },
  { name: "Kendujhar", dumper: 62, excavator: 28, loader: 25, mechanic: 19, electrician: 14, welder: 13 },
  { name: "Sundargarh", dumper: 58, excavator: 26, loader: 23, mechanic: 18, electrician: 13, welder: 12 },
  { name: "Kalahandi", dumper: 30, excavator: 14, loader: 12, mechanic: 10, electrician: 6, welder: 7 },
  { name: "Jharsuguda", dumper: 39, excavator: 17, loader: 15, mechanic: 13, electrician: 9, welder: 8 },
  { name: "Kandhamal", dumper: 27, excavator: 13, loader: 11, mechanic: 9, electrician: 6, welder: 6 },
  { name: "Nuapada", dumper: 24, excavator: 11, loader: 10, mechanic: 8, electrician: 5, welder: 5 },
].map((district) => ({ ...district, total: workforceRoles.reduce((sum, role) => sum + district[role.key], 0) }));

export const districtBlocks = {
  Jajapur: ["Danagadi", "Sukinda", "Korei"],
  Angul: ["Chhendipada", "Talcher", "Kaniha"],
  Kendujhar: ["Joda", "Champua", "Banspal"],
  Sundargarh: ["Koida", "Lahunipara", "Rajgangpur"],
  Kalahandi: ["Bhawanipatna", "Junagarh", "Kesinga"],
  Jharsuguda: ["Lakhanpur", "Kolabira", "Laikera"],
  Kandhamal: ["Phulbani", "Balliguda", "Raikia"],
  Nuapada: ["Khariar", "Komna", "Boden"],
};

// Sample workforce coverage for the additional dashboard states.
const sampleDistricts = (rows) => rows.map(([name, blocks, counts]) => {
  const district = { name, blocks, isSample: true };
  workforceRoles.forEach((role, index) => { district[role.key] = counts[index]; });
  district.total = counts.reduce((sum, count) => sum + count, 0);
  return district;
});

export const workforceStates = [
  { name: "Odisha", districtsFile: "/Orissa.geojson", districtProperty: "Dist_Name", bounds: [[17.78, 81.337], [22.57, 87.53]], districts: workforceDistricts },
  { name: "Jharkhand", districtsFile: "/JharkhandDistricts.geojson", districtProperty: "district", bounds: [[21.9, 83.2], [25.4, 87.95]], isSample: true, districts: sampleDistricts([
    ["Dhanbad", ["Baghmara", "Baliapur", "Govindpur"], [66, 31, 24, 21, 15, 13]],
    ["Bokaro", ["Bermo", "Chandrapura", "Chas"], [51, 25, 21, 17, 12, 11]],
    ["Ramgarh", ["Mandu", "Patratu", "Gola"], [43, 20, 18, 15, 10, 9]],
    ["West Singhbhum", ["Noamundi", "Jagannathpur", "Manoharpur"], [58, 28, 23, 18, 13, 12]],
  ]) },
  { name: "Chhattisgarh", districtsFile: "/ChhattisgarhDistricts.geojson", districtProperty: "district", bounds: [[17.7, 80.2], [24.2, 84.45]], isSample: true, districts: sampleDistricts([
    ["Korba", ["Katghora", "Pali", "Kartala"], [71, 34, 27, 23, 16, 14]],
    ["Raigarh", ["Tamnar", "Gharghoda", "Kharsia"], [55, 26, 22, 18, 13, 11]],
    ["Dakshin Bastar Dantewada", ["Dantewada", "Kate kalyan", "Kuakonda"], [47, 23, 19, 16, 11, 10]],
    ["Uttar Bastar Kanker", ["Bhanupratappur", "Durgukondal", "Charama"], [36, 18, 16, 12, 9, 8]],
  ]) },
];

const firstNames = ["Ajay", "Anil", "Bikash", "Deepak", "Ganesh", "Kiran", "Manoj", "Prakash", "Rakesh", "Sanjay", "Sunil", "Vijay", "Anita", "Kavita", "Meena", "Priya"];
const lastNames = ["Behera", "Das", "Jena", "Majhi", "Nayak", "Patra", "Pradhan", "Sahu", "Singh", "Tudu"];
const employmentStatuses = ["Permanent", "Contract", "Apprentice"];

function blockRoleCount(district, roleKey, blockIndex) {
  const blockCount = (district.blocks || districtBlocks[district.name]).length;
  const base = Math.floor(district[roleKey] / blockCount);
  return base + (blockIndex < district[roleKey] % blockCount ? 1 : 0);
}

export function getBlockSummaries(district) {
  return (district.blocks || districtBlocks[district.name]).map((blockName, blockIndex) => {
    const summary = { name: blockName };
    workforceRoles.forEach((role) => { summary[role.key] = blockRoleCount(district, role.key, blockIndex); });
    summary.total = workforceRoles.reduce((sum, role) => sum + summary[role.key], 0);
    summary.operators = summary.dumper + summary.excavator + summary.loader;
    summary.technical = summary.mechanic + summary.electrician + summary.welder;
    return summary;
  });
}

export function getBlockWorkforce(district, blockName) {
  const blockIndex = (district.blocks || districtBlocks[district.name]).indexOf(blockName);
  if (blockIndex < 0) return [];
  const records = [];

  workforceRoles.forEach((role, roleIndex) => {
    const count = blockRoleCount(district, role.key, blockIndex);
    for (let index = 0; index < count; index += 1) {
      const seed = district.name.length * 7 + blockName.length * 3 + roleIndex * 11 + index;
      records.push({
        id: `${district.name}-${blockName}-${role.key}-${index}`,
        name: `${firstNames[seed % firstNames.length]} ${lastNames[(seed * 3) % lastNames.length]}`,
        jobRole: role.label,
        age: 22 + (seed % 35),
        gender: seed % 5 === 0 ? "Female" : "Male",
        employmentStatus: employmentStatuses[seed % employmentStatuses.length],
        roleKey: role.key,
      });
    }
  });

  return records;
}

export function getDistrictWorkforce(district) {
  return (district.blocks || districtBlocks[district.name]).flatMap((blockName) => getBlockWorkforce(district, blockName));
}
