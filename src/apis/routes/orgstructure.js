export const DeptAPI = {
    // 단일 부서 상세 조회
    DETAIL: (id) => `/api/v1/departments/${id}`,

    // 부서 목록 조회
    LIST: '/api/v1/departments',

    // 특정 멤버의 부서 변경 이력 조회
    CHANGE_HISTORY_BY_MEMBER: (memberId) => `/api/v1/dept-change-history/member/${memberId}`,

    // 부서별 멤버 목록 조회
    MEMBERS_BY_DEPARTMENT: (departmentId) => `/api/v1/departments/${departmentId}/members`,

    // 부서 변경 이력 완료 처리
    COMPLETE_CHANGE_HISTORY: (historyId) => `/api/v1/dept-change-history/history/${historyId}/complete`,

    // 부서 활성화
    ACTIVATE: (id) => `/api/v1/departments/${id}/active`,

    // 부서 변경 이력 생성
    CREATE_CHANGE_HISTORY: '/api/v1/dept-change-history',

    // 부서 생성
    CREATE: '/api/v1/departments',

    // 부서 수정
    UPDATE: (id) => `/api/v1/departments/${id}`,
};