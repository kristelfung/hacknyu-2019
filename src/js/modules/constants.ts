export const IS_REGISTRATION_OPEN = false;
export const IS_CONFIRMATION_OPEN = false;
export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
export const STOPS_COUNT = 5;

export const ALERT_TIME_INTERVALS = {
  ANIMATION_BUFFER: 100,
  DISPLAY_TIME: 4000,
  ANIMATION_TIME: 2000
};

export const UNRESTRICTED_ROUTES = new Set([
  "/",
  "/about",
  "/login",
  "/register"
]);

export const ASSET_DIR = "img/sponsorship-logos";

interface SponsorFields {
  name: string;
  src: string;
  url: string;
  square: boolean;
}

export const NYU_SPONSOR = {
  name: "New York University",
  src: "/new-york-university/nyu-long.png",
  url: "https://nyu.edu/",
  square: false
};

export const SPONSORS_INFO: Array<SponsorFields> = [
  {
    name: "IBM",
    src: "/ibm/ibm.png",
    url: "https://www.ibm.com/",
    square: false
  },
  {
    name: "JP Morgan Chase & Co",
    src: "/jp-morgan-chase/jpmc.png",
    url: "https://www.jpmorganchase.com/",
    square: false
  },
  {
    name: "Facebook",
    src: "/facebook/facebook.svg",
    url: "https://facebook.com",
    square: false
  },
  {
    name: "Dell",
    src: "/dell/dell.png",
    url: "https://www.dell.com",
    square: true
  },
  {
    name: "Google",
    src: "/google/google.png",
    url: "https://google.com",
    square: false
  },
  {
    name: "Major League Hacking",
    src: "/major-league-hacking/mlh.png",
    url: "https://mlh.io/",
    square: false
  },
  {
    name: "Contrary Capital",
    src: "/contrary-capital/contrary.png",
    url: "https://contrarycap.com/",
    square: false
  },
  {
    name: "VentureOut NYC",
    src: "/ventureout-nyc/venture.png",
    url: "https://www.ventureoutny.com",
    square: false
  },
  {
    name: "Taskade",
    src: "/taskade/taskade.png",
    url: "https://www.taskade.com/",
    square: true
  },
  {
    name: "Hasura",
    src: "/hasura/hasura.png",
    url: "https://www.hasura.io",
    square: true
  },
  {
    name: "Stickermule",
    src: "/stickermule/stickermule.png",
    url: "https://www.stickermule.com/",
    square: false
  },
  {
    name: "Siggis",
    src: "/siggis/siggis.png",
    url: "https://www.siggis.com",
    square: false
  },
  {
    name: "KIND Snacks",
    src: "/kind/kind.png",
    url: "https://www.kindsnacks.com/",
    square: false
  },
  {
    name: "Avitae",
    src: "/avitae/avitae.png",
    url: "https://www.goavitae.com",
    square: false
  },
  {
    name: "Barnana",
    src: "/barnana/barnana.png",
    url: "https://www.barnana.com",
    square: false
  },
  {
    name: "Thats It",
    src: "/thats-it/thats-it.png",
    url: "https://www.thatsitfruit.com",
    square: false
  },
  {
    name: "Monster Energy",
    src: "/monster-energy/monster-energy.png",
    url: "https://www.monsterenergy.com/",
    square: false
  },
  {
    name: "RISE Brewing",
    src: "/rise/rise.png",
    url: "https://risebrewingco.com/",
    square: false
  },
  {
    name: "La Colombe Coffee Roasters",
    src: "/la-colombe/la-colombe.png",
    url: "https://www.lacolombe.com/",
    square: false
  },
  {
    name: "Hotshot Coffee",
    src: "/hotshot/hotshot.png",
    url: "https://drinkhotshot.com/",
    square: true
  },
  {
    name: "Essentia Water",
    src: "/essentia/essentia.png",
    url: "https://essentiawater.com/",
    square: false
  }
];
