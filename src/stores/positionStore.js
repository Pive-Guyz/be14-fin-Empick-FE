import { defineStore } from 'pinia';
import {
    getPositionListService,
    getDetailPositionService,
    getPositionChangeHistoryByMemberService,
    getPositionMembersByPositionService,
    petchCompletePositionChangeHistoryService,
    petchPositionActivateService,
    postPositionCreateService,
    updatePositionService
} from '@/services/positionService';

export const usePositionStore = defineStore('position', {
    state: () => ({
        positions: [],
        search: '',
        filteredPositions: [],
        loading: false,
        error: null,
    }),
    getters: {
        getPositions: (state) => state.positions || [],
    },
    actions: {
        async getPositionList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getPositionListService();
                if (response?.data) {
                    this.positions = Array.isArray(response.data) ? response.data : [];
                } else {
                    this.positions = [];
                }
                return this.positions;
            } catch (error) {
                console.error('직책 목록 조회 실패:', error);
                this.positions = [];
                throw new Error(error.response?.data?.message || '직책 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getDetailPosition(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDetailPositionService(id);
                return response.data;
            } catch (error) {
                console.error('직책 상세 조회 실패:', error);
                throw new Error(error.response?.data?.message || '직책 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getPositionChangeHistoryByMember(memberId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getPositionChangeHistoryByMemberService(memberId);
                return response.data;
            } catch (error) {
                console.error('직책 변경 이력 조회 실패:', error);
                throw new Error(error.response?.data?.message || '직책 변경 이력을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getPositionMembersByPosition(positionId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getPositionMembersByPositionService(positionId);
                return response.data;
            } catch (error) {
                console.error('직책별 멤버 목록 조회 실패:', error);
                throw new Error(error.response?.data?.message || '직책별 멤버 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async petchCompletePositionChangeHistory(historyId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await petchCompletePositionChangeHistoryService(historyId);
                return response.data;
            } catch (error) {
                console.error('직책 변경 이력 완료 실패:', error);
                throw new Error(error.response?.data?.message || '직책 변경 이력 완료에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async petchPositionActivate(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await petchPositionActivateService(id, dto);
                return response.data;
            } catch (error) {
                console.error('직책 활성화 실패:', error);
                throw new Error(error.response?.data?.message || '직책 활성화에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async postPositionCreate(dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await postPositionCreateService(dto);
                return response.data;
            } catch (error) {
                console.error('직책 생성 실패:', error);
                throw new Error(error.response?.data?.message || '직책 생성에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async updatePosition(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await updatePositionService(id, dto);
                return response.data;
            } catch (error) {
                console.error('직책 수정 실패:', error);
                throw new Error(error.response?.data?.message || '직책 수정에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        }
    }
});
