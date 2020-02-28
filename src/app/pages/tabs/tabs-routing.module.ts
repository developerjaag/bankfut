import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

import { GoalsGuard, TeamsGuard, RulesGuard, MatchesGuard } from '@guards/index';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'goals',
        canActivate: [GoalsGuard, TeamsGuard, RulesGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../goals/goals.module').then(m => m.GoalsPageModule)
          }
        ]
      },
      {
        path: 'simulator',
        canActivate: [MatchesGuard],
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../simulator/simulator.module').then(m => m.SimulatorPagePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/goals',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/goals',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
