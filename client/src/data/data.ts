import { Solution } from "./DataTypes";

// TODO move this data to a json config file or somewhere that it can get loaded at runtime (HTTP request probably)

export const maxPlayers = 4;

export const global_solutions: Solution[] = [
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
   {
      id: "11",
      name: "Dune Stabilization",
      description: "Dune stabilization refers to the process of managing and preserving sand dunes to prevent erosion and maintain their ecological and environmental functions. Sand dunes are natural features formed by wind-blown sand, and they play a crucial role in coastal protection, habitat preservation, and maintaining coastal stability. Dune stabilization techniques involve implementing measures such as planting vegetation, constructing fences or sand traps, and regulating human activities to minimize sand disturbance. These efforts aim to prevent sand erosion, enhance dune growth, and protect coastal areas from the impacts of storms and sea-level rise. By stabilizing dunes, we can safeguard fragile ecosystems, maintain coastal biodiversity, and provide valuable natural buffers against coastal erosion and flooding.",
      image: "Dune",
      price: 7000,
      default: false,
   },
   {
      id: "12",
      name: "Tree plantation",
      description: "Tree plantation is the process of planting and establishing trees in various locations, including forests, urban areas, and agricultural lands, with the aim of improving the environment and achieving multiple benefits. Tree plantation initiatives are essential for mitigating climate change as trees absorb carbon dioxide from the atmosphere, acting as natural carbon sinks. They also release oxygen, improve air quality, and provide shade, which helps reduce heat island effects and improve the overall well-being of communities. Additionally, tree plantations contribute to biodiversity conservation by providing habitats for numerous plant and animal species. They help prevent soil erosion, conserve water resources, and enhance the beauty of landscapes. Tree plantation efforts play a vital role in sustainable development and are crucial for creating a greener and healthier planet.",
      image: "Green",
      price: 7000,
      default: false,
   },
   {
      id: "13",
      name: "Rehabilitation along riverbanks",
      description: "Rehabilitation along riverbanks refers to the process of restoring and improving the ecological health and functionality of riverbank areas that have been degraded or impacted by human activities or natural processes. Riverbank rehabilitation aims to enhance the stability of riverbanks, prevent erosion, and promote the natural regeneration of vegetation. This involves implementing various techniques such as the construction of bioengineering structures, such as vegetative revetments and erosion control mats, which help stabilize the soil and prevent further erosion. Additionally, native vegetation is often reintroduced along the riverbanks to enhance biodiversity, provide habitat for wildlife, and improve water quality by filtering pollutants. By rehabilitating riverbanks, we can protect valuable ecosystems, preserve the integrity of river systems, and create more resilient and sustainable environments for both humans and wildlife.",
      image: "Tools",
      price: 6000,
      default: false,
   },
   {
      id: "14",
      name: "Riverbank heightening",
      description: "Riverbank heightening is a method employed to mitigate the risks of flooding and erosion by raising the elevation of riverbanks. This process involves adding additional material, such as soil or rock, to the existing riverbank to increase its height and create a more robust barrier against rising water levels. Riverbank heightening aims to prevent floodwaters from spilling over the banks and encroaching on adjacent areas, thereby safeguarding nearby communities and infrastructure. The added height also helps in maintaining the natural course of the river by directing the flow and minimizing erosion. By implementing riverbank heightening measures, we can enhance flood protection, reduce the potential for property damage, and ensure the safety and well-being of those living in flood-prone regions.",
      image: "Rock",
      price: 6000,
      default: false,
   },
   {
      id: "15",
      name: "Open green spaces",
      description: "Open green spaces play a crucial role in flood prevention by serving as natural flood management measures. These areas, such as parks, fields, and wetlands, provide essential space for water to infiltrate the ground, reducing the risk of surface runoff during heavy rainfall. The vegetation in open green spaces acts as a natural sponge, absorbing excess water and slowing down its flow into nearby water bodies, such as rivers and streams. By allowing water to spread out and be naturally absorbed by the soil, open green spaces help to mitigate the intensity and speed of floodwaters. Additionally, these spaces can act as temporary storage areas during flood events, providing a buffer that reduces the pressure on built-up areas. The presence of open green spaces in urban environments not only contributes to flood prevention but also offers recreational benefits, wildlife habitats, and improved overall urban resilience.",
      image: "NBSReactivation",
      price: 7000,
      default: false,
   }
];

export const global_solutions_total_price = global_solutions.reduce((a, b) => a + b.price, 0);

export const getSolution = (solutionID: string | null) => {
   return solutionID === null ? undefined : global_solutions.find((sol) => sol.id === solutionID);
};

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
