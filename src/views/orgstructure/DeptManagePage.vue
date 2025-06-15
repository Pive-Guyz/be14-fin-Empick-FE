<template>
    <v-container fluid class="pa-8">
        <v-row>
            <v-col cols="12">
                <!-- 타이틀 -->
                <h2 class="text-h5 font-weight-bold mb-4">부서 관리</h2>

                <!-- 검색창 + 버튼 (한 줄로 꽉 차게) -->
                <div class="d-flex justify-space-between align-center mb-6" style="gap: 16px;">
                    <v-text-field v-model="search" placeholder="부서 검색" hide-details dense solo
                        append-inner-icon="mdi-magnify" class="search-box" style="flex: 1;" @keyup.enter="onSearch" />
                    <v-btn color="success" class="add-button" height="40" rounded @click="onAdd">
                        + 추가
                    </v-btn>
                </div>
            </v-col>
        </v-row>

        <v-row>
            <v-col cols="12">
                <!-- 신규 등록 아코디언 -->
                <OrgAccordionRegistItem v-if="registMode" v-model="registMode">
                    <OrgAccordionRegistDetail v-model="registDept" @save="onRegistSave" @cancel="onRegistCancel" />
                </OrgAccordionRegistItem>

                <!-- 부서 목록 -->
                <OrgBoxList v-if="!search" v-model="deptStore.depts" @update:modelValue="onDeptListUpdate">
                    <template #item="{ element }">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <OrgAccordionDetail :item="element" @update="onDeptUpdate" />
                        </OrgAccordionItem>
                    </template>
                </OrgBoxList>

                <div v-else>
                    <div v-for="element in filteredItems" :key="element.id">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <OrgAccordionDetail :item="element" @update="onDeptUpdate" />
                        </OrgAccordionItem>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import { useDeptStore } from '@/stores/deptStore';
import OrgBoxList from '@/components/orgstructure/OrgBoxList.vue';
import OrgAccordionItem from '@/components/orgstructure/OrgAccordionItem.vue';
import OrgAccordionDetail from '@/components/orgstructure/OrgAccordionDetail.vue';
import OrgAccordionRegistItem from '@/components/orgstructure/OrgAccordionRegistItem.vue';
import OrgAccordionRegistDetail from '@/components/orgstructure/OrgAccordionRegistDetail.vue';

const deptStore = useDeptStore();
const search = ref('');
const registMode = ref(false);
const registDept = ref({ id: null, name: '' });

const filteredItems = computed(() => {
    if (!search.value) return deptStore.depts;
    return deptStore.depts.filter(item => item.name.includes(search.value));
});

onMounted(async () => {
    try {
        await deptStore.getDeptList();
        // 각 부서 항목에 isOpen 속성 추가
        deptStore.depts.forEach(dept => {
            dept.isOpen = false;
        });
    } catch (error) {
        console.error('부서 목록 로딩 실패:', error);
    }
});

function onAdd() {
    registDept.value = { id: null, name: '' };
    registMode.value = true;
}

async function onRegistSave(newDept) {
    try {
        await deptStore.postDeptCreate(newDept);
        await deptStore.getDeptList();
        // 새로 추가된 부서에 isOpen 속성 추가
        deptStore.depts.forEach(dept => {
            if (!('isOpen' in dept)) {
                dept.isOpen = false;
            }
        });
        registMode.value = false;
    } catch (error) {
        console.error('부서 생성 실패:', error);
    }
}

function onRegistCancel() {
    registMode.value = false;
}

async function onDeptUpdate(updatedDept) {
    try {
        await deptStore.updateDept(updatedDept.id, updatedDept);
        await deptStore.getDeptList();
    } catch (error) {
        console.error('부서 수정 실패:', error);
    }
}

function onDeptListUpdate(newList) {
    // 드래그 앤 드롭으로 순서가 변경된 경우 처리
    deptStore.depts = newList;
}

function onSearch() {
    // 검색은 computed 속성에서 자동으로 처리됨
}

</script>

<style scoped>
.v-container {
    min-height: 100vh;
    background: #fff;
}

.draggable-row {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
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

.search-input {
    font-size: 1.2rem;
    height: 56px;
}

.v-btn {
    font-size: 1.2rem;
    padding: 12px 36px;
    border-radius: 6px;
    min-width: 120px;
    min-height: 48px;
    box-shadow: 0 2px 8px rgba(91, 140, 77, 0.08);
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
    margin-left: 44px;
    margin-top: 0;
    padding: 32px 32px 40px 32px;
    min-width: 0;
}

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

.close-icon {
    font-size: 2rem;
    margin-left: 12px;
    cursor: pointer;
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

.top-bar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 24px;
}

.ml-4 {
    margin-left: 16px;
}
</style>