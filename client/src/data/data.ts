import { Solution } from "./DataTypes";

export const global_app_name = 'GeoDesign Game';
document.title = global_app_name;

export let global_solutions: Solution[] = [
   {
      id: "1",
      name: "Example Solution",
      description: "This is one solution that can be placed.",
      image: "green_ten_installations",
      price: 2000,
      default: true,
   },
   {
      id: "2",
      name: "Example  2",
      description: "Another solution that can be placed.",
      image: "small_scale_installations",
      price: 1000,
      default: true,
   }
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
   if (data.solutions && data.solutions.length > 0) global_solutions = data.solutions;
   if (data.roles && data.roles.length > 0) global_roles = data.roles;
   // recaluclate total price estimate
   global_solutions_total_price = getTotalPrice();
   console.log('Data loaded:', global_solutions, global_roles);
}
