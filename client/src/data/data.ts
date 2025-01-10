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
      roundIcon: true,
   },
   {
      id: "2",
      name: "Example  2",
      description: "Another solution that can be placed.",
      image: "",
      price: 1000,
      default: true,
      roundIcon: false,
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
   'Example Role 1',
   'Example Role 2',
   'Example Role 3',
   'Example Role 4',
];

export async function fetchGlobalData(socketServerURL: string) {
   // get the actual data URL from the server
   const dataURLResponse = await fetchWithTimeout(`${socketServerURL}/data-url`, { timeout: 5000 });
   if (!dataURLResponse.ok) {
      console.error('Failed to fetch data URL from server');
      return;
   }
   // load the data
   const dataURLText = await dataURLResponse.text();
   const { dataURL } = JSON.parse(dataURLText);
   if (!dataURL) {
      console.error('Failed to parse data URL from server');
      return;
   }
   console.log('Data from:', dataURL);
   const dataResponse = await fetchWithTimeout(dataURL, { timeout: 5000 });
   if (!dataResponse.ok) {
      console.error('Failed to fetch global data from server');
      return;
   }
   let data;
   try {
      data = await dataResponse.json();
   } catch (error) {
      console.error('Failed to parse JSON response from ' + dataURL);
      return;
   }
   // load data into global variables if they exist
   if (data.solutions && data.solutions.length > 0) global_solutions = data.solutions;
   if (data.roles && data.roles.length > 0) global_roles = data.roles;
   // recaluclate total price estimate
   global_solutions_total_price = getTotalPrice();
   console.log('Data loaded:', global_solutions, global_roles);
}

async function fetchWithTimeout(resource: string, options: { timeout: number }) {
   const { timeout = 8000 } = options;
   const controller = new AbortController();
   const id = setTimeout(() => controller.abort(), timeout);
   const response = await fetch(resource, {
      ...options,
      signal: controller.signal
   });
   clearTimeout(id);
   return response;
}
