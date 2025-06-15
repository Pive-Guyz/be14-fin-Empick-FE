import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getJobtestService } from '@/services/jobtestService'
import JobtestDetailDTO from '@/dto/employment/jobtest/jobtestDetailDTO';

export const useJobtestDetailStore = defineStore('jobtestDetail', () => {
    const jobtest = ref(null);
    const loading = ref(false);
    const error = ref(null);

    const fetchJobtestDetail = async (jobtestId) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await getJobtestService(jobtestId);
            jobtest.value = JobtestDetailDTO.fromJSON(response);
        } catch (e) {
            error.value = e.message || '실무테스트 조회 실패';
            throw e;
        } finally {
            loading.value = false;
        }
    };

    return {
        jobtest,
        loading,
        error,
        fetchJobtestDetail
    };
});
