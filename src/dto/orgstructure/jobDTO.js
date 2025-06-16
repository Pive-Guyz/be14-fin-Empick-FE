export class JobDTO {
    constructor(data) {
        this.id = data?.id || null;
        this.code = data?.code || '';
        this.name = data?.name || '';
        this.description = data?.description || '';
        this.isActive = data?.isActive || 0;
        this.createdAt = data?.createdAt || null;
        this.updatedAt = data?.updatedAt || null;
    }

    static fromAPI(data) {
        if (!data) return null;
        return new JobDTO({
            id: data.id,
            code: data.code,
            name: data.name,
            description: data.description,
            isActive: data.isActive,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt
        });
    }

    static fromAPIList(data) {
        if (!data) return [];
        return data.map(item => JobDTO.fromAPI(item));
    }

    toJSON() {
        return {
            id: this.id,
            code: this.code,
            name: this.name,
            description: this.description,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

export class JobCreateDTO {
    constructor(data) {
        this.code = data?.code || '';
        this.name = data?.name || '';
        this.description = data?.description || '';
        this.isActive = data?.isActive || 1;
    }

    toJSON() {
        return {
            code: this.code,
            name: this.name,
            description: this.description,
            isActive: this.isActive
        };
    }
}

export class JobUpdateDTO {
    constructor({
        code = '',
        name = '',
        description = '',
        isActive = 1
    } = {}) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.isActive = isActive;
    }

    static fromAPI(apiData) {
        if (!apiData) return null;
        return new JobUpdateDTO({
            code: apiData.code,
            name: apiData.name,
            description: apiData.description,
            isActive: apiData.isActive
        });
    }

    toJSON() {
        return {
            code: this.code,
            name: this.name,
            description: this.description,
            isActive: this.isActive
        };
    }
}

export class JobActivateDTO {
    constructor(data) {
        this.id = data?.id || null;
        this.isActive = data?.isActive || 0;
    }

    toJSON() {
        return {
            id: this.id,
            isActive: this.isActive
        };
    }
}