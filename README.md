# MoodWave

> Listen to how you feel.

MoodWave 是一個結合音樂、情緒感知與呼吸引導的互動式聲景 Web App。使用者選擇當下情緒後，畫面的色彩、動態粒子、音樂節奏與音色會同步改變，讓「聆聽」不只是播放音樂，而是一段能回應使用者狀態的體驗。

## 互動設計概念

- **情緒先於曲目**：從「你現在感覺如何？」開始，降低選擇負擔。
- **多感官回饋**：聲音、色彩、波形與動態光圈同步回應。
- **溫和控制感**：使用者可以播放、暫停、改變聲景與重新開始。
- **呼吸引導**：以 4 秒吸氣、4 秒吐氣的視覺節奏陪伴使用者。
- **無限聲景**：使用 Web Audio API 即時生成音色，不依賴外部音檔。

## 四種聲音狀態

| 情緒 | 聲景 | 體驗目標 |
|---|---|---|
| 平靜 Calm | Still Water | 放慢與沉澱 |
| 專注 Focus | Golden Hour | 清晰與流動 |
| 能量 Energy | Inner Spark | 喚醒與行動 |
| 夢境 Dream | Lunar Drift | 漂浮與想像 |

## 操作方式

1. 選擇一種當下情緒。
2. 點擊中央播放鍵，啟動即時生成聲景。
3. 點擊左側交錯箭頭，產生新的聲音變化。
4. 跟隨右側光圈進行呼吸練習。
5. 可隨時切換情緒，視覺與聲音會同步轉換。

## 技術

- Semantic HTML5
- CSS Grid / Responsive Design / CSS Animation
- Vanilla JavaScript
- Web Audio API
- Canvas Particle System
- 無框架、無建置流程，直接開啟即可使用

## 本機執行

下載專案後直接開啟 `index.html`，或使用任一靜態伺服器：

```bash
python3 -m http.server 8080
```

接著前往 `http://localhost:8080`。

> 瀏覽器基於隱私與自動播放政策，聲音會在使用者第一次點擊播放後啟動。
