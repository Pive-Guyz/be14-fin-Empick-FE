<template>
    <div>
        <div class="accordion-header">
            <div class="input-group">
                <v-text-field v-model="localItem.code" label="부서 코드" placeholder="부서 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localItem.name" label="부서명" placeholder="부서명을 입력하세요" dense outlined hide-details
                    class="name-input" @input="onInput" />
            </div>
            <div class="header-actions">
                <v-btn variant="outlined" class="mr-2" @click="onUpdate">수정</v-btn>
                <v-btn variant="outlined" @click="onDeactivate">비활성화</v-btn>
            </div>
        </div>
        <div class="accordion-content">
            <div class="desc-area">
                <div class="desc-label">부서 설명</div>
                <v-textarea v-model="localItem.description" placeholder="부서 설명을 입력하세요" variant="outlined" auto-grow
                    rows="5" hide-details class="desc-box" />
            </div>
            <div class="member-area">
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
                        <span class="member-dept">{{ member.department?.name || '' }}</span>
                    </div>
                </div>
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useDeptStore } from '@/stores/deptStore';

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update']);

const deptStore = useDeptStore();
const localItem = reactive({ ...props.item });
const deptMembers = ref([]);
const selectedMembers = ref([]);
const loading = ref(false);

watch(() => props.item, (val) => {
    Object.assign(localItem, val);
    if (val.id) {
        loadDeptMembers(val.id);
    }
});

async function loadDeptMembers(deptId) {
    loading.value = true;
    try {
        const response = await deptStore.getDeptMembersByDepartment(deptId);
        deptMembers.value = response || [];
        selectedMembers.value = deptMembers.value.map(member => member.id);
    } catch (error) {
        console.error('부서별 회원 목록 로딩 실패:', error);
        deptMembers.value = [];
    } finally {
        loading.value = false;
    }
}

async function onUpdate() {
    try {
        await deptStore.updateDept(localItem.id, localItem);
        emit('update', localItem);
    } catch (error) {
        console.error('부서 수정 실패:', error);
    }
}

async function onDeactivate() {
    try {
        await deptStore.petchDeptActivate(localItem.id);
        emit('update', localItem);
    } catch (error) {
        console.error('부서 비활성화 실패:', error);
    }
}

async function onAssignMembers() {
    try {
        localItem.members = selectedMembers.value;
        await deptStore.updateDept(localItem.id, localItem);
        emit('update', localItem);
    } catch (error) {
        console.error('사원 배치 실패:', error);
    }
}

onMounted(() => {
    if (localItem.id) {
        loadDeptMembers(localItem.id);
    }
});
</script>

<style scoped>
.accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
}

.input-group {
    display: flex;
    gap: 16px;
    flex: 1;
}

.code-input {
    width: 200px;
}

.name-input {
    flex: 1;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.accordion-content {
    display: flex;
    gap: 40px;
    margin-top: 16px;
}

.desc-area {
    flex: 1;
}

.desc-label {
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 1.1rem;
}

.desc-box {
    background: #fff;
}

.desc-box :deep(.v-field__input) {
    min-height: 180px;
    padding: 16px;
    font-size: 1.1rem;
    line-height: 1.5;
}

.desc-box :deep(.v-field) {
    background: #fff;
}

.desc-box :deep(.v-field__outline) {
    border-color: #bdbdbd;
}

.desc-box :deep(.v-field--focused .v-field__outline) {
    border-color: #5b8c4d;
}

.member-area {
    width: 320px;
    min-width: 220px;
}

.member-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}

.assign-btn {
    min-width: 120px;
    font-size: 1.05rem;
}

.member-list {
    border: 2px solid #bdbdbd;
    border-radius: 8px;
    background: #fafafa;
    max-height: 220px;
    overflow-y: auto;
    padding: 18px 16px;
}

.member-item {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    font-size: 1.08rem;
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