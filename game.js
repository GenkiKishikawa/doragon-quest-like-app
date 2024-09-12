// game.js を作成
// HP / MP の表記は、 現在HP/最大HP 現在MP/最大MP とする
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

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

  // このメソッドを修正して、キャラクターのステータスを表示する
  showCharacterStatus() {
    let startY = 40 // 初期位置
    this.characterList.forEach(chara => {
      ctx.font = `20px serif`;
      ctx.fillStyle = "#ffffff"
      ctx.fillText(
        `${chara.name}  ${chara.hp}  ${chara.mp}`,
        140,
        startY
      )
      startY += 26
    })
  }

  showMonsters() {
    this.monsterList.forEach(monster => {
      monster.draw()
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
  constructor(name, hp, mp, speed, attack, defense, charaName, posX) {
    this.name = name;
    this.hp = hp;
    this.mp = mp;
    this.speed = speed;
    this.attack = attack;
    this.defense = defense;
    // canvas に描画するための情報
    this.posX = posX;
    this.posY = 200;
    this.sizeX = 100;
    this.sizeY = 100;
    this.image = new Image();
    this.image.src = `./lesson1/images/${charaName}.png`;
  }

  // 描画する処理を追加してください
  draw() {
    if (this.hp <= 0) {
      return;
    }
    ctx.drawImage(this.image, this.posX, this.posY, this.sizeX, this.sizeY);
  }
}

var chara1 = new PlayerCharacter("アベル", 100, 0, 70, 100, 100);
var chara2 = new PlayerCharacter("カイン", 100, 10, 60, 100, 100);
var chara3 = new PlayerCharacter("プリン", 100, 30, 50, 100, 100);

var moster1 = new MonsterCharacter("あばれざる", 100, 80, 0, 100, 100, "a1", 140);
var moster2 = new MonsterCharacter("おおがらす", 100, 55, 0, 100, 100, "b2", 250);
var moster3 = new MonsterCharacter("まどうし", 100, 45, 50, 100, 100, "slime", 370);

var gameManager = new GameManager();
gameManager.addCharacter(chara1);
gameManager.addCharacter(chara2);
gameManager.addCharacter(chara3);
gameManager.addMonster(moster1);
gameManager.addMonster(moster2);
gameManager.addMonster(moster3);

// 100ms ごとに画面を更新する
setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  gameManager.showCharacterStatus()
  gameManager.showMonsters()

  // バトルに勝利したか判定する
  // モンスターの全てのHPが0以下になったら勝利
  if (gameManager.monsterList.every(monster => monster.hp <= 0)) {
    ctx.font = `50px serif`;
    ctx.fillStyle = "#ffffff"
    ctx.fillText(
      `バトルに勝利しました`,
      50,
      200
    )
  }

  // バトルに敗北したか判定する
  // キャラクターの全てのHPが0以下になったら敗北
  if (gameManager.characterList.every(chara => chara.hp <= 0)) {
    ctx.font = `50px serif`;
    ctx.fillStyle = "red"
    ctx.fillText(
      `バトルに敗北しました`,
      50,
      200
    )
  }
}, 100)
