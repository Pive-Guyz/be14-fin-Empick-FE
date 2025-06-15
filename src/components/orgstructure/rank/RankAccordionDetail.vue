<template>
    <div>
        <div class="accordion-header">
            <div class="input-group">
                <v-text-field v-model="localItem.code" label="직급 코드" placeholder="직급 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localItem.name" label="직급명" placeholder="직급명을 입력하세요" dense outlined hide-details
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
                <div class="desc-label">직급 설명</div>
                <v-textarea v-model="localItem.description" placeholder="직급 설명을 입력하세요" variant="outlined" auto-grow
                    rows="5" hide-details class="desc-box" />
            </div>
        </div>
        <slot />
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRankStore } from '@/stores/rankStore';
import { RankActivateDTO } from '@/dto/orgstructure/rankDTO';
import { useToast } from 'vue-toastification';

const toast = useToast();
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['update']);
const rankStore = useRankStore();
const localItem = ref({ ...props.item });

const getActiveButtonText = computed(() => {
    if (!localItem.value?.isActive) return '비활성화';
    return localItem.value.isActive === 'INACTIVE' ? '활성화' : '비활성화';
});

watch(() => props.item, (newVal) => {
    if (newVal) {
        localItem.value = { ...newVal };
    }
}, { immediate: true });

async function onUpdate() {
    if (!localItem.value?.id) return;

    try {
        await rankStore.updateRank(localItem.value.id, localItem.value);
        emit('update', localItem.value);
        toast.success('직급 정보가 수정되었습니다.');
    } catch (error) {
        console.error('직급 수정 실패:', error);
        toast.error(error.message || '직급 수정에 실패했습니다.');
    }
}

async function onToggleActive() {
    if (!localItem.value?.id) return;

    const isCurrentlyActive = localItem.value.isActive === 'ACTIVE';
    const actionText = isCurrentlyActive ? '비활성화' : '활성화';

    try {
        const dto = new RankActivateDTO({
            id: localItem.value.id,
            isActive: isCurrentlyActive ? 'INACTIVE' : 'ACTIVE'
        });
        await rankStore.patchRankActivate(localItem.value.id, dto);
        localItem.value.isActive = dto.isActive;
        emit('update', localItem.value);
        toast.success(`직급이 ${actionText}되었습니다.`);
    } catch (error) {
        console.error(`직급 ${actionText} 실패:`, error);
        toast.error(error.message || `직급 ${actionText}에 실패했습니다.`);
    }
}

function onInput() {
    if (localItem.value) {
        emit('update', { ...localItem.value });
    }
}
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
</style>
