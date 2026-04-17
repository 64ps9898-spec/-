# 導入・再編・プレビュー手順（日本語）

「実装を受け取ったけど、どう流せばいいか分からない」場合の実務フローです。

---

## 結論（迷ったらこれ）

- **最優先**: `git` で丸ごと受け取る（clone or branch）
- **次点**: `patch(diff)` を受け取って `git apply` する
- **非推奨**: 画面上のコード断片を手でコピペして再構成

> つまり「パッチをコピー」寄りが正解です。  
> `bitapply` のような独自コマンド文字列をコピペするより、**標準的な `git diff / git apply`** の方が安全です。

---

## 1. 受け渡し方式（おすすめ順）

## A. Git リポジトリ方式（おすすめ）
1. 実装済みブランチを push
2. 受け取り側で clone
3. `npm install && npm run dev`

メリット:
- 変更履歴が明確
- レビュー/差分追跡がしやすい
- 差し戻しも簡単

## B. パッチ方式（次点）
### 渡す側
```bash
git format-patch -1 HEAD --stdout > mvp.patch
```

### 受け取り側
```bash
git apply mvp.patch
npm install
npm run dev
```

メリット:
- 既存リポジトリに最小差分で適用可能

注意:
- ベースブランチが大きくズレるとコンフリクトが出る

## C. ファイル一括コピー（最後の手段）
- `src/` や `package.json` を手動置換
- ミスが出やすいため、基本は推奨しません

---

## 2. プレビュー環境の作り方

## A. ローカル（Windows）
```bash
npm install
npm run dev
```
- 開くURL: `http://localhost:5173`

## B. Docker（環境差を減らす）
```bash
docker compose up --build
```
- 開くURL: `http://localhost:4173`

## C. 仮想空間（VM / Codespaces / クラウドIDE）
- Node 20 を使う
- 以下だけで起動可:
```bash
npm install
npm run dev
```

---

## 3. 再編（リファクタ）するときの手順

1. `feature/refactor-*` ブランチを切る
2. 1テーマずつ変更（例: `state/` 分離だけ）
3. 各コミットで `typecheck/test/build`
4. PRで差分レビュー

推奨粒度:
- 1 PR = 1目的（例: 「状態管理導入」だけ）

---

## 4. 最小チェックリスト

```bash
npm run typecheck
npm run test
npm run build
```

- 3つ通れば、他環境への移植で詰まりにくいです

---

## 5. どっちを使うべき？（質問への直接回答）

- **「パッチをコピー」か「bitapplyをコピー」か**
  - **答え: パッチ（git diff / git apply）を使う**
- **再編してプレビューしたい**
  - **答え: ブランチを分けて、ローカル or Docker or 仮想空間で `npm run dev`**
- **仮想空間で実施して良いか**
  - **答え: 問題なし。Node 20 + npm install + npm run dev でOK**
