<template>
    <div class="modal-overlay">
        <div class="modal-box">
            <button class="close-button" @click="$emit('close')">×</button>
            <p class="modal-message">
                템플릿을 사용하시겠습니까?
            </p>
            <div class="modal-buttons">
                <button class="yes" @click="$emit('confirm')">예</button>
                <button class="no" @click="$emit('no')">아니오</button>
            </div>
        </div>
    </div>
</template>

<script setup>
defineEmits(['confirm', 'no', 'close']);
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal-box {
    background: white;
    border-radius: 10px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    min-width: 320px;
    position: relative;
}

.close-button {
    position: absolute;
    top: 12px;
    right: 16px;
    font-size: 1.4rem;
    background: none;
    border: none;
    color: #aaa;
    cursor: pointer;
}

.close-button:hover {
    color: #000;
}

.modal-message {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
}

.modal-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
}

button.yes {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    font-weight: bold;
}

button.no {
    background: white;
    border: 1px solid #4CAF50;
    color: #4CAF50;
    padding: 0.5rem 1.5rem;
    border-radius: 5px;
    font-weight: bold;
}
</style>
