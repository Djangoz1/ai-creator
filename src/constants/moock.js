export let moock_create_mission = {
  target: "mission",
  title: null,
  domain: null,

  abstract: null,
  budget: null,
  company: null,
  features: null,

  description: null,
};

export let moock_create_mission_placeholder = {
  title: "Title of mission",
  domain: "What's domain of mission ?",

  company: "Name of your company",
  abstract: "Hi, for a new <>project name</> we're looking ...",
  budget: "Budget max (en €)",
  features: "Nombre de tâches maximum",

  description: `The mission consists to <>purpose</> with <>techno</>.
I want this features on my project : 
<>
  features lists
</>`,
};

export const MOOCK = {
  mission: {
    form: moock_create_mission,
    placeholders: moock_create_mission_placeholder,
  },
};
