import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loginService, logoutService } from '@/services/authService';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/stores/memberStore'
import { useApprovalStore } from '@/stores/approvalStore'
import { useAttendanceStore } from '@/stores/attendanceStore'
import { setLoggingOut } from '@/utils/errorHandler';

import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
    const router = useRouter();
    const memberStore = useMemberStore();

    // 상태 정의
    const isAuthenticated = ref(false);
    const accessToken = ref('');
    const refreshToken = ref('');
    const userInfo = ref(null);
    const error = ref(null);
    const loading = ref(false);

    // 로그인 액션
    const login = async (loginRequest) => {
        console.log('authStore.login 시작:', loginRequest);
        loading.value = true;
        error.value = null;

        try {
            console.log('loginService 호출');
            const response = await loginService(loginRequest);
            console.log('loginService 응답:', response);

            accessToken.value = response.accessToken;
            refreshToken.value = response.refreshToken;
            isAuthenticated.value = true;

            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('auth_tokens', JSON.stringify({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken
            }));

            // 토큰에서 roles 추출
            const decoded = jwtDecode(response.accessToken);
            let roles = decoded.roles || [];
            if (typeof roles === 'string') roles = [roles];

            console.log("roles : " + roles);
            console.log('response.user', response.user);
            console.log('decoded.roles', decoded.roles);
            console.log('userInfo.value (최종)', userInfo.value);

            if (response.user) {
                userInfo.value = {
                    ...response.user,
                    roles
                };
                memberStore.setUser(response.user);
            } else {
                userInfo.value = { roles };
                memberStore.setUser(null);
            }

            // 멤버 정보 및 결재문서 자동 로딩
            const memberStore = useMemberStore();
            await memberStore.getMyInfo();
            const approvalStore = useApprovalStore();
            if (memberStore.form.id) {
                await approvalStore.loadReceivedApprovals(memberStore.form.id);
                await approvalStore.loadRequestedApprovals(memberStore.form.id);
            }

            console.log('로그인 성공, 토큰 저장 완료');

            // 새 사용자 로그인 시 이전 데이터 초기화
            useAttendanceStore().resetAllData();

            // 로그인 성공 후 대시보드로 이동
            router.push('/dashboard');
        } catch (err) {
            console.error('로그인 에러:', err);
            error.value = err?.response?.data?.message || '로그인 실패';
            isAuthenticated.value = false;
            accessToken.value = '';
            refreshToken.value = '';
            userInfo.value = null;
            memberStore.setUser(null);
        } finally {
            loading.value = false;
        }
    };

    // 로그아웃 액션
    const logout = async () => {
        // 로그아웃 시작 플래그 설정
        setLoggingOut(true);

        loading.value = true;
        error.value = null;

        try {
            await logoutService();

            // 상태 초기화
            isAuthenticated.value = false;
            accessToken.value = '';
            refreshToken.value = '';
            userInfo.value = null;

            // 모든 스토어 초기화
            useMemberStore().reset();
            useApprovalStore().reset();
            localStorage.removeItem('auth-store');
            useAttendanceStore().resetAllData();

            // 로그아웃 후 로그인 페이지로 이동
            router.push('/login');
        } catch (err) {
            error.value = err?.response?.data?.message || '로그아웃 중 오류가 발생했습니다.';
        } finally {
            loading.value = false;
            // 로그아웃 완료 플래그 해제
            setLoggingOut(false);
        }
    };

    // 토큰으로 인증 헤더 생성
    const getAuthHeaders = () => {
        return {
            Authorization: `Bearer ${accessToken.value}`,
        };
    };

    // 앱 시작 시 토큰 복원
    const restoreAuth = () => {
        const tokens = localStorage.getItem('auth_tokens');
        if (tokens) {
            const { accessToken: storedAccessToken, refreshToken: storedRefreshToken } = JSON.parse(tokens);
            accessToken.value = storedAccessToken;
            refreshToken.value = storedRefreshToken;
            isAuthenticated.value = true;

            // roles 복원
            const decoded = jwtDecode(storedAccessToken);
            const roles = decoded.roles || [];

            userInfo.value = {
                ...userInfo.value,
                roles
            };
        }
    };

    return {
        isAuthenticated,
        accessToken,
        refreshToken,
        userInfo,
        error,
        loading,
        login,
        logout,
        getAuthHeaders,
        restoreAuth
    };
});
