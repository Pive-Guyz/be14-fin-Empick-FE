export const PositionAPI = {
    // DELETE - 직책 삭제
    DELETE: (id) => `/api/v1/positions/${id}`,

    // DELETE - 직책 권한 해제
    DELETE_ROLE: (id) => `/api/v1/positions/${id}/role`,

    // GET - 모든 직책 조회
    LIST: '/api/v1/positions/query',

    // GET - ID로 직책 조회
    DETAIL: (id) => `/api/v1/positions/query/${id}`,

    // GET - 사원이 없는 직책 조회
    WITHOUT_MEMBERS: '/api/v1/positions/query/without-members',

    // GET - 설명이 없는 직책 조회
    WITHOUT_DESCRIPTION: '/api/v1/positions/query/without-description',

    // GET - 권한 정보 포함 직책 조회
    WITH_ROLE: '/api/v1/positions/query/with-role',

    // GET - 사원이 있는 직책 조회
    WITH_MEMBERS: '/api/v1/positions/query/with-members',

    // GET - 사원 수 정보 포함 직책 조회
    WITH_MEMBER_COUNT: '/api/v1/positions/query/with-member-count',

    // GET - 상세 정보 포함 직책 조회
    WITH_FULL_DETAILS: '/api/v1/positions/query/with-full-details',

    // GET - 설명이 있는 직책 조회
    WITH_DESCRIPTION: '/api/v1/positions/query/with-description',

    // GET - 활성 여부별 직책 조회
    STATUS: (isActive) => `/api/v1/positions/query/status/${isActive}`,

    // GET - 직책명 검색
    SEARCH: '/api/v1/positions/query/search',

    // GET - 특정 권한을 가진 직책 조회
    ROLE: (roleId) => `/api/v1/positions/query/role/${roleId}`,

    // GET - 권한이 연결되지 않은 직책 조회
    NOT_LINKED_WITH_ROLE: '/api/v1/positions/query/not-linked-with-role',

    // GET - 이름으로 직책 조회
    NAME: (name) => `/api/v1/positions/query/name/${name}`,

    // GET - 권한이 연결된 직책 조회
    LINKED_WITH_ROLE: '/api/v1/positions/query/linked-with-role',

    // GET - 비활성 직책 조회
    INACTIVE: '/api/v1/positions/query/inactive',

    // GET - 활성 직책 조회
    ACTIVE: '/api/v1/positions/query/active',

    // PATCH - 직책 활성/비활성 상태 변경
    UPDATE_STATUS: (id) => `/api/v1/positions/${id}/status`,

    // PATCH - 직책 권한 연결
    UPDATE_ROLE: (id) => `/api/v1/positions/${id}/role`,

    // PATCH - 권한별 직책 일괄 해제
    BULK_DISCONNECT_ROLE: '/api/v1/positions/bulk/disconnect-role',

    // PATCH - 권한별 직책 일괄 비활성화
    BULK_DEACTIVATE_BY_ROLE: '/api/v1/positions/bulk/deactivate-by-role',

    // POST - 직책 생성
    CREATE: '/api/v1/positions',

    // PUT - 직책 수정
    UPDATE: (id) => `/api/v1/positions/${id}`
};