export default class RailPiece {
    constructor(id, type, gender, connections, angle) {
      this.id = id; // ユニークな識別子
      this.type = type; // 'straight' または 'curve'
      this.gender = gender; // 'male' または 'female'
      this.connections = connections; // 接続可能なレールピースのIDの配列
      this.angle = angle; // カーブの場合の角度, 直線の場合は null または 0
    }
  
    // レールピースを接続するメソッド
    connect(otherRailPiece) {
      // 両方のレールピースのgenderが異なる場合のみ接続を許可
      if (this.gender !== otherRailPiece.gender) {
        this.connections.push(otherRailPiece.id);
        otherRailPiece.connections.push(this.id);
      }
    }
  
    // その他の必要なメソッド（例えば回転や位置の設定など）をここに追加
  }
  