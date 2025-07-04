<template>
    <v-container fluid class="pa-6">
        <v-row align="center" class="mb-6">
            <v-col cols="auto" class="d-flex align-center">
                <v-icon @click="router.back()" class="me-2 cursor-pointer" size="28" color="black">
                    mdi-arrow-left
                </v-icon>
                <h2 class="text-h5 font-weight-bold mb-0">
                    채용 요청서 작성
                </h2>
            </v-col>
        </v-row>

        <v-form ref="formRef" v-model="isValid" lazy-validation>
            <v-row dense>
                <!-- 포지션 -->
                <v-col cols="12">
                    <v-select v-model="form.jobId" :items="store.jobList" item-title="name" item-value="id"
                        label="포지션" />
                </v-col>

                <!-- 부서 -->
                <v-select v-model="form.departmentId" :items="store.departmentList" item-title="name" item-value="id"
                    label="부서" />

                <!-- 모집 인원 -->
                <v-col cols="12">
                    <v-text-field v-model="form.headcount" label="모집 인원" type="number" :rules="[required]" />
                </v-col>

                <!-- 고용 형태 -->
                <v-col cols="12">
                    <v-select v-model="form.employmentType" :items="employmentTypes" label="고용 형태"
                        :rules="[required]" />
                </v-col>

                <!-- 근무 지역 -->
                <v-col cols="12">
                    <v-text-field v-model="form.workLocation" label="근무 지역" :rules="[required]" />
                </v-col>

                <!-- 모집 시작일 -->
                <v-col cols="12">
                    <v-text-field v-model="form.startedAt" label="모집 시작일" type="date" :rules="[required]" />
                </v-col>

                <!-- 모집 마감일 -->
                <v-col cols="12">
                    <v-text-field v-model="form.endedAt" label="모집 마감일" type="date" :rules="[required]" />
                </v-col>

                <!-- 주요 업무 -->
                <v-col cols="12">
                    <v-textarea v-model="form.responsibility" label="주요 업무" rows="3" />
                </v-col>

                <!-- 자격 요건 -->
                <v-col cols="12">
                    <v-textarea v-model="form.qualification" label="자격 요건" rows="3" />
                </v-col>

                <!-- 우대 사항 -->
                <v-col cols="12">
                    <v-textarea v-model="form.preference" label="우대 사항" rows="3" />
                </v-col>
            </v-row>

            <v-row justify="end" class="mt-4">
                <v-btn color="primary" @click="handleSubmit" :loading="store.submitting">
                    제출
                </v-btn>
            </v-row>
        </v-form>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import { useRouter } from 'vue-router';
import { useRecruitmentRequestStore } from '@/stores/recruitmentRequestStore';
import { useAuthStore } from '@/stores/authStore';
import RecruitmentRequestCreateDTO from '@/dto/employment/recruitment/RecruitmentRequestCreateDTO.js';
import { useToast } from 'vue-toastification';

const store = useRecruitmentRequestStore();
const router = useRouter();
const toast = useToast();

// 폼 관련
const isValid = ref(false);
const formRef = ref();
const menu = ref(false);
const formPeriod = ref([]); // range 날짜 저장용
const dateRange = ref('');  // UI 표시용

// 폼 데이터
const form = ref({
    jobId: null,
    departmentId: null,
    headcount: null,
    startedAt: '',
    endedAt: '',
    qualification: '',
    preference: '',
    responsibility: '',
    employmentType: '',
    workLocation: ''
});

onMounted(() => {
    store.loadJobList();
    store.loadDepartmentList();
});

// 더미 옵션
const employmentTypes = ['정규직', '계약직', '인턴'];

// 유효성 검사
const required = v => !!v || '필수 항목입니다';
const requiredRange = v => !!dateRange.value || '필수 항목입니다';

// 날짜 range 선택 시 처리
const setDateRange = (value) => {
    if (value?.length === 2) {
        const [start, end] = value;
        form.value.startedAt = dayjs(start).toISOString();
        form.value.endedAt = dayjs(end).toISOString();
        dateRange.value = `${dayjs(start).format('YYYY-MM-DD')} ~ ${dayjs(end).format('YYYY-MM-DD')}`;
        menu.value = false;
    }
};

// 제출
const handleSubmit = async () => {

    if (formRef.value.validate()) {
        try {
            const dto = new RecruitmentRequestCreateDTO(
                form.value.jobId,
                form.value.departmentId,
                form.value.headcount,
                `${form.value.startedAt}T00:00:00`,
                `${form.value.endedAt}T23:59:59`,
                form.value.qualification,
                form.value.preference,
                form.value.responsibility,
                form.value.employmentType,
                form.value.workLocation
            );
            console.log('📨 최종 제출 DTO:', dto);
            await store.submitRecruitmentRequest(dto);

            toast.success('채용 요청서가 등록되었습니다.');
            router.push('/employment/recruitment-requests');
        } catch (e) {
            toast.error('등록 실패: ' + e.message);
        }
    }
};
</script>