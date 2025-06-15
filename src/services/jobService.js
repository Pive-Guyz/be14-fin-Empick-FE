import api from '@/apis/apiClient';
import { JobAPI } from '@/apis/routes/job';

export const jobService = {
    // 직무 전체 조회
    async getJobList() {
        try {
            const response = await api.get(JobAPI.LIST);
            return response.data;
        } catch (error) {
            console.error('직무 목록 조회 실패:', error);
            throw error;
        }
    },

    // 직무 단건 조회 (ID)
    async getJobById(id) {
        try {
            const response = await api.get(JobAPI.GET_BY_ID.replace('{id}', id));
            return response.data;
        } catch (error) {
            console.error('직무 상세 조회 실패:', error);
            throw error;
        }
    },

    // 직무 등록
    async createJob(jobData) {
        try {
            const response = await api.post(JobAPI.CREATE, jobData);
            return response.data;
        } catch (error) {
            console.error('직무 등록 실패:', error);
            throw error;
        }
    },

    // 직무 수정
    async updateJob(id, jobData) {
        try {
            const response = await api.patch(JobAPI.UPDATE.replace('{id}', id), jobData);
            return response.data;
        } catch (error) {
            console.error('직무 수정 실패:', error);
            throw error;
        }
    },

    // 직무 활성/비활성 상태 변경
    async toggleJobActive(id) {
        try {
            const response = await api.patch(JobAPI.TOGGLE_ACTIVE.replace('{id}', id));
            return response.data;
        } catch (error) {
            console.error('직무 상태 변경 실패:', error);
            throw error;
        }
    },

    // 이름 중복 검사
    async checkDuplicateName(name, excludeId = null) {
        try {
            const url = excludeId
                ? JobAPI.DUPLICATE_NAME_EXCLUDE.replace('{excludeId}', excludeId)
                : JobAPI.DUPLICATE_NAME;
            const response = await api.get(url, { params: { name } });
            return response.data;
        } catch (error) {
            console.error('이름 중복 검사 실패:', error);
            throw error;
        }
    },

    // 코드 중복 검사
    async checkDuplicateCode(code, excludeId = null) {
        try {
            const url = excludeId
                ? JobAPI.DUPLICATE_CODE_EXCLUDE.replace('{excludeId}', excludeId)
                : JobAPI.DUPLICATE_CODE;
            const response = await api.get(url, { params: { code } });
            return response.data;
        } catch (error) {
            console.error('코드 중복 검사 실패:', error);
            throw error;
        }
    },

    // 직무 검색
    async searchJobs(params) {
        try {
            const response = await api.get(JobAPI.SEARCH, { params });
            return response.data;
        } catch (error) {
            console.error('직무 검색 실패:', error);
            throw error;
        }
    },

    // 직무 통계 조회
    async getJobStatistics() {
        try {
            const response = await api.get(JobAPI.STATISTICS);
            return response.data;
        } catch (error) {
            console.error('직무 통계 조회 실패:', error);
            throw error;
        }
    }
};




