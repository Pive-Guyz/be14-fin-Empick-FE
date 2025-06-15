export class DeptCreateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
        roleId = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJSON(json) {
        return new DeptCreateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description,
            roleId: json.roleId,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt
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
            updatedAt: this.updatedAt
        };
    }
}

export class DeptUpdateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
    }

    static fromJSON(json) {
        return new DeptUpdateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            isActive: this.isActive,
            description: this.description
        };
    }
}

export class DeptActivateDTO {
    constructor({
        id = null,
        isActive = 1,
    } = {}) {
        this.id = id;
        this.isActive = isActive;
    }

    static fromJSON(json) {
        return new DeptActivateDTO({
            id: json.id,
            isActive: json.isActive
        });
    }

    toJSON() {
        return {
            id: this.id,
            isActive: this.isActive
        };
    }
}
