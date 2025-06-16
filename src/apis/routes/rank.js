export const RankAPI = {
    DELETE: (id) => `/api/v1/ranks/${id}`, // DELETE - 직급 삭제
    DETAIL: (id) => `/api/v1/ranks/${id}`, // GET - 직급 단건 조회
    LIST: '/api/v1/ranks', // GET - 전체 직급 조회
    WITHOUT_MEMBERS: '/api/v1/ranks/without-members', // GET - 사원 미보유 직급 조회
    WITH_ROLE: '/api/v1/ranks/with-role', // GET - 권한 정보 포함 직급 조회
    WITH_MEMBERS: '/api/v1/ranks/with-members', // GET - 사원 보유 직급 조회
    WITH_MEMBER_COUNT: '/api/v1/ranks/with-member-count', // GET - 사원 수 포함 직급 조회
    STATUS: (isActive) => `/api/v1/ranks/status/${isActive}`, // GET - 활성 여부별 직급 조회
    SALARY_BAND: '/api/v1/ranks/salary-band', // GET - 급여 밴드 범위별 직급 조회
    ROLE: (roleId) => `/api/v1/ranks/role/${roleId}`, // GET - 권한별 직급 조회
    INACTIVE: '/api/v1/ranks/inactive', // GET - 비활성 직급 조회
    DETAILS: '/api/v1/ranks/details', // GET - 직급 상세 정보 조회
    CODE: (code) => `/api/v1/ranks/code/${code}`, // GET - 직급 코드로 조회
    ACTIVE: '/api/v1/ranks/active', // GET - 활성 직급 조회
    UPDATE_STATUS: (id) => `/api/v1/ranks/${id}/status`, // PATCH - 직급 활성 상태 변경
    DEACTIVATE: (id) => `/api/v1/ranks/${id}/deactivate`, // PATCH - 직급 비활성화
    ACTIVATE: (id) => `/api/v1/ranks/${id}/activate`, // PATCH - 직급 활성화
    CREATE: '/api/v1/ranks', // POST - 직급 생성
    UPDATE: (id) => `/api/v1/ranks/${id}`, // PUT - 직급 수정
}