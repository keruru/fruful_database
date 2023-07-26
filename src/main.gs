function ranking() {
  const spreadsheet = SpreadsheetApp.openById('1JDPTVrWROl1iUhWJZ4qrhEN9qZ447NREb6c-8Q7QHV8')

  const fruBasSheet = spreadsheet.getSheetByName('fruits_basket')

  const attackSheet = spreadsheet.getSheetByName('attack')
  const attackValues = attackSheet.getRange('A:H').getValues()

  const charaSheet = spreadsheet.getSheetByName('chara')
  const charaValues = charaSheet.getRange('A:L').getValues()

  const skillSheet = spreadsheet.getSheetByName('skill')
  const skillValues = skillSheet.getRange('A:C').getValues()

  const assistSheet = spreadsheet.getSheetByName('assist')
  const assistValues = assistSheet.getRange('A:K').getValues()

  const categorySheet = spreadsheet.getSheetByName('category')
  const categoryValues = categorySheet.getRange('A1:B4').getValues()

  const elementSheet = spreadsheet.getSheetByName('element')
  const elementValues = elementSheet.getRange('A1:B7').getValues()

  const powerSheet = spreadsheet.getSheetByName('power')
  const powerValues = powerSheet.getRange('A1:B11').getValues()

  const rangeSheet = spreadsheet.getSheetByName('range')
  const rangeValues = rangeSheet.getRange('A1:B3').getValues()

/*** DATA MAPPING ***/

  // スキルマスタをオブジェクト化
  const [skillHeader, ...skillRecords] = skillValues
  const skill = skillRecords.map(
    record => record.reduce((acc, value, index) => {
      acc[skillHeader[index]] = value
      return acc
    }, {})
  )

  // キャラマスタをオブジェクト化
  const [charaHeader, ...charaRecords] = charaValues
  const chara = charaRecords.map(
    record => record.reduce((acc, value, index) => {
      acc[charaHeader[index]] = value
      return acc
    }, {})
  )

  // 攻撃スキルテーブルをオブジェクト化
  const [attackHeader, ...attackRecords] = attackValues
  const attack = attackRecords.map(
    record => record.reduce((acc, value, index) => {
      acc[attackHeader[index]] = value
      return acc
    }, {})
  )

  // 補助スキルテーブルをオブジェクト化
  const [assistHeader, ...assistRecords] = assistValues
  const assist = assistRecords.map(
    record => record.reduce((acc, value, index) => {
      acc[assistHeader[index]] = value
      return acc
    }, {})
  )

  const categoryMap = categoryValues.reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {})
  const elementMap = elementValues.reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {})
  const powerMap = powerValues.reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {})
  const rangeMap = rangeValues.reduce((obj, [key, value]) => Object.assign(obj, {[key]: value}), {})

/*** QUERY ***/

  // スキルの火力を抽出
  const attackPowerMapped = attack.map(a => {
    return {SID:a.SID, RANGE:a.ATK_RANGE, POWER:a.ATK_POWER}
  })
  // スキルIDをインデックス化
  const attackSidMap = new Map()
  for (const a of attackPowerMapped) {
    attackSidMap.set(a.SID, a)
    delete a.SID
  }

  // 攻撃力アップのキャラを抽出
  const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  // 火属性のキャラを抽出
  const fireCidMap = charaElementMapping("1")
  // 火属性の攻撃アップのキャラを抽出
  const fireAtkMapped = charaSkillMapping(fireCidMap, assistAtkSidMap, attackSidMap)
  // 火属性の攻撃力アップのキャラの性能ソート
  strongSort(fireAtkMapped)

  // 火、防ダウン
  const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const fireDefMapped = charaSkillMapping(fireCidMap, assistDefSidMap, attackSidMap)
  strongSort(fireDefMapped)
  // 火、与アップ
  const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const fireDmgMapped = charaSkillMapping(fireCidMap, assistDmgSidMap, attackSidMap)
  strongSort(fireDmgMapped)
  // 火、被アップ
  const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const fireRevMapped = charaSkillMapping(fireCidMap, assistRevSidMap, attackSidMap)
  strongSort(fireRevMapped)
  // 火、クリティカル
  const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const fireCriMapped = charaSkillMapping(fireCidMap, assistCriSidMap, attackSidMap)
  strongSort(fireCriMapped)

  // 水、攻アップ
  // const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  const waterCidMap = charaElementMapping("2")
  const waterAtkMapped = charaSkillMapping(waterCidMap, assistAtkSidMap, attackSidMap)
  strongSort(waterAtkMapped)
  // 水、防ダウン
  // const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const waterDefMapped = charaSkillMapping(waterCidMap, assistDefSidMap, attackSidMap)
  strongSort(waterDefMapped)
  // 水、与アップ
  // const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const waterDmgMapped = charaSkillMapping(waterCidMap, assistDmgSidMap, attackSidMap)
  strongSort(waterDmgMapped)
  // 水、被アップ
  // const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const waterRevMapped = charaSkillMapping(waterCidMap, assistRevSidMap, attackSidMap)
  strongSort(waterRevMapped)
  // 水、クリティカル
  // const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const waterCriMapped = charaSkillMapping(waterCidMap, assistCriSidMap, attackSidMap)
  strongSort(waterCriMapped)

  // 土、攻アップ
  // const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  const earthCidMap = charaElementMapping("3")
  const earthAtkMapped = charaSkillMapping(earthCidMap, assistAtkSidMap, attackSidMap)
  strongSort(earthAtkMapped)
  // 土、防ダウン
  // const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const earthDefMapped = charaSkillMapping(earthCidMap, assistDefSidMap, attackSidMap)
  strongSort(earthDefMapped)
  // 土、与アップ
  // const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const earthDmgMapped = charaSkillMapping(earthCidMap, assistDmgSidMap, attackSidMap)
  strongSort(earthDmgMapped)
  // 土、被アップ
  // const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const earthRevMapped = charaSkillMapping(earthCidMap, assistRevSidMap, attackSidMap)
  strongSort(earthRevMapped)
  // 土、クリティカル
  // const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const earthCriMapped = charaSkillMapping(earthCidMap, assistCriSidMap, attackSidMap)
  strongSort(earthCriMapped)

  // 風、攻アップ
  // const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  const windCidMap = charaElementMapping("4")
  const windAtkMapped = charaSkillMapping(windCidMap, assistAtkSidMap, attackSidMap)
  strongSort(windAtkMapped)
  // 風、防ダウン
  // const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const windDefMapped = charaSkillMapping(windCidMap, assistDefSidMap, attackSidMap)
  strongSort(windDefMapped)
  // 風、与アップ
  // const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const windDmgMapped = charaSkillMapping(windCidMap, assistDmgSidMap, attackSidMap)
  strongSort(windDmgMapped)
  // 風、被アップ
  // const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const windRevMapped = charaSkillMapping(windCidMap, assistRevSidMap, attackSidMap)
  strongSort(windRevMapped)
  // 風、クリティカル
  // const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const windCriMapped = charaSkillMapping(windCidMap, assistCriSidMap, attackSidMap)
  strongSort(windCriMapped)

  // 光、攻アップ
  // const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  const lightCidMap = charaElementMapping("5")
  const lightAtkMapped = charaSkillMapping(lightCidMap, assistAtkSidMap, attackSidMap)
  strongSort(lightAtkMapped)
  // 光、防ダウン
  // const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const lightDefMapped = charaSkillMapping(lightCidMap, assistDefSidMap, attackSidMap)
  strongSort(lightDefMapped)
  // 光、与アップ
  // const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const lightDmgMapped = charaSkillMapping(lightCidMap, assistDmgSidMap, attackSidMap)
  strongSort(lightDmgMapped)
  // 光、被アップ
  // const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const lightRevMapped = charaSkillMapping(lightCidMap, assistRevSidMap, attackSidMap)
  strongSort(lightRevMapped)
  // 光、クリティカル
  // const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const lightCriMapped = charaSkillMapping(lightCidMap, assistCriSidMap, attackSidMap)
  strongSort(lightCriMapped)

  // 闇、攻アップ
  // const assistAtkSidMap = assistBuffMapping("0", "0", "2")
  const darkCidMap = charaElementMapping("6")
  const darkAtkMapped = charaSkillMapping(darkCidMap, assistAtkSidMap, attackSidMap)
  strongSort(darkAtkMapped)
  // 闇、防ダウン
  // const assistDefSidMap = assistBuffMapping("1", "1", "1")
  const darkDefMapped = charaSkillMapping(darkCidMap, assistDefSidMap, attackSidMap)
  strongSort(darkDefMapped)
  // 闇、与アップ
  // const assistDmgSidMap = assistBuffMapping("2", "0", "2")
  const darkDmgMapped = charaSkillMapping(darkCidMap, assistDmgSidMap, attackSidMap)
  strongSort(darkDmgMapped)
  // 闇、被アップ
  // const assistRevSidMap = assistBuffMapping("3", "0", "1")
  const darkRevMapped = charaSkillMapping(darkCidMap, assistRevSidMap, attackSidMap)
  strongSort(darkRevMapped)
  // 闇、クリティカル
  // const assistCriSidMap = assistBuffMapping("4", "0", "2")
  const darkCriMapped = charaSkillMapping(darkCidMap, assistCriSidMap, attackSidMap)
  strongSort(darkCriMapped)

/*** OUTPUT ***/

  const fireAtk = objectToValues(fireAtkMapped)
  fruBasSheet.getRange(2, 3, 10, fireAtk[0].length).setValues(fireAtk.splice(0,10))
  const fireDef = objectToValues(fireDefMapped)
  fruBasSheet.getRange(12, 3, 10, fireDef[0].length).setValues(fireDef.splice(0,10))
  const fireDmg = objectToValues(fireDmgMapped)
  fruBasSheet.getRange(22, 3, 10, fireDmg[0].length).setValues(fireDmg.splice(0,10))
  const fireRev = objectToValues(fireRevMapped)
  fruBasSheet.getRange(32, 3, 10, fireRev[0].length).setValues(fireRev.splice(0,10))
  const fireCri = objectToValues(fireCriMapped)
  fruBasSheet.getRange(42, 3, 10, fireCri[0].length).setValues(fireCri.splice(0,10))

  const waterAtk = objectToValues(waterAtkMapped)
  fruBasSheet.getRange(52, 3, 10, waterAtk[0].length).setValues(waterAtk.splice(0,10))
  const waterDef = objectToValues(waterDefMapped)
  fruBasSheet.getRange(62, 3, 10, waterDef[0].length).setValues(waterDef.splice(0,10))
  const waterDmg = objectToValues(waterDmgMapped)
  fruBasSheet.getRange(72, 3, 10, waterDmg[0].length).setValues(waterDmg.splice(0,10))
  const waterRev = objectToValues(waterRevMapped)
  fruBasSheet.getRange(82, 3, 10, waterRev[0].length).setValues(waterRev.splice(0,10))
  const waterCri = objectToValues(waterCriMapped)
  fruBasSheet.getRange(92, 3, 10, waterCri[0].length).setValues(waterCri.splice(0,10))

  const earthAtk = objectToValues(earthAtkMapped)
  fruBasSheet.getRange(102, 3, 10, earthAtk[0].length).setValues(earthAtk.splice(0,10))
  const earthDef = objectToValues(earthDefMapped)
  fruBasSheet.getRange(112, 3, 10, earthDef[0].length).setValues(earthDef.splice(0,10))
  const earthDmg = objectToValues(earthDmgMapped)
  fruBasSheet.getRange(122, 3, 10, earthDmg[0].length).setValues(earthDmg.splice(0,10))
  const earthRev = objectToValues(earthRevMapped)
  fruBasSheet.getRange(132, 3, 10, earthRev[0].length).setValues(earthRev.splice(0,10))
  const earthCri = objectToValues(earthCriMapped)
  fruBasSheet.getRange(142, 3, 10, earthCri[0].length).setValues(earthCri.splice(0,10))

  const windAtk = objectToValues(windAtkMapped)
  fruBasSheet.getRange(2, 12, 10, windAtk[0].length).setValues(windAtk.splice(0,10))
  const windDef = objectToValues(windDefMapped)
  fruBasSheet.getRange(12, 12, 10, windDef[0].length).setValues(windDef.splice(0,10))
  const windDmg = objectToValues(windDmgMapped)
  fruBasSheet.getRange(22, 12, 10, windDmg[0].length).setValues(windDmg.splice(0,10))
  const windRev = objectToValues(windRevMapped)
  fruBasSheet.getRange(32, 12, 10, windRev[0].length).setValues(windRev.splice(0,10))
  const windCri = objectToValues(windCriMapped)
  fruBasSheet.getRange(42, 12, 10, windCri[0].length).setValues(windCri.splice(0,10))

  const lightAtk = objectToValues(lightAtkMapped)
  fruBasSheet.getRange(52, 12, 10, lightAtk[0].length).setValues(lightAtk.splice(0,10))
  const lightDef = objectToValues(lightDefMapped)
  fruBasSheet.getRange(62, 12, 10, lightDef[0].length).setValues(lightDef.splice(0,10))
  const lightDmg = objectToValues(lightDmgMapped)
  fruBasSheet.getRange(72, 12, 10, lightDmg[0].length).setValues(lightDmg.splice(0,10))
  const lightRev = objectToValues(lightRevMapped)
  fruBasSheet.getRange(82, 12, 10, lightRev[0].length).setValues(lightRev.splice(0,10))
  const lightCri = objectToValues(lightCriMapped)
  fruBasSheet.getRange(92, 12, 10, lightCri[0].length).setValues(lightCri.splice(0,10))

  const darkAtk = objectToValues(darkAtkMapped)
  fruBasSheet.getRange(102, 12, 10, darkAtk[0].length).setValues(darkAtk.splice(0,10))
  const darkDef = objectToValues(darkDefMapped)
  fruBasSheet.getRange(112, 12, 10, darkDef[0].length).setValues(darkDef.splice(0,10))
  const darkDmg = objectToValues(darkDmgMapped)
  fruBasSheet.getRange(122, 12, 10, darkDmg[0].length).setValues(darkDmg.splice(0,10))
  const darkRev = objectToValues(darkRevMapped)
  fruBasSheet.getRange(132, 12, 10, darkRev[0].length).setValues(darkRev.splice(0,10))
  const darkCri = objectToValues(darkCriMapped)
  fruBasSheet.getRange(142, 12, 10, darkCri[0].length).setValues(darkCri.splice(0,10))

/*** FUNCTION ***/

  function objectToValues(mapped) {
    // スプレッドシート一括挿入用のデータ整形
    const values = mapped.map((f) => {
      let category = categoryMap[f.CATEGORY].substr(0,2)
      let awake = (f.CATEGORY >= 2)? "有" : ""
      let buff = powerMap[f.BUFF]
      let turn = f.TURN
      let effect = `${buff}(${turn}ターン)`
      let power = `${powerMap[f.POWER]}(${rangeMap[f.RANGE]})`
      return [f.NAME, category, awake, effect, power, f.AMAXATK||f.MAXATK]
    })
    return values
  }

  function strongSort(mapped) {
    mapped.sort((a, b) => {
      // バフ効果量の降順
      if(a.BUFF !== b.BUFF) {
        if(a.BUFF > b.BUFF) return -1
        if(a.BUFF < b.BUFF) return 1
      }
      // 効果ターン数の降順
      if(a.TURN !== b.TURN) {
        if(a.TURN > b.TURN) return -1
        if(a.TURN < b.TURN) return 1
      }
      // 攻撃範囲の昇順
      if(a.RANGE !== b.RANGE) {
        if(a.RANGE > b.RANGE) return 1
        if(a.RANGE < b.RANGE) return -1
      }
      // スキル火力の降順
      if(a.POWER !== b.POWER) {
        if(a.POWER > b.POWER) return -1
        if(a.POWER < b.POWER) return 1
      }
      // 攻撃力の降順
      const aATK = a.AMAXATK || a.MAXATK
      const bATK = b.AMAXATK || b.MAXATK
      if(aATK !== bATK) {
        if(aATK > bATK) return -1
        if(aATK < bATK) return 1
      }
      return 0
    })
  }

  function charaSkillMapping(elemCidMap, buffSidMap, attackSidMap) {
    const charaSkillMapped = skill.reduce((acc, value) => {
      if(!elemCidMap.get(value.CID)) return acc // 対象属性でなければスルー
      if(!buffSidMap.get(value.SID)) return acc // 対象バフスキルでなければスルー
      if(!attackSidMap.get(value.SID)) return acc // 攻撃スキルでなければスルー

      Object.assign(value, elemCidMap.get(value.CID)) // 属性キャラのプロパティを追加
      Object.assign(value, buffSidMap.get(value.SID)) // バフキャラのプロパティを追加
      Object.assign(value, attackSidMap.get(value.SID)) // 攻撃スキルキャラのプロパティを追加
      return [...acc, value]
    }, [])
    return charaSkillMapped
  }

  function assistBuffMapping(action, buff, target) { // buff(0:アップ, 1:ダウン) target(0:自身, 1:敵, 2:味方)
    const assistMapped = assist.reduce((acc, a) => {
      if(a.ASST_TARGET === target && (a.ASST_RANGE === "0" || a.ASST_RANGE === "1") && a.ASST_ACTION === action && a.ASST_BUFF === buff){
        return [...acc, {SID:a.SID, TURN:a.ASST_TURN, SEASON:a.ASST_SEASON, ELEM:a.ASST_ELEM, BUFF:a.ASST_POWER}]
      }
      return acc
    }, [])
    // スキルIDでインデックス化
    // 1つのスキルで補助効果を2つ以上持つキャラが何人もいるため、この仕様でMapはキーを上書きするバグの素
    // 回避するためにはループを回して1:Nで照合する（重い）
    // もしくは、攻撃力アップなどのスキル効果の検索項目を1つにするなど、限定した使い方をする必要がある
    const assistSidMap = new Map()
    for (const a of assistMapped) {
      assistSidMap.set(a.SID, a)
      delete a.SID
    }
    return assistSidMap
  }

  function charaElementMapping(elem) {
    const elementMapped = chara.reduce((acc, c) => {
      if(c.ELEM === elem) {
        return [...acc, {CID:c.CID, NAME:c.NAME, MAXATK:c.MAXATK, AMAXATK:c.AMAXATK}]
      }
      return acc
    }, [])
    // キャラIDでインデックス化
    const elementCidMap = new Map()
    for (const elem of elementMapped) {
      elementCidMap.set(elem.CID, elem)
      delete elem.CID
    }
    return elementCidMap
  }

}
