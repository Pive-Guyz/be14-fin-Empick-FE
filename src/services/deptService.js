import api from '@/apis/apiClient';
import { DeptAPI } from '@/apis/routes/orgstructure';

export const getDetailDeptService = async (id) => {
    try {
        const response = await api.get(DeptAPI.DETAIL(id));
        return response.data;
    } catch (error) {
        console.error('부서 상세 조회 실패:', error);
        throw new Error(error.response?.data?.message || '부서 상세 정보를 불러오는데 실패했습니다.');
    }
};

export const getDeptListService = async () => {
    try {
        const response = await api.get(DeptAPI.LIST);
        return response.data;
    } catch (error) {
        console.error('부서 목록 조회 실패:', error);
        throw new Error(error.response?.data?.message || '부서 목록을 불러오는데 실패했습니다.');
    }
};

export const getDeptChangeHistoryByMemberService = async (memberId) => {
    try {
        const response = await api.get(DeptAPI.CHANGE_HISTORY_BY_MEMBER(memberId));
        return response.data;
    } catch (error) {
        console.error('부서 변경 이력 조회 실패:', error);
        throw new Error(error.response?.data?.message || '부서 변경 이력을 불러오는데 실패했습니다.');
    }
};

export const getDeptMembersByDepartmentService = async (departmentId) => {
    try {
        const response = await api.get(DeptAPI.MEMBERS_BY_DEPARTMENT(departmentId));
        return response.data;
    } catch (error) {
        console.error('부서별 멤버 목록 조회 실패:', error);
        throw new Error(error.response?.data?.message || '부서별 멤버 목록을 불러오는데 실패했습니다.');
    }
};

export const petchCompleteDeptChangeHistoryService = async (historyId) => {
    try {
        const response = await api.patch(DeptAPI.COMPLETE_CHANGE_HISTORY(historyId));
        return response.data;
    } catch (error) {
        console.error('부서 변경 이력 완료 실패:', error);
        throw new Error(error.response?.data?.message || '부서 변경 이력 완료에 실패했습니다.');
    }
};

export const petchDeptActivateService = async (id, dto) => {
    try {
        const response = await api.patch(DeptAPI.ACTIVATE(id), null, {
            params: {
                isActive: dto.isActive
            }
        });
        return response.data;
    } catch (error) {
        console.error('부서 활성화 실패:', error);
        throw new Error(error.response?.data?.message || '부서 활성화에 실패했습니다.');
    }
};

export const postDeptCreateService = async (dto) => {
    try {
        const response = await api.post(DeptAPI.CREATE, dto);
        return response.data;
    } catch (error) {
        console.error('부서 생성 실패:', error);
        throw new Error(error.response?.data?.message || '부서 생성에 실패했습니다.');
    }
};

export const updateDeptService = async (id, dto) => {
    try {
        const response = await api.put(DeptAPI.UPDATE(id), dto);
        return response.data;
    } catch (error) {
        console.error('부서 수정 실패:', error);
        throw new Error(error.response?.data?.message || '부서 수정에 실패했습니다.');
    }
};
