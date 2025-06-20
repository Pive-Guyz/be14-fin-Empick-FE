<template>
    <v-container fluid class="d-flex">
        <!-- 왼쪽 달력 -->
        <Calendar @date-selected="onDateSelected" class="w-50 pr-4" />

        <!-- 오른쪽 일정 목록 -->
        <v-sheet class="w-50 pa-4" elevation="2">
            <h3 class="text-h6 font-weight-bold mb-4">{{ selectedDate }} 면접 일정</h3>
            <v-btn color="primary" @click="goToCreateInterview">면접 등록하기</v-btn>

            <v-alert v-if="interviews.length === 0" type="info" border="start" colored-border>
                등록된 면접 일정이 없습니다.
            </v-alert>

            <v-list v-else>
                <v-list-item v-for="(item, index) in interviews" :key="index"
                    @click="goToInterviewDetail(item.applicationId)" class="cursor-pointer">
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-bold">{{ item.applicantName }}</v-list-item-title>
                        <v-list-item-subtitle>{{ formatTime(item.datetime) }}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import Calendar from '@/components/common/Calendar.vue'
import { useInterviewStore } from '@/stores/interviewStore'
import { useApplicationStore } from '@/stores/applicationStore'
import { useApplicantStore } from '@/stores/applicantStore'
import { useRouter } from 'vue-router'
const router = useRouter()

const goToInterviewDetail = (applicationId) => {
    router.push(`/employment/interviews/detail/${applicationId}`)
}

const goToCreateInterview = () => {
    if (!selectedDate.value) {
        alert('날짜를 먼저 선택해주세요!')
        return
    }

    router.push({
        name: 'CreateInterviewPage',
        query: { date: selectedDate.value }  // 예: '2025-06-16'
    })
}

const interviewStore = useInterviewStore()
const applicationStore = useApplicationStore()
const applicantStore = useApplicantStore()

const selectedInterview = ref(null)
const selectedApplication = ref(null)
const selectedApplicant = ref(null)
const selectedDate = ref('')
const interviews = ref([])

const onDateSelected = async (date) => {
    selectedDate.value = date
    await interviewStore.fetchInterviewsByDate(date)
    const rawInterviews = interviewStore.interviewList

    // interviews.value 완전 초기화
    interviews.value.splice(0)

    // 각 인터뷰에 대해 applicantName 추가 (중복 없이 한 번씩만 추가)
    for (const interview of rawInterviews) {
        try {
            const applicationId = interview.applicationId
            await applicationStore.fetchApplicationById(applicationId)
            const application = applicationStore.selectedApplication
            const applicantId = application.applicantId
            await applicantStore.fetchApplicantById(applicantId)
            const applicant = applicantStore.selectedApplicant

            let applicantName = '이름 없음'
            if (applicant) {
                applicantName = applicant.name
            }

            // 중복 방지
            if (!interviews.value.some(i => i.applicationId === interview.applicationId)) {
                interviews.value.push({
                    ...interview,
                    applicantName,
                })
            }
        } catch (err) {
            console.error('Error fetching applicant name:', err)
            if (!interviews.value.some(i => i.applicationId === interview.applicationId)) {
                interviews.value.push({
                    ...interview,
                    applicantName: '오류',
                })
            }
        }
    }
}

const formatTime = (datetimeStr) => {
    if (!datetimeStr) return '시간 없음';
    const date = new Date(datetimeStr);
    if (isNaN(date)) return '시간 없음';

    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');

    return `${hour}시 ${minute}분`;
};
</script>

<style scoped>
.v-sheet {
    max-height: 700px;
    overflow-y: auto;
}
</style>
