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
            ["provoc", skillnoteReader.provocRegex],
            ["demerit", skillnoteReader.demeritRegex]
        ])
        this.charaSkillTable = []
    }

    analyse(skillnote, i_category) {
        let skillTypeTable = []
        let skillTypes = []
        let reviseNote = ""
        this.charaSkillTable.length = 0

        if(!skillnote) return
        reviseNote = skillnoteReader.noteRevise(
            this.charaId, i_category, skillnote
        ) || skillnote

        skillTypes = this._analyseSkillType(reviseNote)
        skillTypeTable = this._analyseSkillEffect(
            skillTypes, reviseNote, i_category
        )
        this.charaSkillTable.push(...skillTypeTable)

        skillTypeTable.length = 0
        skillnoteReader.sid++

        return this.charaSkillTable
    }

    _clear() {
        this.noteRegex.clear()
    }

    _reset() {
        skillnoteReader.sid = 0
    }

    _analyseSkillType(skillnote) {
        let skillTypes = []
        let type = []
        while (type = skillnoteReader.typeRegex.exec(skillnote)) {
            switch(type[0]) {
                case "ダメージを与え": skillTypes.push("attack")
                break
                case "付与": skillTypes.push("bad")
                break
                case "無効化": skillTypes.push("guard")
                break
                case "回復": skillTypes.push("heal")
                break
                case "アップ": skillTypes.push("assist")
                break
                case "ダウン": skillTypes.push("assist")
                break
                case "挑発": skillTypes.push("provoc")
                break
                case "るが、":
                    // 実装されているデメリット持ち（2キャラ）のデメリットの文面は最後尾に来るため
                    // スキル説明文にデメリットの文面が見つかったら、スキル解析をストップする
                    // もし今後、スキル説明文のデメリットの構文が変わって、正規表現で特定できなくなったら
                    // デメリットのスキルタイプを補助に変更する
                    skillTypes.push("demerit")
                    skillnoteReader.typeRegex.lastIndex = skillnote.length
                break
                default : console.log(`キャラID(${this.charaId})のスキルタイプを判別できません。`)
                break
            }
            skillnoteReader.typeRegex.lastIndex
        }
        return skillTypes
    }

    _analyseSkillEffect(skilltypes, skillnote, i_category) {
        let skillTable = []
        let typeRegex = new RegExp()
        let effect = []
        let lastIdx = 0
        skilltypes.forEach((type) => {
            typeRegex = this.noteRegex.get(type)
            typeRegex.lastIndex = lastIdx
            effect = typeRegex.exec(skillnote)
            if(effect === null) {
                console.log(`キャラID(${this.charaId})のスキルカテゴリ(${i_category})の効果を解析できません。`)
            }
            skillTable.push(this._formSkillRecord(type, effect))
            lastIdx = typeRegex.lastIndex
        })
        return skillTable
    }

    _formSkillRecord(type, effect) {
        let skillRecord = new Map()
        switch(type) {
            case "attack":
                skillRecord = skillRecordFormat.getAttackRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "bad":
                skillRecord = skillRecordFormat.getBadRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "guard":
                skillRecord = skillRecordFormat.getGuardRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "heal":
                skillRecord = skillRecordFormat.getHealRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "assist":
                skillRecord = skillRecordFormat.getAssistRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "provoc":
                skillRecord = skillRecordFormat.getProvocRecord(
                    skillnoteReader.sid, effect
                )
            break
            case "demerit":
                skillRecord = skillRecordFormat.getDemeritRecord(
                    skillnoteReader.sid, effect
                )
            break
            default: 
            break
        }
        return skillRecord
    }

}

skillnoteReader.sid = 0
skillnoteReader.typeRegex = new RegExp(/ダメージを与え|付与|無効化|回復|アップ|ダウン|挑発|るが、/, "g")
skillnoteReader.attackRegex = new RegExp(/(自身|味方|敵)?(?:(\d+体|全体|体数分)?に)?(?:(\d+)連撃の)?(物理|魔法)(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)ダメージを与え/, "g")
skillnoteReader.badRegex = new RegExp(/(?:(\d+ターン)?、)?(自身|味方|敵)?(?:(\d+体|全体|体数分)?に)?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を付与/, "g")
skillnoteReader.guardRegex = new RegExp(/(?:(\d+ターン)?、)?(自身|味方|敵)?(?:(\d+体|全体|体数分)?の)?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を無効化/, "g")
skillnoteReader.healRegex = new RegExp(/(?:(\d+ターン)?、)?(?:([春夏秋冬])季節の)?(?:([火水土風光闇全])属性の)?(自身|味方|敵)?(?:(\d+体|全体|体数分)?の)?(HP|MP)を(継続)?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)?回復/, "g")
skillnoteReader.assistRegex = new RegExp(/(?:(\d+ターン)?、)?(?:([春夏秋冬])季節の)?(?:([火水土風光闇全])属性の)?(自身|味方|敵)?(?:(\d+体|全体|体数分)?の)?(攻撃力|防御力|(?<!ふるボッコ発動時の)与ダメージ|被ダメージ|クリティカル|ふるボッコ発動時の与ダメージ|FCドロップ数|消費MP)を(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)(アップ|ダウン)/, "g")
skillnoteReader.provocRegex = new RegExp(/(自身|味方|敵)?(?:(\d+体|全体|体数分)?を)?挑発/, "g")
skillnoteReader.demeritRegex = new RegExp(/るが、(?:(\d+ターン)?、)?(?:(戦闘終了)まで、)?(自身|味方|敵)?(?:(\d+体|全体|体数分)?の)?(攻撃力|防御力|(?<!ふるボッコ発動時の)与ダメージ|被ダメージ|クリティカル|ふるボッコ発動時の与ダメージ|FCドロップ数|消費MP|最大HP|最大MP)が(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)(アップ|ダウン)/, "g")

skillnoteReader.noteRevise = function(charaId, i_category, note) {
    if(charaId==='439' && i_category===0) { 
        // ねぎ(大正ロマン) 通常スキル
        return note.replace('HP継続', 'HPを継続')
    }
    if(charaId==='210' && (i_category===0 || i_category===2)) {
        // ルナ(アートワール) 通常スキル 通常専用スキル
        return note.replace('回復する', '回復させる')
    }
    if(charaId==='632' && i_category===1) {
        // ミダレル(4th記念) 進化スキル
        return note.replace('FCドロップ', 'FCドロップ数')
    }

}

export default skillnoteReader