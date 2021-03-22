import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//Guards
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { WelcomeGuard } from "./_core/welcome.guard";
import { LogoutComponent } from './logout/logout';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToRoot = () => redirectLoggedInTo(['events']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule),
    canActivate: [WelcomeGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot }
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot }
  },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'custommers',
    loadChildren: () => import('./custommers/custommers.module').then( m => m.CustommersPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'open-payments',
    loadChildren: () => import('./open-payments/open-payments.module').then( m => m.OpenPaymentsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'reports',
    loadChildren: () => import('./reports/reports.module').then( m => m.ReportsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
