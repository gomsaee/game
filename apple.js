let clickNumber = 0;
let title2 = document.querySelector(".title_2");
let title3 = document.querySelector(".title_3");
let mainBox = document.querySelector(".main_box");
let progressBar = document.querySelector(".progress-bar");
let progressBarOrange = document.querySelector(".progress-bar-orange");
let textRight = document.querySelector(".text-right");
let textLeft = document.querySelector(".text-left");
let t0;
let t1;
let resultArray = [];
let setTimeoutTest;

const getRandSec = () => {
  return Math.floor(Math.random() * 10) + 1;
};

let sec = getRandSec();

const rulesOfTest = (e) => {
  if (e.target === document.querySelector(".start_button")) {
    clickNumber = 0;
    resultArray = [];
    title2.innerHTML = "시작";
    title2.style.textAlign = "center";
    title2.style.fontSize = "30px";
    title3.innerHTML =
      "총 기회는 5번 주어집니다. 다음준비화면애서 배경화면이 초록색이 되었을 때 클릭하시면 됩니다. 시작하시려면 현재화면을 클릭해주세요.";
    title3.style.textAlign = "center";
    document.querySelector(".title").style.display = "none";
    document.querySelector(".start_button").style.display = "none";
    mainBox.style.backgroundColor = "lightPink";
  }
  e.stopPropagation();
  mainBox.addEventListener("click", testClickReady);
};

document.querySelector(".start_button").addEventListener("click", rulesOfTest);

const testClickQuickly = () => {
  mainBox.style.backgroundColor = "lightGreen";
  title2.innerHTML = "클릭";
  title3.innerHTML = "클릭해주세요";
  t0 = performance.now();
  mainBox.addEventListener("click", testClickReady);

  mainBox.removeEventListener("click", isFailClick);
};

const testClickReady = (e) => {
  clickNumber++;
  if (clickNumber > 0) {
    textRight.style.display = "block";
    progressBar.style.display = "block";
    mainBox.style.backgroundColor = "lightYellow";
    title2.innerHTML = "준비";
    title3.innerHTML = "배경화면이 초록색이 되면 클릭해주세요.";
    mainBox.removeEventListener("click", testClickReady);
    mainBox.addEventListener("click", isFailClick);
    setTimeoutTest = setTimeout(testClickQuickly, sec * 200);
    mainBox.removeEventListener("click", reStartErrorPage);
  }
  if (clickNumber === 1) {
    textRight.innerHTML = "0 / 5";
    progressBarOrange.style.width = "0%";
  }
  if (clickNumber === 2) {
    resultRepository();
    textRight.innerHTML = "1 / 5";
    progressBarOrange.style.width = "20%";
    document.querySelector(".text-left-try1").style.display = "block";
    document.querySelector(
      ".text-left-try1"
    ).innerHTML = `첫번째 시도 : ${resultArray[0].toFixed(2)} ms`;
  }
  if (clickNumber === 3) {
    resultRepository();
    textRight.innerHTML = "2 / 5";
    progressBarOrange.style.width = "40%";
    document.querySelector(".text-left-try2").style.display = "block";
    document.querySelector(
      ".text-left-try2"
    ).innerHTML = `두번째 시도 : ${resultArray[1].toFixed(2)} ms`;
  }
  if (clickNumber === 4) {
    resultRepository();
    textRight.innerHTML = "3 / 5";
    progressBarOrange.style.width = "60%";
    document.querySelector(".text-left-try3").style.display = "block";
    document.querySelector(
      ".text-left-try3"
    ).innerHTML = `세번째 시도 : ${resultArray[2].toFixed(2)} ms`;
  }
  if (clickNumber === 5) {
    resultRepository();
    textRight.innerHTML = "4 / 5";
    progressBarOrange.style.width = "80%";
    document.querySelector(".text-left-try4").style.display = "block";
    document.querySelector(
      ".text-left-try4"
    ).innerHTML = `네번째 시도 : ${resultArray[3].toFixed(2)} ms`;
  }
  if (clickNumber > 5) {
    resultRepository();
    textRight.innerHTML = "5 / 5";
    progressBarOrange.style.width = "100%";
    mainBox.style.backgroundColor = "white";
    title2.innerHTML = "잠시만 기다려주세요.";
    title3.innerHTML = "";
    document.querySelector(".text-left-try5").style.display = "block";
    document.querySelector(
      ".text-left-try5"
    ).innerHTML = `다섯번째 시도 : ${resultArray[4].toFixed(2)} ms`;
    clearTimeout(setTimeoutTest);
    testResult(e);
    return;
  }
};

const reStartErrorPage = () => {
  clickNumber = 0;
  resultArray = [];

  textRight.style.display = "block";
  progressBar.style.display = "block";
  progressBarOrange.style.width = "0%";
  document.querySelector(".text-left-try1").style.display = "none";
  document.querySelector(".text-left-try2").style.display = "none";
  document.querySelector(".text-left-try3").style.display = "none";
  document.querySelector(".text-left-try4").style.display = "none";
  document.querySelector(".text-left-try5").style.display = "none";

  testClickReady();
};

const isFailClick = () => {
  clearTimeout(setTimeoutTest);
  mainBox.style.backgroundColor = "darkGray";
  title2.innerHTML = "준비 화면에서는 클릭이 불가합니다.";
  title3.innerHTML =
    "준비 화면에서는 클릭이 불가합니다.화면이 초록색으로 바뀌면 클릭 해 주시길 바랍니다. 처음부터 시작하려면 화면을 클릭해주세요.";

  mainBox.addEventListener("click", reStartErrorPage);
};

const resultRepository = () => {
  t1 = performance.now();
  let 결과값 = t1 - t0;
  resultArray.push(결과값);
};

const timeResult = () => {
  let sum = 0;

  for (i = 0; i < resultArray.length; i++) {
    sum += resultArray[i];
  }

  let result = sum / resultArray.length;

  textRight.style.display = "none";
  progressBar.style.display = "none";
  document.querySelector(".text-left-try1").style.display = "none";
  document.querySelector(".text-left-try2").style.display = "none";
  document.querySelector(".text-left-try3").style.display = "none";
  document.querySelector(".text-left-try4").style.display = "none";
  document.querySelector(".text-left-try5").style.display = "none";

  title2.innerHTML = "테스트결과";
  title3.innerHTML = `다섯번의 평균값은 ${result.toFixed(2)} ms`;

  mainBox.style.backgroundColor = "white";
  document.querySelector(".start_button").style.display = "block";
  document.querySelector(".start_button").innerHTML = "다시해보기";
  document.querySelector(".start_button").style.margin = "auto";
  document.querySelector(".start_button").style.marginTop = "30px";
  mainBox.removeEventListener("click", testResult);
  mainBox.removeEventListener("click", resultRepository);
  mainBox.removeEventListener("click", isFailClick);
};

const testResult = () => {
  setTimeout(timeResult, 1000);
};
