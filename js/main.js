// main.js

// モジュールをインポート
import RailPiece from './RailPiece.js';

// アプリケーションの状態を管理するオブジェクト
const appState = {
  rails: [],
  selectedRailType: null
};

// UIからレールタイプを選択するためのイベントリスナーを設定
document.querySelectorAll('.rail-type-selector').forEach(selector => {
  selector.addEventListener('click', event => {
    appState.selectedRailType = event.target.getAttribute('data-rail-type');
  });
});
// レールピースを画面に表示する関数
function displayRailPiece(railPiece, x, y) {
    const railDiv = document.createElement('div');
    railDiv.className = 'rail-piece';
    railDiv.style.position = 'absolute';
    railDiv.style.left = `${x}px`;
    railDiv.style.top = `${y}px`;
    
    // レールのタイプに応じて画像を変更する
    if (railPiece.type === 'straight') {
      railDiv.style.width = '100px'; // 適切なサイズに設定
      railDiv.style.height = '10px';
      railDiv.style.backgroundColor = 'grey';
    } else if (railPiece.type === 'curve') {
      railDiv.style.width = '50px'; // 適切なサイズに設定
      railDiv.style.height = '50px';
      railDiv.style.borderRadius = '50%';
      railDiv.style.backgroundColor = 'grey';
    }
  
    document.getElementById('rail-placement-area').appendChild(railDiv);
  }

// ユーザーがレールを配置する領域にイベントリスナーを設定
window.addEventListener('placeRail', function(e) {
    const { railType, x, y } = e.detail;
    const newRail = new RailPiece(appState.rails.length + 1, railType, 'male', [], railType === 'curve' ? 45 : 0);
    
    // レールピースを状態に追加し、画面に表示
    appState.rails.push(newRail);
    displayRailPiece(newRail, x, y);
  });

  // レールタイプが選択された時のイベントリスナー
window.addEventListener('railTypeSelected', function(e) {
    appState.selectedRailType = e.detail;
  });

// レールを配置する領域にイベントリスナーを設定
document.getElementById('rail-placement-area').addEventListener('click', event => {
  // 選択されたレールタイプに基づいて新しいレールピースを作成
  const newRail = new RailPiece(
    appState.rails.length + 1, // 新しいIDを生成
    appState.selectedRailType, // 選択されたレールタイプ
    'male', // ここでは一時的にオスをデフォルトにしています
    [], // 初期接続はなし
    appState.selectedRailType === 'curve' ? 45 : 0 // カーブの場合は角度を設定
  );
  
  // レールピースを状態に追加
  appState.rails.push(newRail);

  // TODO: レールピースを画面に表示する処理をここに追加
});

// アプリケーションの状態を更新する関数
function updateAppState(newState) {
  Object.assign(appState, newState);
  // TODO: 状態が変更されたときにUIを更新する処理をここに追加
}

// 初期化関数
function init() {
  // TODO: アプリケーションを初期化するためのコードをここに追加
}

// アプリケーションを初期化
init();
