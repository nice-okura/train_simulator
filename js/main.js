// main.js

// モジュールをインポート
import RailPiece from "./RailPiece.js";

// Fabric.jsのキャンバスを初期化
const canvas = new fabric.Canvas('rail-placement-area', {
  hoverCursor: 'pointer',
  selection: false
});

canvas.setWidth(document.getElementById('rail-placement-area').clientWidth);
canvas.setHeight(500);

// アプリケーションの状態を管理するオブジェクト
const appState = {
  rails: [],
  selectedRailType: null,
};

// UIからレールタイプを選択するためのイベントリスナーを設定
document.querySelectorAll(".rail-type-selector").forEach((selector) => {
  selector.addEventListener("click", (event) => {
    appState.selectedRailType = event.target.getAttribute("data-rail-type");
  });
});

// オブジェクトが動かされているかどうかを追跡するフラグ
let objectMoving = false;

canvas.on('object:moving', function(options) {
  objectMoving = true;
});

canvas.on('mouse:down', function (options) {
  if (!objectMoving && appState.selectedRailType) {
    const pointer = canvas.getPointer(options.e);
    const newRail = new RailPiece(
      appState.rails.length + 1,
      appState.selectedRailType,
      "male",
      [],
      appState.selectedRailType === "curve" ? 45 : 0
    );

    appState.rails.push(newRail);
    displayRailPiece(newRail, pointer.x, pointer.y);
  }
});

// レールピースをキャンバスに表示する関数
function displayRailPiece(railPiece, x, y) {
  let element;
    
  if (railPiece.type === "straight") {
    element = new fabric.Rect({
      left: x,
      top: y,
      fill: 'grey',
      width: 100,
      height: 10
    });
  } else if (railPiece.type === "curve") {
    // Fabric.jsで円弧を描画する場合
    const radius = 50;
    const startAngle = 0;
    const endAngle = railPiece.angle;
    
    element = new fabric.Circle({
      left: x,
      top: y,
      radius: radius,
      startAngle: startAngle * (Math.PI / 180),
      endAngle: endAngle * (Math.PI / 180),
      stroke: 'grey',
      strokeWidth: 100,
      fill: 'transparent'
    });
  }

  // サイズ変更を無効にし、回転を許可する設定
  element.set({
    hasControls: true, // コントロールを表示
    lockScalingX: true, // X方向のスケーリングをロック
    lockScalingY: true, // Y方向のスケーリングをロック
    lockUniScaling: true, // 一様スケーリングをロック
    hasRotatingPoint: true
    }); // 回転は許可

  canvas.add(element);
}

// レールタイプが選択された時のイベントリスナー
window.addEventListener("railTypeSelected", function (e) {
  appState.selectedRailType = e.detail;
});

// キャンバスの初期化
function init() {
  // ここに初期化のコードを追加
}

init();
