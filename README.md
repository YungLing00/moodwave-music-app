# 4young羊｜Big Five × Music Team

以 Big Five 五大人格為架構的音樂團隊組建互動原型。專案將人格分析、性格視覺化、音樂角色與優勢互補分組整合成一套完整體驗。

## 線上體驗

https://yungling00.github.io/moodwave-music-app/

## 完整功能

1. 填寫名字並選擇初始頭貼
2. 完成 IPIP 官方 50 題 Big Five Factor Markers 問卷
3. 依 IPIP 官方 scoring key 進行正向題與反向題計分ng羊」簡報提出的流程包含：人格問卷、人格建議、內在性格視覺化、填寫名字與選擇頭貼、進入聊天室及群組訊息。本版本已將上述流程製作為可操作的前端 App，並加入音樂創作團隊情境。

## 技術

- HTML5 / CSS3 / Vanilla JavaScript
- Canvas 人格雷達圖
- HTML5 Audio 授權音樂播放器
- LocalStorage 本機資料保存
- GitHub Pages 靜態部署

## 問卷依據

採用 International Personality Item Pool（IPIP）的 50-item Big-Five Factor Markers。IPIP 官方說明題庫屬於 public domain，可複製、翻譯與修改使用。

- [IPIP 50 題原始問卷與題目鍵值](https://ipip.ori.org/New_IPIP-50-item-scale.htm)
- [IPIP 官方計分規則](https://ipip.ori.org/newScoringInstructions.htm)
- [IPIP 個人分數解讀注意事項](https://ipip.ori.org/InterpretingIndividualIPIPScaleScores.htm)
- Goldberg, L. R. (1992). The development of markers for the Big-Five factor structure. Psychological Assessment, 4, 26–42.

本專案採五點量尺。正向題依 1–5 計分，反向題依 5–1 計分；每個構面10題，原始分數範圍10–50，介面換算為量尺內相對百分比。此百分比不是人口百分位。

## 音樂授權

## 人格與音樂推薦邏輯

研究顯示人格與音樂偏好之間存在統計關聯，但效果通常不大，不能由人格分數直接斷定個人一定喜歡某首歌。因此平台把推薦視為「探索起點」，並允許使用者自由切換歌曲。

- 開放性：研究中較穩定地連結到複雜、新穎、反思性或強烈反叛類型的偏好。
- 外向性：部分研究發現與 energetic、rhythmic、當代及較具律動感的音樂偏好相關。
- 親和性與盡責性：在部分研究中和較正向、傳統或低衝突的音樂特徵相關，但結果並非所有研究一致。
- 情緒敏感性：可能影響音樂中的情緒知覺與使用音樂調節情緒的方式，不代表必然偏好悲傷音樂。

參考：

- Rentfrow, P. J., & Gosling, S. D. (2003). The Do Re Mi's of Everyday Life.
- Rentfrow, P. J., Goldberg, L. R., & Levitin, D. J. (2011). The Structure of Musical Preferences.
- Greenberg, D. M., et al. (2015). Musical Preferences are Linked to Cognitive Styles.
- Kleć, M., et al. (2023). Beyond the Big Five personality traits for music recommendation.

播放器使用 Chris Zabriskie《Cylinders》系列中的 Cylinder Seven、Cylinder Three 與 Cylinder Eight。作者將專輯開放於 Creative Commons Attribution 授權下使用。

- [Cylinders 官方專輯與授權說明](https://chriszabriskie.com/cylinders/)
- [Cylinder Seven — Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Chris_Zabriskie_-_07_-_Cylinder_Seven.ogg)
- 音樂：Chris Zabriskie，Creative Commons Attribution 4.0

## 原專案研究來源

- 國立政治大學社會科學學院：〈理財專員之人格特質與工作績效關聯性之研究〉
- 國立宜蘭大學應用經濟與管理學系：〈工作價值觀落差對組織衝突之影響－以五大人格特質為調和變項〉
- 專案簡報：4young羊－個性化團隊組建

## 使用限制

目前是互動設計原型。IPIP 50 題採五點量尺並包含反向計分，用於展示人格視覺化與團隊協作流程，不應作為臨床心理診斷、招募淘汰或單一人事決策依據。正式研究或機構導入前，仍需確認量表授權、信效度、研究倫理與個資處理方式。


## 動態團隊房間

團隊成員不再由固定假資料產生。使用者可以：

- 透過房間頁輸入姓名與主要特質加入
- 複製房間邀請碼
- 自由移除非建立者成員
- 在聊天室中繼續新增成員
- 切換目前發言者，讓同一裝置上的不同成員留言
- 依當前成員重新計算特質多樣性與角色建議

目前 GitHub Pages 版本以 localStorage 儲存資料，適合展示與同裝置操作。跨裝置即時同步需要再串接 Firebase、Supabase 或其他具身分驗證的後端。


## 遊戲化互動更新

- 答題連擊、探索 XP 與里程碑成就
- 作答時五項人格星圖會隨答案即時發光成長
- 完成測驗時提供動態轉場與角色解鎖
- 音樂可標記喜歡或換一首，推薦理由會隨曲目更新
- 團隊共同任務：邀請夥伴、完成曲風投票、送出第一則訊息
- 動態曲風投票與票數比例
- 聊天室播放清單／任務面板
- 所有互動狀態皆保留於目前瀏覽器
