'use strict'
class CharaSkillTable extends Map {
    // Map<String, [Map<String, any>]>
    constructor(array) {
        super()
        const value = null
        if(array !== undefined || Array.isArray(array)) {
            if(array.length === 0) return this
            array.forEach(key => {
                this.set(key, value)
            })
        }
    }

    add(key, record) {
        let arrayObj = []
        if(this.get(key) !== undefined && Array.isArray(this.get(key))) {
            arrayObj = this.get(key)
            arrayObj.push(record)
        } else {
            this.set(key, [record])
        }
        return this
    }

}

export default CharaSkillTable