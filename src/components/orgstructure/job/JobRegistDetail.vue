<template>
    <div class="regist-detail">
        <!-- 상단: 직무명 + 등록 -->
        <div class="top-line">
            <div class="input-group">
                <v-text-field v-model="localJob.code" label="직무 코드" placeholder="직무 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localJob.name" label="직무명" placeholder="직무명을 입력하세요" dense outlined hide-details
                    class="name-input" @input="onInput" />
            </div>
            <v-btn color="success" @click="onSave">등록</v-btn>
        </div>

        <!-- 중간: 설명 -->
        <div class="regist-flex">
            <div class="left-area">
                <div class="form-section">
                    <div class="section-label">직무 설명</div>
                    <v-textarea v-model="localJob.description" placeholder="직무 설명을 입력하세요" outlined auto-grow rows="5"
                        hide-details />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue', 'save'])
const toast = useToast()

const localJob = ref({
    id: null,
    code: '',
    name: '',
    description: '',
    isActive: 1
})

watch(() => props.modelValue, (val) => {
    if (val) {
        localJob.value = { ...val }
    }
}, { immediate: true })

function onInput() {
    emit('update:modelValue', { ...localJob.value })
}

function onSave() {
    if (!localJob.value.name?.trim()) {
        toast.error('직무명을 입력해주세요.')
        return
    }
    if (!localJob.value.code?.trim()) {
        toast.error('직무 코드를 입력해주세요.')
        return
    }

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

.form-section {
    margin-bottom: 32px;
}

.section-label {
    font-weight: bold;
    margin-bottom: 16px;
    font-size: 1.1rem;
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
