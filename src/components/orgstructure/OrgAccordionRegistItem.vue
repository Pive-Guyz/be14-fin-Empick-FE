<template>
    <v-card class="regist-accordion" outlined>
        <div class="regist-header">
            <span class="regist-title">신규 부서 등록</span>
            <div class="header-actions">
                <slot name="action" />
                <v-btn icon class="close-btn" @click="close">
                    <v-icon>mdi-chevron-up</v-icon>
                </v-btn>
            </div>
        </div>
        <div v-show="modelValue" class="regist-content">
            <div class="regist-flex">
                <slot />
            </div>
        </div>
    </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

function close() {
    emit('update:modelValue', false)
}
</script>

<style scoped>
.regist-accordion {
    margin-bottom: 24px;
    border-radius: 16px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(91, 140, 77, 0.08);
    border: 2px solid #222;
    padding: 0 0 32px 0;
}

.regist-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 24px 32px 0 32px;
}

.regist-title {
    font-size: 1.15rem;
    font-weight: bold;
    color: #222;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}

.close-btn {
    margin-left: 8px;
}

.regist-content {
    padding: 32px;
}

.regist-flex {
    display: flex;
    flex-direction: row;
    gap: 48px;
    align-items: flex-start;
}
</style>