<template>
    <div class="regist-detail">
        <!-- 상단: 직급명 + 등록 -->
        <div class="top-line">
            <div class="input-group">
                <v-text-field v-model="localRank.code" label="직급 코드" placeholder="직급 코드를 입력하세요" dense outlined
                    hide-details class="code-input" @input="onInput" />
                <v-text-field v-model="localRank.name" label="직급명" placeholder="직급명을 입력하세요" dense outlined hide-details
                    class="name-input" @input="onInput" />
            </div>
            <v-btn color="success" @click="onSave">등록</v-btn>
        </div>

        <!-- 중간: 설명 -->
        <div class="regist-flex">
            <!-- 왼쪽 영역 -->
            <div class="left-area">
                <div class="form-section">
                    <div class="section-label">직급 설명</div>
                    <v-textarea v-model="localRank.description" placeholder="직급 설명을 입력하세요" outlined auto-grow rows="5"
                        hide-details />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['update:modelValue', 'save'])

const localRank = reactive({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
    Object.assign(localRank, val)
})

function onInput() {
    emit('update:modelValue', { ...localRank })
}

function onSave() {
    emit('save', { ...localRank })
}
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

.form-section {
    margin-bottom: 32px;
}

.section-label {
    font-weight: bold;
    margin-bottom: 12px;
    font-size: 1.1rem;
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
</style>
