'use strict'
class SkillRecordFormat {
    constructor() {
    }

    _attackTable(sid, type, target, range, num, hit, atkmatk, power) {
        return new Map([
            ['ATK_ID', SkillRecordFormat.attackId],
            ['SID', sid],
            ['TYPE', type],
            ['ATK_TARGET', target],
            ['ATK_RANGE', range],
            ['ATK_NUM', num],
            ['ATK_HIT', hit],
            ['ATK_ATKMTK', atkmatk],
            ['ATK_POWER', power]
        ])
    }

    _badTable(sid, type, turn, target, range, num, bad) {
        return new Map([
            ['BAD_ID', SkillRecordFormat.badId],
            ['SID', sid],
            ['TYPE', type],
            ['BAD_TURN', turn],
            ['BAD_TARGET', target],
            ['BAD_RANGE', range],
            ['BAD_NUM', num],
            ['BAD_BAD', bad]
        ])
    }

    _guardTable(sid, type, turn, target, range, num, bad) {
        return new Map([
            ['GUR_ID', SkillRecordFormat.guardId],
            ['SID', sid],
            ['TYPE', type],
            ['GUR_TURN', turn],
            ['GUR_TARGET', target],
            ['GUR_RANGE', range],
            ['GUR_NUM', num],
            ['GUR_BAD', bad]
        ])
    }

    _healTable(sid, type, turn, season, element, target, range, num, hpmp, last, power) {
        return new Map([
            ['HEAL_ID', SkillRecordFormat.healId],
            ['SID', sid],
            ['TYPE', type],
            ['HEAL_TURN', turn],
            ['HEAL_SEASON', season],
            ['HEAL_ELEM', element],
            ['HEAL_TARGET', target],
            ['HEAL_RANGE', range],
            ['HEAL_NUM', num],
            ['HEAL_HPMP', hpmp],
            ['HEAL_LAST', last],
            ['HEAL_POWER', power]
        ])
    }

    _assistTable(sid, type, turn, season, element, target, range, num, action, power, buff) {
        return new Map([
            ['ASST_ID', SkillRecordFormat.assistId],
            ['SID', sid],
            ['TYPE', type],
            ['ASST_TURN', turn],
            ['ASST_SEASON', season],
            ['ASST_ELEM', element],
            ['ASST_TARGET', target],
            ['ASST_RANGE', range],
            ['ASST_NUM', num],
            ['ASST_ACTION', action],
            ['ASST_POWER', power],
            ['ASST_BUFF', buff]
        ])
    }

    _provocTable(sid, type, target, range, num) {
        return new Map([
            ['PROVC_ID', SkillRecordFormat.provocId],
            ['SID', sid],
            ['TYPE', type],
            ['PROVC_TARGET', target],
            ['PROVC_RANGE', range],
            ['PROVC_NUM', num]
        ])
    }

    _demeritTable(sid, type, turn, last, target, range, num, action, power, buff) {
        return new Map([
            ['DMERIT_ID', SkillRecordFormat.demeritId],
            ['SID', sid],
            ['TYPE', type],
            ['DMERIT_TURN', turn],
            ['DMERIT_LAST', last],
            ['DMERIT_TARGET', target],
            ['DMERIT_RANGE', range],
            ['DMERIT_NUM', num],
            ['DMERIT_ACTION', action],
            ['DMERIT_POWER', power],
            ['DMERIT_BUFF', buff]
        ])
    }

    getAttackRecord(sid, effect) {
        const type = 0
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[1]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[2]))
        const num = this._isNaNTo(parseInt(effect[2]))
        const hit = this._isNaNTo(parseInt(effect[3]))
        const atkmatk = SkillRecordFormat.atkmatk.get(effect[4])
        const power = SkillRecordFormat.power.get(effect[5])

        const attackRecord = this._attackTable(
             sid, type, target, range, num, hit, atkmatk, power
        )
        SkillRecordFormat.attackId++
        return attackRecord
    }

    getBadRecord(sid, effect) {
        const type = 1
        const turn = this._isNaNTo(parseInt(effect[1]))
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[2]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[3]))
        const num = this._isNaNTo(parseInt(effect[3]))
        const bad = SkillRecordFormat.bad.get(effect[4])

        const badRecord = this._badTable(
            sid, type, turn, target, range, num, bad
        )
        SkillRecordFormat.badId++
        return badRecord
    }

    getGuardRecord(sid, effect) {
        const type = 2
        const turn = this._isNaNTo(parseInt(effect[1]))
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[2]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[3]))
        const num = this._isNaNTo(parseInt(effect[3]))
        const bad = SkillRecordFormat.bad.get(effect[4])

        const guardRecord = this._guardTable(
           sid, type, turn, target, range, num, bad
        )
        SkillRecordFormat.guardId++
        return guardRecord
    }

    getHealRecord(sid, effect) {
        const type = 3
        const turn = this._isNaNTo(parseInt(effect[1]))
        const season = this._isUndefinedTo(SkillRecordFormat.season.get(effect[2]))
        const element = this._isUndefinedTo(SkillRecordFormat.element.get(effect[3]))
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[4]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[5]))
        const num = this._isNaNTo(parseInt(effect[5]))
        const hpmp = SkillRecordFormat.hpmp.get(effect[6])
        const last = effect[7]==="継続"
        const power = SkillRecordFormat.power.get(effect[8])

        const healRecord = this._healTable(
            sid, type, turn, season, element, target, range, num, hpmp, last, power
        )
        SkillRecordFormat.healId++
        return healRecord

    }

    getAssistRecord(sid, effect) {
        const type = 4
        const turn = this._isNaNTo(parseInt(effect[1]))
        const season = this._isUndefinedTo(SkillRecordFormat.season.get(effect[2]))
        const element = this._isUndefinedTo(SkillRecordFormat.element.get(effect[3]))
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[4]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[5]))
        const num = this._isNaNTo(parseInt(effect[5]))
        const action = SkillRecordFormat.action.get(effect[6])
        const power = SkillRecordFormat.power.get(effect[7])
        const buff = SkillRecordFormat.buff.get(effect[8])

        const assistRecord = this._assistTable(
            sid, type, turn, season, element, target, range, num, action, power, buff
        )
        SkillRecordFormat.assistId++
        return assistRecord
    }

    getProvocRecord(sid, effect) {
        const type = 5
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[1]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[2]))
        const num = this._isNaNTo(parseInt(effect[2]))

        const provocRecord = this._provocTable(
            sid, type, target, range, num
        )
        SkillRecordFormat.provocId++
        return provocRecord
    }

    getDemeritRecord(sid, effect) {
        const type = 6
        const turn = this._isNaNTo(parseInt(effect[1]))
        const last = effect[2]==="戦闘終了"
        const target = this._isUndefinedTo(SkillRecordFormat.target.get(effect[3]))
        const range = this._isUndefinedTo(SkillRecordFormat.range.get(effect[4]))
        const num = this._isNaNTo(parseInt(effect[4]))
        const action = SkillRecordFormat.action.get(effect[5])
        const power = SkillRecordFormat.power.get(effect[6])
        const buff = SkillRecordFormat.buff.get(effect[7])

        const demeritRecord = this._demeritTable(
            sid, type, turn, last, target, range, num, action, power, buff
        )
        SkillRecordFormat.demeritId++
        return demeritRecord
    }

    _isUndefinedTo = (value) => value === undefined ? "" : value
    _isNaNTo = (value) => isNaN(value) ? "" : parseInt(value)

    _resetAttackId = () => SkillRecordFormat.attackId = 0
    _resetBadId = () => SkillRecordFormat.badId = 0
    _resetGuardId = () => SkillRecordFormat.guardId = 0
    _resetHealId = () => SkillRecordFormat.healId = 0
    _resetAssistId = () => SkillRecordFormat.assistId = 0
    _resetProvocId = () => SkillRecordFormat.provocId = 0
    _resetDemeritId = () => SkillRecordFormat.demeritId = 0
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

SkillRecordFormat.attackId = 0
SkillRecordFormat.badId = 0
SkillRecordFormat.guardId = 0
SkillRecordFormat.healId = 0
SkillRecordFormat.assistId = 0
SkillRecordFormat.provocId = 0
SkillRecordFormat.demeritId = 0

export default new SkillRecordFormat()