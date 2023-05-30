[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/v4VHUSr5)
# hw6-connecting-to-a-backend
This is the starter code of [2023-Programming User Interface Homework](https://hackmd.io/@akairisu/Sy8CUT3m3)

# Report
- 姓名：江宗翰
- deploy 的網站連結：[https://majestic-pika-524b0d.netlify.app/](https://majestic-pika-524b0d.netlify.app/)
- 所實作的加分作業項目
    - Display More 功能
        - 當點擊 `Display More` 後，搜尋結果顯示區的捲軸會自動跳至最底。
    - 匿名購物車功能
        - 未登入狀態下均可加入購物車，登入後會將匿名購物車的內容加入帳號內購物車
        - 購物車的 `Checkout` 按紐會隨登入狀態改變：未登入時會顯示 `Login and Checkout`，並且連結至登入頁面；登入後則顯示 `Checkout` 並連結至未實作頁面。
- 討論連結後端的方法及使用時遇到的困難或感到困惑的部分：
    - firebase 的使用：雖然已經很簡單了，但對於這種整合的後端服務，常常會遇到太多名詞不知道他要表達的意思 (不論是中文還英文)，造成使用上的困難，相比 unsplash 就比較沒這問題。
    - 同時，firebase 有不同的版本，作業提供的範例不是最新版本的寫法 (web 9)，而是 web 8，花了點時間才發現兩者的差異。
- (加分)你實作的網站中與提出的作業規範不同之處
    - 保留了作業四的在購物車內可編輯尺寸或顏色的功能。
    - 不確定以下是否和規範不同，單純列出：
        - 點購物車圖案有重整的功能，因為直接重新整理瀏覽器會導致登出，故要測試同帳號內容一致性時，可以重複點購物車圖案來刷新取得後端資料庫資料。