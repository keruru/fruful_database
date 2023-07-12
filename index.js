'use strict'
import axios from 'axios'
import { load } from 'cheerio'
import skillNoteReader from './plugins/skill-note-reader.js'

import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.static(__dirname+'/test'))
app.listen(process.env.PORT || 5000, () => console.log(`server is listening`))

const URL = "http://localhost:5000/dom.html"

axios(URL)
    .then(response => {
        const html = response.data
        const $ = load(html)

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
        const hp = 
            charaDetail.find('tbody tr:nth-child(2) td:nth-child(3)')
            .text().trim()
            .replace(/,/g, '')
        const minHp = hp.match(/\d+/)[0]
        const maxHp = hp.match(/\d+/g)[1]
        const mp = 
            charaDetail.find('tbody tr:nth-child(3) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const minMp = mp.match(/\d+/)[0]
        const maxMp = mp.match(/\d+/g)[1]
        const atk = 
            charaDetail.find('tbody tr:nth-child(4) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const minAtk = atk.match(/\d+/)[0]
        const maxAtk = atk.match(/\d+/g)[1]
        const def = 
            charaDetail.find('tbody tr:nth-child(5) td:nth-child(2)')
            .text().trim()
            .replace(/,/g, '')
        const minDef = def.match(/\d+/)[0]
        const maxDef = def.match(/\d+/g)[1]
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

        console.log(`rank: ${rank}`)
        console.log(`name: ${name}`)
        console.log(`charaId: ${charaId}`)
        console.log(`element: ${element}`)
        console.log(`minHp: ${minHp}`)
        console.log(`maxHp: ${maxHp}`)
        console.log(`minMp: ${minMp}`)
        console.log(`maxMp: ${maxMp}`)
        console.log(`minAtk: ${minAtk}`)
        console.log(`maxAtk: ${maxAtk}`)
        console.log(`minDef: ${minDef}`)
        console.log(`maxDef: ${maxDef}`)
        console.log(`nSkill_name: ${nSkill_name}`)
        console.log(`nSkill_note: ${nSkill_note}`)
        console.log(`eSkill_name: ${eSkill_name}`)
        console.log(`eSkill_note: ${eSkill_note}`)
        console.log(`a_nSkill_name: ${a_nSkill_name}`)
        console.log(`a_nSkill_note: ${a_nSkill_note}`)
        console.log(`a_eSkill_name: ${a_eSkill_name}`)
        console.log(`a_eSkill_note: ${a_eSkill_note}`)

        let skillnotes = [nSkill_note, eSkill_note, a_nSkill_note, a_eSkill_note]
        console.log(skillNoteReader.analyse(charaId, skillnotes))

        // const sr = new skillnoteReader(charaId)
        // const skillTable = sr.analyse(skillnotes)
        /*
        skillTable(Map[key, Map[key, value]])
        skillTable = { //Map
            attack :[ 
                {id, category, target, range, num, type, power}, //Map
                {id, category, target, range, num, type, power},
                {id, category, ...}
            ],
            bad :[
                {id, category, turn, target, range, num},
                {id, category, turn, target, range, num},
                {id, category, ...}
            ],
            guard :[...
                {...}
            ]
        }
        */

    }).catch(e => console.log(e))

