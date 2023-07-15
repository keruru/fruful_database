'use strict'
class SkillRecordFormat {
    constructor() {
    }

    _attackTable(id, category, target, range, num, hit, type, power) {
        return new Map([
            ["CHARA_ID", id],
            ["CATEGORY", category],
            ["ATK_TARGET", target],
            ["ATK_RANGE", range],
            ["ATK_NUM", num],
            ["ATK_HIT", hit],
            ["ATK_TYPE", type],
            ["ATK_POWER", power]
        ])
    }

    getAttackRecord(id, category, effect) {
        const target = SkillRecordFormat.target.get(effect[1])
        const range = SkillRecordFormat.range.get(effect[2])
        const num = effect[2].match(/\d+/) ? parseInt(effect[2]) : null
        const hit = parseInt(effect[3])
        const type = SkillRecordFormat.type.get(effect[4])
        const power = SkillRecordFormat.power.get(effect[5])

        return this._attackTable(
            id, category, target, range, num, hit, type, power
        )
    }
}

SkillRecordFormat.category = new Map([
    ["通常", 0],
    ["専用", 1],
    ["通常覚醒", 2],
    ["専用覚醒", 3]
])
SkillRecordFormat.season = new Map([
    ["春", 0],
    ["夏", 1],
    ["秋", 2],
    ["冬", 3]
])
SkillRecordFormat.element = new Map([
    ["全", 0],
    ["火", 1],
    ["水", 2],
    ["土", 3],
    ["風", 4],
    ["光", 5],
    ["闇", 6]
])
SkillRecordFormat.target = new Map([
    ["自身", 0],
    ["敵", 1],
    ["味方", 2]
])
SkillRecordFormat.range = new Map([
    ["数体", 0],
    ["全体", 1],
    ["体数分", 2]
])
SkillRecordFormat.type = new Map([
    ["物理", 0],
    ["魔法", 1]
])
SkillRecordFormat.hpmp = new Map([
    ["HP", 0],
    ["MP", 1]
])
SkillRecordFormat.power = new Map([
    ["小", 0],
    ["中", 1],
    ["大", 2],
    ["特大", 3],
    ["超特大", 4],
    ["絶大", 5],
    ["超絶大", 6],
    ["極大", 7],
    ["超極大", 8],
    ["激大", 9],
    ["超激大", 10]
])
SkillRecordFormat.bad = new Map([
    ["毒", 0],
    ["沈黙", 1],
    ["暗闇", 2],
    ["麻痺", 3],
    ["恐慌", 4],
    ["呪い", 5]
])
SkillRecordFormat.effect = new Map([
    ["攻撃力", 0],
    ["防御力", 1],
    ["与ダメージ", 2],
    ["被ダメージ", 3],
    ["クリティカル", 4],
    ["ふるボッコ発動時の与ダメージ", 5],
    ["消費MP", 6]
])
SkillRecordFormat.buff = new Map([
    ["アップ", 0],
    ["ダウン", 1]
])

// const testMap = new Map()
// const record_atk = []
// const record_bad = []
// record_atk.push(new Map([["id",1], ["category",1], ["range",3], ["num", 10], ["type", 1], ["power", 8]]))
// record_atk.push(new Map([["id",1], ["category",2], ["range",4], ["num", 15], ["type", 1], ["power", 9]]))
// for(let i=0;i<2;i++) record_bad.push(new Map([["id",1], ["category",2], ["range",3], ["num", 10], ["type", 2], ["power", 10]]))
// testMap.set("attack", record_atk)
// testMap.set("bad", record_bad)

// const selectRecord = []
// const attackTable = testMap.get("attack")
// attackTable.forEach((record,i,select) => {
//     if(record.get("power") === 8) {
//         selectRecord.push(select[i])
//     }
// });
// console.log(selectRecord)

export default new SkillRecordFormat()