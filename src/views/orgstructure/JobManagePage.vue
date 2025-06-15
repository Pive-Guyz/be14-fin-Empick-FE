<template>
    <v-container fluid class="pa-8">
        <v-row>
            <v-col cols="12">
                <!-- 타이틀 -->
                <h2 class="text-h5 font-weight-bold mb-4">직무 관리</h2>

                <!-- 검색창 + 버튼 (한 줄로 꽉 차게) -->
                <div class="d-flex justify-space-between align-center mb-6" style="gap: 16px;">
                    <v-text-field v-model="search" placeholder="직무 검색" hide-details dense solo
                        append-inner-icon="mdi-magnify" class="search-box" style="flex: 1;" @keyup.enter="onSearch" />
                    <v-btn color="success" class="add-button" height="40" rounded @click="onAdd">
                        + 추가
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <!-- 신규 등록 아코디언 -->
                <OrgAccordionRegistItem v-if="registMode" v-model="registMode">
                    <OrgAccordionRegistDetail v-model="registJob" @save="onRegistSave" @cancel="onRegistCancel" />
                </OrgAccordionRegistItem>

                <!-- 직무 목록 -->
                <OrgBoxList v-if="!search" v-model="jobStore.jobs" @update:modelValue="onJobListUpdate">
                    <template #item="{ element }">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <JobAccordionDetail :item="element" @update="onJobUpdate" />
                        </OrgAccordionItem>
                    </template>
                </OrgBoxList>

                <div v-else>
                    <div v-for="element in filteredItems" :key="element.id">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <JobAccordionDetail :item="element" @update="onJobUpdate" />
                        </OrgAccordionItem>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import OrgBoxList from '@/components/orgstructure/OrgBoxList.vue';
import OrgAccordionItem from '@/components/orgstructure/OrgAccordionItem.vue';
import JobAccordionDetail from '@/components/orgstructure/JobAccordionDetail.vue';
import OrgAccordionRegistItem from '@/components/orgstructure/OrgAccordionRegistItem.vue';
import OrgAccordionRegistDetail from '@/components/orgstructure/OrgAccordionRegistDetail.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();
const jobStore = useJobStore();
const search = ref('');
const registMode = ref(false);
const registJob = ref({ id: null, name: '', code: '' });

const filteredItems = computed(() => {
    if (!search.value) return jobStore.jobs;
    return jobStore.jobs.filter(item => item.name.includes(search.value));
});

onMounted(async () => {
    try {
        await jobStore.getJobList();
        // 각 직무 항목에 isOpen 속성 추가
        jobStore.jobs.forEach(job => {
            job.isOpen = false;
        });
    } catch (error) {
        console.error('직무 목록 로딩 실패:', error);
        toast.error('직무 목록을 불러오는데 실패했습니다.');
    }
});

function onAdd() {
    registJob.value = { id: null, name: '', code: '' };
    registMode.value = true;
}

async function onRegistSave(newJob) {
    try {
        // 필수 필드 검증
        if (!newJob.name?.trim()) {
            toast.error('직무명을 입력해주세요.');
            return;
        }
        if (!newJob.code?.trim()) {
            toast.error('직무 코드를 입력해주세요.');
            return;
        }

        // 직무 생성 요청
        await jobStore.postJobCreate({
            name: newJob.name.trim(),
            code: newJob.code.trim(),
            description: newJob.description?.trim() || '',
            isActive: 1  // 활성화 상태를 1로 설정
        });

        // 목록 새로고침
        await jobStore.getJobList();

        // 새로 추가된 직무에 isOpen 속성 추가
        jobStore.jobs.forEach(job => {
            if (!('isOpen' in job)) {
                job.isOpen = false;
            }
        });

        // 등록 모드 종료
        registMode.value = false;
        registJob.value = { id: null, name: '', code: '' };
        toast.success('직무가 생성되었습니다.');
    } catch (error) {
        console.error('직무 생성 실패:', error);
        toast.error(error.message || '직무 생성에 실패했습니다.');
    }
}

function onRegistCancel() {
    registMode.value = false;
}

async function onJobUpdate(updatedJob) {
    try {
        await jobStore.updateJob(updatedJob.id, updatedJob);
        await jobStore.getJobList();
        toast.success('직무 정보가 수정되었습니다.');
    } catch (error) {
        console.error('직무 수정 실패:', error);
        toast.error(error.message || '직무 수정에 실패했습니다.');
    }
}

function onJobListUpdate(newList) {
    // 드래그 앤 드롭으로 순서가 변경된 경우 처리
    jobStore.jobs = newList;
}

function onSearch() {
    // 검색은 computed 속성에서 자동으로 처리됨
}
</script>

<style scoped>
.v-container {
    min-height: 100vh;
    background: #fff;
}

.search-input {
    font-size: 1.2rem;
    height: 56px;
}

.v-btn {
    font-size: 1.2rem;
    padding: 12px 36px;
    border-radius: 6px;
    min-width: 120px;
    min-height: 48px;
    box-shadow: 0 2px 8px rgba(91, 140, 77, 0.08);
}
</style>