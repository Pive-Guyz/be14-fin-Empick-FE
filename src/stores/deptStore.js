import { defineStore } from 'pinia';
import {
    getDeptListService,
    getDetailDeptService,
    getDeptChangeHistoryByMemberService,
    getDeptMembersByDepartmentService,
    petchCompleteDeptChangeHistoryService,
    petchDeptActivateService,
    postDeptCreateService,
    updateDeptService
} from '@/services/deptService';

export const useDeptStore = defineStore('dept', {
    state: () => ({
        depts: [],
        search: '',
        filteredDepts: [],
        loading: false,
        error: null,
    }),
    getters: {
        getDepts: (state) => state.depts || [],
    },
    actions: {
        async getDeptList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDeptListService();
                if (response?.data) {
                    this.depts = Array.isArray(response.data) ? response.data : [];
                } else {
                    this.depts = [];
                }
                return this.depts;
            } catch (error) {
                console.error('부서 목록 조회 실패:', error);
                this.depts = [];
                throw new Error(error.response?.data?.message || '부서 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getDetailDept(id) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDetailDeptService(id);
                return response.data;
            } catch (error) {
                console.error('부서 상세 조회 실패:', error);
                throw new Error(error.response?.data?.message || '부서 상세 정보를 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getDeptChangeHistoryByMember(memberId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDeptChangeHistoryByMemberService(memberId);
                return response.data;
            } catch (error) {
                console.error('부서 변경 이력 조회 실패:', error);
                throw new Error(error.response?.data?.message || '부서 변경 이력을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async getDeptMembersByDepartment(departmentId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await getDeptMembersByDepartmentService(departmentId);
                return response.data;
            } catch (error) {
                console.error('부서별 멤버 목록 조회 실패:', error);
                throw new Error(error.response?.data?.message || '부서별 멤버 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async petchCompleteDeptChangeHistory(historyId) {
            this.loading = true;
            this.error = null;
            try {
                const response = await petchCompleteDeptChangeHistoryService(historyId);
                return response.data;
            } catch (error) {
                console.error('부서 변경 이력 완료 실패:', error);
                throw new Error(error.response?.data?.message || '부서 변경 이력 완료에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async petchDeptActivate(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await petchDeptActivateService(id, dto);
                return response.data;
            } catch (error) {
                console.error('부서 활성화 실패:', error);
                throw new Error(error.response?.data?.message || '부서 활성화에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async postDeptCreate(dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await postDeptCreateService(dto);
                return response.data;
            } catch (error) {
                console.error('부서 생성 실패:', error);
                throw new Error(error.response?.data?.message || '부서 생성에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },
        async updateDept(id, dto) {
            this.loading = true;
            this.error = null;
            try {
                const response = await updateDeptService(id, dto);
                return response.data;
            } catch (error) {
                console.error('부서 수정 실패:', error);
                throw new Error(error.response?.data?.message || '부서 수정에 실패했습니다.');
            } finally {
                this.loading = false;
            }
        }
    }
});

