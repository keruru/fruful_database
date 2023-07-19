'use strict'
class SkillRecordFormat {
    constructor() {
    }

    _attackTable(id, category, type, target, range, num, hit, atkmatk, power) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["ATK_TARGET", target],
            ["ATK_RANGE", range],
            ["ATK_NUM", num],
            ["ATK_HIT", hit],
            ["ATK_AMTK", atkmatk],
            ["ATK_POWER", power]
        ])
    }

    _badTable(id, category, type, turn, target, range, num, bad) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["BAD_TURN", turn],
            ["BAD_TARGET", target],
            ["BAD_RANGE", range],
            ["BAD_NUM", num],
            ["BAD_BAD", bad]
        ])
    }

    _guardTable(id, category, type, turn, target, range, num, bad) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["GUR_TURN", turn],
            ["GUR_TARGET", target],
            ["GUR_RANGE", range],
            ["GUR_NUM", num],
            ["GUR_BAD", bad]
        ])
    }

    _healTable(id, category, type, turn, season, element, target, range, num, hpmp, last, power) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["HEAL_TURN", turn],
            ["HEAL_SEASON", season],
            ["HEAL_ELEM", element],
            ["HEAL_TARGET", target],
            ["HEAL_RANGE", range],
            ["HEAL_NUM", num],
            ["HEAL_HPMP", hpmp],
            ["HEAL_LAST", last],
            ["HEAL_POWER", power]
        ])
    }

    _assistTable(id, category, type, turn, season, element, target, range, num, action, power, buff) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["ASST_TURN", turn],
            ["ASST_SEASON", season],
            ["ASST_ELEM", element],
            ["ASST_TARGET", target],
            ["ASST_RANGE", range],
            ["ASST_NUM", num],
            ["ASST_ACTION", action],
            ["ASST_POWER", power],
            ["ASST_BUFF", buff]
        ])
    }

    _provocTable(id, category, type, target, range, num) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["PROVC_TARGET", target],
            ["PROVC_RANGE", range],
            ["PROVC_NUM", num]
        ])
    }

    _demeritTable(id, category, type, turn, last, target, range, num, action, power, buff) {
        return new Map([
            ["CID", id],
            ["CATEGORY", category],
            ["TYPE", type],
            ["DMERIT_TURN", turn],
            ["DMERIT_LAST", last],
            ["DMERIT_TARGET", target],
            ["DMERIT_RANGE", range],
            ["DMERIT_NUM", num],
            ["DMERIT_ACTION", action],
            ["DMERIT_POWER", power],
            ["DMERIT_BUFF", buff]
        ])
    }

    getAttackRecord(id, category, effect) {
        const type = 0
        const target = SkillRecordFormat.target.get(effect[1])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[2]))
        const num = isNaN(parseInt(effect[2])) ? null : parseInt(effect[2])
        const hit = isNaN(parseInt(effect[3])) ? null : parseInt(effect[3])
        const atkmatk = SkillRecordFormat.atkmatk.get(effect[4])
        const power = SkillRecordFormat.power.get(effect[5])

        return this._attackTable(
            id, category, type, target, range, num, hit, atkmatk, power
        )
    }

    getBadRecord(id, category, effect) {
        const type = 1
        const turn = isNaN(parseInt(effect[1])) ? null : parseInt(effect[1])
        const target = SkillRecordFormat.target.get(effect[2])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[3]))
        const num = isNaN(parseInt(effect[3])) ? null : parseInt(effect[3])
        const bad = SkillRecordFormat.bad.get(effect[4])

        return this._badTable(
            id, category, type, turn, target, range, num, bad
        )
    }

    getGuardRecord(id, category, effect) {
        const type = 2
        const turn = isNaN(parseInt(effect[1])) ? null : parseInt(effect[1])
        const target = SkillRecordFormat.target.get(effect[2])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[3]))
        const num = isNaN(parseInt(effect[3])) ? null : parseInt(effect[3])
        const bad = SkillRecordFormat.bad.get(effect[4])

        return this._guardTable(
            id, category, type, turn, target, range, num, bad
        )
    }

    getHealRecord(id, category, effect) {
        const type = 3
        const turn = isNaN(parseInt(effect[1])) ? null : parseInt(effect[1])
        const season = this._isUndefined(SkillRecordFormat.season.get(effect[2]))
        const element = this._isUndefined(SkillRecordFormat.element.get(effect[3]))
        const target = SkillRecordFormat.target.get(effect[4])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[5]))
        const num = isNaN(parseInt(effect[5])) ? null : parseInt(effect[5])
        const hpmp = SkillRecordFormat.hpmp.get(effect[6])
        const last = effect[7]==="継続"
        const power = SkillRecordFormat.power.get(effect[8])

        return this._healTable(
            id, category, type, turn, season, element, target, range, num, hpmp, last, power
        )
    }

    getAssistRecord(id, category, effect) {
        const type = 4
        const turn = isNaN(parseInt(effect[1])) ? null : parseInt(effect[1])
        const season = this._isUndefined(SkillRecordFormat.season.get(effect[2]))
        const element = this._isUndefined(SkillRecordFormat.element.get(effect[3]))
        const target = SkillRecordFormat.target.get(effect[4])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[5]))
        const num = isNaN(parseInt(effect[5])) ? null : parseInt(effect[5])
        const action = SkillRecordFormat.action.get(effect[6])
        const power = SkillRecordFormat.power.get(effect[7])
        const buff = SkillRecordFormat.buff.get(effect[8])

        return this._assistTable(
            id, category, type, turn, season, element, target, range, num, action, power, buff
        )
    }

    getProvocRecord(id, category, effect) {
        const type = 5
        const target = SkillRecordFormat.target.get(effect[1])
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[2]))
        const num = isNaN(parseInt(effect[2])) ? null : parseInt(effect[2])

        return this._provocTable(
            id, category, type, target, range, num
        )
    }

    getDemeritRecord(id, category, effect) {
        const type = 6
        const turn = isNaN(parseInt(effect[1])) ? null : parseInt(effect[1])
        const last = effect[2]==="戦闘終了"
        const target = this._isUndefined(SkillRecordFormat.target.get(effect[3]))
        const range = this._isUndefined(SkillRecordFormat.range.get(effect[4]))
        const num = isNaN(parseInt(effect[4])) ? null : parseInt(effect[4])
        const action = SkillRecordFormat.action.get(effect[5])
        const power = SkillRecordFormat.power.get(effect[6])
        const buff = SkillRecordFormat.buff.get(effect[7])

        return this._demeritTable(
            id, category, type, turn, last, target, range, num, action, power, buff
        )
    }

    _isUndefined = (value) => value === undefined ? null : value 
}

SkillRecordFormat.category = new Map([
    ["通常", 0],
    ["専用", 1],
    ["通常覚醒", 2],
    ["専用覚醒", 3]
])
SkillRecordFormat.type = new Map([
    ["attack", 0],
    ["bad", 1],
    ["guard", 2],
    ["heal", 3],
    ["assist", 4],
    ["provoc", 5],
    ["cons", 6]
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
    ["1体", 0],
    ["全体", 1],
    ["体数分", 2]
])
SkillRecordFormat.atkmatk = new Map([
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
SkillRecordFormat.action = new Map([
    ["攻撃力", 0],
    ["防御力", 1],
    ["与ダメージ", 2],
    ["被ダメージ", 3],
    ["クリティカル", 4],
    ["ふるボッコ発動時の与ダメージ", 5],
    ["FCドロップ数", 6],
    ["消費MP", 7],
    ["最大HP", 8],
    ["最大MP", 9]
])
SkillRecordFormat.buff = new Map([
    ["アップ", 0],
    ["ダウン", 1]
])

export default new SkillRecordFormat()