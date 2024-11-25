import { Solution } from "../DataTypes";

// TODO move this data to a json config file or somewhere that it can get loaded at runtime (HTTP request probably)

export const maxPlayers = 4;

export const global_solutions: Solution[] = [
   { id: "1", name: "Digitally Fabricated Vegetable Garden", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 500 },
   { id: "2", name: "Small Scale Pavillion Structure", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 800 },
   { id: "3", name: "Temporary Structures from Recycled Material", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1000 },
   { id: "4", name: "Reactivation of Open Spaces through NBS", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1200 },
   { id: "5", name: "Projection Mapping on Kinetic Surfaces", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 1800 },
   { id: "6", name: "AR Enriched Human-place Interaction", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", image: "SolutionsPins_ARenriched", price: 2000 }
];

export const global_roles = [
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

// Color List
export const global_icon_colors = ["pink", "red", "orange", "yellow", "green", "blue"];
