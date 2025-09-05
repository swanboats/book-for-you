// ---------------------------
// 質問データ
// ---------------------------
const questions = [
  {
    text: "最近、どんな気分ですか？",
    choices: ["ハッピーな気分","わくわくしたい気分","別に普通","憂鬱な気分"],
    scores: [3,2,1,0]
  },
  {
    text: "普段、どんな本をよく読みますか？",
    choices: ["甘くて苦い恋愛小説","強い女のサクセスストーリー","不思議な世界観のファンタジー","本はほとんど読まない"],
    scores: [3,2,2,0]
  },
  {
    text: "落ち込んだ時はどうする？",
    choices: ["とにかく楽しい場所へ行く！","とにかく泣いてどん底まで落ち込む","落ち込んでいる暇があるなら目標の為に努力する","大声で叫ぶ・物を破壊する"],
    scores: [3,1,2,0]
  },
  {
    text: "この中であなたに近い性格は？",
    choices: ["元気、明るい、いつも笑顔、人間大好き","不思議、天然、他の人にはわからない自分の世界がある","芯がある、前向き、マイロードを突き進む","内気、優しい、はっきり言うのがニガテ"],
    scores: [3,1,2,0]
  },
  {
    text: "最後の質問です！あなたの「理想の生活」に近いのは？",
    choices: ["ルーティンワークをこなす日常","不思議で面白い世界へ迷い込みたい","宇宙空間へ飛び出したい","特に何もせず空を見ていたい"],
    scores: [0,0,0,0] // 最終判定はここで分岐
  }
];

// ---------------------------
// 最終結果のマッピング
// Q5の選択＋Q1~4スコアで決定
// ---------------------------
const resultsMap = {
  "ルーティンワークをこなす日常": ["ナチュラルボーンチキン","コンビニ人間","博士の愛した数式"],
  "不思議で面白い世界へ迷い込みたい": ["家守綺譚","博士の愛した数式","博士の愛した数式"],
  "宇宙空間へ飛び出したい": ["わたしたちが光の速さで進めないなら","きらきらひかる","きらきらひかる"],
  "特に何もせず空を見ていたい": ["きらきらひかる","博士の愛した数式","博士の愛した数式"]
};

// ---------------------------
// グローバル変数
// ---------------------------
let currentQuestion = 0;
let totalScore = 0;
let finalAnswer = "";

// ---------------------------
// ページ要素取得
// ---------------------------
const topPage = document.getElementById("top-page");
const quizPage = document.getElementById("quiz-page");
const resultPage = document.getElementById("result-page");
const questionText = document.getElementById("question-text");
const choicesContainer = document.getElementById("choices-container");
const resultTitle = document.getElementById("result-title");
const resultLink = document.getElementById("result-link");

// ---------------------------
// 開始ボタン
// ---------------------------
function startQuiz() {
  topPage.classList.add("hidden");
  quizPage.classList.remove("hidden");
  currentQuestion = 0;
  totalScore = 0;
  finalAnswer = "";
  showQuestion();
}

// ---------------------------
// 質問表示
// ---------------------------
function showQuestion() {
  const q = questions[currentQuestion];
  questionText.textContent = q.text;
  choicesContainer.innerHTML = "";
  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.className = "choice-btn";
    btn.textContent = choice;
    btn.onclick = () => selectChoice(index);
    choicesContainer.appendChild(btn);
  });
}

// ---------------------------
// 選択肢クリック処理
// ---------------------------
function selectChoice(index) {
  if (currentQuestion < 4) {
    // Q1~Q4のスコア加算
    totalScore += questions[currentQuestion].scores[index];
  } else if (currentQuestion === 4) {
    // Q5の最終選択を保存
    finalAnswer = questions[4].choices[index];
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// ---------------------------
// 結果表示
// ---------------------------
function showResult() {
  quizPage.classList.add("hidden");
  resultPage.classList.remove("hidden");

  // Q1~Q4スコアで3段階に判定
  let scoreIndex;
  if (totalScore >= 8) scoreIndex = 0;       // 高スコア
  else if (totalScore >= 5) scoreIndex = 1;  // 中スコア
  else scoreIndex = 2;                        // 低スコア

  const book = resultsMap[finalAnswer][scoreIndex];
  resultTitle.textContent = book;
  resultLink.href = "https://www.amazon.co.jp/s?k=" + encodeURIComponent(book);
}

// ---------------------------
// 再診断
// ---------------------------
function restartQuiz() {
  resultPage.classList.add("hidden");
  topPage.classList.remove("hidden");
  currentQuestion = 0;
  totalScore = 0;
  finalAnswer = "";
}
