// ==============================
// 質問データ（5問）
// 各質問には「選択肢」と「スコア」が紐づいている
// ==============================
const questions = [
  {
    q: "最近、どんな気分ですか？", // 質問文
    options: [
      { text: "ハッピーな気分", score: 2 },
      { text: "わくわくしたい気分", score: 2 },
      { text: "別に普通", score: 1 },
      { text: "憂鬱な気分", score: 0 }
    ]
  },
  {
    q: "普段、どんな本をよく読みますか？",
    options: [
      { text: "甘くて苦い恋愛小説", score: 2 },
      { text: "強い女のサクセスストーリー", score: 2 },
      { text: "不思議な世界観のファンタジー", score: 1 },
      { text: "本はほとんど読まない", score: 0 }
    ]
  },
  {
    q: "落ち込んだ時はどうする？",
    options: [
      { text: "とにかく楽しい場所へ行く！", score: 2 },
      { text: "とにかく泣いてどん底まで落ち込む", score: 0 },
      { text: "落ち込んでいる暇があるなら努力する", score: 2 },
      { text: "大声で叫ぶ・物を破壊する", score: 0 }
    ]
  },
  {
    q: "この中であなたに近い性格は？",
    options: [
      { text: "元気、明るい、いつも笑顔、人間大好き", score: 2 },
      { text: "不思議、天然、自分の世界がある", score: 1 },
      { text: "芯がある、前向き、マイロードを突き進む", score: 2 },
      { text: "内気、優しい、はっきり言えない", score: 0 }
    ]
  },
  {
    q: "最後の質問です！あなたの「理想の生活」に近いのは？",
    options: [
      { text: "ルーティンワークをこなす日常", score: 0 },
      { text: "不思議で面白い世界へ迷い込みたい", score: 0 },
      { text: "宇宙空間へ飛び出したい", score: 0 },
      { text: "特に何もせず空を見ていたい", score: 0 }
    ]
  }
];

// ==============================
// スコアと最終回答に基づき、書籍を提案する関数
// ==============================
function getBook(score, answer5) {
  if (answer5 === 0) { // 「ルーティンワークをこなす日常」を選んだ場合
    if (score >= 8) return ["ナチュラルボーンチキン", "https://www.amazon.co.jp/dp/9784309039169"];
    if (score >= 5) return ["コンビニ人間", "https://www.amazon.co.jp/dp/9784167915548"];
    return ["博士の愛した数式", "https://www.amazon.co.jp/dp/9784101215235"];
  }
  if (answer5 === 1) { // 「不思議な世界へ迷い込みたい」を選んだ場合
    if (score >= 6) return ["家守綺譚", "https://www.amazon.co.jp/dp/9784104299034"];
    return ["博士の愛した数式", "https://www.amazon.co.jp/dp/9784101215235"];
  }
  if (answer5 === 2) { // 「宇宙空間へ飛び出したい」を選んだ場合
    if (score >= 7) return ["わたしたちが光の速さで進めないなら", "https://www.amazon.co.jp/dp/4150415333"];
    return ["きらきらひかる", "https://www.amazon.co.jp/dp/4101339119"];
  }
  if (answer5 === 3) { // 「空を見ていたい」を選んだ場合
    if (score >= 6) return ["きらきらひかる", "https://www.amazon.co.jp/dp/4101339119"];
    return ["博士の愛した数式", "https://www.amazon.co.jp/dp/9784101215235"];
  }
}

// ==============================
// 進行管理用の変数
// ==============================
let currentQ = 0;    // 現在の質問番号（0からスタート）
let totalScore = 0;  // 1〜4問目までの合計スコア
let lastAnswer5 = null; // 最後の質問（5問目）の回答を記録

// ==============================
// 最初の画面からクイズを開始する処理
// ==============================
function startQuiz() {
  // TOP画面を非表示にし、質問画面を表示
  document.getElementById("top").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  // 最初の質問を表示
  showQuestion();
}

// ==============================
// 現在の質問を画面に表示する処理
// ==============================
function showQuestion() {
  const q = questions[currentQ]; // 今の質問データを取得
  document.getElementById("question").innerText = q.q; // 質問文を表示
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = ""; // 過去の選択肢を消去

  // 各選択肢にボタンを作成
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.innerText = opt.text; // ボタンに選択肢テキストを表示
    btn.onclick = () => {
      // 1〜4問目はスコアを加算
      if (currentQ < 4) totalScore += opt.score;
      // 5問目は選択肢番号を記録
      if (currentQ === 4) lastAnswer5 = i;
      // 次の質問へ進む
      nextQuestion();
    };
    optionsDiv.appendChild(btn); // 選択肢ボタンを画面に追加
  });
}

// ==============================
// 次の質問へ進む処理
// ==============================
function nextQuestion() {
  currentQ++; // 質問番号を1進める
  if (currentQ < questions.length) {
    // まだ質問が残っていれば次を表示
    showQuestion();
  } else {
    // 全て答え終わったら結果表示へ
    showResult();
  }
}

// ==============================
// 結果を表示する処理
// ==============================
function showResult() {
  // 質問画面を隠し、結果画面を表示
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  // スコアと最終回答をもとに本を取得
  const [title, link] = getBook(totalScore, lastAnswer5);

  // 提案された本のタイトルとリンクを画面に反映
  document.getElementById("book-title").innerText = title;
  document.getElementById("amazon-link").href = link;
}
