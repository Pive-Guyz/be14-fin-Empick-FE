<template>
    <div>
        <div class="accordion-header">
            <v-text-field v-model="item.name" variant="outlined" density="comfortable" class="dept-name-input" />
            <div class="header-actions">
                <v-btn variant="outlined" class="mr-2">수정</v-btn>
                <v-btn variant="outlined">비활성성</v-btn>
            </div>
        </div>
        <div class="accordion-content">
            <div class="desc-area">
                <div class="desc-label">부서 설명</div>
                <div class="desc-box">법무하는 부서임</div>
            </div>
            <div class="member-area">
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
        <slot />
    </div>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true
    }
});
const sampleMembers = [
    { name: '서민중', dept: '인사' },
    { name: '곽우석', dept: '영업' },
    { name: '김석희', dept: '개발' },
    { name: '최혜민', dept: '회계' },
    { name: '이상모', dept: '개발' },
];
</script>

<style scoped>
.accordion-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
}

.dept-name-input {
    flex: 1;
    max-width: 340px;
    margin-right: 24px;
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
    border: 2px solid #bdbdbd;
    border-radius: 8px;
    min-height: 180px;
    padding: 24px 20px;
    font-size: 1.1rem;
    background: #fafafa;
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