// game.js を作成
// HP / MP の表記は、 現在HP/最大HP 現在MP/最大MP とする

// ゲーム
class GameManager {
  constructor() {
    this.characterList = []; // キャラのHP/MPなど...
    this.monsterList = []; // 敵のHP/MPなど...
    this.characterActionList = []; // キャラが選択した行動
    this.monsterActionList = []; // 敵が選択した行動
    this.battleStatus = 0; //
  }

  addCharacter(character) {
    this.characterList.push(character);
  }

  showCharacterStatus() {
    this.characterList.forEach(chara => {
      console.log(chara)
    })
  }

  addMonster(monster) {
    this.monsterList.push(monster);
  }

  // 行動順を決定するメソッド
  decideActionOrder() {
    // キャラクターのリストと、モンスターのリストを結合する
    var array = this.characterList.concat(this.monsterList);

    // スピード * 係数をランダムで全てのキャラにセット
    var s_array = array.map((chara) => {
      chara.speed = chara.speed * (0.8 + Math.random() * 0.4);
      return chara;
    });

    return s_array.sort((a, b) => a.speed - b.speed);
  }
}

class PlayerCharacter {
  constructor(name, hp, mp, speed, attack, defense) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
  }
}

class MonsterCharacter {
  constructor(name, hp, mp, speed, attack, defense) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
  }
}

var chara1 = new PlayerCharacter("アベル", 100, 0, 70, 100, 100);
var chara2 = new PlayerCharacter("カイン", 100, 10, 60, 100, 100);
var chara3 = new PlayerCharacter("プリン", 100, 30, 50, 100, 100);

var moster1 = new MonsterCharacter("あばれざる", 100, 80, 0, 100, 100);
var moster2 = new MonsterCharacter("おおがらす", 100, 55, 0, 100, 100);
var moster3 = new MonsterCharacter("まどうし", 100, 45, 50, 100, 100);

var gameManager = new GameManager();
gameManager.addCharacter(chara1);
gameManager.addCharacter(chara2);
gameManager.addCharacter(chara3);
gameManager.addMonster(moster1);
gameManager.addMonster(moster2);
gameManager.addMonster(moster3);

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")


ctx.font = `20px serif`;
ctx.fillStyle = "blue"
ctx.fillText(
  'おはよう',
  140,
  140
)
ctx.fillText(
  'おやすみ',
  140,
  200
)

gameManager.showCharacterStatus()