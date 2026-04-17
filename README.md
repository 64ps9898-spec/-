# DIY / 建築 3D構造シミュレーター

React + TypeScript + Three.js で作る、家庭DIY向けの汎用3D構造シミュレーターです。  
対象: 棚 / 箱 / 作業台 / 台座 / 床 / 囲い / 簡易構造物。

---

## 1. アーキテクチャ（レビューしやすい構造）

```text
src/
├─ App.tsx                      # 画面全体の状態と各パネル結線
├─ types.ts                     # ドメイン型（Part/Material/ProjectData）
├─ data/
│  └─ materials.ts              # 材料ライブラリ（指定材料一式）
├─ components/
│  ├─ ThreeScene.tsx            # 3D描画（OrbitControlsで回転/ズーム）
│  ├─ PartForm.tsx              # 部材追加
│  ├─ PartInspector.tsx         # 寸法/位置/回転/数量編集
│  ├─ PartsTable.tsx            # 部材表
│  ├─ CutPlan.tsx               # 簡易カット集計表示
│  └─ JsonIO.tsx                # JSON保存/読込
└─ lib/
   ├─ cutPlan.ts                # 簡易カット割りロジック
   └─ format.ts                 # 単位フォーマット
```

### 設計意図
- **壊れにくい構成**: UI・データ定義・計算ロジックを分離。
- **段階拡張前提**: たとえば `lib/` に最適化ロジック、`components/` に専用編集UIを追加しやすい。
- **レビュー容易性**: 1ファイル巨大化を回避し、責務がファイル単位で明確。

---

## 2. 動作確認できる場所（ローカル/他環境）

## A. ローカル（Windows推奨）
```bash
npm install
npm run dev
```
- ブラウザで `http://localhost:5173`
- 推奨ブラウザ: Edge / Chrome

## B. Docker（チーム内で同じ環境を使いたい場合）
```bash
docker build -t diy-3d-sim .
docker run --rm -p 4173:4173 diy-3d-sim
```
- ブラウザで `http://localhost:4173`

## C. CI上の自動テスト（GitHub Actions）
- Push / Pull Request 時に以下を自動実行:
  - `npm run typecheck`
  - `npm run test`
  - `npm run build`

## D. オンラインで試す（よそでも）
- GitHubにpushしたうえで、以下で検証可能:
  - StackBlitz（GitHub連携）
  - CodeSandbox（GitHub連携）
  - Vercel / Netlify デプロイ

---

## 3. 開発コマンド

```bash
npm run dev        # 開発サーバ
npm run typecheck  # TypeScript型チェック
npm run test       # Vitest（ロジックテスト）
npm run build      # 本番ビルド
npm run preview    # ビルド確認
```

---

## 4. 機能チェックリスト（MVP）

- [x] React + TypeScript
- [x] 3D表示（Three.js via R3F）
- [x] マウス回転/ズーム
- [x] 部材追加
- [x] 寸法編集
- [x] 位置編集
- [x] 回転編集
- [x] 材料ライブラリ（指定材料一式）
- [x] 部材表
- [x] 簡易カット割り
- [x] JSON保存/読込
- [x] mm単位
- [x] Windowsブラウザ想定

---

## 5. 次の拡張候補

1. グリッド/面スナップ
2. 複数選択と整列
3. 寸法注記表示
4. ネスティング最適化（厳密カット）
5. テンプレート（棚/作業台/床）
6. Undo / Redo
7. Electron化（デスクトップ配布）

---

## 6. 受け渡し・適用の実務フロー（日本語）

詳細は `docs/HANDOFF_JA.md` を参照してください。



実装手順の詳細: `docs/IMPLEMENT_IN_THIS_SCREEN_JA.md`
