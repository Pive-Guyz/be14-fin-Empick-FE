export class RankCreateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
        salaryBand = null,
        roleId = null,
        createdAt = null,
        updatedAt = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
        this.salaryBand = salaryBand;
        this.roleId = roleId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static fromJSON(json) {
        return new RankCreateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description,
            salaryBand: json.salaryBand,
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
            salaryBand: this.salaryBand,
            roleId: this.roleId,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export class RankUpdateDTO {
    constructor({
        id = null,
        name = '',
        code = '',
        isActive = 1,
        description = '',
        salaryBand = null,
        roleId = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.isActive = isActive;
        this.description = description;
        this.salaryBand = salaryBand;
        this.roleId = roleId;
    }

    static fromJSON(json) {
        return new RankUpdateDTO({
            id: json.id,
            name: json.name,
            code: json.code,
            isActive: json.isActive,
            description: json.description,
            salaryBand: json.salaryBand,
            roleId: json.roleId
        });
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            code: this.code,
            isActive: this.isActive,
            description: this.description,
            salaryBand: this.salaryBand,
            roleId: this.roleId
        };
    }
}

export class RankActivateDTO {
    constructor({
        id = null,
        isActive = 1,
    } = {}) {
        this.id = id;
        this.isActive = isActive;
    }

    static fromJSON(json) {
        return new RankActivateDTO({
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