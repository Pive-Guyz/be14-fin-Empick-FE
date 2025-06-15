export const JobAPI = {
    // GET - 직무 전체 조회
    LIST: '/api/v1/jobs',

    // GET - 직무 단건 조회 (ID)
    GET_BY_ID: '/api/v1/jobs/{id}',

    // GET - 권한 미설정 직무 조회
    WITHOUT_ROLE: '/api/v1/jobs/without-role',

    // GET - 사원 없는 직무 조회
    WITHOUT_MEMBERS: '/api/v1/jobs/without-members',

    // GET - 설명 없는 직무 조회
    WITHOUT_DESCRIPTION: '/api/v1/jobs/without-description',

    // GET - 권한 설정된 직무 조회
    WITH_ROLE: '/api/v1/jobs/with-role',

    // GET - 권한 정보 포함 직무 조회
    WITH_ROLE_INFO: '/api/v1/jobs/with-role-info',

    // GET - 사원 있는 직무 조회
    WITH_MEMBERS: '/api/v1/jobs/with-members',

    // GET - 사원 수 정보 포함 직무 조회
    WITH_MEMBER_COUNT: '/api/v1/jobs/with-member-count',

    // GET - 상세 정보 포함 직무 조회
    WITH_FULL_DETAILS: '/api/v1/jobs/with-full-details',

    // GET - 설명 있는 직무 조회
    WITH_DESCRIPTION: '/api/v1/jobs/with-description',

    // GET - 직무 유효성 검증
    VALIDATE: '/api/v1/jobs/validate/{id}',

    // GET - 사원 수 기준 상위 직무
    TOP_BY_MEMBER_COUNT: '/api/v1/jobs/top-by-member-count',

    // GET - 활성 여부별 직무 조회
    BY_STATUS: '/api/v1/jobs/status/{status}',

    // GET - 직무 통계
    STATISTICS: '/api/v1/jobs/statistics',

    // GET - 통합 검색
    SEARCH: '/api/v1/jobs/search',

    // GET - 이름 검색
    SEARCH_BY_NAME: '/api/v1/jobs/search/name',

    // GET - 코드 검색
    SEARCH_BY_CODE: '/api/v1/jobs/search/code',

    // GET - 권한별 직무 조회
    BY_ROLE: '/api/v1/jobs/role/{roleId}',

    // GET - 최근 수정 직무
    RECENTLY_UPDATED: '/api/v1/jobs/recently-updated',

    // GET - 최근 생성 직무
    RECENTLY_CREATED: '/api/v1/jobs/recently-created',

    // GET - 페이징 조회
    PAGED: '/api/v1/jobs/paged',

    // GET - 직무 단건 조회 (이름)
    GET_BY_NAME: '/api/v1/jobs/name/{name}',

    // GET - 직무별 사원 수 집계
    MEMBER_COUNT_SUMMARY: '/api/v1/jobs/member-count-summary',

    // GET - 비활성 직무 조회
    INACTIVE: '/api/v1/jobs/inactive',

    // GET - 직무 존재 확인 (이름)
    EXISTS_BY_NAME: '/api/v1/jobs/exists/name/{name}',

    // GET - 직무 존재 확인 (ID)
    EXISTS_BY_ID: '/api/v1/jobs/exists/id/{id}',

    // GET - 직무 존재 확인 (코드)
    EXISTS_BY_CODE: '/api/v1/jobs/exists/code/{code}',

    // GET - 이름 중복 검사
    DUPLICATE_NAME: '/api/v1/jobs/duplicate/name',

    // GET - 이름 중복 검사 (수정용)
    DUPLICATE_NAME_EXCLUDE: '/api/v1/jobs/duplicate/name/exclude/{excludeId}',

    // GET - 코드 중복 검사
    DUPLICATE_CODE: '/api/v1/jobs/duplicate/code',

    // GET - 코드 중복 검사 (수정용)
    DUPLICATE_CODE_EXCLUDE: '/api/v1/jobs/duplicate/code/exclude/{excludeId}',

    // GET - 직무 단건 조회 (코드)
    GET_BY_CODE: '/api/v1/jobs/code/{code}',

    // GET - 활성 직무 조회
    ACTIVE: '/api/v1/jobs/active',

    // PATCH - 직무 수정
    UPDATE: '/api/v1/jobs/{id}',

    // PATCH - 직무 활성/비활성 상태 변경
    TOGGLE_ACTIVE: '/api/v1/jobs/{id}/active',

    // POST - 직무 등록
    CREATE: '/api/v1/jobs'
}