export const orgstructureRoutes = [
    {
        path: '/orgstructure/member-register',
        name: 'MemberRegisterPage',
        component: () => import('@/views/orgstructure/MemberRegisterPage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orgstructure/profile',
        name: 'ProfilePage',
        component: () => import('@/views/orgstructure/ProfilePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orgstructure/dept-manage',
        name: 'DeptManagePage',
        component: () => import('@/views/orgstructure/DeptManagePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orgstructure/job-manage',
        name: 'JobManagePage',
        component: () => import('@/views/orgstructure/JobManagePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orgstructure/rank-manage',
        name: 'RankManagePage',
        component: () => import('@/views/orgstructure/RankManagePage.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/orgstructure/position-manage',
        name: 'PositionManagePage',
        component: () => import('@/views/orgstructure/PositionManagePage.vue'),
        meta: {
            requiresAuth: true
        }
    }
]; 