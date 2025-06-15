import api from '@/apis/apiClient';

export const jobService = {
    async getJobList() {
        try {
            const response = await api.get('/api/v1/jobs');
            return response.data;
        } catch (error) {
            console.error('직무 목록 조회 실패:', error);
            throw error;
        }
    },

    async createJob(jobData) {
        try {
            const response = await api.post('/api/v1/jobs', jobData);
            return response.data;
        } catch (error) {
            console.error('직무 생성 실패:', error);
            throw error;
        }
    },

    async updateJob(jobId, jobData) {
        try {
            const response = await api.put(`/api/v1/jobs/${jobId}`, jobData);
            return response.data;
        } catch (error) {
            console.error('직무 수정 실패:', error);
            throw error;
        }
    },

    async activateJob(jobId) {
        try {
            const response = await api.patch(`/api/v1/jobs/${jobId}/activate`);
            return response.data;
        } catch (error) {
            console.error('직무 활성화 실패:', error);
            throw error;
        }
    },

    async deactivateJob(jobId) {
        try {
            const response = await api.patch(`/api/v1/jobs/${jobId}/deactivate`);
            return response.data;
        } catch (error) {
            console.error('직무 비활성화 실패:', error);
            throw error;
        }
    },

    async searchJobs(keyword) {
        try {
            const response = await api.get(`/api/v1/jobs/search?keyword=${encodeURIComponent(keyword)}`);
            return response.data;
        } catch (error) {
            console.error('직무 검색 실패:', error);
            throw error;
        }
    },

    async getJobStatistics() {
        try {
            const response = await api.get('/api/v1/jobs/statistics');
            return response.data;
        } catch (error) {
            console.error('직무 통계 조회 실패:', error);
            throw error;
        }
    }
}; 