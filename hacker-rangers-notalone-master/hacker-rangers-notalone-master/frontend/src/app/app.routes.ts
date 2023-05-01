import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MuiDashboardComponent} from "./modules/dashboard/mui-dashboard.component";
import {MuiUserProfileComponent} from "./modules/user-profile/mui-user-profile.component";
import {MuiProjectDetailsComponent} from "./modules/project-details/mui-project-details.component";

export const ROUTES = [
  {
    path: ``,
    redirectTo: `dashboard`
  },
  {
    path: `dashboard`,
    component: MuiDashboardComponent,
    data: {
      title: `Dashboard`,
    },
  },
  {
    path: `project`,
    component: MuiProjectDetailsComponent,
    data: {
      title: `Project details page`,
    }
  },
  {
    path: `profile/:userId`,
    component: MuiUserProfileComponent,
    data: {
      title: `User profile details`,
    },
  },
  {
    path: `**`,
    redirectTo: ``
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES, {
      initialNavigation: `enabledNonBlocking`,
      scrollPositionRestoration: `top`,
      useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
