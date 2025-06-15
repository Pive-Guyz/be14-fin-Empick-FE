<template>
    <draggable :list="modelValue" item-key="id" handle=".drag-handle" @update:list="onUpdateList">
        <template #item="{ element, index }">
            <slot name="item" :element="element" :index="index" />
        </template>
    </draggable>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import draggable from 'vuedraggable';

const props = defineProps({
    modelValue: {
        type: Array,
        required: true
    }
});
const emit = defineEmits(['update:modelValue']);

function onUpdateList(newList) {
    emit('update:modelValue', newList);
}
</script>