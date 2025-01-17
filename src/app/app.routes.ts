import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'control-flow',
                title: 'Control Flow',
                loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component'),
            },
            {
                path: 'change-detection',
                title: 'Change Detection',
                loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component'),
            },
            {
                path: 'two-way',
                title: 'Two Way',
                loadComponent: () => import('./dashboard/pages/two-way/two-way.component'),
            },
            {
                path: 'defer-options',
                title: 'Defer Options',
                loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component'),
            },
            {
                path: 'defer-views',
                title: 'Defer Views',
                loadComponent: () => import('./dashboard/pages/defer-views/defer-views.component'),
            },
            {
                path: 'user/:id',
                title: 'User View',
                loadComponent: () => import('./dashboard/pages/user/user.component'),
            },
            {
                path: 'user-list',
                title: 'User List',
                loadComponent: () => import('./dashboard/pages/users/users.component'),
            },
            {
                path: 'view-transition-1',
                title: 'View Transition 1',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition1.component'),
            },
            {
                path: 'view-transition-2',
                title: 'View Transition 2',
                loadComponent: () => import('./dashboard/pages/view-transition/view-transition2.component'),
            },
            {
                path: 'inputs-outputs',
                title: 'Inputs Outputs',
                loadComponent: () => import('./dashboard/pages/input-output/input-output.component'),
            },
            {
                path: 'rx-resource',
                title: 'Rx Resource',
                loadComponent: () => import('./dashboard/pages/rx-resource/rx-resource.component'),
            },
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./dashboard/pages/auth/login.component'),
            },
            {
                path: 'register',
                title: 'Register',
                loadComponent: () => import('./dashboard/pages/auth/register.component'),
            },
            {
                path: 'material',
                title: 'Angular Material',
                loadComponent: () => import('./dashboard/pages/material/material.component'),
            },
            {
                path: '',
                // redirectTo: '/dashboard',
                redirectTo: (route) => {
                    // console.log(route);
                    // const authService = inject(AuthService);
                    // if (authService.isLoggedIn) {

                    return '/dashboard/material';
                },
                pathMatch: 'full',
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];
