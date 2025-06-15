import { defineStore } from 'pinia';
import { jobService } from '@/services/orgstructure/jobService';
import { JobDTO, JobCreateDTO, JobUpdateDTO, JobActivateDTO } from '@/dto/orgstructure/jobDTO';

export const useJobStore = defineStore('job', {
    state: () => ({
        jobs: [],
        filteredJobs: [],
        loading: false,
        error: null,
        statistics: null
    }),

    getters: {
        getJobs: (state) => state.jobs || [],
        getFilteredJobs: (state) => state.filteredJobs || [],
        getLoading: (state) => state.loading,
        getError: (state) => state.error,
        getStatistics: (state) => state.statistics
    },

    actions: {
        async getJobList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.getJobList();
                if (response?.data) {
                    this.jobs = Array.isArray(response.data) ? response.data.map(item => JobDTO.fromAPI(item)) : [];
                } else {
                    this.jobs = [];
                }
                this.filteredJobs = [...this.jobs];
                return this.jobs;
            } catch (error) {
                console.error('직무 목록 조회 실패:', error);
                this.jobs = [];
                throw new Error(error.response?.data?.message || '직무 목록을 불러오는데 실패했습니다.');
            } finally {
                this.loading = false;
            }
        },

        async postJobCreate(jobData) {
            this.loading = true;
            this.error = null;
            try {
                const createDTO = new JobCreateDTO(jobData);
                const response = await jobService.createJob(createDTO.toJSON());
                if (response?.data) {
                    const newJob = JobDTO.fromAPI(response.data);
                    this.jobs.push(newJob);
                    this.filteredJobs = [...this.jobs];
                }
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 생성에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async putJobUpdate(jobId, jobData) {
            this.loading = true;
            this.error = null;
            try {
                const updateDTO = new JobUpdateDTO(jobData);
                const response = await jobService.updateJob(jobId, updateDTO.toJSON());
                if (response?.data) {
                    const updatedJob = JobDTO.fromAPI(response.data);
                    const index = this.jobs.findIndex(job => job.id === jobId);
                    if (index !== -1) {
                        this.jobs[index] = updatedJob;
                        this.filteredJobs = [...this.jobs];
                    }
                }
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 수정에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async patchJobActivate(jobId) {
            this.loading = true;
            this.error = null;
            try {
                const job = this.jobs.find(j => j.id === jobId);
                if (!job) throw new Error('직무를 찾을 수 없습니다.');

                const activateDTO = new JobActivateDTO({ id: jobId, isActive: 1 });
                const response = await jobService.activateJob(jobId, activateDTO.toJSON());
                if (response?.data) {
                    const updatedJob = JobDTO.fromAPI(response.data);
                    const index = this.jobs.findIndex(j => j.id === jobId);
                    if (index !== -1) {
                        this.jobs[index] = updatedJob;
                        this.filteredJobs = [...this.jobs];
                    }
                }
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 활성화에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async patchJobDeactivate(jobId) {
            this.loading = true;
            this.error = null;
            try {
                const job = this.jobs.find(j => j.id === jobId);
                if (!job) throw new Error('직무를 찾을 수 없습니다.');

                const activateDTO = new JobActivateDTO({ id: jobId, isActive: 0 });
                const response = await jobService.deactivateJob(jobId, activateDTO.toJSON());
                if (response?.data) {
                    const updatedJob = JobDTO.fromAPI(response.data);
                    const index = this.jobs.findIndex(j => j.id === jobId);
                    if (index !== -1) {
                        this.jobs[index] = updatedJob;
                        this.filteredJobs = [...this.jobs];
                    }
                }
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 비활성화에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async searchJobs(keyword) {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.searchJobs(keyword);
                if (response?.data) {
                    this.filteredJobs = Array.isArray(response.data) ? response.data.map(item => JobDTO.fromAPI(item)) : [];
                } else {
                    this.filteredJobs = [];
                }
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 검색에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        async getJobStatistics() {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.getJobStatistics();
                this.statistics = response?.data || null;
                return response?.data;
            } catch (error) {
                this.error = error.message || '직무 통계 조회에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        }
    }
}); 