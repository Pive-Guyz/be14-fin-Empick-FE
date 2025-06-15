export default class JobDTO {
    constructor(data = {}) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.code = data.code || '';
        this.isActive = data.isActive || false;
        this.description = data.description || '';
        this.roleId = data.roleId || null;
        this.createdAt = data.createdAt || null;
        this.updatedAt = data.updatedAt || null;
        this.roleCode = data.roleCode || '';
        this.roleName = data.roleName || '';
        this.memberCount = data.memberCount || 0;
        this.activeMemberCount = data.activeMemberCount || 0;
    }

    // 기본 직무 정보만 포함하는 DTO 생성
    static createBasicJob(data) {
        return new JobDTO({
            id: data.id,
            name: data.name,
            code: data.code,
            isActive: data.isActive,
            description: data.description,
            roleId: data.roleId,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }

    // 직무 생성용 DTO 생성
    static toCreateJob(data) {
        return {
            name: data.name,
            code: data.code,
            description: data.description,
            roleId: data.roleId,
            isActive: data.isActive || true
        };
    }

    // 직무 수정용 DTO 생성
    static toUpdateJob(data) {
        return {
            name: data.name,
            code: data.code,
            description: data.description,
            roleId: data.roleId,
            isActive: data.isActive
        };
    }

    // API 응답을 DTO로 변환
    static fromJSON(data) {
        return new JobDTO(data);
    }

    // 권한 정보가 포함된 DTO 생성
    static createWithRole(data) {
        return new JobDTO({
            ...data,
            roleCode: data.roleCode,
            roleName: data.roleName
        });
    }

    // 사원 수 정보가 포함된 DTO 생성
    static createWithMemberCount(data) {
        return new JobDTO({
            ...data,
            memberCount: data.memberCount,
            activeMemberCount: data.activeMemberCount
        });
    }

    // 모든 정보가 포함된 DTO 생성
    static createFullDetails(data) {
        return new JobDTO({
            ...data,
            roleCode: data.roleCode,
            roleName: data.roleName,
            memberCount: data.memberCount,
            activeMemberCount: data.activeMemberCount
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            isActive: this.isActive,
            description: this.description,
            roleId: this.roleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            roleCode: this.roleCode,
            roleName: this.roleName,
            memberCount: this.memberCount,
            activeMemberCount: this.activeMemberCount
        };
    }

    // DTO를 데이터베이스 형식으로 변환
    toDatabaseFormat() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            is_active: this.isActive,
            description: this.description,
            role_id: this.roleId,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        };
    }
}

export class JobActivateDTO {
    constructor(data = {}) {
        this.id = data.id || null;
        this.isActive = data.isActive || 'INACTIVE';
    }

    toJSON() {
        return {
            id: this.id,
            isActive: this.isActive
        };
    }
}