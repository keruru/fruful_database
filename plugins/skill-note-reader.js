'use strict'
import skillRecordFormat from './skill-record-format.js'

class skillnoteReader {
    constructor(charaId) {
        this.charaId = charaId
        this.noteRegex = new Map([
            ["attack", skillnoteReader.attackRegex],
            ["bad", skillnoteReader.badRegex],
            ["guard", skillnoteReader.guardRegex],
            ["heal", skillnoteReader.healRegex],
            ["assist", skillnoteReader.assistRegex],
            ["provoc", skillnoteReader.provocRegex]
        ])
        this.charaSkillTable = []
    }

    analyse(skillnotes) {
        let skillTable = []
        let skillTypes = []
        skillnotes.forEach((note, i_category) => {
            skillTypes = this._analyseSkillType(note)
            skillTable = this._analyseSkillEffect(
                skillTypes, note, i_category
            )
            this.charaSkillTable.push(...skillTable)
            skillTable.length = 0
        })
        this._reset()
        return this.charaSkillTable
    }

    _reset() {
        this.noteRegex.clear()
    }

    _analyseSkillType(skillnote) {
        let skillTypes = []
        let type = []
        while (type = skillnoteReader.typeRegex.exec(skillnote)) {
            switch(type[0]) {
                case "ダメージ" : skillTypes.push("attack")
                break
                case "付与" : skillTypes.push("bad")
                break
                case "無効化" : skillTypes.push("guard")
                break
                case "回復" : skillTypes.push("heal")
                break
                case "アップ" : skillTypes.push("assist")
                break
                case "ダウン" : skillTypes.push("assist")
                break
                case "挑発" : skillTypes.push("provoc")
                break
                default : console.assert(`キャラID: ${this.charaId} のスキルのタイプが判別できません。`)
                break
            }
            skillnoteReader.typeRegex.lastIndex
        }
        return skillTypes
    }

    _analyseSkillEffect(types, note, i_category) {
        let skillTable = []
        let typeRegex = new RegExp()
        let effect = []
        let lastIdx = 0
        types.forEach((type) => {
            typeRegex = this.noteRegex.get(type)
            typeRegex.lastIndex = lastIdx
            effect = typeRegex.exec(note)
            if(effect === null) {
                console.assert(`キャラID: ${this.charaId} のスキルの効果が解析できません。`)
            }
            skillTable.push(this._formSkillRecord(i_category, type, effect))
            lastIdx = typeRegex.lastIndex
        })
        return skillTable
    }

    _formSkillRecord(i_category, type, effect) {
        let skillRecord = new Map()
        switch(type) {
            case "attack":
                skillRecord = skillRecordFormat.getAttackRecord(
                    this.charaId, i_category, effect
                )
            break
            case "bad":
                skillRecord = skillRecordFormat.getBadRecord(
                    this.charaId, i_category, effect
                )
            break
            case "guard":
                skillRecord = skillRecordFormat.getGuardRecord(
                    this.charaId, i_category, effect
                )
            break
            case "heal":
                skillRecord = skillRecordFormat.getHealRecord(
                    this.charaId, i_category, effect
                )
            break
            case "assist":
                skillRecord = skillRecordFormat.getAssistRecord(
                    this.charaId, i_category, effect
                )
            break
            case "provoc":
                skillRecord = skillRecordFormat.getProvocRecord(
                    this.charaId, i_category, effect
                )
            break
            default : 
            break
        }
        return skillRecord
    }

}

skillnoteReader.typeRegex = new RegExp(/ダメージ|付与|無効化|回復|アップ|ダウン|挑発/, "g")
skillnoteReader.attackRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?(?:(\d+)(?=連撃).+?)?(物理|魔法)(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)ダメージを与え/, "g")
skillnoteReader.badRegex = new RegExp(/.*?(\d+ターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を付与/, "g")
skillnoteReader.guardRegex = new RegExp(/.*?(\d+ターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を無効化/, "g")
skillnoteReader.healRegex = new RegExp(/.*?(\d+ターン)?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方)(\d+体|全体)?.+?(HP|MP).+?(継続)?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)?回復させ/, "g")
skillnoteReader.assistRegex = new RegExp(/.*?(\d+ターン).+?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方|敵)(\d+体|全体|体数分)?.+?(攻撃力|防御力|与ダメージ|被ダメージ|クリティカル|ふるボッコ発動時の与ダメージ|消費MP).+?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)(アップ|ダウン)させ/, "g")
skillnoteReader.provocRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?挑発/, "g")

export default skillnoteReader