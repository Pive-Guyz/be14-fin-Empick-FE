<template>
    <div>
        <div class="accordion-header">
            <div class="input-group">
                <v-text-field v-model="localItem.code" label="직무 코드" placeholder="직무 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localItem.name" label="직무명" placeholder="직무명을 입력하세요" dense outlined hide-details
                    class="name-input" @input="onInput" />
            </div>
            <div class="header-actions">
                <v-btn variant="outlined" class="mr-2" @click="onUpdate" :disabled="!localItem?.id">수정</v-btn>
                <v-btn variant="outlined" :color="localItem?.isActive === 'INACTIVE' ? 'success' : 'error'"
                    @click="onToggleActive" :disabled="!localItem?.id">
                    {{ getActiveButtonText }}
                </v-btn>
            </div>
        </div>
        <div class="accordion-content">
            <div class="desc-area">
                <div class="desc-label">직무 설명</div>
                <v-textarea v-model="localItem.description" placeholder="직무 설명을 입력하세요" variant="outlined" auto-grow
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
                    <div v-else-if="jobMembers.length === 0" class="d-flex justify-center align-center pa-4 text-grey">
                        배치된 사원이 없습니다
                    </div>
                    <div v-else class="member-item" v-for="member in jobMembers" :key="member.id">
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
import { ref, watch, onMounted, computed } from 'vue';
import { useJobStore } from '@/stores/jobStore';
import { JobActivateDTO } from '@/dto/orgstructure/jobDTO';
import { useToast } from 'vue-toastification';

const toast = useToast();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update']);
const jobStore = useJobStore();
const localItem = ref({ ...props.item });
const jobMembers = ref([]);
const selectedMembers = ref([]);
const loading = ref(false);

const getActiveButtonText = computed(() => {
    if (!localItem.value?.isActive) return '비활성화';
    return localItem.value.isActive === 'INACTIVE' ? '활성화' : '비활성화';
});

watch(() => props.item, (newVal) => {
    if (newVal) {
        localItem.value = { ...newVal };
    }
}, { immediate: true });

async function loadJobMembers(jobId) {
    loading.value = true;
    try {
        const response = await jobStore.getJobMembersByJob(jobId);
        jobMembers.value = response || [];
        selectedMembers.value = jobMembers.value.map(member => member.id);
    } catch (error) {
        console.error('직무별 회원 목록 로딩 실패:', error);
        jobMembers.value = [];
    } finally {
        loading.value = false;
    }
}

async function onUpdate() {
    if (!localItem.value?.id) return;

    try {
        await jobStore.updateJob(localItem.value.id, localItem.value);
        emit('update', localItem.value);
        toast.success('직무 정보가 수정되었습니다.');
    } catch (error) {
        console.error('직무 수정 실패:', error);
        toast.error(error.message || '직무 수정에 실패했습니다.');
    }
}

async function onToggleActive() {
    if (!localItem.value?.id) return;

    const isCurrentlyActive = localItem.value.isActive === 'ACTIVE';
    const actionText = isCurrentlyActive ? '비활성화' : '활성화';

    try {
        const dto = new JobActivateDTO({
            id: localItem.value.id,
            isActive: isCurrentlyActive ? 'INACTIVE' : 'ACTIVE'
        });
        await jobStore.patchJobActivate(localItem.value.id, dto);
        localItem.value.isActive = dto.isActive;
        emit('update', localItem.value);
        toast.success(`직무가 ${actionText}되었습니다.`);
    } catch (error) {
        console.error(`직무 ${actionText} 실패:`, error);
        toast.error(error.message || `직무 ${actionText}에 실패했습니다.`);
    }
}

async function onAssignMembers() {
    try {
        localItem.value.members = selectedMembers.value;
        await jobStore.updateJob(localItem.value.id, localItem.value);
        emit('update', localItem.value);
        toast.success('사원 배치가 완료되었습니다.');
    } catch (error) {
        console.error('사원 배치 실패:', error);
        toast.error(error.message || '사원 배치에 실패했습니다.');
    }
}

function onInput() {
    if (localItem.value) {
        emit('update', { ...localItem.value });
    }
}

onMounted(() => {
    if (localItem.value.id) {
        loadJobMembers(localItem.value.id);
    }
});
</script>

<style scoped>
.accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    gap: 24px;
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

.header-actions {
    display: flex;
    gap: 12px;
    flex-shrink: 0;
}

.header-actions .v-btn {
    min-width: 100px;
    font-size: 0.9rem;
    text-transform: none;
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