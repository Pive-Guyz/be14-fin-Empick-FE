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
    }
]; 