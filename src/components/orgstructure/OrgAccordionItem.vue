<template>
    <div>
        <div class="draggable-row">
            <div class="dept-item" @click="toggleAccordion">
                <span>{{ item.name }}</span>
                <v-icon class="ml-auto">{{ isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </div>
        </div>
        <div v-if="isOpen" class="accordion-detail-card">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    item: {
        type: Object,
        required: true
    },
    modelValue: {
        type: Boolean,
        default: false
    }
});
const emit = defineEmits(['update:modelValue']);

const isOpen = ref(props.modelValue);
function toggleAccordion() {
    isOpen.value = !isOpen.value;
    emit('update:modelValue', isOpen.value);
}
</script>

<style scoped>
.draggable-row {
    display: flex;
    align-items: center;
    margin-bottom: 0;
}

.drag-handle-box {
    display: flex;
    align-items: center;
    margin-right: 16px;
    height: 100%;
}

.drag-handle {
    cursor: grab;
    color: #222;
}

.dept-item {
    flex: 1;
    border: 2px solid #bdbdbd;
    border-radius: 12px 12px 12px 12px;
    overflow: hidden;
    padding: 16px 32px;
    font-size: 1.15rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    background: #fff;
    transition: box-shadow 0.2s, border-color 0.2s;
    cursor: pointer;
    min-height: 56px;
}

.dept-item:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.10);
    border-color: #5b8c4d;
}

.accordion-detail-card {
    border: 2px solid #bdbdbd;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 32px;
    margin-top: 0;
    padding: 32px 32px 40px 32px;
    min-width: 0;
}
</style>