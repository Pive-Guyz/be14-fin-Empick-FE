<template>
    <div class="regist-detail">
        <!-- 상단: 부서명 + 등록 -->
        <div class="top-line">
            <div class="input-group">
                <v-text-field v-model="localJob.code" label="직무 코드" placeholder="직무 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localJob.name" label="직무명" placeholder="직무명을 입력하세요" dense outlined hide-details
                    class="name-input" @input="onInput" />
            </div>
            <v-btn color="success" @click="onSave">등록</v-btn>
        </div>

        <!-- 중간: 설명 + 사원 -->
        <div class="regist-flex">
            <!-- 왼쪽 영역 -->
            <div class="left-area">
                <div class="form-section">
                    <div class="section-label">직무 설명</div>
                    <v-textarea v-model="localJob.description" placeholder="직무 설명을 입력하세요" outlined auto-grow rows="5"
                        hide-details />
                </div>

            </div>

            <!-- 오른쪽 영역 -->
            <div class="right-area">
                <div class="member-header">
                    <v-btn color="success" class="assign-btn" @click="onAssignMembers">사원 배치</v-btn>
                </div>
                <div class="member-list">
                    <div v-if="loading" class="d-flex justify-center align-center pa-4">
                        <v-progress-circular indeterminate color="primary" />
                    </div>
                    <div v-else-if="deptMembers.length === 0" class="d-flex justify-center align-center pa-4 text-grey">
                        배치된 사원이 없습니다
                    </div>
                    <div v-else class="member-item" v-for="member in deptMembers" :key="member.id">
                        <v-checkbox-btn v-model="selectedMembers" :value="member.id" class="mr-2" />
                        <span class="member-name">{{ member.name }}</span>
                        <span class="member-dept">{{ member.department?.name || '부서 없음' }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useJobStore } from '@/stores/jobStore'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['update:modelValue', 'save'])

const memberStore = useMemberStore()
const jobStore = useJobStore()
const localJob = ref({
    id: null,
    code: '',
    name: '',
    description: '',
    isActive: 1
})
const members = ref([])
const jobMembers = ref([])
const selectedMembers = ref([])
const loading = ref(false)

watch(() => props.modelValue, (val) => {
    if (val) {
        localJob.value = { ...val }
    }
}, { immediate: true })

async function loadMembers(search = '') {
    loading.value = true
    try {
        await memberStore.getMemberList({ search })
        members.value = memberStore.members || []
    } catch (error) {
        console.error('회원 목록 로딩 실패:', error)
        members.value = []
    } finally {
        loading.value = false
    }
}

async function loadJobMembers(jobId) {
    loading.value = true
    try {
        const response = await jobStore.getJobMembersByJob(jobId)
        jobMembers.value = response || []
        // 이미 배치된 사원들은 선택 상태로 표시
        selectedMembers.value = jobMembers.value.map(member => member.id)
    } catch (error) {
        console.error('직무별 회원 목록 로딩 실패:', error)
        jobMembers.value = []
    } finally {
        loading.value = false
    }
}

function onInput() {
    emit('update:modelValue', { ...localJob.value })
}

function onAssignMembers() {
    localJob.value.members = selectedMembers.value
    onInput()
}

function onSave() {
    emit('save', { ...localJob.value })
}
</script>


<style scoped>
.regist-detail {
    flex: 1;
}

.top-line {
    display: flex;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 32px;
}

.regist-flex {
    display: flex;
    gap: 48px;
    align-items: flex-start;
}

.left-area {
    flex: 1;
}

.right-area {
    width: 320px;
    min-width: 260px;
}

.form-section {
    margin-bottom: 32px;
}

.section-label {
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 1.1rem;
}

.member-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}

.assign-btn {
    min-width: 120px;
    font-size: 1rem;
}

.member-list {
    border: 1.5px solid #aaa;
    border-radius: 8px;
    background: #fff;
    max-height: 220px;
    overflow-y: auto;
    padding: 18px 16px;
}

.member-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 1.05rem;
}

.member-item:last-child {
    margin-bottom: 0;
}

.member-name {
    margin-right: 16px;
    min-width: 70px;
}

.member-dept {
    color: #888;
    font-size: 1rem;
}

.input-group {
    display: flex;
    gap: 16px;
    flex: 1;
}

.code-input {
    width: 180px;
}

.name-input {
    flex: 1;
    max-width: 400px;
}
</style>
