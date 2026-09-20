"use strict";

// Grila este de două ori mai deasă decât în prima versiune.
const COLS = 20;
const ROWS = 28;
const MAX_LIVES = 3;
const LIFE_REGEN_MS = 5 * 60 * 1000;
const STORAGE_KEY = "arrowEscapeReferenceV2";
const MIN_ZOOM = 0.45;
const MAX_ZOOM = 4.5;
// Nivelul 1 este pregătit și verificat dinainte, pentru aspectul dens din referință.
const CURATED_LEVEL_ONE = {"arrows":[{"id":1,"cells":[{"x":10,"y":7},{"x":11,"y":7},{"x":12,"y":7},{"x":13,"y":7},{"x":13,"y":6},{"x":13,"y":5},{"x":13,"y":4},{"x":13,"y":3},{"x":13,"y":2},{"x":13,"y":1},{"x":13,"y":0}],"dir":{"dx":0,"dy":-1},"createdAt":0},{"id":2,"cells":[{"x":1,"y":2},{"x":1,"y":1},{"x":1,"y":0},{"x":0,"y":0}],"dir":{"dx":-1,"dy":0},"createdAt":1},{"id":3,"cells":[{"x":0,"y":1},{"x":0,"y":2},{"x":0,"y":3},{"x":1,"y":3},{"x":2,"y":3},{"x":2,"y":2},{"x":2,"y":1},{"x":2,"y":0},{"x":3,"y":0},{"x":4,"y":0},{"x":4,"y":1},{"x":4,"y":2},{"x":4,"y":3},{"x":4,"y":4},{"x":4,"y":5},{"x":4,"y":6},{"x":4,"y":7},{"x":4,"y":8},{"x":4,"y":9},{"x":4,"y":10},{"x":5,"y":10},{"x":5,"y":9},{"x":5,"y":8},{"x":5,"y":7},{"x":5,"y":6},{"x":5,"y":5}],"dir":{"dx":0,"dy":-1},"createdAt":2},{"id":4,"cells":[{"x":8,"y":1},{"x":7,"y":1},{"x":7,"y":0},{"x":6,"y":0},{"x":6,"y":1},{"x":6,"y":2},{"x":6,"y":3},{"x":6,"y":4},{"x":5,"y":4},{"x":5,"y":3},{"x":5,"y":2},{"x":5,"y":1},{"x":5,"y":0}],"dir":{"dx":0,"dy":-1},"createdAt":3},{"id":5,"cells":[{"x":8,"y":0},{"x":9,"y":0},{"x":10,"y":0},{"x":10,"y":1},{"x":9,"y":1}],"dir":{"dx":-1,"dy":0},"createdAt":4},{"id":6,"cells":[{"x":12,"y":1},{"x":12,"y":0},{"x":11,"y":0},{"x":11,"y":1}],"dir":{"dx":0,"dy":1},"createdAt":5},{"id":7,"cells":[{"x":17,"y":1},{"x":18,"y":1},{"x":18,"y":2},{"x":17,"y":2},{"x":16,"y":2},{"x":16,"y":1},{"x":15,"y":1},{"x":15,"y":2},{"x":15,"y":3},{"x":15,"y":4},{"x":15,"y":5},{"x":15,"y":6},{"x":15,"y":7},{"x":15,"y":8},{"x":15,"y":9},{"x":15,"y":10},{"x":16,"y":10},{"x":16,"y":9},{"x":16,"y":8},{"x":16,"y":7},{"x":16,"y":6},{"x":16,"y":5},{"x":16,"y":4},{"x":16,"y":3},{"x":17,"y":3},{"x":18,"y":3},{"x":19,"y":3},{"x":19,"y":2},{"x":19,"y":1},{"x":19,"y":0},{"x":18,"y":0},{"x":17,"y":0},{"x":16,"y":0},{"x":15,"y":0},{"x":14,"y":0},{"x":14,"y":1},{"x":14,"y":2},{"x":14,"y":3},{"x":14,"y":4},{"x":14,"y":5},{"x":14,"y":6}],"dir":{"dx":0,"dy":1},"createdAt":6},{"id":8,"cells":[{"x":3,"y":1},{"x":3,"y":2},{"x":3,"y":3},{"x":3,"y":4},{"x":3,"y":5},{"x":3,"y":6},{"x":3,"y":7},{"x":3,"y":8},{"x":3,"y":9},{"x":3,"y":10},{"x":3,"y":11},{"x":3,"y":12},{"x":3,"y":13},{"x":3,"y":14},{"x":3,"y":15},{"x":3,"y":16}],"dir":{"dx":0,"dy":1},"createdAt":7},{"id":9,"cells":[{"x":19,"y":5},{"x":19,"y":6},{"x":19,"y":7},{"x":19,"y":8},{"x":19,"y":9},{"x":19,"y":10},{"x":19,"y":11},{"x":18,"y":11},{"x":17,"y":11},{"x":16,"y":11},{"x":15,"y":11},{"x":14,"y":11},{"x":13,"y":11},{"x":12,"y":11},{"x":11,"y":11},{"x":10,"y":11},{"x":9,"y":11},{"x":9,"y":10},{"x":9,"y":9},{"x":9,"y":8},{"x":9,"y":7},{"x":9,"y":6},{"x":10,"y":6},{"x":11,"y":6},{"x":12,"y":6},{"x":12,"y":5},{"x":12,"y":4},{"x":12,"y":3},{"x":12,"y":2},{"x":11,"y":2},{"x":10,"y":2},{"x":9,"y":2},{"x":8,"y":2},{"x":7,"y":2},{"x":7,"y":3},{"x":7,"y":4},{"x":7,"y":5},{"x":7,"y":6},{"x":7,"y":7},{"x":6,"y":7},{"x":6,"y":8},{"x":6,"y":9},{"x":6,"y":10},{"x":6,"y":11},{"x":5,"y":11},{"x":5,"y":12},{"x":5,"y":13},{"x":6,"y":13},{"x":7,"y":13},{"x":8,"y":13},{"x":9,"y":13},{"x":10,"y":13},{"x":11,"y":13}],"dir":{"dx":1,"dy":0},"createdAt":8},{"id":10,"cells":[{"x":10,"y":4},{"x":9,"y":4},{"x":8,"y":4},{"x":8,"y":3},{"x":9,"y":3},{"x":10,"y":3},{"x":11,"y":3},{"x":11,"y":4},{"x":11,"y":5},{"x":10,"y":5},{"x":9,"y":5}],"dir":{"dx":-1,"dy":0},"createdAt":9},{"id":11,"cells":[{"x":17,"y":8},{"x":17,"y":9},{"x":17,"y":10},{"x":18,"y":10},{"x":18,"y":9},{"x":18,"y":8},{"x":18,"y":7},{"x":17,"y":7},{"x":17,"y":6},{"x":17,"y":5},{"x":17,"y":4}],"dir":{"dx":0,"dy":-1},"createdAt":10},{"id":12,"cells":[{"x":18,"y":6},{"x":18,"y":5},{"x":18,"y":4},{"x":19,"y":4}],"dir":{"dx":1,"dy":0},"createdAt":11},{"id":13,"cells":[{"x":1,"y":5},{"x":1,"y":6},{"x":1,"y":7},{"x":1,"y":8},{"x":1,"y":9},{"x":1,"y":10},{"x":1,"y":11},{"x":1,"y":12},{"x":0,"y":12},{"x":0,"y":11},{"x":0,"y":10},{"x":0,"y":9},{"x":0,"y":8},{"x":0,"y":7},{"x":0,"y":6},{"x":0,"y":5},{"x":0,"y":4},{"x":1,"y":4},{"x":2,"y":4},{"x":2,"y":5},{"x":2,"y":6},{"x":2,"y":7},{"x":2,"y":8},{"x":2,"y":9},{"x":2,"y":10},{"x":2,"y":11},{"x":2,"y":12},{"x":2,"y":13},{"x":2,"y":14},{"x":2,"y":15}],"dir":{"dx":0,"dy":1},"createdAt":12},{"id":14,"cells":[{"x":6,"y":5},{"x":6,"y":6}],"dir":{"dx":0,"dy":1},"createdAt":13},{"id":15,"cells":[{"x":8,"y":5},{"x":8,"y":6},{"x":8,"y":7},{"x":8,"y":8},{"x":8,"y":9},{"x":8,"y":10},{"x":8,"y":11}],"dir":{"dx":0,"dy":1},"createdAt":14},{"id":16,"cells":[{"x":14,"y":7},{"x":14,"y":8},{"x":13,"y":8},{"x":12,"y":8},{"x":11,"y":8},{"x":10,"y":8}],"dir":{"dx":-1,"dy":0},"createdAt":15},{"id":17,"cells":[{"x":6,"y":12},{"x":7,"y":12},{"x":7,"y":11},{"x":7,"y":10},{"x":7,"y":9},{"x":7,"y":8}],"dir":{"dx":0,"dy":-1},"createdAt":16},{"id":18,"cells":[{"x":13,"y":10},{"x":12,"y":10},{"x":11,"y":10},{"x":10,"y":10},{"x":10,"y":9},{"x":11,"y":9},{"x":12,"y":9},{"x":13,"y":9},{"x":14,"y":9},{"x":14,"y":10}],"dir":{"dx":0,"dy":1},"createdAt":17},{"id":19,"cells":[{"x":4,"y":13},{"x":4,"y":12},{"x":4,"y":11}],"dir":{"dx":0,"dy":-1},"createdAt":18},{"id":20,"cells":[{"x":19,"y":12},{"x":18,"y":12},{"x":17,"y":12},{"x":16,"y":12},{"x":15,"y":12},{"x":14,"y":12},{"x":13,"y":12},{"x":12,"y":12},{"x":11,"y":12},{"x":10,"y":12},{"x":9,"y":12},{"x":8,"y":12}],"dir":{"dx":-1,"dy":0},"createdAt":19},{"id":21,"cells":[{"x":2,"y":21},{"x":2,"y":22},{"x":1,"y":22},{"x":1,"y":21},{"x":1,"y":20},{"x":2,"y":20},{"x":3,"y":20},{"x":4,"y":20},{"x":4,"y":19},{"x":3,"y":19},{"x":2,"y":19},{"x":1,"y":19},{"x":1,"y":18},{"x":1,"y":17},{"x":1,"y":16},{"x":1,"y":15},{"x":1,"y":14},{"x":1,"y":13},{"x":0,"y":13},{"x":0,"y":14},{"x":0,"y":15},{"x":0,"y":16},{"x":0,"y":17},{"x":0,"y":18},{"x":0,"y":19},{"x":0,"y":20},{"x":0,"y":21},{"x":0,"y":22},{"x":0,"y":23},{"x":1,"y":23},{"x":2,"y":23},{"x":2,"y":24},{"x":3,"y":24},{"x":3,"y":23},{"x":3,"y":22},{"x":3,"y":21},{"x":4,"y":21},{"x":5,"y":21},{"x":6,"y":21},{"x":7,"y":21},{"x":8,"y":21},{"x":9,"y":21},{"x":10,"y":21},{"x":11,"y":21},{"x":12,"y":21},{"x":13,"y":21},{"x":14,"y":21},{"x":14,"y":20},{"x":15,"y":20},{"x":15,"y":21},{"x":15,"y":22},{"x":15,"y":23},{"x":15,"y":24},{"x":15,"y":25}],"dir":{"dx":0,"dy":1},"createdAt":20},{"id":22,"cells":[{"x":5,"y":19},{"x":5,"y":20},{"x":6,"y":20},{"x":6,"y":19},{"x":6,"y":18},{"x":5,"y":18},{"x":4,"y":18},{"x":4,"y":17},{"x":4,"y":16},{"x":4,"y":15},{"x":4,"y":14},{"x":5,"y":14},{"x":6,"y":14},{"x":7,"y":14},{"x":8,"y":14},{"x":9,"y":14},{"x":9,"y":15},{"x":9,"y":16},{"x":9,"y":17},{"x":9,"y":18},{"x":9,"y":19},{"x":9,"y":20},{"x":10,"y":20},{"x":11,"y":20},{"x":12,"y":20},{"x":12,"y":19},{"x":12,"y":18},{"x":12,"y":17},{"x":12,"y":16},{"x":12,"y":15},{"x":12,"y":14},{"x":12,"y":13},{"x":13,"y":13},{"x":14,"y":13},{"x":15,"y":13},{"x":16,"y":13},{"x":17,"y":13},{"x":18,"y":13},{"x":19,"y":13},{"x":19,"y":14},{"x":19,"y":15},{"x":19,"y":16},{"x":19,"y":17},{"x":19,"y":18},{"x":19,"y":19},{"x":19,"y":20},{"x":19,"y":21},{"x":19,"y":22},{"x":19,"y":23},{"x":19,"y":24}],"dir":{"dx":0,"dy":1},"createdAt":21},{"id":23,"cells":[{"x":13,"y":20},{"x":13,"y":19},{"x":13,"y":18},{"x":13,"y":17},{"x":13,"y":16},{"x":13,"y":15},{"x":13,"y":14}],"dir":{"dx":0,"dy":-1},"createdAt":22},{"id":24,"cells":[{"x":10,"y":19},{"x":10,"y":18},{"x":10,"y":17},{"x":10,"y":16},{"x":10,"y":15},{"x":10,"y":14},{"x":11,"y":14},{"x":11,"y":15},{"x":11,"y":16},{"x":11,"y":17},{"x":11,"y":18},{"x":11,"y":19}],"dir":{"dx":0,"dy":1},"createdAt":23},{"id":25,"cells":[{"x":17,"y":15},{"x":17,"y":16},{"x":17,"y":17},{"x":16,"y":17},{"x":16,"y":18},{"x":16,"y":19},{"x":15,"y":19},{"x":15,"y":18},{"x":15,"y":17},{"x":15,"y":16},{"x":15,"y":15},{"x":15,"y":14},{"x":14,"y":14},{"x":14,"y":15},{"x":14,"y":16},{"x":14,"y":17},{"x":14,"y":18},{"x":14,"y":19}],"dir":{"dx":0,"dy":1},"createdAt":24},{"id":26,"cells":[{"x":17,"y":14},{"x":18,"y":14},{"x":18,"y":15},{"x":18,"y":16},{"x":18,"y":17},{"x":18,"y":18},{"x":18,"y":19},{"x":18,"y":20},{"x":18,"y":21},{"x":18,"y":22},{"x":18,"y":23},{"x":18,"y":24},{"x":17,"y":24},{"x":16,"y":24},{"x":16,"y":23},{"x":16,"y":22},{"x":16,"y":21},{"x":16,"y":20}],"dir":{"dx":0,"dy":-1},"createdAt":25},{"id":27,"cells":[{"x":16,"y":16},{"x":16,"y":15},{"x":16,"y":14}],"dir":{"dx":0,"dy":-1},"createdAt":26},{"id":28,"cells":[{"x":5,"y":15},{"x":5,"y":16},{"x":5,"y":17}],"dir":{"dx":0,"dy":1},"createdAt":27},{"id":29,"cells":[{"x":7,"y":20},{"x":8,"y":20},{"x":8,"y":19},{"x":7,"y":19},{"x":7,"y":18},{"x":7,"y":17},{"x":7,"y":16},{"x":7,"y":15},{"x":6,"y":15},{"x":6,"y":16},{"x":6,"y":17}],"dir":{"dx":0,"dy":1},"createdAt":28},{"id":30,"cells":[{"x":8,"y":15},{"x":8,"y":16},{"x":8,"y":17},{"x":8,"y":18}],"dir":{"dx":0,"dy":1},"createdAt":29},{"id":31,"cells":[{"x":2,"y":16},{"x":2,"y":17},{"x":3,"y":17},{"x":3,"y":18},{"x":2,"y":18}],"dir":{"dx":-1,"dy":0},"createdAt":30},{"id":32,"cells":[{"x":17,"y":18},{"x":17,"y":19},{"x":17,"y":20},{"x":17,"y":21},{"x":17,"y":22},{"x":17,"y":23}],"dir":{"dx":0,"dy":1},"createdAt":31},{"id":33,"cells":[{"x":5,"y":26},{"x":6,"y":26},{"x":7,"y":26},{"x":8,"y":26},{"x":8,"y":27},{"x":7,"y":27},{"x":6,"y":27},{"x":5,"y":27},{"x":4,"y":27},{"x":4,"y":26},{"x":4,"y":25},{"x":4,"y":24},{"x":4,"y":23},{"x":4,"y":22},{"x":5,"y":22},{"x":5,"y":23},{"x":5,"y":24},{"x":5,"y":25},{"x":6,"y":25},{"x":7,"y":25},{"x":8,"y":25},{"x":9,"y":25},{"x":10,"y":25},{"x":11,"y":25},{"x":12,"y":25},{"x":13,"y":25},{"x":14,"y":25}],"dir":{"dx":1,"dy":0},"createdAt":32},{"id":34,"cells":[{"x":6,"y":22},{"x":7,"y":22},{"x":8,"y":22},{"x":9,"y":22},{"x":10,"y":22},{"x":11,"y":22},{"x":12,"y":22},{"x":13,"y":22},{"x":14,"y":22},{"x":14,"y":23},{"x":13,"y":23},{"x":12,"y":23},{"x":11,"y":23}],"dir":{"dx":-1,"dy":0},"createdAt":33},{"id":35,"cells":[{"x":6,"y":23},{"x":6,"y":24},{"x":7,"y":24},{"x":8,"y":24},{"x":9,"y":24},{"x":10,"y":24},{"x":10,"y":23},{"x":9,"y":23},{"x":8,"y":23},{"x":7,"y":23}],"dir":{"dx":-1,"dy":0},"createdAt":34},{"id":36,"cells":[{"x":14,"y":24},{"x":13,"y":24},{"x":12,"y":24},{"x":11,"y":24}],"dir":{"dx":-1,"dy":0},"createdAt":35},{"id":37,"cells":[{"x":2,"y":26},{"x":2,"y":25},{"x":3,"y":25},{"x":3,"y":26},{"x":3,"y":27},{"x":2,"y":27},{"x":1,"y":27},{"x":1,"y":26},{"x":1,"y":25},{"x":1,"y":24},{"x":0,"y":24},{"x":0,"y":25},{"x":0,"y":26},{"x":0,"y":27}],"dir":{"dx":0,"dy":1},"createdAt":36},{"id":38,"cells":[{"x":18,"y":25},{"x":19,"y":25}],"dir":{"dx":1,"dy":0},"createdAt":37},{"id":39,"cells":[{"x":16,"y":25},{"x":17,"y":25},{"x":17,"y":26},{"x":18,"y":26},{"x":19,"y":26}],"dir":{"dx":1,"dy":0},"createdAt":38},{"id":40,"cells":[{"x":12,"y":26},{"x":13,"y":26},{"x":14,"y":26},{"x":14,"y":27},{"x":13,"y":27},{"x":12,"y":27},{"x":11,"y":27},{"x":10,"y":27},{"x":9,"y":27},{"x":9,"y":26}],"dir":{"dx":0,"dy":-1},"createdAt":39},{"id":41,"cells":[{"x":10,"y":26},{"x":11,"y":26}],"dir":{"dx":1,"dy":0},"createdAt":40},{"id":42,"cells":[{"x":19,"y":27},{"x":18,"y":27},{"x":17,"y":27},{"x":16,"y":27},{"x":15,"y":27},{"x":15,"y":26},{"x":16,"y":26}],"dir":{"dx":1,"dy":0},"createdAt":41}],"solution":[1,2,4,3,12,19,37,38,39,42,21,22,9,17,31,8,5,13,20,33,28,35,34,29,14,30,15,10,16,36,40,25,18,7,11,23,27,26,32,41,24,6],"score":0,"blocked":35};

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
document.documentElement.style.setProperty("--game-background", GAME_CONFIG.backgroundColor);
const boardCard = document.getElementById("boardCard");
const boardMessage = document.getElementById("boardMessage");
const levelName = document.getElementById("levelName");
const heartsElement = document.getElementById("hearts");
const lifeTimer = document.getElementById("lifeTimer");
const coinsElement = document.getElementById("coins");
const starsElement = document.getElementById("stars");
const restartButton = document.getElementById("restartButton");
const backButton = document.getElementById("backButton");
const modal = document.getElementById("modal");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalPrimary = document.getElementById("modalPrimary");
const modalSecondary = document.getElementById("modalSecondary");
const toast = document.getElementById("toast");
const undoButton = document.getElementById("undoButton");

let state = loadState();
let level = null;
let arrows = [];
let initialCount = 0;
let selectedId = null;
let movingArrows = [];
let animationFrameId = null;
let toastTimer = null;
let messageTimer = null;
let lastFrame = performance.now();
let viewport = { scale: 1, panX: 0, panY: 0 };
let undoStack = [];
const activePointers = new Map();
let gesture = null;
let suppressTap = false;

function defaultState() {
  return {
    currentLevel: 1,
    coins: 0,
    stars: 45,
    lives: MAX_LIVES,
    nextLifeAt: null,
    tutorialSeen: false,
    completedLevels: []
  };
}

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return defaultState();
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Unele telefoane blochează localStorage pentru fișiere deschise prin content://.
    // Jocul continuă să funcționeze, dar progresul nu se păstrează după închidere.
  }
}

function cloneArrowList(items) {
  return items.map(arrow => ({
    ...arrow,
    cells: arrow.cells.map(cell => ({ ...cell })),
    dir: { ...arrow.dir }
  }));
}

function snapshotGameState() {
  return {
    arrows: cloneArrowList(arrows),
    selectedId,
    movingArrows: movingArrows.map(moving => ({
      ...moving,
      arrow: {
        ...moving.arrow,
        cells: moving.arrow.cells.map(cell => ({ ...cell })),
        dir: { ...moving.arrow.dir }
      },
      route: moving.route.map(cell => ({ ...cell })),
      renderCells: moving.renderCells.map(cell => ({ ...cell }))
    }))
  };
}

function restoreGameState(snapshot) {
  if (!snapshot) return;
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  arrows = cloneArrowList(snapshot.arrows);
  selectedId = snapshot.selectedId;
  movingArrows = snapshot.movingArrows.map(moving => ({
    ...moving,
    arrow: {
      ...moving.arrow,
      cells: moving.arrow.cells.map(cell => ({ ...cell })),
      dir: { ...moving.arrow.dir }
    },
    route: moving.route.map(cell => ({ ...cell })),
    renderCells: moving.renderCells.map(cell => ({ ...cell }))
  }));
  updateUI();
  draw();
}

function pushUndoState() {
  undoStack.push(snapshotGameState());
  if (undoStack.length > 12) undoStack.shift();
}

function undoMove() {
  if (!undoStack.length) {
    showToast("Nimic de anulat");
    return;
  }
  const snapshot = undoStack.pop();
  restoreGameState(snapshot);
  showToast("Ultima mișcare a fost anulată");
}

function showTutorial() {
  if (state.tutorialSeen) return;
  state.tutorialSeen = true;
  saveState();
  showModal({
    icon: "🎯",
    title: "Tutorial rapid",
    text: "Apasă pe o săgeată care are drum liber. Dacă alegi una blocată, pierzi o viață. Alege cu răbdare următorul pas.",
    primaryText: "START",
    onPrimary: () => {
      hideModal();
      draw();
    }
  });
}

function mulberry32(seed) {
  return function random() {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function cellKey(cell) {
  return `${cell.x},${cell.y}`;
}

function occupiedSet(items, excludedId = null) {
  const occupied = new Set();
  for (const arrow of items) {
    if (arrow.id === excludedId) continue;
    for (const cell of arrow.cells) occupied.add(cellKey(cell));
  }
  return occupied;
}

function isInsideBoard(cell) {
  return cell.x >= 0 && cell.x < COLS && cell.y >= 0 && cell.y < ROWS;
}

function nextSnakePosition(cells, dir) {
  const head = cells[cells.length - 1];
  const nextHead = { x: head.x + dir.dx, y: head.y + dir.dy };
  return [...cells.slice(1), nextHead];
}

function canExit(arrow, items = arrows) {
  const occupied = occupiedSet(items, arrow.id);
  let snake = arrow.cells.map(cell => ({ ...cell }));
  const safetyLimit = arrow.cells.length + COLS + ROWS + 5;

  for (let step = 0; step < safetyLimit && snake.some(isInsideBoard); step++) {
    const head = snake[snake.length - 1];
    const nextHead = { x: head.x + arrow.dir.dx, y: head.y + arrow.dir.dy };

    // Capul nu poate trece nici prin altă săgeată, nici peste propriul corp.
    // Prima celulă (coada) este exclusă deoarece se eliberează în același pas.
    if (isInsideBoard(nextHead) && occupied.has(cellKey(nextHead))) return false;
    const ownBody = new Set(snake.slice(1).map(cellKey));
    if (ownBody.has(cellKey(nextHead))) return false;
    snake = [...snake.slice(1), nextHead];
  }
  return !snake.some(isInsideBoard);
}

function buildSnakeRoute(arrow) {
  const route = arrow.cells.map(cell => ({ ...cell }));
  let snake = arrow.cells.map(cell => ({ ...cell }));
  let travelSteps = 0;
  const safetyLimit = arrow.cells.length + COLS + ROWS + 5;

  for (let step = 0; step < safetyLimit && snake.some(isInsideBoard); step++) {
    snake = nextSnakePosition(snake, arrow.dir);
    route.push({ ...snake[snake.length - 1] });
    travelSteps++;
  }
  return { route, travelSteps, bodyLength: arrow.cells.length - 1 };
}

function pointAlongRoute(route, distance) {
  const safeDistance = Math.max(0, Math.min(distance, route.length - 1));
  const index = Math.min(Math.floor(safeDistance), route.length - 2);
  const progress = safeDistance - index;
  const from = route[index];
  const to = route[index + 1];
  return {
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress
  };
}

// Taie o porțiune din traseul ortogonal. Punctele de colț sunt păstrate,
// astfel încât corpul nu formează niciodată diagonale în timpul animației.
function sliceOrthogonalRoute(route, startDistance, endDistance) {
  const points = [pointAlongRoute(route, startDistance)];
  const firstCorner = Math.floor(startDistance) + 1;
  const lastCorner = Math.ceil(endDistance) - 1;

  for (let distance = firstCorner; distance <= lastCorner; distance++) {
    if (distance > startDistance && distance < endDistance && route[distance]) {
      points.push({ ...route[distance] });
    }
  }
  points.push(pointAlongRoute(route, endDistance));
  return points;
}

function countBends(cells) {
  let bends = 0;
  for (let index = 2; index < cells.length; index++) {
    const a = cells[index - 2];
    const b = cells[index - 1];
    const c = cells[index];
    if ((b.x - a.x) !== (c.x - b.x) || (b.y - a.y) !== (c.y - b.y)) bends++;
  }
  return bends;
}

function validateKnownSolution(items, solution) {
  const remaining = items.map(arrow => ({
    ...arrow,
    cells: arrow.cells.map(cell => ({ ...cell })),
    dir: { ...arrow.dir }
  }));

  for (const id of solution) {
    const index = remaining.findIndex(arrow => arrow.id === id);
    if (index === -1 || !canExit(remaining[index], remaining)) return false;
    remaining.splice(index, 1);
  }
  return remaining.length === 0;
}

function copyLevel(source) {
  return {
    ...source,
    arrows: source.arrows.map(arrow => ({
      ...arrow,
      cells: arrow.cells.map(cell => ({ ...cell })),
      dir: { ...arrow.dir }
    })),
    solution: [...source.solution]
  };
}

function buildMazeHamiltonianPath(rng, region) {
  const coarseCols = region.width / 2;
  const coarseRows = region.height / 2;
  const links = Array.from({ length: region.width * region.height }, () => new Set());
  const fineId = (x, y) => y * region.width + x;
  const fineCell = id => ({
    x: region.x + id % region.width,
    y: region.y + Math.floor(id / region.width)
  });
  const setEdge = (first, second, enabled) => {
    if (enabled) {
      links[first].add(second);
      links[second].add(first);
    } else {
      links[first].delete(second);
      links[second].delete(first);
    }
  };

  // Fiecare pătrat 2 × 2 pornește ca o buclă. Un arbore aleatoriu unește
  // toate buclele într-un traseu labirintic ce trece o dată prin fiecare
  // poziție a regiunii sale.
  for (let coarseY = 0; coarseY < coarseRows; coarseY++) {
    for (let coarseX = 0; coarseX < coarseCols; coarseX++) {
      const x = coarseX * 2;
      const y = coarseY * 2;
      const topLeft = fineId(x, y);
      const topRight = fineId(x + 1, y);
      const bottomRight = fineId(x + 1, y + 1);
      const bottomLeft = fineId(x, y + 1);
      setEdge(topLeft, topRight, true);
      setEdge(topRight, bottomRight, true);
      setEdge(bottomRight, bottomLeft, true);
      setEdge(bottomLeft, topLeft, true);
    }
  }

  const coarseId = (x, y) => y * coarseCols + x;
  const visited = new Set();
  const start = randomInt(rng, 0, coarseCols * coarseRows - 1);
  const stack = [start];
  const treeEdges = [];
  visited.add(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const x = current % coarseCols;
    const y = Math.floor(current / coarseCols);
    const neighbors = [];
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nextX = x + dx;
      const nextY = y + dy;
      if (nextX < 0 || nextX >= coarseCols || nextY < 0 || nextY >= coarseRows) continue;
      const next = coarseId(nextX, nextY);
      if (!visited.has(next)) neighbors.push(next);
    }
    if (neighbors.length === 0) {
      stack.pop();
      continue;
    }
    const next = neighbors[randomInt(rng, 0, neighbors.length - 1)];
    visited.add(next);
    stack.push(next);
    treeEdges.push([current, next]);
  }

  for (const [first, second] of treeEdges) {
    let firstX = first % coarseCols;
    let firstY = Math.floor(first / coarseCols);
    let secondX = second % coarseCols;
    let secondY = Math.floor(second / coarseCols);
    if (firstX > secondX) [firstX, secondX] = [secondX, firstX];
    if (firstY > secondY) [firstY, secondY] = [secondY, firstY];

    if (firstY === secondY) {
      const x = firstX * 2 + 1;
      const y = firstY * 2;
      setEdge(fineId(x, y), fineId(x, y + 1), false);
      setEdge(fineId(x + 1, y), fineId(x + 1, y + 1), false);
      setEdge(fineId(x, y), fineId(x + 1, y), true);
      setEdge(fineId(x, y + 1), fineId(x + 1, y + 1), true);
    } else {
      const x = firstX * 2;
      const y = firstY * 2 + 1;
      setEdge(fineId(x, y), fineId(x + 1, y), false);
      setEdge(fineId(x, y + 1), fineId(x + 1, y + 1), false);
      setEdge(fineId(x, y), fineId(x, y + 1), true);
      setEdge(fineId(x + 1, y), fineId(x + 1, y + 1), true);
    }
  }

  const terminals = [];
  for (let id = 0; id < links.length; id++) {
    const cell = fineCell(id);
    for (const neighbor of links[id]) {
      const inside = fineCell(neighbor);
      const horizontalExit = (cell.x === 0 && inside.y === cell.y && inside.x === 1)
        || (cell.x === COLS - 1 && inside.y === cell.y && inside.x === COLS - 2);
      const verticalExit = (cell.y === 0 && inside.x === cell.x && inside.y === 1)
        || (cell.y === ROWS - 1 && inside.x === cell.x && inside.y === ROWS - 2);
      const pointsOutAfterArrival =
        (region.exitAxis !== "vertical" && horizontalExit)
        || (region.exitAxis !== "horizontal" && verticalExit);
      if (pointsOutAfterArrival) terminals.push({ terminal: id, previous: neighbor });
    }
  }

  const traceFromTerminal = chosen => {
    const firstId = [...links[chosen.terminal]].find(id => id !== chosen.previous);
    const path = [];
    let previousId = chosen.terminal;
    let currentId = firstId;

    while (path.length <= region.width * region.height) {
      path.push(fineCell(currentId));
      if (currentId === chosen.terminal) break;
      const nextId = [...links[currentId]].find(id => id !== previousId);
      previousId = currentId;
      currentId = nextId;
    }
    if (path.length !== region.width * region.height) {
      throw new Error("Traseul generatorului este incomplet.");
    }
    return path;
  };

  // Aceeași buclă poate fi deschisă în mai multe puncte ale marginii. Alegem
  // deschiderea care distribuie cel mai bine capetele sigure pe toată tabla,
  // astfel încât să nu apară o singură săgeată exagerat de lungă.
  let bestPath = null;
  let bestScore = Infinity;
  for (const terminal of terminals) {
    const path = traceFromTerminal(terminal);
    const positionByCell = new Map(path.map((cell, index) => [cellKey(cell), index]));
    const safeCuts = [];
    const directions = new Set();
    for (let index = 3; index < path.length - 4; index++) {
      if (!isStraightContinuation(path, index)
        || !rayContainsOnlyLaterCells(path, index, positionByCell, region.exitAxis)) continue;
      safeCuts.push(index);
      const before = path[index - 1];
      const head = path[index];
      directions.add(`${head.x - before.x},${head.y - before.y}`);
    }
    let previousCut = -1;
    let largestGap = 0;
    for (const cut of [...safeCuts, path.length - 1]) {
      largestGap = Math.max(largestGap, cut - previousCut);
      previousCut = cut;
    }
    const score = largestGap * 1000 - safeCuts.length * 10 - directions.size;
    if (score < bestScore) {
      bestScore = score;
      bestPath = path;
    }
  }
  return bestPath;
}

function isStraightContinuation(path, index) {
  if (index <= 0 || index >= path.length - 1) return false;
  const before = path[index - 1];
  const current = path[index];
  const after = path[index + 1];
  return current.x - before.x === after.x - current.x
    && current.y - before.y === after.y - current.y;
}

function rayContainsOnlyLaterCells(path, index, positionByCell, exitAxis) {
  const before = path[index - 1];
  const head = path[index];
  const dx = head.x - before.x;
  const dy = head.y - before.y;
  if (exitAxis === "horizontal" && dy !== 0) return false;
  if (exitAxis === "vertical" && dx !== 0) return false;

  for (let x = head.x + dx, y = head.y + dy;
    x >= 0 && x < COLS && y >= 0 && y < ROWS;
    x += dx, y += dy) {
    if (positionByCell.get(`${x},${y}`) <= index) return false;
  }
  return true;
}

function splitDensePath(path, rng, exitAxis) {
  const minimumLength = 4;
  const segments = [];
  const positionByCell = new Map(path.map((cell, index) => [cellKey(cell), index]));
  let start = 0;

  while (path.length - start > 30) {
    const targetLength = randomInt(rng, 8, rng() < .24 ? 30 : 20);
    const earliest = start + minimumLength - 1;
    const latest = path.length - minimumLength - 1;
    const preferredLast = Math.min(start + targetLength - 1, latest);
    const candidates = [];

    for (let index = earliest; index <= latest; index++) {
      if (isStraightContinuation(path, index)
        && rayContainsOnlyLaterCells(path, index, positionByCell, exitAxis)) {
        candidates.push(index);
      }
    }
    if (candidates.length === 0) break;

    candidates.sort((a, b) => Math.abs(a - preferredLast) - Math.abs(b - preferredLast));
    const nearest = candidates.slice(0, Math.min(3, candidates.length));
    const last = nearest[randomInt(rng, 0, nearest.length - 1)];
    segments.push(path.slice(start, last + 1));
    start = last + 1;
  }

  segments.push(path.slice(start));
  return segments;
}

function arrowsFromDensePath(path, rng, idState, exitAxis) {
  const arrowsInPath = [];
  for (const cells of splitDensePath(path, rng, exitAxis)) {
    const head = cells[cells.length - 1];
    const previous = cells[cells.length - 2];
    arrowsInPath.push({
      id: idState.next++,
      cells,
      dir: { dx: head.x - previous.x, dy: head.y - previous.y },
      createdAt: idState.created++
    });
  }
  return arrowsInPath;
}

function generateDenseLevel(levelNumber, seedOffset = 0) {
  const rng = mulberry32(levelNumber * 104729 + seedOffset * 8191 + 2027);
  const idState = { next: 1, created: 0 };
  const region = { x: 0, y: 0, width: COLS, height: ROWS, exitAxis: "both" };
  const path = buildMazeHamiltonianPath(rng, region);
  const generatedArrows = arrowsFromDensePath(path, rng, idState, region.exitAxis);
  const solution = generatedArrows.map(arrow => arrow.id).reverse();

  const blocked = generatedArrows.filter(arrow => !canExit(arrow, generatedArrows)).length;
  const bends = generatedArrows.reduce((sum, arrow) => sum + countBends(arrow.cells), 0);
  return {
    arrows: generatedArrows,
    solution,
    score: generatedArrows.length * 20 + blocked * 9 + bends + COLS * ROWS * 1.5,
    blocked
  };
}

function generateLevel(levelNumber) {
  if (levelNumber === 1) {
    const tutorialLevel = copyLevel(CURATED_LEVEL_ONE);
    tutorialLevel.name = "Nivel 1";
    return tutorialLevel;
  }

  // Nivelurile următoare sunt construite procedural, nu oglindite. Generatorul
  // acoperă toate cele 560 de celule și acceptă nivelul numai după verificarea
  // automată a ordinii complete de rezolvare.
  let bestCandidate = null;
  let bestScore = Infinity;
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = generateDenseLevel(levelNumber, attempt);
    if (!validateKnownSolution(candidate.arrows, candidate.solution)) continue;
    const directions = new Set(candidate.arrows.map(arrow => `${arrow.dir.dx},${arrow.dir.dy}`));
    const longestArrow = Math.max(...candidate.arrows.map(arrow => arrow.cells.length));
    const missingDirections = 4 - directions.size;
    const score = missingDirections * 100000 + longestArrow * 100
      + Math.abs(candidate.arrows.length - 40) * 10;
    if (score < bestScore) {
      bestScore = score;
      bestCandidate = candidate;
    }
  }
  if (bestCandidate) {
    bestCandidate.name = `Nivel ${levelNumber}`;
    return bestCandidate;
  }
  throw new Error("Generatorul nu a putut crea un nivel rezolvabil.");
}

function cloneArrows(items) {
  return items.map(arrow => ({
    ...arrow,
    cells: arrow.cells.map(cell => ({ ...cell })),
    dir: { ...arrow.dir }
  }));
}

function startLevel(levelNumber) {
  hideModal();
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  selectedId = null;
  movingArrows = [];
  undoStack = [];
  level = generateLevel(levelNumber);
  arrows = cloneArrows(level.arrows);
  initialCount = arrows.length;
  resetViewport(false);
  updateUI();
  draw();

  if (levelNumber === 1 && !state.tutorialSeen) {
    showTutorial();
  }
}

function restartLevel() {
  if (!level) return;
  hideModal();
  if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
  animationFrameId = null;
  arrows = cloneArrows(level.arrows);
  selectedId = null;
  movingArrows = [];
  resetViewport(false);
  updateUI();
  draw();
  showToast("Nivelul a fost repornit");
}

function resizeCanvas() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  clampViewport();
  draw();
}

function canvasMetrics() {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const landscape = rect.width > rect.height;
  let boardW = rect.width * (landscape ? .65 : (rect.width <= 380 ? .72 : .71));
  let boardH = boardW * ROWS / COLS;
  const maxBoardH = rect.height * (landscape ? .76 : .72);
  if (boardH > maxBoardH) {
    boardH = maxBoardH;
    boardW = boardH * COLS / ROWS;
  }
  const boardX = (rect.width - boardW) / 2;
  const preferredY = rect.height * (landscape ? .12 : .20);
  const boardY = Math.max(8, Math.min(preferredY, rect.height - boardH - 8));
  return {
    rect,
    dpr,
    boardX,
    boardY,
    boardW,
    boardH,
    cellW: boardW / COLS,
    cellH: boardH / ROWS
  };
}

function pointForCell(cell, metrics) {
  return {
    x: metrics.boardX + (cell.x + .5) * metrics.cellW,
    y: metrics.boardY + (cell.y + .5) * metrics.cellH
  };
}

function traceSoftPolyline(points, radius) {
  if (!points.length) return;
  ctx.moveTo(points[0].x, points[0].y);
  if (points.length === 1) return;

  for (let index = 1; index < points.length - 1; index++) {
    const previous = points[index - 1];
    const corner = points[index];
    const next = points[index + 1];
    const beforeLength = Math.hypot(corner.x - previous.x, corner.y - previous.y);
    const afterLength = Math.hypot(next.x - corner.x, next.y - corner.y);
    const cut = Math.min(radius, beforeLength * .18, afterLength * .18);
    const before = {
      x: corner.x - (corner.x - previous.x) / beforeLength * cut,
      y: corner.y - (corner.y - previous.y) / beforeLength * cut
    };
    const after = {
      x: corner.x + (next.x - corner.x) / afterLength * cut,
      y: corner.y + (next.y - corner.y) / afterLength * cut
    };
    ctx.lineTo(before.x, before.y);
    ctx.quadraticCurveTo(corner.x, corner.y, after.x, after.y);
  }
  ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
}

function drawPlatformDots(metrics) {
  const cellSize = Math.min(metrics.cellW, metrics.cellH);
  const dotRadius = Math.max(1, cellSize * GAME_CONFIG.boardDotRadius);
  const coveredByStaticArrow = occupiedSet(arrows);
  const coveredByMovingArrow = cell => movingArrows.some(moving => {
    for (let index = 1; index < moving.renderCells.length; index++) {
      if (distanceToSegment(cell, moving.renderCells[index - 1], moving.renderCells[index]) < .28) {
        return true;
      }
    }
    return false;
  });
  ctx.save();
  ctx.fillStyle = GAME_CONFIG.backgroundColor;
  ctx.fillRect(0, 0, metrics.boardW, metrics.boardH);
  ctx.fillStyle = GAME_CONFIG.boardDotColor;
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const cell = { x, y };
      if (coveredByStaticArrow.has(cellKey(cell)) || coveredByMovingArrow(cell)) continue;
      const point = pointForCell({ x, y }, metrics);
      ctx.beginPath();
      ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function traceSlightlyRoundedTriangle(a, b, c) {
  const roundness = GAME_CONFIG.arrowHeadRoundness;
  const entry = (vertex, previous) => ({
    x: vertex.x + (previous.x - vertex.x) * roundness,
    y: vertex.y + (previous.y - vertex.y) * roundness
  });
  const exit = (vertex, next) => ({
    x: vertex.x + (next.x - vertex.x) * roundness,
    y: vertex.y + (next.y - vertex.y) * roundness
  });
  const vertices = [a, b, c];
  const firstEntry = entry(vertices[0], vertices[2]);
  ctx.moveTo(firstEntry.x, firstEntry.y);
  for (let index = 0; index < vertices.length; index++) {
    const vertex = vertices[index];
    const previous = vertices[(index + 2) % 3];
    const next = vertices[(index + 1) % 3];
    const cornerEntry = entry(vertex, previous);
    const cornerExit = exit(vertex, next);
    if (index > 0) ctx.lineTo(cornerEntry.x, cornerEntry.y);
    ctx.quadraticCurveTo(vertex.x, vertex.y, cornerExit.x, cornerExit.y);
  }
  ctx.closePath();
}

function drawArrow(arrow, metrics, cells = arrow.cells) {
  const isSelected = arrow.id === selectedId;
  const points = cells.map(cell => pointForCell(cell, metrics));
  const cellSize = Math.min(metrics.cellW, metrics.cellH);
  const baseWidth = Math.max(GAME_CONFIG.arrowBodyMinimum, cellSize * GAME_CONFIG.arrowBodyWidth);
  const lineWidth = isSelected ? baseWidth * GAME_CONFIG.selectedArrowScale : baseWidth;
  const tip = points[points.length - 1];
  const arrowLength = cellSize * GAME_CONFIG.arrowHeadLength;
  const arrowWidth = cellSize * GAME_CONFIG.arrowHeadWidth;
  const dx = arrow.dir.dx;
  const dy = arrow.dir.dy;
  const tipX = tip.x + dx * lineWidth * .15;
  const tipY = tip.y + dy * lineWidth * .15;
  const baseX = tipX - dx * arrowLength;
  const baseY = tipY - dy * arrowLength;
  const perpendicularX = -dy;
  const perpendicularY = dx;
  const leftBase = {
    x: baseX + perpendicularX * arrowWidth / 2,
    y: baseY + perpendicularY * arrowWidth / 2
  };
  const rightBase = {
    x: baseX - perpendicularX * arrowWidth / 2,
    y: baseY - perpendicularY * arrowWidth / 2
  };
  const shaftPoints = points.slice(0, -1);
  shaftPoints.push({ x: baseX, y: baseY });

  const strokeColor = isSelected ? "#f6fbff" : GAME_CONFIG.arrowColors[(arrow.id - 1) % GAME_CONFIG.arrowColors.length];

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.miterLimit = 3;

  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeColor;
  ctx.fillStyle = strokeColor;
  ctx.shadowColor = "rgba(0,0,0,0)";
  ctx.shadowBlur = 0;
  ctx.beginPath();
  traceSoftPolyline(shaftPoints, cellSize * GAME_CONFIG.cornerRoundness);
  ctx.stroke();

  ctx.beginPath();
  traceSlightlyRoundedTriangle(
    { x: tipX, y: tipY },
    leftBase,
    rightBase
  );
  ctx.fill();
  ctx.restore();
}

function draw() {
  const metrics = canvasMetrics();
  if (!metrics.rect.width || !metrics.rect.height) return;
  ctx.setTransform(metrics.dpr, 0, 0, metrics.dpr, 0, 0);
  ctx.clearRect(0, 0, metrics.rect.width, metrics.rect.height);
  ctx.translate(viewport.panX, viewport.panY);
  ctx.scale(viewport.scale, viewport.scale);
  drawPlatformDots(metrics);

  for (const arrow of arrows) {
    drawArrow(arrow, metrics);
  }
  for (const moving of movingArrows) {
    drawArrow(moving.arrow, metrics, moving.renderCells);
  }
}

function distanceToSegment(point, a, b) {
  const vx = b.x - a.x;
  const vy = b.y - a.y;
  const wx = point.x - a.x;
  const wy = point.y - a.y;
  const lengthSquared = vx * vx + vy * vy;
  const t = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1, (wx * vx + wy * vy) / lengthSquared));
  const px = a.x + t * vx;
  const py = a.y + t * vy;
  return Math.hypot(point.x - px, point.y - py);
}

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function clampViewport() {
  const metrics = canvasMetrics();
  const rect = metrics.rect;
  viewport.scale = clamp(viewport.scale, MIN_ZOOM, MAX_ZOOM);
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  // Limitele permit aducerea oricărui colț al platformei exact în centrul
  // ecranului, la orice mărime, fără ca planul să poată fi pierdut complet.
  const xWithRightCornerAtCenter = centerX
    - (metrics.boardX + metrics.boardW) * viewport.scale;
  const xWithLeftCornerAtCenter = centerX - metrics.boardX * viewport.scale;
  const yWithBottomCornerAtCenter = centerY
    - (metrics.boardY + metrics.boardH) * viewport.scale;
  const yWithTopCornerAtCenter = centerY - metrics.boardY * viewport.scale;
  viewport.panX = clamp(
    viewport.panX,
    Math.min(xWithRightCornerAtCenter, xWithLeftCornerAtCenter),
    Math.max(xWithRightCornerAtCenter, xWithLeftCornerAtCenter)
  );
  viewport.panY = clamp(
    viewport.panY,
    Math.min(yWithBottomCornerAtCenter, yWithTopCornerAtCenter),
    Math.max(yWithBottomCornerAtCenter, yWithTopCornerAtCenter)
  );
}

function resetViewport(redraw = true) {
  viewport = { scale: 1, panX: 0, panY: 0 };
  if (redraw) draw();
}

function zoomAt(screenX, screenY, requestedScale) {
  const oldScale = viewport.scale;
  const nextScale = clamp(requestedScale, MIN_ZOOM, MAX_ZOOM);
  const boardX = (screenX - viewport.panX) / oldScale;
  const boardY = (screenY - viewport.panY) / oldScale;
  viewport.scale = nextScale;
  viewport.panX = screenX - boardX * nextScale;
  viewport.panY = screenY - boardY * nextScale;
  clampViewport();
  draw();
}

function localPointer(event) {
  const rect = canvas.getBoundingClientRect();
  return { x: event.clientX - rect.left, y: event.clientY - rect.top };
}

function boardPointFromScreen(x, y) {
  return {
    x: (x - viewport.panX) / viewport.scale,
    y: (y - viewport.panY) / viewport.scale
  };
}

function arrowAtPoint(x, y) {
  const metrics = canvasMetrics();
  const point = boardPointFromScreen(x, y);
  const baseThreshold = Math.max(12 / viewport.scale, Math.min(metrics.cellW, metrics.cellH) * .7);
  const headThreshold = Math.max(18 / viewport.scale, Math.min(metrics.cellW, metrics.cellH) * .9);
  let winner = null;
  let bestDistance = Infinity;

  for (const arrow of arrows) {
    const points = arrow.cells.map(cell => pointForCell(cell, metrics));
    const tip = points[points.length - 1];

    for (let index = 1; index < points.length; index++) {
      const distance = distanceToSegment(point, points[index - 1], points[index]);
      if (distance < baseThreshold && distance < bestDistance) {
        winner = arrow;
        bestDistance = distance;
      }
    }

    const tipDistance = Math.hypot(point.x - tip.x, point.y - tip.y);
    if (tipDistance < headThreshold && tipDistance < bestDistance) {
      winner = arrow;
      bestDistance = tipDistance;
    }
  }
  return winner;
}

function handleTap(x, y) {
  if (!modal.hidden) return;
  const arrow = arrowAtPoint(x, y);
  if (!arrow) return;

  selectedId = arrow.id;
  if (state.lives <= 0) {
    showNoLivesModal();
    draw();
    return;
  }

  if (canExit(arrow)) {
    pushUndoState();
    vibrate("success");
    startExitAnimation(arrow);
  } else {
    pushUndoState();
    vibrate("error");
    loseLife();
    boardCard.classList.remove("is-wrong");
    void boardCard.offsetWidth;
    boardCard.classList.add("is-wrong");
    showBoardMessage("BLOCATĂ");
    draw();
  }
}

function beginPointerGesture(event) {
  event.preventDefault();
  const point = localPointer(event);
  activePointers.set(event.pointerId, point);
  canvas.setPointerCapture?.(event.pointerId);

  if (activePointers.size === 1) {
    gesture = {
      type: "single",
      pointerId: event.pointerId,
      start: point,
      last: point,
      panX: viewport.panX,
      panY: viewport.panY,
      moved: false
    };
    suppressTap = false;
    return;
  }

  if (activePointers.size === 2) {
    const [first, second] = [...activePointers.values()];
    const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
    gesture = {
      type: "pinch",
      distance: Math.max(1, Math.hypot(second.x - first.x, second.y - first.y)),
      scale: viewport.scale,
      boardX: (center.x - viewport.panX) / viewport.scale,
      boardY: (center.y - viewport.panY) / viewport.scale
    };
    suppressTap = true;
  }
}

function movePointerGesture(event) {
  if (!activePointers.has(event.pointerId)) return;
  event.preventDefault();
  const point = localPointer(event);
  activePointers.set(event.pointerId, point);

  if (activePointers.size >= 2 && gesture?.type === "pinch") {
    const [first, second] = [...activePointers.values()];
    const center = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
    const distance = Math.max(1, Math.hypot(second.x - first.x, second.y - first.y));
    viewport.scale = clamp(gesture.scale * distance / gesture.distance, MIN_ZOOM, MAX_ZOOM);
    viewport.panX = center.x - gesture.boardX * viewport.scale;
    viewport.panY = center.y - gesture.boardY * viewport.scale;
    clampViewport();
    draw();
    return;
  }

  if (activePointers.size === 1 && gesture?.type === "single") {
    const dx = point.x - gesture.start.x;
    const dy = point.y - gesture.start.y;
    if (Math.hypot(dx, dy) > 6) gesture.moved = true;
    gesture.last = point;
    if (gesture.moved) {
      viewport.panX = gesture.panX + dx;
      viewport.panY = gesture.panY + dy;
      clampViewport();
      draw();
    }
  }
}

function endPointerGesture(event) {
  if (!activePointers.has(event.pointerId)) return;
  event.preventDefault();
  const point = localPointer(event);
  const wasSingleTap = activePointers.size === 1
    && gesture?.type === "single"
    && !gesture.moved
    && !suppressTap;

  activePointers.delete(event.pointerId);
  try { canvas.releasePointerCapture?.(event.pointerId); } catch { /* optional */ }

  if (wasSingleTap) handleTap(point.x, point.y);

  if (activePointers.size === 1) {
    const [pointerId, remaining] = [...activePointers.entries()][0];
    gesture = {
      type: "single",
      pointerId,
      start: remaining,
      last: remaining,
      panX: viewport.panX,
      panY: viewport.panY,
      moved: false
    };
    suppressTap = true;
  } else if (activePointers.size === 0) {
    gesture = null;
    suppressTap = false;
  }
}

function cancelPointerGesture(event) {
  activePointers.delete(event.pointerId);
  if (activePointers.size === 0) {
    gesture = null;
    suppressTap = false;
  }
}

function handleWheelZoom(event) {
  event.preventDefault();
  const point = localPointer(event);
  const factor = Math.exp(-event.deltaY * .0015);
  zoomAt(point.x, point.y, viewport.scale * factor);
}

function startExitAnimation(arrow) {
  pushUndoState();
  const movement = buildSnakeRoute(arrow);
  movingArrows.push({
    id: arrow.id,
    arrow: {
      ...arrow,
      cells: arrow.cells.map(cell => ({ ...cell })),
      dir: { ...arrow.dir }
    },
    route: movement.route,
    travelSteps: movement.travelSteps,
    bodyLength: movement.bodyLength,
    renderCells: arrow.cells.map(cell => ({ ...cell })),
    startedAt: performance.now(),
    stepDuration: 52
  });

  // Săgeata dispare imediat din logica obstacolelor, dar animația continuă.
  // Astfel următoarea săgeată poate fi apăsată fără timp de așteptare.
  arrows = arrows.filter(item => item.id !== arrow.id);
  selectedId = null;
  state.coins += 2;
  saveState();
  updateUI();
  draw();

  if (animationFrameId === null) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

function animate(now) {
  animationFrameId = null;
  if (movingArrows.length === 0) return;

  const stillMoving = [];
  for (const moving of movingArrows) {
    const distance = Math.min(
      moving.travelSteps,
      (now - moving.startedAt) / moving.stepDuration
    );
    if (distance < moving.travelSteps) {
      moving.renderCells = sliceOrthogonalRoute(
        moving.route,
        distance,
        distance + moving.bodyLength
      );
      stillMoving.push(moving);
    }
  }
  movingArrows = stillMoving;
  draw();

  if (movingArrows.length > 0) {
    animationFrameId = requestAnimationFrame(animate);
  } else if (arrows.length === 0) {
    finishLevel();
  }
}

function loseLife() {
  if (state.lives <= 0) return;
  state.lives--;
  if (state.lives < MAX_LIVES && !state.nextLifeAt) {
    state.nextLifeAt = Date.now() + LIFE_REGEN_MS;
  }
  saveState();
  updateLives();
  if (state.lives === 0) setTimeout(showNoLivesModal, 380);
}

function restoreLivesByTime() {
  if (state.lives >= MAX_LIVES) {
    state.lives = MAX_LIVES;
    state.nextLifeAt = null;
    return;
  }
  if (!state.nextLifeAt) state.nextLifeAt = Date.now() + LIFE_REGEN_MS;

  const now = Date.now();
  while (state.lives < MAX_LIVES && now >= state.nextLifeAt) {
    state.lives++;
    if (state.lives < MAX_LIVES) state.nextLifeAt += LIFE_REGEN_MS;
    else state.nextLifeAt = null;
  }
}

function updateLives() {
  restoreLivesByTime();
  heartsElement.innerHTML = "";
  for (let index = 0; index < MAX_LIVES; index++) {
    const heart = document.createElement("span");
    heart.className = `heart${index >= state.lives ? " is-empty" : ""}`;
    heart.textContent = "♥";
    heartsElement.appendChild(heart);
  }
  heartsElement.setAttribute("aria-label", `${state.lives} vieți`);

  if (state.lives < MAX_LIVES && state.nextLifeAt) {
    const left = Math.max(0, state.nextLifeAt - Date.now());
    const minutes = Math.floor(left / 60000);
    const seconds = Math.floor((left % 60000) / 1000);
    lifeTimer.textContent = `+1 viață în ${minutes}:${String(seconds).padStart(2, "0")}`;
  } else {
    lifeTimer.textContent = "";
  }
  saveState();
}

function updateUI() {
  const displayedName = level?.name || `Nivel ${state.currentLevel}`;
  levelName.textContent = displayedName;
  coinsElement.textContent = state.coins.toLocaleString("ro-RO");
  starsElement.textContent = state.stars;
  updateLives();
}

function finishLevel() {
  state.coins += 50;
  state.completedLevels = [...new Set([...(state.completedLevels || []), state.currentLevel])];
  saveState();
  updateUI();
  showModal({
    icon: "🎉",
    title: "Nivel terminat!",
    text: `Ai eliberat toate cele ${initialCount} săgeți și ai primit 50 de monede.`,
    primaryText: "URMĂTORUL NIVEL",
    onPrimary: () => {
      state.currentLevel++;
      saveState();
      startLevel(state.currentLevel);
    }
  });
}

function showNoLivesModal() {
  const remaining = state.nextLifeAt ? Math.max(0, state.nextLifeAt - Date.now()) : LIFE_REGEN_MS;
  const minutes = Math.ceil(remaining / 60000);
  showModal({
    icon: "💔",
    title: "Nu mai ai vieți",
    text: `O viață se regenerează automat în aproximativ ${minutes} minute. Plata cu Telegram Stars se conectează ulterior la server.`,
    primaryText: "AM ÎNȚELES",
    onPrimary: hideModal
  });
}

function showModal({ icon, title, text, primaryText, onPrimary, secondaryText, onSecondary }) {
  modalIcon.textContent = icon;
  modalTitle.textContent = title;
  modalText.textContent = text;
  modalPrimary.textContent = primaryText;
  modalPrimary.onclick = onPrimary;
  if (secondaryText) {
    modalSecondary.hidden = false;
    modalSecondary.textContent = secondaryText;
    modalSecondary.onclick = onSecondary || hideModal;
  } else {
    modalSecondary.hidden = true;
  }
  modal.hidden = false;
}

function hideModal() {
  modal.hidden = true;
}

function showToast(text) {
  clearTimeout(toastTimer);
  toast.textContent = text;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

function showBoardMessage(text) {
  clearTimeout(messageTimer);
  boardMessage.textContent = text;
  boardMessage.classList.add("is-visible");
  messageTimer = setTimeout(() => boardMessage.classList.remove("is-visible"), 720);
}

function vibrate(type) {
  try {
    const haptic = window.Telegram?.WebApp?.HapticFeedback;
    if (haptic) {
      if (type === "error") haptic.notificationOccurred("error");
      else haptic.impactOccurred("light");
    } else if (navigator.vibrate) {
      navigator.vibrate(type === "error" ? [35, 35, 35] : 20);
    }
  } catch {
    // Haptics are optional.
  }
}

function setupTelegram() {
  try {
    const webApp = window.Telegram?.WebApp;
    if (!webApp) return;
    webApp.ready();
    webApp.expand();
    webApp.setHeaderColor(GAME_CONFIG.backgroundColor);
    webApp.setBackgroundColor(GAME_CONFIG.backgroundColor);
  } catch {
    // The same files also work in an ordinary browser.
  }
}

canvas.addEventListener("pointerdown", beginPointerGesture);
canvas.addEventListener("pointermove", movePointerGesture);
canvas.addEventListener("pointerup", endPointerGesture);
canvas.addEventListener("pointercancel", cancelPointerGesture);
canvas.addEventListener("wheel", handleWheelZoom, { passive: false });
undoButton.addEventListener("click", undoMove);
restartButton.addEventListener("click", restartLevel);
backButton.addEventListener("click", () => {
  if (window.Telegram?.WebApp) window.Telegram.WebApp.close();
  else showToast("În Telegram, butonul închide Mini App-ul");
});

window.addEventListener("resize", resizeCanvas);
new ResizeObserver(resizeCanvas).observe(boardCard);

setInterval(() => {
  const before = state.lives;
  updateLives();
  if (state.lives !== before) showToast("Ai primit o viață nouă");
}, 1000);

setupTelegram();
startLevel(state.currentLevel);
resizeCanvas();
setTimeout(() => showToast("Apropie, depărtează și mută planul cu degetele"), 550);
