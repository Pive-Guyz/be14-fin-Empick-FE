import api from '@/apis/apiClient';
import { RankAPI } from '@/apis/routes/rank';

export const deleteRankService = async (id) => {
    try {
        const response = await api.delete(RankAPI.DELETE(id));
        return response.data;
    } catch (error) {
        console.error('직급 삭제 실패:', error);
        throw new Error(error.response?.data?.message || '직급 삭제에 실패했습니다.');
    }
};

export const getDetailRankService = async (id) => {
    try {
        const response = await api.get(RankAPI.DETAIL(id));
        return response.data;
    } catch (error) {
        console.error('직급 상세 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직급 상세 정보를 불러오는데 실패했습니다.');
    }
};

export const getRankListService = async () => {
    try {
        const response = await api.get(RankAPI.LIST);
        return response.data;
    } catch (error) {
        console.error('직급 목록 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksWithoutMembersService = async () => {
    try {
        const response = await api.get(RankAPI.WITHOUT_MEMBERS);
        return response.data;
    } catch (error) {
        console.error('사원 미보유 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '사원 미보유 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksWithRoleService = async () => {
    try {
        const response = await api.get(RankAPI.WITH_ROLE);
        return response.data;
    } catch (error) {
        console.error('권한 정보 포함 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '권한 정보 포함 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksWithMembersService = async () => {
    try {
        const response = await api.get(RankAPI.WITH_MEMBERS);
        return response.data;
    } catch (error) {
        console.error('사원 보유 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '사원 보유 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksWithMemberCountService = async () => {
    try {
        const response = await api.get(RankAPI.WITH_MEMBER_COUNT);
        return response.data;
    } catch (error) {
        console.error('사원 수 포함 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '사원 수 포함 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksByStatusService = async (isActive) => {
    try {
        const response = await api.get(RankAPI.STATUS(isActive));
        return response.data;
    } catch (error) {
        console.error('활성 여부별 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '활성 여부별 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksBySalaryBandService = async () => {
    try {
        const response = await api.get(RankAPI.SALARY_BAND);
        return response.data;
    } catch (error) {
        console.error('급여 밴드 범위별 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '급여 밴드 범위별 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRanksByRoleService = async (roleId) => {
    try {
        const response = await api.get(RankAPI.ROLE(roleId));
        return response.data;
    } catch (error) {
        console.error('권한별 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '권한별 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getInactiveRanksService = async () => {
    try {
        const response = await api.get(RankAPI.INACTIVE);
        return response.data;
    } catch (error) {
        console.error('비활성 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '비활성 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const getRankDetailsService = async () => {
    try {
        const response = await api.get(RankAPI.DETAILS);
        return response.data;
    } catch (error) {
        console.error('직급 상세 정보 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직급 상세 정보를 불러오는데 실패했습니다.');
    }
};

export const getRankByCodeService = async (code) => {
    try {
        const response = await api.get(RankAPI.CODE(code));
        return response.data;
    } catch (error) {
        console.error('직급 코드 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직급 코드로 조회하는데 실패했습니다.');
    }
};

export const getActiveRanksService = async () => {
    try {
        const response = await api.get(RankAPI.ACTIVE);
        return response.data;
    } catch (error) {
        console.error('활성 직급 조회 실패:', error);
        throw new Error(error.response?.data?.message || '활성 직급 목록을 불러오는데 실패했습니다.');
    }
};

export const updateRankStatusService = async (id, dto) => {
    try {
        const response = await api.patch(RankAPI.UPDATE_STATUS(id), dto);
        return response.data;
    } catch (error) {
        console.error('직급 활성 상태 변경 실패:', error);
        throw new Error(error.response?.data?.message || '직급 활성 상태 변경에 실패했습니다.');
    }
};

export const deactivateRankService = async (id) => {
    try {
        const response = await api.patch(RankAPI.DEACTIVATE(id));
        return response.data;
    } catch (error) {
        console.error('직급 비활성화 실패:', error);
        throw new Error(error.response?.data?.message || '직급 비활성화에 실패했습니다.');
    }
};

export const activateRankService = async (id) => {
    try {
        const response = await api.patch(RankAPI.ACTIVATE(id));
        return response.data;
    } catch (error) {
        console.error('직급 활성화 실패:', error);
        throw new Error(error.response?.data?.message || '직급 활성화에 실패했습니다.');
    }
};

export const createRankService = async (dto) => {
    try {
        const response = await api.post(RankAPI.CREATE, dto);
        return response.data;
    } catch (error) {
        console.error('직급 생성 실패:', error);
        throw new Error(error.response?.data?.message || '직급 생성에 실패했습니다.');
    }
};

export const updateRankService = async (id, dto) => {
    try {
        const response = await api.put(RankAPI.UPDATE(id), dto);
        return response.data;
    } catch (error) {
        console.error('직급 수정 실패:', error);
        throw new Error(error.response?.data?.message || '직급 수정에 실패했습니다.');
    }
};