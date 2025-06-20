export const attendanceRoutes = [
    {
        path: '/attendance/all',
        name: 'AttendanceListPage',
        component: () => import('@/views/attendance/AttendanceListPage.vue'),
        meta: {
            requiresAuth: true,
            requiredRoles: ['ROLE_HR_ACCESS'] // 🔒 인사팀 권한 필요
        }
    },
    {
        path: '/attendance/detail/:id',
        name: 'AttendanceDetailPage',
        component: () => import('@/views/attendance/AttendanceDetailPage.vue'),
        meta: {
            requiresAuth: true,
            requiredRoles: ['ROLE_HR_ACCESS'] // 🔒 인사팀 권한 필요
        }
    }
]; 