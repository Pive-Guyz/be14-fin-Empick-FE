export default class applicationItemDTO {
    constructor() {
        // 필요한 필드는 나중에 채움
    }

    static fromJSON(json) {
        if (!json) return null
        return new applicationItemDTO()
    }
}
