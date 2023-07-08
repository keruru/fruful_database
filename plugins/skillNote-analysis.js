'use strict';
const skillNoteAnalysis = {}

const test1 = "敵1体に9連撃の魔法大ダメージを与え、2ターン、冬季節の風属性の味方全体の攻撃力を中アップさせる。"
const test2 = "敵1体に魔法大ダメージを与え、2ターン、自身の攻撃力を中アップさせる。"
const test3 = "敵1体に3連撃の物理特大ダメージを与え、3ターン、敵全体に毒を付与する。さらに3ターン、敵全体に呪いを付与する。"
const test4 = "敵1体に物理特大ダメージを与え、2ターン、光属性の味方全体の防御力を特大アップさせる。さらに2ターン、味方全体の暗闇を無効化させる。"
const test5 = "敵全体に6連撃の物理特大ダメージを与え、味方全体のHPを中回復させる。さらに、2ターン味方全体のMPを継続回復させる。"
const test6 = "敵1体に10連撃の物理極大ダメージを与え、2ターン、味方全体の攻撃力を絶大アップさせる。さらに2ターン、味方全体の防御力を特大アップさせ、敵全体を挑発する。"

const test = test1

const typeRegex = new RegExp(/ダメージ|付与|無効化|回復|アップ|ダウン|挑発/, "g")
let charaId = 0
let skillTypes = []
let type = ""
while (type = typeRegex.exec(test)) {
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
        default : console.assert(`${charaId}のスキルのタイプが判別できません。`)
        break
    }
	typeRegex.lastIndex
}

const attackRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?(?:(\d+)(?=連撃).+?)?(物理|魔法)(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)ダメージを与え/, "g")
const badRegex = new RegExp(/.*?(\dターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を付与/, "g")
const guardRegex = new RegExp(/.*?(\dターン).+?(自身|味方|敵)(\d+体|全体)?.+?(毒|沈黙|暗闇|麻痺|恐慌|呪い)を無効化/, "g")
const healRegex = new RegExp(/.*?(\dターン).+?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方)(\d+体|全体)?.+?(HP|MP).+?(継続)?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)?回復させ/, "g")
const assistRegex = new RegExp(/.*?(\dターン).+?(?:([春夏秋冬])(?=季節).+?)?(?:([火水土風光闇全])(?=属性).+?)?(自身|味方|敵)(\d+体|全体|体数分)?.+?(攻撃力|防御力|与ダメージ|被ダメージ|クリティカル|ふるボッコ発動時の与ダメージ|消費MP).+?(小|中|大|特大|超特大|絶大|超絶大|極大|超極大|激大|超激大)(アップ|ダウン)させ/, "g")
const provocRegex = new RegExp(/.*?(敵|味方)(\d+体|全体).+?挑発/, "g")

const regMap = new Map()
regMap.set("attack", attackRegex)
regMap.set("bad", badRegex)
regMap.set("guard", guardRegex)
regMap.set("heal", healRegex)
regMap.set("assist", assistRegex)
regMap.set("provoc", provocRegex)

let skillData =  new Map()
let skillRegex = new RegExp()
let result = new RegExp()
let lastIdx = 0
skillTypes.forEach((type, i) => {
    skillRegex = regMap.get(type)
    skillRegex.lastIndex = lastIdx
    result = skillRegex.exec(test)
    skillData.set(i, result)
    lastIdx = skillRegex.lastIndex
})

console.log(skillTypes)
console.log(skillData)

export default skillNoteAnalysis