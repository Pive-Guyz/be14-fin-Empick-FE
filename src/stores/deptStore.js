import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDeptStore = defineStore('dept', () => {
    // 부서 목록 (예시 데이터)
    const depts = ref([
        { id: 1, name: '개발' },
        { id: 2, name: '인사' },
        { id: 3, name: '회계' },
        { id: 4, name: '법무' },
        { id: 5, name: '영업' },
    ]);

    // 검색어
    const search = ref('');

    // 필터링된 부서 목록
    const filteredDepts = computed(() => {
        if (!search.value) return depts.value;
        return depts.value.filter((d) => d.name.includes(search.value));
    });

    // 부서 추가
    function addDept(name) {
        const newId = depts.value.length ? Math.max(...depts.value.map(d => d.id)) + 1 : 1;
        depts.value.push({ id: newId, name });
    }

    return { depts, search, filteredDepts, addDept };
}); 