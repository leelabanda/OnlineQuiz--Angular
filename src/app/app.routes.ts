import { Routes } from '@angular/router';

import { Login } from './core/feautures/auth/login/login';
import { Register } from './core/feautures/auth/register/register';
import { Forgot } from './core/feautures/auth/forgot/forgot';

import { AdminLayout } from './layout/admin-layout/admin-layout';
import { UserLayout } from './layout/user-layout/user-layout';

import { authgaurdGuard } from './core/authguard/authgaurd-guard';
import { Answerreview } from './core/feautures/student/answerreview/answerreview';

export const routes: Routes = [

  // ================= DEFAULT =================
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // ================= AUTH =================
  {
    path: 'login',
    component: Login
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'forgot-password',
    component: Forgot
  },

  // ================= ADMIN =================
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
      {path:'question/list',
        loadComponent:()=>
          import('./core/feautures/admin/viewquestions/viewquestions')
        .then(m=>m.Viewquestions)
      },

      {
        path: 'profile',
        loadComponent: () =>
          import('./core/feautures/admin/profile/profile')
            .then(m => m.Profile)
      },

      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./core/feautures/admin/profile/edit/edit')
            .then(m => m.EditProfile)
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./core/feautures/admin/users/users')
            .then(m => m.User)
      },

      {
        path: 'users/edit/:id',
        loadComponent: () =>
          import('./core/feautures/admin/users/user-edit/user-edit')
            .then(m => m.UserEdit)
      },

      {
        path: 'quiz/add1',
        loadComponent: () =>
          import('./core/feautures/admin/addquiz/quiz')
            .then(m => m.Quiz)
      },

      {
        path: 'quiz/quizlist',
        loadComponent: () =>
          import('./core/feautures/admin/quizlist/quizlist1')
            .then(m => m.Quizlist1)
      },
      {
  path: 'questions/:id',
  loadComponent: () =>
    import('./core/feautures/admin/viewquestions/viewquestions')
      .then(m => m.Viewquestions)
},

      {
        path: 'quiz/edit/:id',
        loadComponent: () =>
          import('./core/feautures/admin/quizlist/edit/edit')
            .then(m => m.Edit)
      },

      {
        path: 'questions',
        loadComponent: () =>
          import('./core/feautures/admin/addquestions/questions')
            .then(m => m.AddQuestions)
      },
      {
        path: 'results',
        loadComponent: () =>
          import('./core/feautures/admin/results/results')
            .then(m => m.Results)
      },
      {
        path:'question/edit/:id',
        loadComponent:()=> import('./core/feautures/admin/editquestions/questions')
        .then(m=>m.EditQuestions)
          
        },
              {
        path:'report',
        loadComponent:()=> import('./core/feautures/admin/report/report')
        .then(m=>m.Report)
          
        },

    ]
  },

  // ================= STUDENT =================
  {
    path: 'student',
    component: UserLayout,
    canActivate: [authgaurdGuard],
    children: [

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
  path: 'answer-review/:attemptId',
  component: Answerreview
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
        path: 'profile',
        loadComponent: () =>
          import('./core/feautures/student/profile/profile')
            .then(m => m.Profile)
      },

      {
        path: 'edit-profile',
        loadComponent: () =>
          import('./core/feautures/student/profile/edit/edit')
            .then(m => m.SEditProfile)
      }

    ]
  },

  // ================= PAGE NOT FOUND =================
  {
    path: '**',
    redirectTo: 'login'
  }

];