'use strict'
import skillTableTemplate from './skill-table-template.js'

const typeRegex = new RegExp(/ダメージ|付与|無効化|回復|アップ|ダウン|挑発/, "g")

const attackRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?(?:(\d+)(?=連撃).+?)?(物理|魔法)(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)ダメージを与え/, "g")
const badRegex = new RegExp(/.*?(\d+ターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を付与/, "g")
const guardRegex = new RegExp(/.*?(\d+ターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を無効化/, "g")
const healRegex = new RegExp(/.*?(\d+ターン)?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方)(\d+体|全体)?.+?(HP|MP).+?(継続)?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)?回復させ/, "g")
const assistRegex = new RegExp(/.*?(\d+ターン).+?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方|敵)(\d+体|全体|体数分)?.+?(攻撃力|防御力|与ダメージ|被ダメージ|クリティカル|ふるボッコ発動時の与ダメージ|消費MP).+?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)(アップ|ダウン)させ/, "g")
const provocRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?挑発/, "g")

const regMap = new Map()
regMap.set("attack", attackRegex)
regMap.set("bad", badRegex)
regMap.set("guard", guardRegex)
regMap.set("heal", healRegex)
regMap.set("assist", assistRegex)
regMap.set("provoc", provocRegex)

// キャラIDとスキルカテゴリはコンストラクタ関数の所でグループ化した方が良い…？
// 例：
// sr = new skillnoteReader(charaId, skillCategory[0])
// sr.analyse(nSkill_note)
const skillnoteReader = function(charaId) {
    this.charaId = charaId


skillnoteReader.analyse = (charaId, skillnotes) => {
    let skillTypes  = []
    let skillnoteTable = []
    skillnotes.forEach((note, i_category) => {
        skillTypes = analyseSkillType(
            charaId, note[i_category] 
        )
        skillnoteTable.push(analyseSkillEffect(
            charaId, i_category, skillTypes, note[i_category] 
        ))
    })
    return skillnoteTable
}

const analyseSkillType = (charaId, skillnote) => {
    let skillTypes = []
    let type = ""
    while (type = typeRegex.exec(skillnote)) {
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
            default : console.assert(`キャラID: ${charaId} のスキルのタイプが判別できません。`)
            break
        }
	    typeRegex.lastIndex
    }
    return skillTypes
}

const analyseSkillEffect = (charaId, i_category, skillTypes, skillnote) => {
    let skillnoteTable = []
    let typeRegex = new RegExp()
    let effectRegex = new RegExp()
    let lastIdx = 0
    skillTypes.forEach((type) => {
        typeRegex = regMap.get(type)
        typeRegex.lastIndex = lastIdx
        effectRegex = typeRegex.exec(skillnote)
        if (effectRegex === null) console.assert(`キャラID: ${charaId} のスキルの効果が解析できません。`)
        skillnoteTable.push(formSkillEffect(charaId, i_category, type, effectRegex))
        lastIdx = typeRegex.lastIndex
    })
    return skillnoteTable
}

const formSkillEffect = (charaId, i_category, type, effect) => {
    let skillnoteTable = [] 
    switch(type) {
        case "attack":
            skillnoteTable = skillTableTemplate.formAttackTable(charaId, i_category, effect)
        break
        default : 
        break
    }
    return skillnoteTable
}

const clear = () => regMap.clear()

}

export default skillnoteReader