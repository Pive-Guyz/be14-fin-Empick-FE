import { createRouter, createWebHistory } from 'vue-router';
import { authRoutes } from './auth.routes';
import { employmentRoutes } from './employment.routes';
import { orgstructureRoutes } from './orgstructure.routes';
import { testRoutes } from './test.routes';
import { approvalRoutes } from './approval.routes';
import { attendanceRoutes } from './attendance.routes';
import { authGuard } from './middleware/auth.guard';
import { careerRoutes } from './career.routes';

const allRouteModules = [
    ...authRoutes,
    ...employmentRoutes,
    ...orgstructureRoutes,
    ...approvalRoutes,
    ...attendanceRoutes,
    ...careerRoutes,
    ...(process.env.NODE_ENV === 'development' ? testRoutes : [])
];

// fullMenu.js 에서 사용하기 위해
export const routeMap = Object.fromEntries(
    allRouteModules
        .filter(route => route.name && route.path)
        .map(route => [route.name, route.path])
);

const routes = [
    {
        path: '/',
        name: 'MainPage',
        component: () => import('@/views/MainPage.vue'),
        meta: {
            requiresAuth: true,
            requiredRoles: ['ROLE_USER', 'ROLE_HR_ACCESS']
        }
    },
    ...allRouteModules
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// 인증 미들웨어 적용
router.beforeEach(authGuard);

export default router;