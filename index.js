import axios from 'axios'
import { load } from 'cheerio'

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

        // let charaId = 154
        // let charaDetail = $('[id^="chara_detail_'+charaId+'"]', html)
        let charaDetail = $('.table_chara_detail', html)
        let thead = charaDetail.find('thead span').children().text().split("　")
        let rank = thead[0].match(/\d+/)[0]
        let name = thead[1]
        let charaId = charaDetail.parent().attr('id').match(/\d+/)[0]
        let hp = charaDetail.find('tbody tr:nth-child(2) td:nth-child(3)').text().trim().replace(/,/g, '')
        let minHp = hp.match(/\d+/)[0]
        let maxHp = hp.match(/\d+/g)[1]
        let mp = charaDetail.find('tbody tr:nth-child(3) td:nth-child(2)').text().trim().replace(/,/g, '')
        let minMp = mp.match(/\d+/)[0]
        let maxMp = mp.match(/\d+/g)[1]
        let atk = charaDetail.find('tbody tr:nth-child(4) td:nth-child(2)').text().trim().replace(/,/g, '')
        let minAtk = atk.match(/\d+/)[0]
        let maxAtk = atk.match(/\d+/g)[1]
        let def = charaDetail.find('tbody tr:nth-child(5) td:nth-child(2)').text().trim().replace(/,/g, '')
        let minDef = def.match(/\d+/)[0]
        let maxDef = def.match(/\d+/g)[1]
        let nSkill = charaDetail.find('tbody tr:nth-child(6) td:nth-child(2)')
        let nSkill_name = nSkill.find('.skill_name').text()
        let nSkill_note = nSkill.find('.skill_note').text()
        let eSkill = charaDetail.find('tbody tr:nth-child(7) td:nth-child(2)')
        let eSkill_name = eSkill.find('.skill_name').text()
        let eSkill_note = eSkill.find('.skill_note').text()
        let a_nSkill = charaDetail.find('tbody tr:nth-child(8) td:nth-child(2)')
        let a_nSkill_name = a_nSkill.find('.skill_name').text()
        let a_nSkill_note = a_nSkill.find('.skill_note').text()
        let a_eSkill = charaDetail.find('tbody tr:nth-child(9) td:nth-child(2)')
        let a_eSkill_name = a_eSkill.find('.skill_name').text()
        let a_eSkill_note = a_eSkill.find('.skill_note').text()

        console.log(`rank: ${rank}`)
        console.log(`name: ${name}`)
        console.log(`charaId: ${charaId}`)
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
        
        
    }).catch(e => console.log(e))

