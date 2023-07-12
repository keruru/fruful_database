'use strict'
const skillTableTemplate = (function() {
    const _category = new Map([
        ["通常", 0],
        ["専用", 1],
        ["通常覚醒", 2],
        ["専用覚醒", 3]
    ])
    const _season = new Map([
        ["春", 0],
        ["夏", 1],
        ["秋", 2],
        ["冬", 3]
    ])
    const _element = new Map([
        ["全", 0],
        ["火", 1],
        ["水", 2],
        ["土", 3],
        ["風", 4],
        ["光", 5],
        ["闇", 6]
    ])
    const _range = new Map([
        ["自身", 0],
        ["敵", 1],
        ["味方", 2]
    ])
    const _target = new Map([
        ["数体", 0],
        ["全体", 1],
        ["体数分", 2]
    ])
    const _type = new Map([
        ["物理", 0],
        ["魔法", 1]
    ])
    const _hpmp = new Map([
        ["HP", 0],
        ["MP", 1]
    ])
    const _power = new Map([
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
    const _bad = new Map([
        ["毒", 0],
        ["沈黙", 1],
        ["暗闇", 2],
        ["麻痺", 3],
        ["恐慌", 4],
        ["呪い", 5]
    ])
    const _effect = new Map([
        ["攻撃力", 0],
        ["防御力", 1],
        ["与ダメージ", 2],
        ["被ダメージ", 3],
        ["クリティカル", 4],
        ["ふるボッコ発動時の与ダメージ", 5],
        ["消費MP", 6]
    ])
    const _buff = new Map([
        ["アップ", 0],
        ["ダウン", 1]
    ])
    
    const _attackTable = (
        id, category, target, range, num, hit, type, power
    ) => new Map([
        ["CHARA_ID", id],
        ["CATEGORY", category],
        ["ATK_TARGET", target],
        ["ATK_RANGE", range],
        ["ATK_NUM", num],
        ["ATK_HIT", hit],
        ["ATK_TYPE", type],
        ["ATK_POWER", power]
    ])
    const badTable = function() {
        return new Map([
            ["CHARA_ID", 0],
            ["CATEGORY", 0],
            ["BAD_TURN", 0],
            ["BAD_TARGET", 0],
            ["BAD_RANGE", 0],
            ["BAD_NUM", 0],
            ["BAD_BAD", 0]
        ])
    }
    const guardTable = function() {
        new Map([
            ["CHARA_ID", 0],
            ["CATEGORY", 0],
            ["GUR_TURN", 0],
            ["GUR_TARGET", 0],
            ["GUR_RANGE", 0],
            ["GUR_NUM", 0],
            ["GUR_BAD", 0]
        ])
    }
    const healTable = new Map()
    const assistTable = new Map()
    const provocTable = new Map()

    const SkillTableTemplate = function() {
        Object.defineProperty(this, "createAttack", {
            get: _attackTable
        })
    }
    
    SkillTableTemplate.prototype.clearTable = function() {

    }

    SkillTableTemplate.prototype.formAttackTable = function(
        id, category, effect
    ) {
        const target = effect[1]
        const range = effect[2]
        const num = effect[3]
        const type = effect[4]
        const power = effect[5]
        return this.createAttack(id, category, target, range, num, type, power)
    }

    return SkillTableTemplate
})()

const testMap = new Map()
const record_atk = []
const record_bad = []
record_atk.push(new Map([["id",1], ["category",1], ["range",3], ["num", 10], ["type", 1], ["power", 8]]))
record_atk.push(new Map([["id",1], ["category",2], ["range",4], ["num", 15], ["type", 1], ["power", 9]]))
for(let i=0;i<2;i++) record_bad.push(new Map([["id",1], ["category",2], ["range",3], ["num", 10], ["type", 2], ["power", 10]]))
testMap.set("attack", record_atk)
testMap.set("bad", record_bad)

const selectRecord = []
const attackTable = testMap.get("attack")
attackTable.forEach((record,i,select) => {
    if(record.get("power") === 8) {
        selectRecord.push(select[i])
    }
});
console.log(selectRecord)

// const skillTableTemplate = new SkillTableTemplate()
// export default new skillTableTemplate()