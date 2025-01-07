import { Solution } from "./DataTypes";

export let global_server_url = 'http://localhost:1337';

export let global_solutions: Solution[] = [
   {
      id: "1",
      name: "Green Tensegrity Installations",
      description: "Its primary function will be the improvement of public space through the installation of a semi-permanent green structure. A secondary function will be educational, as the self-sustaining system will allow the target communities to familiarize themselves with innovative design and nature-based solutions.",
      image: "green_ten_installations",
      price: 7000,
      default: true,
   },
   {
      id: "2",
      name: "Small Scale Pavillion Structure",
      description: "Innovative spatial and structural concepts will be developed to design and construct a small pavilion structure. The pavilion will serve as a landmark and may function as an information hub, an attractor of cultural events or exhibits, etc. It can be combined with other solutions to create an integrative and multifunctional environment, including a green wall, VR/AR, and Projection Mapping.",
      image: "small_scale_installations",
      price: 7000,
      default: true,
   },
   {
      id: "3",
      name: "Urban Mobile Furniture",
      description: "Movable and modular solution designed with a specific joinery system – fabricated with cheap sustainable materials like wood. Depending on how the modules are connected it can take several forms and sizes and address multiple functions such as cultivation space, sport facility, market and leisure infrastructure, scenario for a theatre, food workstation, etc.",
      image: "urban_mobile_furniture",
      price: 6000,
      default: true,
   },
   {
      id: "4",
      name: "Digitally Fabricated Vegetables Garden",
      description: "This is a green modular system made using advanced manufacturing techniques. It has modules for growing plants and hosting living systems. It provides a green infrastructure for gardening activities open to all, and can be replicated to other sites. Collaboration strengthens the local community's sense of belonging and awareness of innovative techniques and sustainable materials.",
      image: "digitally_fabricated_veg_garden",
      price: 6000,
      default: true,
   },
   {
      id: "5",
      name: "Temporary Structures from Recycled Material",
      description: "This is a green modular system made using advanced manufacturing techniques. It has modules for growing plants and hosting living systems. It provides a green infrastructure for gardening activities open to all, and can be replicated to other sites. Collaboration strengthens the local community's sense of belonging and awareness of innovative techniques and sustainable materials.",
      image: "temp_structure_recycled_materials",
      price: 7000,
      default: true,
   },
   {
      id: "6",
      name: "Reactivation of Open Spaces through NBS",
      description: "This is a green modular system made using advanced manufacturing techniques. It has modules for growing plants and hosting living systems. It provides a green infrastructure for gardening activities open to all, and can be replicated to other sites. Collaboration strengthens the local community's sense of belonging and awareness of innovative techniques and sustainable materials.",
      image: "reactivation_through_nbs",
      price: 7000,
      default: true,
   },
   {
      id: "7",
      name: "Virtual Exhibition Archive",
      description: "Combining AR and VR can improve exhibit understanding. A modular space concept is being developed for both physical and virtual environments. Visitors can interact with displayed items in the physical environment while those in the virtual environment require a VR headset and controllers. Alternatively, a mobile AR app will be developed allowing visitors to view physical objects in a virtual background using their camera.",
      image: "virtual_exhibition_archive",
      price: 7000,
      default: true,
   },
   {
      id: "8",
      name: "Projection mapping on Kinetic surfaces",
      description: "The projection theme on the movable tiles of the interactive surface will be inspired by the cultural and historical heritage and the visions of the community.",
      image: "projection_mapping_kinetic",
      price: 7000,
      default: true,
   },
   {
      id: "9",
      name: "AR enriched human-place interaction",
      description: "HERITACT uses augmented reality to improve human-place interaction. It studies different reality enhancement technologies to help citizens with sensory dysfunctions and those of different age and interest groups. By studying interactions between physical spaces and people. The project focuses on specific soundscapes and projection mapping to enhance public shapes, supporting two applications.",
      image: "ar_enriched",
      price: 7000,
      default: true,
   },
];

export let global_solutions_total_price = getTotalPrice();

function getTotalPrice() {
   return global_solutions.reduce((a, b) => a + b.price, 0);
}

export const getSolution = (solutionID: string | null) => {
   return solutionID === null ? undefined : global_solutions.find((sol) => sol.id === solutionID);
};

export let global_roles = [
   'Community Leader',
   'Developer',
   'Elder',
   'Environmentalist',
   'Historian',
   'Non-government Organization',
   'Officer',
   'Politician',
   'Young Person',
   'Other'
];

export async function fetchGlobalData() {
   const response = await fetch('https://raw.githubusercontent.com/Broseten/Geo-Game-Data/refs/heads/main/data.json');
   if (!response.ok) {
      throw new Error('Failed to fetch global data from server');
   }
   const data = await response.json();
   // load data into global variables if they exist
   if (data.serverURL) global_server_url = data.serverURL;
   if (data.solutions && data.solutions.length > 0) global_solutions = data.solutions;
   if (data.roles && data.roles.length > 0) global_roles = data.roles;
   // recaluclate total price estimate
   global_solutions_total_price = getTotalPrice();
   console.log('Data loaded:', global_server_url, global_solutions, global_roles);
}
