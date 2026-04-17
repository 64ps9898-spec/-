# この画面で実装を進める手順（実務向け）

「実行されました → 中止しました」「`Cannot read properties of undefined (reading 'source')`」が出たときの進め方です。

---

## 1. まず前提

この種のエラーは、**アプリ本体コードより実行環境側（簡易プレビュー/埋め込みランナー）**で起きることが多いです。  
なので、実装の主戦場は次のどちらかに寄せるのが安全です。

1. ローカル（Windows）
2. Docker（または仮想環境）

---

## 2. このプロジェクトを確実に動かす流れ

### 手順A: 実装を受け取る
- 推奨: Gitブランチ/PRで受け取る
- 次点: patch (`git apply`) で受け取る

### 手順B: 依存を入れる
```bash
npm install
```

### 手順C: 開発サーバを起動
```bash
npm run dev
```

### 手順D: ブラウザで開く
- `http://localhost:5173`

---

## 3. 「この画面内」でやるならどこを触るか

最小で触るのは以下だけです。

1. `src/data/materials.ts`（材料定義）
2. `src/components/PartForm.tsx`（追加UI）
3. `src/components/PartInspector.tsx`（編集UI）
4. `src/components/ThreeScene.tsx`（見た目/操作）
5. `src/lib/cutPlan.ts`（集計ロジック）

この順で触ると壊れにくいです。

---

## 4. 代表的な詰まりポイント

### エラー: `Cannot read properties of undefined (reading 'source')`

対処順:
1. まずローカルまたは Docker で再現するか確認
2. JSON読込データが壊れていないか確認
3. 依存を再インストール
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. それでも発生するなら、埋め込みプレビュー環境の問題を疑う（別環境で実行）

---

## 5. すぐプレビューしたい場合

```bash
docker compose up --build
```

- `http://localhost:4173` で確認
- 環境差が出にくいので、レビュー時に有効
