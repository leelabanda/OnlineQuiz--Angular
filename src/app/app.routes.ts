import { Routes } from '@angular/router';

import { Login } from './core/feautures/auth/login/login';
import { Register } from './core/feautures/auth/register/register';
import { Forgot } from './core/feautures/auth/forgot/forgot';
import { AdminLayout } from './layout/admin-layout/admin-layout';
import { UserLayout } from './layout/user-layout/user-layout';
import { authgaurdGuard } from './core/authguard/authgaurd-guard';
import { Studentdashboard } from './core/feautures/student/studentdashboard/studentdashboard';
import path from 'path';

export const routes: Routes = [

  // Default route
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Auth routes
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: Forgot },
//  {path:'student',component:Studentdashboard},

  // ================= ADMIN AREA =================
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authgaurdGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./core/feautures/admin/dashboard/dashboard')
            .then(m => m.Dashboard)
      },
      {
        path:'profile',
        loadComponent:()=> import('./core/feautures/admin/profile/profile')
        .then(m=>m.Profile)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./core/feautures/admin/users/users')
            .then(m => m.User)
      },
      {
        path: 'questions',
        loadComponent: () =>
          import('./core/feautures/admin/questions/questions')
            .then(m => m.Questions)
      },
      {
        path: 'quiz',
        loadComponent: () =>
          import('./core/feautures/admin/quiz/quiz')
            .then(m => m.Quiz)
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./core/feautures/admin/results/results')
            .then(m => m.Results)
      },
        {path:'edit-profile',
    loadComponent:()=>import('./core/feautures/admin/profile/edit/edit')
    .then(m=>m.EditProfile)
  },
      {
  path: 'users/edit/:id',
  loadComponent: () => import('./core/feautures/admin/users/user-edit/user-edit').then(m => m.UserEdit)}
]},
  // ================= USER AREA =================
  {
    path: 'student',
    component: UserLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./core/feautures/student/studentdashboard/studentdashboard')
            .then(m => m.Studentdashboard)
      },
      {
  path: 'quiz',
  loadComponent: () =>
    import('./core/feautures/student/quizlist/quizlist')
      .then(m => m.Quizlist)
},
{
  path: 'startquiz/:title',
  loadComponent: () =>
    import('./core/feautures/student/startquiz/startquiz')
      .then(m => m.Startquiz)
},
{
  path: 'results/:attemptId',
  loadComponent: () =>
    import('./core/feautures/student/result/result')
      .then(m => m.Result)
},
{
  path: 'my-results',
  loadComponent: () =>
    import('./core/feautures/student/my-results/my-results')
      .then(m => m.MyResults)
},
{
  path:'profile',
  loadComponent:()=>
    import('./core/feautures/student/profile/profile')
  .then(m=>m.Profile)   
  },
  {path:'edit-profile',
    loadComponent:()=>import('./core/feautures/student/profile/edit/edit')
    .then(m=>m.EditProfile)
  }
    ]

  },

  // fallback route (optional but recommended)
  {
    path: '**',
    redirectTo: 'login'
  }
];