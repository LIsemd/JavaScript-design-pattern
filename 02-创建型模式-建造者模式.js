class Builder {
    constructor(params) {
        this.params = params
    }
    buildPart_a(part_a) {
        this.part_a = part_a
        return this
    }
    buildPart_b(part_b) {
        this.part_b = part_b
        return this
    }
}

const car = new Builder('params')
            .buildPart_a('part_a')
            .buildPart_b('part_b')
console.log('car :', car);