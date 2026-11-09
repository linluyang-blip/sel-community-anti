# SEL 運動共學社群網站

國立高雄師範大學南區社會情緒學習與教育創新中心「SEL 運動共學社群」的活動與成果網站（115 年度，期程至 115/12/31）。網站內容與 commit 訊息一律使用繁體中文，commit 沿用 `feat:` / `fix:` 前綴。

## 指令

- `npm run dev`：本機開發
- `npm run build`：建置到 `dist/`
- `npm run preview`：預覽建置結果

專案沒有測試與 linter，修改後以 `npm run build` 加瀏覽器實際檢視來驗證。

## 部署

**推送到 `main` 會直接更新正式網站。** `.github/workflows/deploy.yml` 會建置並部署到 GitHub Pages：
https://linluyang-blip.github.io/sel-community-anti/

`vite.config.js` 的 `base` 必須維持 `/sel-community-anti/`，與 GitHub repo 名稱一致。

## 結構

Vite 多頁靜態網站，沒有使用框架。

- `index.html`：首頁（理念、活動時程、成員、聯絡表單）
- `outcomes.html`：成果發表頁（各場次照片）
- `main.js`、`style.css`：**實際使用的**腳本與樣式，放在專案根目錄
- `public/`：照片與靜態檔，建置時原樣複製
- `docx_content.txt`：社群核定表的文字內容，是活動資料的原始依據，不會出現在網站上
- `src/`：Vite 範本遺留檔，沒有被任何頁面引用，**不要改這裡**

新增 HTML 頁面時，要同時加進 `vite.config.js` 的 `rollupOptions.input`。

## 常見修改

**活動與成果的對應**：`index.html` 時程項目的 `onclick` 會連到 `outcomes.html#outcome-xxxx`，兩邊的 id 必須一致。

**活動結束後補上成果**：在 `outcomes.html` 把該場次的 `.card-placeholder` 改成 `.card`，保留原本的 `id`，並參考 04.24 到 06.15 的既有卡片格式，加上 `grid-column: 1 / -1`。

**加照片**：
- 放進 `public/`，檔名依場次編號，例如 `615-photo4.jpg`
- HTML 用根路徑 `/615-photo4.jpg`，Vite 建置時會自動補上 `base`
- `<img>` 要有 `class="timeline-img"` 才會接上燈箱，並維持 `loading="lazy"`
- 原始照片很大，過去也發生過破圖，放入前應先重新編碼並縮小

**聯絡表單**：透過 FormSubmit 寄送，由 `main.js` 以 fetch 背景送出。測試送出會寄出真實信件。
