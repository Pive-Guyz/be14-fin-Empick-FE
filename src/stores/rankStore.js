import { defineStore } from 'pinia';
import {
    deleteRankService,
    getDetailRankService,
    getRankListService,
    getRanksWithoutMembersService,
    getRanksWithRoleService,
    getRanksWithMembersService,
    getRanksWithMemberCountService,
    getRanksByStatusService,
    getRanksBySalaryBandService,
    getRanksByRoleService,
    getInactiveRanksService,
    updateRankStatusService,
    deactivateRankService,
    activateRankService,
    createRankService,
    updateRankService
} from '@/services/rankService';

export const useRankStore = defineStore('rank', {
    state: () => ({
        ranks: [],
        filteredRanks: [],
        loading: false,
        error: null,
        statistics: null
    }),
    getters: {
        getRanks: (state) => state.ranks || [],
    },
    actions: {
        async deleteRank(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await deleteRankService(id);
                return response.data;
            } catch (error) {
                console.error('직급 삭제 실패:', error);
                throw new Error(error.response?.data?.message || '직급 삭제에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRankList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRankListService();
                if (response?.data) {
                    this.ranks = Array.isArray(response.data) ? response.data : [];
                } else {
                    this.ranks = [];
                }
                return this.ranks;
            } catch (error) {
                console.error('직급 목록 조회 실패:', error);
                this.ranks = [];
                throw new Error(error.response?.data?.message || '직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getDetailRank(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDetailRankService(id);
                return response.data;
            } catch (error) {
                console.error('직급 상세 조회 실패:', error);
                throw new Error(error.response?.data?.message || '직급 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksWithoutMembers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksWithoutMembersService();
                return response.data;
            } catch (error) {
                console.error('사원 미보유 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '사원 미보유 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksWithRole() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksWithRoleService();
                return response.data;
            } catch (error) {
                console.error('권한 정보 포함 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '권한 정보 포함 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksWithMembers() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksWithMembersService();
                return response.data;
            } catch (error) {
                console.error('사원 보유 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '사원 보유 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksWithMemberCount() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksWithMemberCountService();
                return response.data;
            } catch (error) {
                console.error('사원 수 포함 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '사원 수 포함 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksByStatus(isActive) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksByStatusService(isActive);
                return response.data;
            } catch (error) {
                console.error('활성 여부별 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '활성 여부별 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksBySalaryBand() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksBySalaryBandService();
                return response.data;
            } catch (error) {
                console.error('급여 밴드 범위별 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '급여 밴드 범위별 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getRanksByRole(roleId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getRanksByRoleService(roleId);
                return response.data;
            } catch (error) {
                console.error('권한별 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '권한별 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getInactiveRanks() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getInactiveRanksService();
                return response.data;
            } catch (error) {
                console.error('비활성 직급 조회 실패:', error);
                throw new Error(error.response?.data?.message || '비활성 직급 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async updateRankStatus(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await updateRankStatusService(id, dto);
                return response.data;
            } catch (error) {
                console.error('직급 활성 상태 변경 실패:', error);
                throw new Error(error.response?.data?.message || '직급 활성 상태 변경에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async deactivateRank(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await deactivateRankService(id);
                return response.data;
            } catch (error) {
                console.error('직급 비활성화 실패:', error);
                throw new Error(error.response?.data?.message || '직급 비활성화에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async activateRank(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await activateRankService(id);
                return response.data;
            } catch (error) {
                console.error('직급 활성화 실패:', error);
                throw new Error(error.response?.data?.message || '직급 활성화에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async createRank(dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await createRankService(dto);
                return response.data;
            } catch (error) {
                console.error('직급 생성 실패:', error);
                throw new Error(error.response?.data?.message || '직급 생성에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async updateRank(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await updateRankService(id, dto);
                return response.data;
            } catch (error) {
                console.error('직급 수정 실패:', error);
                throw new Error(error.response?.data?.message || '직급 수정에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        }
    }
});