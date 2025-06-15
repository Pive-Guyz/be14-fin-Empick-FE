import api from '@/apis/apiClient';
import { JobAPI } from '@/apis/routes/job';

export const jobService = {
    async getJobList() {
        try {
            const response = await api.get(JobAPI.LIST);
            return response.data;
        } catch (error) {
            console.error('직무 목록 조회 실패:', error);
            throw new Error(error.response?.data?.message || '직무 목록을 불러오는데 실패했습니다.');
        }
    },

    async createJob(jobData) {
        try {
            const response = await api.post(JobAPI.CREATE, jobData);
            return response.data;
        } catch (error) {
            console.error('직무 생성 실패:', error);
            throw new Error(error.response?.data?.message || '직무 생성에 실패했습니다.');
        }
    },

    async updateJob(id, dto) {
        try {
            const response = await api.patch(JobAPI.UPDATE(id), dto);
            return response.data;
        } catch (error) {
            console.error('직무 수정 실패:', error);
            throw new Error(error.response?.data?.message || '직무 수정에 실패했습니다.');
        }
    },

    async activateJob(jobId, dto) {
        try {
            const response = await api.patch(JobAPI.ACTIVATE(jobId), dto);
            return response.data;
        } catch (error) {
            console.error('직무 활성화 실패:', error);
            throw new Error(error.response?.data?.message || '직무 활성화에 실패했습니다.');
        }
    },

    async deactivateJob(jobId, dto) {
        try {
            const response = await api.patch(JobAPI.DEACTIVATE(jobId), dto);
            return response.data;
        } catch (error) {
            console.error('직무 비활성화 실패:', error);
            throw new Error(error.response?.data?.message || '직무 비활성화에 실패했습니다.');
        }
    },

    async searchJobs(keyword) {
        try {
            const response = await api.get(JobAPI.SEARCH(keyword));
            return response.data;
        } catch (error) {
            console.error('직무 검색 실패:', error);
            throw new Error(error.response?.data?.message || '직무 검색에 실패했습니다.');
        }
    },

    async getJobStatistics() {
        try {
            const response = await api.get(JobAPI.STATISTICS);
            return response.data;
        } catch (error) {
            console.error('직무 통계 조회 실패:', error);
            throw new Error(error.response?.data?.message || '직무 통계 조회에 실패했습니다.');
        }
    }
}; 