<template>
    <v-container fluid class="pa-8">
        <v-row>
            <v-col cols="12">
                <!-- 타이틀 -->
                <h2 class="text-h5 font-weight-bold mb-4">직급 관리</h2>

                <!-- 검색창 + 버튼 (한 줄로 꽉 차게) -->
                <div class="d-flex justify-space-between align-center mb-6" style="gap: 16px;">
                    <v-text-field v-model="search" placeholder="직급 검색" hide-details dense solo
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
                <RankRegistItem v-if="registMode" v-model="registMode">
                    <OrgAccordionRegistDetail v-model="registRank" @save="onRegistSave" @cancel="onRegistCancel" />
                </RankRegistItem>

                <!-- 직급 목록 -->
                <OrgBoxList v-if="!search" v-model="rankStore.ranks" @update:modelValue="onRankListUpdate">
                    <template #item="{ element }">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <RankAccordionDetail :item="element" @update="onRankUpdate" />
                        </OrgAccordionItem>
                    </template>
                </OrgBoxList>

                <div v-else>
                    <div v-for="element in filteredItems" :key="element.id">
                        <OrgAccordionItem :item="element" v-model="element.isOpen">
                            <RankAccordionDetail :item="element" @update="onRankUpdate" />
                        </OrgAccordionItem>
                    </div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRankStore } from '@/stores/rankStore';
import OrgBoxList from '@/components/orgstructure/OrgBoxList.vue';
import OrgAccordionItem from '@/components/orgstructure/OrgAccordionItem.vue';
import RankAccordionDetail from '@/components/orgstructure/rank/RankAccordionDetail.vue';
import RankRegistItem from '@/components/orgstructure/rank/RankRegistItem.vue';
import OrgAccordionRegistDetail from '@/components/orgstructure/rank/RankRegistDetail.vue';

const rankStore = useRankStore();
const search = ref('');
const registMode = ref(false);
const registRank = ref({ id: null, name: '', code: '' });

const filteredItems = computed(() => {
    if (!search.value) return rankStore.ranks;
    return rankStore.ranks.filter(item => item.name.includes(search.value));
});

onMounted(async () => {
    try {
        await rankStore.getRankList();
        // 각 직급 항목에 isOpen 속성 추가
        rankStore.ranks.forEach(rank => {
            rank.isOpen = false;
        });
    } catch (error) {
        console.error('직급 목록 로딩 실패:', error);
    }
});

function onAdd() {
    registRank.value = { id: null, name: '', code: '' };
    registMode.value = true;
}

async function onRegistSave(newRank) {
    try {
        // 필수 필드 검증
        if (!newRank.name?.trim()) {
            alert('직급명을 입력해주세요.');
            return;
        }
        if (!newRank.code?.trim()) {
            alert('직급 코드를 입력해주세요.');
            return;
        }

        // 직급 생성 요청
        await rankStore.createRank({
            name: newRank.name.trim(),
            code: newRank.code.trim(),
            description: newRank.description?.trim() || '',
            isActive: 1  // 활성화 상태를 1로 설정
        });

        // 목록 새로고침
        await rankStore.getRankList();

        // 새로 추가된 직급에 isOpen 속성 추가
        rankStore.ranks.forEach(rank => {
            if (!('isOpen' in rank)) {
                rank.isOpen = false;
            }
        });

        // 등록 모드 종료
        registMode.value = false;
        registRank.value = { id: null, name: '', code: '' };
    } catch (error) {
        console.error('직급 생성 실패:', error);
        alert(error.message || '직급 생성에 실패했습니다.');
    }
}

function onRegistCancel() {
    registMode.value = false;
}

async function onRankUpdate(updatedRank) {
    try {
        await rankStore.updateRank(updatedRank.id, updatedRank);
        await rankStore.getRankList();
    } catch (error) {
        console.error('직급 수정 실패:', error);
    }
}

function onRankListUpdate(newList) {
    // 드래그 앤 드롭으로 순서가 변경된 경우 처리
    rankStore.ranks = newList;
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

.rank-item {
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

.rank-item:hover {
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

.rank-name-input {
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
</style>
