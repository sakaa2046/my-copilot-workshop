# GitHub Copilot 實戰工作坊作品集

![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)

# 待辦清單 Web App 作品集

這是一個在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App，目標是練習以純前端方式建立一個可用、可維護、具備基本狀態持久化功能的應用程式。

## 線上展示

GitHub Pages：
https://sakaa2046.github.io/my-copilot-workshop/

> 這個網址先作為占位連結，之後可依實際 GitHub Pages 設定自行替換。

## 功能

- 新增待辦事項
- 勾選/取消勾選已完成狀態
- 刪除單一待辦事項
- 依狀態篩選待辦：全部、未完成、已完成
- 保留使用者最後選擇的篩選條件
- 顯示未完成項目數量
- 支援淺色/深色模式切換
- 使用 localStorage 持久保存待辦資料與偏好設定
- 提供清除所有已完成項目的批次動作
- 在空白篩選結果時顯示明確提示訊息，避免使用者誤以為資料遺失

## 技術

這個專案使用純 HTML、CSS 與原生 JavaScript 開發，沒有使用任何前端框架或套件。

- HTML：建立應用結構與互動元件
- CSS：負責版面設計、主題切換與元件樣式
- JavaScript：處理待辦狀態、篩選邏輯、DOM 渲染與 localStorage 持久化
- 無框架、無套件、無外部 CDN
- 資料儲存在 browser 的 localStorage 中，讓頁面重新整理後仍可保留內容

## 開發方式

這個專案是依照 GitHub Copilot 實戰工作坊中的 Agent Mode、MCP 以及 agentic workflow 實作完成的。

- 使用 GitHub Copilot Agent Mode 協助分析需求與修正 issue
- 透過 GitHub MCP 讀取 repository 的 issue、檢視狀態並進行修正
- 依據 issue 內容建立分支、編輯程式、驗證功能並提交變更
- 利用 .github/prompts 的 fix-issue 流程來標準化修正作業
- 透過瀏覽器實際測試確認功能是否符合需求，並在必要時調整 UI 或互動邏輯

這樣的流程讓開發過程更接近真實團隊工作的 issue-driven 開發方式，並結合 AI 協作來提升效率與一致性。

## 我學到什麼

- GitHub Copilot 不只適合生成程式碼，也能協助排查問題、驗證行為與修正 Issue。
- 在純前端專案中，保留狀態與使用者偏好是提升使用者體驗的重要細節。
- 清楚的空狀態訊息與操作回饋，能有效降低使用者誤判的風險。
- 以 Issue 為導向的工作方式，有助於更聚焦地處理需求與驗證修正結果。
- 使用原生技術開發時，適當的結構設計與可讀性仍然是維護專案的關鍵。

## 結語

這個作品集展示的是一個小型但完整的前端應用，從需求拆解、樣式與互動實作，到 issue 修正與功能驗證，皆以實務方式完成。它不追求過度複雜的架構，而是聚焦在可用性、穩定性與清楚的使用者體驗。