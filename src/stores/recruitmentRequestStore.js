import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
    fetchRecruitmentRequestList,
    fetchRecruitmentRequestDetail,
    createRecruitmentRequest,
} from '@/services/recruitmentRequestService';

import { fetchJobList } from '@/services/jobService';
import { fetchDepartmentList } from '@/services/departmentService';

export const useRecruitmentRequestStore = defineStore('recruitmentRequest', () => {
    // 채용 요청서 목록
    const recruitmentRequestList = ref([]);
    const loadingRecruitmentRequest = ref(false);
    const recruitmentRequestError = ref(null);

    // 채용 요청서 상세
    const recruitmentRequestDetail = ref(null);
    const loadingDetail = ref(false);
    const detailError = ref(null);

    // 요청서 등록 로딩 상태 및 에러 메시지
    const submitting = ref(false);
    const submitError = ref(null);

    // 직무, 부서
    const jobList = ref([])
    const departmentList = ref([])

    const loadJobList = async () => {
        try {
            const result = await fetchJobList()
            jobList.value = result
        } catch (err) {
            console.error('직무 목록 조회 실패:', err)
        }
    }

    const loadDepartmentList = async () => {
        try {
            const result = await fetchDepartmentList()
            departmentList.value = result
        } catch (err) {
            console.error('부서 목록 조회 실패:', err)
        }
    }

    // 목록 불러오기
    const loadRecruitmentRequestList = async () => {
        loadingRecruitmentRequest.value = true;
        recruitmentRequestError.value = null;

        try {
            const result = await fetchRecruitmentRequestList();
            recruitmentRequestList.value = result;
        } catch (err) {
            recruitmentRequestError.value = err.message;
        } finally {
            loadingRecruitmentRequest.value = false;
        }
    };

    // 상세 정보 불러오기
    const loadRecruitmentRequestDetail = async (id) => {
        loadingDetail.value = true;
        detailError.value = null;

        try {
            const result = await fetchRecruitmentRequestDetail(id);
            recruitmentRequestDetail.value = result;
        } catch (err) {
            detailError.value = err.message;
        } finally {
            loadingDetail.value = false;
        }
    };

    // 요청서 등록
    const submitRecruitmentRequest = async (dto) => {
        submitting.value = true;
        submitError.value = null;

        try {
            const result = await createRecruitmentRequest(dto);
            return result;
        } catch (err) {
            submitError.value = err.message;
            throw err;
        } finally {
            submitting.value = false;
        }
    };

    return {
        // 상태
        recruitmentRequestList,
        loadingRecruitmentRequest,
        recruitmentRequestError,
        recruitmentRequestDetail,
        loadingDetail,
        detailError,
        submitting,
        submitError,
        jobList,
        departmentList,

        // 액션
        loadRecruitmentRequestList,
        loadRecruitmentRequestDetail,
        submitRecruitmentRequest,
        loadJobList,
        loadDepartmentList,
    };
});
