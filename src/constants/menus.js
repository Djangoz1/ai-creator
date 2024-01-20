import { icfy, icfyHOME, icfyIMG, icfyINFO, icsystem } from "icones";

import Link from "next/link";

export const menus_id = (target, id) => {
  let menus = {
    mission: [
      {
        title: "Mission",
        sub: [
          {
            icon: icfy.ux.workspace,
            title: "Overview",
            url: "/mission/" + id + "/",
          },
          {
            icon: icfyINFO,
            title: "Whitepaper",
            url: "/mission/" + id + "/whitepaper",
          },
        ],
      },
      {
        title: "Workspace",
        sub: [
          {
            icon: icfyHOME,
            title: "Desk",
            url: "/mission/" + id + "/desk",
          },

          {
            icon: icfy.msg.casual,
            title: "Notifications",
            url: "/mission/" + id + "/notifications",
          },
          {
            icon: icsystem.escrow,
            title: "Escrow",
            url: "/mission/" + id + "/escrows",
          },
          {
            icon: icsystem.launchpad,
            title: "Launchpad",
            url: "/mission/" + id + "/launchpads",
          },
        ],
      },

      {
        title: "Social Media",
        sub: [
          {
            icon: icfy.msg.post,
            title: "Posts",
            url: "/mission/" + id + "/social",
          },
          {
            icon: icfyIMG,
            title: "Gallery",
            url: "/mission/" + id + "/gallery",
          },
        ],
      },
      {
        title: "Settings",
        sub: [
          {
            icon: icfy.ux.edit,
            title: "Mission",
            url: "/mission/" + id + "/settings",
          },
        ],
      },
    ],
  };
  return menus[target];
};

export let MENUS_ID = (id, owner, cvID) => {
  return {
    mission: [
      {
        url: "//mission/" + id + "/test",
        title: "Overview",
      },
      {
        url: "//mission/" + id + "/features/test",
        title: "Features",
      },
      {
        url: "//mission/" + id + "/agenda/test",
        title: "Agenda",
      },
      {
        url: "//mission/" + id + "/",
        title: "Disputes",
      },
      {
        url: "//mission/" + id + "/pubs/test",
        title: "Pubs",
      },
    ],
  };
};
