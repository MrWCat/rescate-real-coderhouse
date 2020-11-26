const HP = "HP";
const SWORD = "Sword";
const SHIELD = "Shield";
const ACC = "Accessory";

const ENEMY = "Enemy";
const CAMP = "Camp";
const DRAGON = "Dragon";
const PRINCE = "Prince";

const PLAYING = "Playing";
const GAME_OVER = "Game Over";

const NO_STANCE = "no-stance"; // las posiciones usan los nombres de los IDs del HTML.
const OFFENSIVE = "off-stance";
const DEFENSIVE = "def-stance";

const IMG_DIE_1 = "assets/images/inverted-dice-1.png";
const IMG_DIE_2 = "assets/images/inverted-dice-2.png";
const IMG_DIE_3 = "assets/images/inverted-dice-3.png";
const IMG_DIE_4 = "assets/images/inverted-dice-4.png";
const IMG_DIE_5 = "assets/images/inverted-dice-5.png";
const IMG_DIE_6 = "assets/images/inverted-dice-6.png";

const IMG_CARD = "assets/images/card-random.png";
const IMG_CAMP = "assets/images/camping-tent.png"
const IMG_DRAGON = "assets/images/spiked-dragon-head.png"
const IMG_PRINCE = "assets/images/heart-tower.png"
const IMG_KOBOLD = "assets/images/triton-head.png";
const IMG_SLIME = "assets/images/vile-fluid.png";
const IMG_SWORD = "assets/images/two-handed-sword.png";
const IMG_SHIELD = "assets/images/checked-shield.png";
const IMG_COMPASS = "assets/images/compass.png";
const IMG_POTION = "assets/images/health-potion.png";

const IMG_DEAD = "assets/images/skull-crossed-bones.png";
const IMG_LOOTED = "assets/images/open-chest.png";

const $descText = $("#desc-text");
const $hpText = $("#hp");
const $maxHPText = $("#hp-max");
const $swordsText = $("#swords");
const $shieldsText = $("#shields");
const $accsText = $("#accessories");

const $dice1 = $("#dice-1");
const $dice2 = $("#dice-2");
const $combatDice = $("#combat-dice");

const $rollButton = $("#roll-button");
const $rollCombatButton = $("#roll-combat-button");

const $mapButtons = $(".board-square")

const $newGameButton = $("#new-game");
const $loadGameButton = $("#load-game");
const $saveGameButton = $("#save-game");
const $dailyGameButton = $("#daily-game")

const $controlPanels = $(".control-panel");
const $stanceButtons = $(".stance-button");

let movementDice = [-1, -1];
let currentPos = [1, 1];
let chosenStance = NO_STANCE;

let player = "";
let map = "";
let tileDeck = [];
let gameState = GAME_OVER;