export class PositionCreateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
        roleId = null,
        normalizedName = '',
        normalizedCode = '',
        normalizedDescription = '',
        isActiveEnum = 1,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
        this.roleId = roleId;
        this.normalizedName = normalizedName;
        this.normalizedCode = normalizedCode;
        this.normalizedDescription = normalizedDescription;
        this.isActiveEnum = isActiveEnum;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJSON(json) {
        return new PositionCreateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description,
            roleId: json.roleId,
            normalizedName: json.normalizedName,
            normalizedCode: json.normalizedCode,
            normalizedDescription: json.normalizedDescription,
            isActiveEnum: json.isActiveEnum,
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
            normalizedName: this.normalizedName,
            normalizedCode: this.normalizedCode,
            normalizedDescription: this.normalizedDescription,
            isActiveEnum: this.isActiveEnum,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export class PositionUpdateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
        roleId = null,
        normalizedName = '',
        normalizedCode = '',
        normalizedDescription = '',
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
        this.roleId = roleId;
        this.normalizedName = normalizedName;
        this.normalizedCode = normalizedCode;
        this.normalizedDescription = normalizedDescription;
    }

    static fromJSON(json) {
        return new PositionUpdateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description,
            roleId: json.roleId,
            normalizedName: json.normalizedName,
            normalizedCode: json.normalizedCode,
            normalizedDescription: json.normalizedDescription,
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
            normalizedName: this.normalizedName,
            normalizedCode: this.normalizedCode,
            normalizedDescription: this.normalizedDescription,
        };
    }
}

export class PositionActivateDTO {
    constructor({
        id = null,
        isActive = 'ACTIVE',
    } = {}) {
        this.id = id;
        this.isActive = isActive;
    }

    static fromJSON(json) {
        return new PositionActivateDTO({
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