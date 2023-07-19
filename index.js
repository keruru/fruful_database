'use strict'
import axios from 'axios'
import { load } from 'cheerio'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import { createObjectCsvWriter } from 'csv-writer'

import skillNoteReader from './plugins/skill-note-reader.js'
import CharaSkillTable from './plugins/CharaSkillTable.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(__dirname+'/test'))
app.listen(process.env.PORT || 5000, () => console.log(`server is listening`))

const URL = "http://localhost:5000/dom.html"

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

    const charaDetail = $('.table_chara_detail', html)
    const thead = 
        charaDetail.find('thead span')
        .children()
        .text().split(/\s+/)
    const rank = thead[0].match(/\d+/)[0]
    const name = thead[1]
    const charaId =
        charaDetail.parent()
        .attr('id')
        .match(/\d+/)[0]
    const element = 
        charaDetail.find('tbody tr:nth-child(2) .chara_frame img')
        .attr('src')
        .match(/_([a-zA-Z]+)[_\.]/)[1]
        ._getElement()
    const hp = 
        charaDetail.find('tbody tr:nth-child(2) td:nth-child(3)')
        .text().trim()
        .replace(/,/g, '')
    const maxHp = hp.match(/\d+/)[0]
    const a_maxHp = _isUndefined(hp.match(/\d+/g)[1])
    const mp = 
        charaDetail.find('tbody tr:nth-child(3) td:nth-child(2)')
        .text().trim()
        .replace(/,/g, '')
    const maxMp = mp.match(/\d+/)[0]
    const a_maxMp = _isUndefined(mp.match(/\d+/g)[1])
    const atk = 
        charaDetail.find('tbody tr:nth-child(4) td:nth-child(2)')
        .text().trim()
        .replace(/,/g, '')
    const maxAtk = atk.match(/\d+/)[0]
    const a_maxAtk = _isUndefined(atk.match(/\d+/g)[1])
    const def = 
        charaDetail.find('tbody tr:nth-child(5) td:nth-child(2)')
        .text().trim()
        .replace(/,/g, '')
    const maxDef = def.match(/\d+/)[0]
    const a_maxDef = _isUndefined(def.match(/\d+/g)[1])
    const nSkill = charaDetail.find('tbody tr:nth-child(6) td:nth-child(2)')
    const nSkill_name = nSkill.find('.skill_name').text()
    const nSkill_note = nSkill.find('.skill_note').text()
    const eSkill = charaDetail.find('tbody tr:nth-child(7) td:nth-child(2)')
    const eSkill_name = eSkill.find('.skill_name').text()
    const eSkill_note = eSkill.find('.skill_note').text()
    const a_nSkill = charaDetail.find('tbody tr:nth-child(8) td:nth-child(2)')
    const a_nSkill_name = a_nSkill.find('.skill_name').text()
    const a_nSkill_note = a_nSkill.find('.skill_note').text()
    const a_eSkill = charaDetail.find('tbody tr:nth-child(9) td:nth-child(2)')
    const a_eSkill_name = a_eSkill.find('.skill_name').text()
    const a_eSkill_note = a_eSkill.find('.skill_note').text()

    charaMasterRecords = {
        "CID":charaId, "RANK":rank, "ELEM":element, "NAME":name,
        "MAXHP":maxHp, "AMAXHP":a_maxHp, "MAXMP":maxMp, "AMAXMP":a_maxMp,
        "MAXATK":maxAtk, "AMAXATK":a_maxAtk, "MAXDEF":maxDef, "AMAXDEF":a_maxDef
    }
    charaMasterTable.push(charaMasterRecords)

    skillnoteRecords = {
        "CID":charaId,
        "NSKLNAME":nSkill_name, "NSKLNOTE":nSkill_note,
        "ESKLNAME":eSkill_name, "ESKLNOTE":eSkill_note,
        "ANSKLNAME":a_nSkill_name, "ANSKLNOTE":a_nSkill_note,
        "AESKLNAME":a_eSkill_name, "AESKLNOTE":a_eSkill_note,
    }
    skillnoteTable.push(skillnoteRecords)

    skillnotes = [nSkill_note, eSkill_note, a_nSkill_note, a_eSkill_note]
    let reader = new skillNoteReader(charaId)
    skillRecords = reader.analyse(skillnotes)
    skillTable.push(...skillRecords)


    // 全キャラ解析後にCSV出力用データへ変換する
    const charaSkillTable = new CharaSkillTable()
    skillTable.forEach((map)=>{
        switch(map.get("TYPE")) {
            case 0:
                map.delete("TYPE")
                charaSkillTable.add("attack", map)
            break
            case 1:
                map.delete("TYPE")
                charaSkillTable.add("bad", map)
            break
            case 2:
                map.delete("TYPE")
                charaSkillTable.add("guard", map)
            break
            case 3:
                map.delete("TYPE")
                charaSkillTable.add("heal", map)
            break
            case 4:
                map.delete("TYPE")
                charaSkillTable.add("assist", map)
            break
            case 5:
                map.delete("TYPE")
                charaSkillTable.add("provoc", map)
            break
            case 6:
                map.delete("TYPE")
                charaSkillTable.add("demerit", map)
            break
            default:
            break
        }
    })

    console.log(skillnoteTable)
    console.log(charaMasterTable)
    console.log(charaSkillTable)
    
    // const map2obj = Object.fromEntries(map)

    // const types = ["attack", "bad", "guard", "heal", "assist", "provoc"/*, "cons"*/]
    // types.forEach((type) => {
    //     if(skillTable.get(type).length !== 0) {
    //         charaSkillTable.get(type).push(...skillTable.get(type))
    //     }
    // })

}).catch(e => console.log(e))

function _isUndefined(value) {
    return value === undefined ? null : value
}

Object.defineProperty(String.prototype, "_getElement", {
    value: function _getElement() {
        const element = new Map([
            ["all", "0"],
            ["fire", "1"],
            ["water", "2"],
            ["earth", "3"],
            ["wind", "4"],
            ["light", "5"],
            ["dark", "6"]
        ])
        return element.get(this)
    }
})
