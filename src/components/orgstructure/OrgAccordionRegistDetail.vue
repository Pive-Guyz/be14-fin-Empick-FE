<template>
    <div class="regist-detail">
        <!-- 상단: 부서명 + 등록 -->
        <div class="top-line">
            <v-text-field v-model="localDept.name" label="부서명" placeholder="부서명을 입력하세요" dense outlined hide-details
                @input="onInput" class="flex-grow-1" />
            <v-btn color="success" @click="onSave">등록</v-btn>
        </div>

        <!-- 중간: 설명 + 사원 -->
        <div class="regist-flex">
            <!-- 왼쪽 영역 -->
            <div class="left-area">
                <div class="form-section">
                    <div class="section-label">부서 설명</div>
                    <v-textarea v-model="localDept.description" placeholder="부서 설명을 입력하세요" outlined auto-grow rows="5"
                        hide-details />
                </div>

                <div class="form-section">
                    <div class="section-label">부서장 설정</div>
                    <v-combobox v-model="localDept.manager" :items="members" item-text="name" item-value="id"
                        placeholder="사원을 검색합니다" prepend-inner-icon="mdi-account" outlined dense hide-details
                        :loading="loading" :search-input.sync="searchInput" @update:search-input="onSearch" />
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
import { reactive, watch, ref, onMounted } from 'vue'
import { useMemberStore } from '@/stores/memberStore'
import { useDeptStore } from '@/stores/deptStore'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['update:modelValue', 'save'])

const memberStore = useMemberStore()
const deptStore = useDeptStore()
const localDept = reactive({ ...props.modelValue })
const members = ref([])
const deptMembers = ref([])
const selectedMembers = ref([])
const loading = ref(false)
const searchInput = ref('')

watch(() => props.modelValue, (val) => {
    Object.assign(localDept, val)
    if (val.id) {
        loadDeptMembers(val.id)
    }
})

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

async function loadDeptMembers(deptId) {
    loading.value = true
    try {
        const response = await deptStore.getDeptMembersByDepartment(deptId)
        deptMembers.value = response || []
        // 이미 배치된 사원들은 선택 상태로 표시
        selectedMembers.value = deptMembers.value.map(member => member.id)
    } catch (error) {
        console.error('부서별 회원 목록 로딩 실패:', error)
        deptMembers.value = []
    } finally {
        loading.value = false
    }
}

function onInput() {
    emit('update:modelValue', { ...localDept })
}

function onSearch(value) {
    if (value) {
        loadMembers(value)
    }
}

function onAssignMembers() {
    localDept.members = selectedMembers.value
    onInput()
}

function onSave() {
    emit('save', { ...localDept })
}

onMounted(() => {
    loadMembers()
    if (localDept.id) {
        loadDeptMembers(localDept.id)
    }
})
</script>


<style scoped>
.regist-detail {
    width: 100%;
    padding: 8px 0;
}

.top-line {
    display: flex;
    gap: 16px;
    align-items: center;
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
    margin-bottom: 12px;
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
</style>
