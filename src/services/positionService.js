import api from '@/apis/apiClient';
import { PositionAPI } from '@/apis/routes/position';

export const getDetailPositionService = async (id) => {
    try {
        const response = await api.get(PositionAPI.DETAIL(id));
        return response.data;
    } catch (error) {
        console.error('직책 상세 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직책 상세 정보를 불러오는데 실패했습니다.');
    }
};

export const getPositionListService = async () => {
    try {
        const response = await api.get(PositionAPI.LIST);
        return response.data;
    } catch (error) {
        console.error('직책 목록 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직책 목록을 불러오는데 실패했습니다.');
    }
};

export const getPositionChangeHistoryByMemberService = async (memberId) => {
    try {
        const response = await api.get(PositionAPI.CHANGE_HISTORY_BY_MEMBER(memberId));
        return response.data;
    } catch (error) {
        console.error('직책 변경 이력 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직책 변경 이력을 불러오는데 실패했습니다.');
    }
};

export const getPositionMembersByPositionService = async (positionId) => {
    try {
        const response = await api.get(PositionAPI.MEMBERS_BY_POSITION(positionId));
        return response.data;
    } catch (error) {
        console.error('직책별 멤버 목록 조회 실패:', error);
        throw new Error(error.response?.data?.message || '직책별 멤버 목록을 불러오는데 실패했습니다.');
    }
};

export const petchCompletePositionChangeHistoryService = async (historyId) => {
    try {
        const response = await api.patch(PositionAPI.COMPLETE_CHANGE_HISTORY(historyId));
        return response.data;
    } catch (error) {
        console.error('직책 변경 이력 완료 실패:', error);
        throw new Error(error.response?.data?.message || '직책 변경 이력 완료에 실패했습니다.');
    }
};

export const petchPositionActivateService = async (id, dto) => {
    try {
        const response = await api.patch(PositionAPI.ACTIVATE(id), null, {
            params: {
                isActive: dto.isActive
            }
        });
        return response.data;
    } catch (error) {
        console.error('직책 활성화 실패:', error);
        throw new Error(error.response?.data?.message || '직책 활성화에 실패했습니다.');
    }
};

export const postPositionCreateService = async (dto) => {
    try {
        const response = await api.post(PositionAPI.CREATE, dto);
        return response.data;
    } catch (error) {
        console.error('직책 생성 실패:', error);
        throw new Error(error.response?.data?.message || '직책 생성에 실패했습니다.');
    }
};

export const updatePositionService = async (id, dto) => {
    try {
        const response = await api.put(PositionAPI.UPDATE(id), dto);
        return response.data;
    } catch (error) {
        console.error('직책 수정 실패:', error);
        throw new Error(error.response?.data?.message || '직책 수정에 실패했습니다.');
    }
};