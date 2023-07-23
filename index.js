'use strict'
import axios from 'axios'
import { load } from 'cheerio'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createObjectCsvWriter } from 'csv-writer'

import skillNoteReader from './src/skill-note-reader.js'
// import CharaSkillTable from './plugins/CharaSkillTable.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(__dirname+'/resource'))
app.listen(process.env.PORT || 5000, () => console.log(`server is listening`))

const URL = "http://localhost:5000/chara.html"

axios(URL).then(response => {
    const html = response.data
    const $ = load(html)

    let charaMasterTable = []
    let charaMasterRecords = {}
    let skillnoteTable = []
    let skillnoteRecords = {}
    let skillnotes = []
    let skillTable = []
    let skillRecords = []

    const timeA = performance.now()

    const tableCharaDetail = $('.table_chara_detail', html)
    tableCharaDetail.each((i, charaDetail) => {

        // DOMからキャラデータを抽出
        const thead = 
            $(charaDetail).find('thead span')
            .children()
            .text().split(/\s+/)
        const rank = thead[0].match(/\d+/)[0]
        const name = thead[1]
        const charaId =
            $(charaDetail).parent()
            .attr('id')
            .match(/\d+/)[0]
        const element = 
            $(charaDetail).find('tbody tr:nth-child(2) .chara_frame img')
            .attr('src')
            .match(/_([a-zA-Z]+)[_\.]/)[1]
            ._getElement()
        const hp = 
            $(charaDetail).find('tbody tr:nth-child(2) td:nth-child(3)')
            .text().trim()
            .replace(/,/g, '')
        const maxHp = hp.match(/\d+/)[0]
        const a_maxHp = _isUndefinedTo(hp.match(/\d+/g)[1])
        const mp = 
            $(charaDetail).find('tbody tr:nth-child(3) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const maxMp = mp.match(/\d+/)[0]
        const a_maxMp = _isUndefinedTo(mp.match(/\d+/g)[1])
        const atk = 
            $(charaDetail).find('tbody tr:nth-child(4) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const maxAtk = atk.match(/\d+/)[0]
        const a_maxAtk = _isUndefinedTo(atk.match(/\d+/g)[1])
        const def = 
            $(charaDetail).find('tbody tr:nth-child(5) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const maxDef = def.match(/\d+/)[0]
        const a_maxDef = _isUndefinedTo(def.match(/\d+/g)[1])
        const nSkill = $(charaDetail).find('tbody tr:nth-child(6) td:nth-child(2)')
        const nSkill_name = nSkill.find('.skill_name').text().trim()
        const nSkill_note = nSkill.find('.skill_note').text().trim()
        const eSkill = $(charaDetail).find('tbody tr:nth-child(7) td:nth-child(2)')
        const eSkill_name = eSkill.find('.skill_name').text().trim()
        const eSkill_note = eSkill.find('.skill_note').text().trim()
        const a_nSkill = $(charaDetail).find('tbody tr:nth-child(8) td:nth-child(2)')
        const a_nSkill_name = a_nSkill.find('.skill_name').text().trim()
        const a_nSkill_note = a_nSkill.find('.skill_note').text().trim()
        const a_eSkill = $(charaDetail).find('tbody tr:nth-child(9) td:nth-child(2)')
        const a_eSkill_name = a_eSkill.find('.skill_name').text().trim()
        const a_eSkill_note = a_eSkill.find('.skill_note').text().trim()

        // キャラマスタ
        charaMasterRecords = {
            'CID':charaId, 'RANK':rank, 'ELEM':element, 'NAME':name,
            'MAXHP':maxHp, 'AMAXHP':a_maxHp, 'MAXMP':maxMp, 'AMAXMP':a_maxMp,
            'MAXATK':maxAtk, 'AMAXATK':a_maxAtk, 'MAXDEF':maxDef, 'AMAXDEF':a_maxDef
        }
        charaMasterTable.push(charaMasterRecords)

        // スキルマスタ
        // skillMasterRecords = {
        //     'SID':skillId,
        //     'CID':charaId, 'CATEGORY': category,
        //     'SKLNAME':"", 'SKLNOTE':""
        // }

        // スキル説明文
        skillnoteRecords = {
            'CID':charaId,
            'NSKLNAME':nSkill_name, 'NSKLNOTE':nSkill_note,
            'ESKLNAME':eSkill_name, 'ESKLNOTE':eSkill_note,
            'ANSKLNAME':a_nSkill_name, 'ANSKLNOTE':a_nSkill_note,
            'AESKLNAME':a_eSkill_name, 'AESKLNOTE':a_eSkill_note
        }
        skillnoteTable.push(skillnoteRecords)

        // キャラスキル解析
        let reader = new skillNoteReader(charaId)
        skillnotes = [nSkill_note, eSkill_note, a_nSkill_note, a_eSkill_note]
        skillRecords = reader.analyse(skillnotes)
        skillTable.push(...skillRecords)

        if(i%50 === 0) {
            console.log(`キャラスキルを解析中... 現在${++i} / 全${tableCharaDetail.length}`)
        }
    })

    // キャラスキル解析にかかった時間を計測
    const timeB = performance.now()
    console.log(`キャラスキルの解析完了 ${timeB-timeA}ms`)

    // CSV出力用にMapからObjectへ変換
    let attack = []
    let bad = []
    let guard = []
    let heal = []
    let assist = []
    let provoc = []
    let demerit = []
    skillTable.forEach((map)=>{
        switch(map.get("TYPE")) {
            case 0:
                map.delete("TYPE")
                attack.push(Object.fromEntries(map))
            break
            case 1:
                map.delete("TYPE")
                bad.push(Object.fromEntries(map))
            break
            case 2:
                map.delete("TYPE")
                guard.push(Object.fromEntries(map))
            break
            case 3:
                map.delete("TYPE")
                heal.push(Object.fromEntries(map))
            break
            case 4:
                map.delete("TYPE")
                assist.push(Object.fromEntries(map))
            break
            case 5:
                map.delete("TYPE")
                provoc.push(Object.fromEntries(map))
            break
            case 6:
                map.delete("TYPE")
                demerit.push(Object.fromEntries(map))
            break
            default:
            break
        }
    })

    // CSV出力
    const date = new Date()
    const now = date.toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).replaceAll('/', '-')
    const csvfilepath = __dirname + '/csv/' + now

    const masterCsv = createObjectCsvWriter({
        path : csvfilepath + '_master.csv',
        header : Object.keys(charaMasterTable[0]).map(v => ({id : v, title : v}))
    })
    masterCsv.writeRecords(charaMasterTable).then(() => {
        console.log(`キャラマスタのCSVを出力=>${csvfilepath}_master.csv`)
    })

    const skillnoteCsv = createObjectCsvWriter({
        path : csvfilepath + '_skillnote.csv',
        header : Object.keys(skillnoteTable[0]).map(v => ({id : v, title : v}))
    })
    skillnoteCsv.writeRecords(skillnoteTable).then(() => {
        console.log(`キャラスキル説明文のCSVを出力=>${csvfilepath}_skillnote.csv`)
    })

    const attackCsv = createObjectCsvWriter({
        path : csvfilepath + '_attack.csv',
        header : Object.keys(attack[0]).map(v => ({id : v, title : v}))
    })
    attackCsv.writeRecords(attack).then(() => {
        console.log(`スキル(攻撃タイプ)のCSVを出力=>${csvfilepath}_attack.csv`)
    })

    const badCsv = createObjectCsvWriter({
        path : csvfilepath + '_bad.csv',
        header : Object.keys(bad[0]).map(v => ({id : v, title : v}))
    })
    badCsv.writeRecords(bad).then(() => {
        console.log(`スキル(状態異常タイプ)のCSVを出力=>${csvfilepath}_bad.csv`)
    })

    const guardCsv = createObjectCsvWriter({
        path : csvfilepath + '_guard.csv',
        header : Object.keys(guard[0]).map(v => ({id : v, title : v}))
    })
    guardCsv.writeRecords(guard).then(() => {
        console.log(`スキル(異常無効タイプ)のCSVを出力=>${csvfilepath}_guard.csv`)
    })

    const healCsv = createObjectCsvWriter({
        path : csvfilepath + '_heal.csv',
        header : Object.keys(heal[0]).map(v => ({id : v, title : v}))
    })
    healCsv.writeRecords(heal).then(() => {
        console.log(`スキル(回復タイプ)のCSVを出力=>${csvfilepath}_heal.csv`)
    })

    const assistCsv = createObjectCsvWriter({
        path : csvfilepath + '_assist.csv',
        header : Object.keys(assist[0]).map(v => ({id : v, title : v}))
    })
    assistCsv.writeRecords(assist).then(() => {
        console.log(`スキル(補助タイプ)のCSVを出力=>${csvfilepath}_assist.csv`)
    })

    const provocCsv = createObjectCsvWriter({
        path : csvfilepath + '_provoc.csv',
        header : Object.keys(provoc[0]).map(v => ({id : v, title : v}))
    })
    provocCsv.writeRecords(provoc).then(() => {
        console.log(`スキル(挑発タイプ)のCSVを出力=>${csvfilepath}_provoc.csv`)
    })

    const demeritCsv = createObjectCsvWriter({
        path : csvfilepath + '_demerit.csv',
        header : Object.keys(demerit[0]).map(v => ({id : v, title : v}))
    })
    demeritCsv.writeRecords(demerit).then(() => {
        console.log(`スキル(デメリットタイプ)のCSVを出力=>${csvfilepath}_demerit.csv`)
    })

}).catch(e => console.log(e))

function _isUndefinedTo(value) {
    return value === undefined ? "" : value
}

Object.defineProperty(String.prototype, '_getElement', {
    value: function _getElement() {
        const element = new Map([
            ['all', "0"],
            ['fire', "1"],
            ['water', "2"],
            ['earth', "3"],
            ['wind', "4"],
            ['light', "5"],
            ['dark', "6"]
        ])
        return element.get(this)
    }
})
