import { defineStore } from 'pinia';
import { jobService } from '@/services/jobService';
import JobDTO, { JobActivateDTO } from '@/dto/orgstructure/jobDTO';

export const useJobStore = defineStore('job', {
    state: () => ({
        jobs: [],
        search: '',
        filteredJobs: [],
        loading: false,
        error: null,
    }),

    getters: {
        getJobs: (state) => state.jobs || [],
        getFilteredJobs: (state) => state.filteredJobs || [],
        isLoading: (state) => state.loading,
        getError: (state) => state.error,
    },

    actions: {
        // 직무 목록 조회
        async fetchJobList() {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.getJobList();
                // API 응답이 배열이 아닌 경우를 처리
                const jobList = Array.isArray(response) ? response : response.content || [];
                this.jobs = jobList.map(job => JobDTO.fromJSON(job));
                this.filteredJobs = [...this.jobs];
            } catch (error) {
                console.error('직무 목록 조회 실패:', error);
                this.error = error.message || '직무 목록을 불러오는데 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 직무 생성
        async createJob(jobData) {
            this.loading = true;
            this.error = null;
            try {
                // 이름 중복 검사
                const isNameDuplicate = await jobService.checkDuplicateName(jobData.name);
                if (isNameDuplicate) {
                    throw new Error('이미 사용 중인 직무명입니다.');
                }

                // 코드 중복 검사
                const isCodeDuplicate = await jobService.checkDuplicateCode(jobData.code);
                if (isCodeDuplicate) {
                    throw new Error('이미 사용 중인 직무 코드입니다.');
                }

                const response = await jobService.createJob(JobDTO.toCreateJob(jobData));
                this.jobs.push(JobDTO.fromJSON(response));
                this.filteredJobs = [...this.jobs];
                return response;
            } catch (error) {
                console.error('직무 생성 실패:', error);
                this.error = error.message || '직무 생성에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 직무 수정
        async updateJob(id, jobData) {
            this.loading = true;
            this.error = null;
            try {
                // 이름 중복 검사 (자기 자신 제외)
                const isNameDuplicate = await jobService.checkDuplicateName(jobData.name, id);
                if (isNameDuplicate) {
                    throw new Error('이미 사용 중인 직무명입니다.');
                }

                // 코드 중복 검사 (자기 자신 제외)
                const isCodeDuplicate = await jobService.checkDuplicateCode(jobData.code, id);
                if (isCodeDuplicate) {
                    throw new Error('이미 사용 중인 직무 코드입니다.');
                }

                const response = await jobService.updateJob(id, JobDTO.toUpdateJob(jobData));
                const index = this.jobs.findIndex(job => job.id === id);
                if (index !== -1) {
                    this.jobs[index] = JobDTO.fromJSON(response);
                    this.filteredJobs = [...this.jobs];
                }
                return response;
            } catch (error) {
                console.error('직무 수정 실패:', error);
                this.error = error.message || '직무 수정에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 직무 활성/비활성 상태 변경
        async toggleJobActive(id) {
            this.loading = true;
            this.error = null;
            try {
                const job = this.jobs.find(j => j.id === id);
                if (!job) {
                    throw new Error('직무를 찾을 수 없습니다.');
                }

                const activateDTO = new JobActivateDTO({
                    id: id,
                    isActive: job.isActive ? 'INACTIVE' : 'ACTIVE'
                });

                const response = await jobService.toggleJobActive(id, activateDTO.toJSON());
                const index = this.jobs.findIndex(job => job.id === id);
                if (index !== -1) {
                    this.jobs[index] = JobDTO.fromJSON(response);
                    this.filteredJobs = [...this.jobs];
                }
                return response;
            } catch (error) {
                console.error('직무 상태 변경 실패:', error);
                this.error = error.message || '직무 상태 변경에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 직무 검색
        async searchJobs(params) {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.searchJobs(params);
                // API 응답이 배열이 아닌 경우를 처리
                const jobList = Array.isArray(response) ? response : response.content || [];
                this.filteredJobs = jobList.map(job => JobDTO.fromJSON(job));
                return response;
            } catch (error) {
                console.error('직무 검색 실패:', error);
                this.error = error.message || '직무 검색에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 직무 통계 조회
        async fetchJobStatistics() {
            this.loading = true;
            this.error = null;
            try {
                const response = await jobService.getJobStatistics();
                return response;
            } catch (error) {
                console.error('직무 통계 조회 실패:', error);
                this.error = error.message || '직무 통계 조회에 실패했습니다.';
                throw error;
            } finally {
                this.loading = false;
            }
        },

        // 검색어 설정
        setSearch(search) {
            this.search = search;
        },

        // 에러 초기화
        clearError() {
            this.error = null;
        }
    }
}); 