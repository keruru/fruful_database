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

// const test = new CharaSkillTable()
// const addParam = new Map([
//     ["CHARA_ID", 250],
//     ["CATEGORY", 1]
// ])
// const addParam2 = new Map([
//     ["CHARA_ID", 251],
//     ["CATEGORY", 2]
// ])
// test.add("attack", addParam)
// test.add("attack", addParam)
// test.add("attack", addParam)
// test.add("bad", addParam)
// test.add("bad", addParam)
// test.add("bad", addParam)
// test.add("guard", addParam)
// test.add("guard", addParam2)
// test.add("guard", addParam2)
// test.add("guard", addParam2)
// test.add("guard", addParam2)
// test.add("attack", addParam)
// test.add("attack", addParam)
// console.log(test)

// const test2 = new CharaSkillTable(["attack", "bad"])
// const addParam3 = new Map([
//     ["CHARA_ID", 253],
//     ["CATEGORY", 3]
// ])
// test2.add("attack", addParam3)
// test2.add("attack", addParam3)
// test2.add("attack", addParam3)
// test2.add("bad", addParam3)
// test2.add("bad", addParam2)
// test2.add("bad", addParam2)
// test2.add("bad", addParam2)
// test2.add("guard", addParam2)
// test2.add("guard", addParam2)
// test2.add("guard", addParam)
// test2.add("guard", addParam)
// test2.add("guard", addParam)
// test2.add("guard", addParam)
// console.log(test2)
// console.log(test)