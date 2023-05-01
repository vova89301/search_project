import {MuiPages} from "./modules/navigation/types/pages";

export const pages: MuiPages = [
  {
    title: $localize`Dashboard`,
    iconSource: "tuiIconChartBar",
    keywords: `intro, how to, guide, main, главная, начало, инструкция`,
    route: `dashboard`,
  },
  {
    title: $localize`Project`,
    iconSource: "tuiIconPicture",
    keywords: `chrome, safari, ie, edge, firefox`,
    route: `project`
  }
];
