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
                    <v-combobox v-model="localDept.manager" :items="allMembers" item-text="name" item-value="name"
                        placeholder="사원을 검색합니다" prepend-inner-icon="mdi-account" outlined dense hide-details />
                </div>
            </div>

            <!-- 오른쪽 영역 -->
            <div class="right-area">
                <div class="member-header">
                    <v-btn color="success" class="assign-btn">사원 배치</v-btn>
                </div>
                <div class="member-list">
                    <div class="member-item" v-for="member in sampleMembers" :key="member.name">
                        <v-checkbox-btn :model-value="false" class="mr-2" />
                        <span class="member-name">{{ member.name }}</span>
                        <span class="member-dept">{{ member.dept }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})
const emit = defineEmits(['update:modelValue', 'save', 'cancel'])

const localDept = reactive({ ...props.modelValue })

watch(() => props.modelValue, (val) => {
    Object.assign(localDept, val)
})

function onInput() {
    emit('update:modelValue', { ...localDept })
}
function onSave() {
    emit('save', { ...localDept })
}
function onCancel() {
    emit('cancel')
}

// 예시 데이터
const sampleMembers = [
    { name: '서민종', dept: '인사' },
    { name: '곽우석', dept: '영업' },
    { name: '김석희', dept: '개발' },
    { name: '최혜민', dept: '회계' },
    { name: '이상모', dept: '개발' },
]

const allMembers = sampleMembers.map(m => ({ name: m.name }))
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
