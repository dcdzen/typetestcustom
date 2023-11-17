const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

const textTimer = document.getElementById("textTimer");
const infoTimer = document.getElementById("infoTimer");

const myBtn = document.getElementById("myBtn");
const alertInfo = document.getElementById("alertInfo");
const textTest = document.getElementById("textTest");
const inputTest = document.getElementById("inputTest");

let wps = 0;
let test;

let milisec = 0;
let sec = 0;

const filterDataHTML = localStorage.getItem("dataListHTML");
const dataListHTML = filterDataHTML ? JSON.parse(filterDataHTML) : [];

const joindataListHTML = dataListHTML.join("");

const filterData = localStorage.getItem("dataList");
const dataList = filterData ? JSON.parse(filterData) : [];

const filterTimer = localStorage.getItem("dataTimer");
const dataTimer = filterTimer ? JSON.parse(filterTimer) : [];

const collBtn = document.getElementById("collBtn");
let coll = document.getElementsByClassName("collapsible");
let content = collBtn.nextElementSibling;
let countList;

inputbox.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    myBtn.click();
  }
});

function createTask() {
  const listTest = document.createElement("li");
  const spanTest = document.createElement("span");
  const wrapTime = document.createElement("span");
  const spanTime = document.createElement("span");
  const markTime = document.createElement("span");
  const spanDel = document.createElement("span");

  listTest.classList.add("inList");
  listcontainer.appendChild(listTest);

  test = inputbox.value;

  spanTest.classList.add("testText");
  spanTest.innerHTML = test;
  listTest.appendChild(spanTest);

  wrapTime.classList.add("testTimer");
  spanTime.classList.add("theTimer");
  spanTime.innerHTML = wps;
  wrapTime.innerHTML = "(";
  markTime.innerHTML = " sec)";
  wrapTime.appendChild(spanTime);
  wrapTime.appendChild(markTime);
  listTest.appendChild(wrapTime);

  spanDel.classList.add("delBtn");
  spanDel.innerHTML = "\u00d7";
  listTest.appendChild(spanDel);

  content.style.maxHeight = content.scrollHeight + "px";

  updateData();

  saveData();
  // location.reload();
}

function updateData() {
  textTest.innerHTML = "Refresh page before start!";
  inputTest.disabled = true;
  infoTimer.style.display = "none";
  inputTest.placeholder = "refresh page!";
}

function addTask() {
  let i = 1;
  if (inputbox.value === "") {
    alertInfo.classList.remove("hide");

    myBtn.addEventListener("click", function () {
      i += 1;
      if (i == 2) {
        animateWrong();
      }
    });
  } else {
    myBtn.addEventListener("click", function () {
      i = 0;
      alertInfo.classList.remove("ping2deg");
    });

    alertInfo.classList.add("hide");
    listcontainer.classList.remove("hide");
    createTask();
  }
  inputbox.value = "";
}

function animateWrong() {
  alertInfo.classList.add("ping2deg");
  i = 0;
  setTimeout(() => {
    if (i == 0) {
      alertInfo.classList.remove("ping2deg");
    }
  }, 500);
}

function saveData() {
  const getListHTML = listcontainer.querySelectorAll("li");
  const dataListHTML = [];
  getListHTML.forEach((li) => {
    let x = li.outerHTML;
    dataListHTML.push(x);
  });
  localStorage.setItem("dataListHTML", JSON.stringify(dataListHTML));

  const getList = listcontainer.querySelectorAll(".testText");
  const dataList = [];
  getList.forEach((span) => {
    dataList.push(span.innerHTML);
  });
  localStorage.setItem("dataList", JSON.stringify(dataList));

  const getTimer = listcontainer.querySelectorAll(".theTimer");
  const dataTimer = [];
  getTimer.forEach((span) => {
    dataTimer.push(span.innerHTML);
  });
  localStorage.setItem("dataTimer", JSON.stringify(dataTimer));

  const numList = document.querySelectorAll("li").length;
  localStorage.setItem("numList", numList);
}

function showTask() {
  const numList = localStorage.getItem("numList");
  if (joindataListHTML) {
    listcontainer.innerHTML = joindataListHTML;

    listcontainer.classList.remove("hide");
  } else if (numList == 0) {
    console.log("list kosong");
    listcontainer.classList.add("hide");
  }
}
showTask();

let j = 0;
let k = 0;

function startTest() {
  let start = "start";
  textTest.innerHTML = 'Type "start" to begin!';

  inputTest.addEventListener("input", function () {
    if (inputTest.value.length > 0) {
      collBtn.disabled = true;
      closeList();
    } else {
      collBtn.disabled = false;
    }
    if (inputTest.value == start) {
      console.log("start!");
      inputTest.value = "";
      textTest.innerHTML = dataList[j];
      theTest();

      startTimer();
    }
  });
}
startTest();

function theTest() {
  inputTest.addEventListener("input", function () {
    textTest.innerHTML = dataList[j];

    if (inputTest.value[k] == dataList[j][k]) {
      if (inputTest.value.length != k) {
        k = inputTest.value.length;
      } else {
        k += 1;
      }
    } else {
      textTest.classList.add("ping10deg");
      setTimeout(() => {
        textTest.classList.remove("ping10deg");
      }, 500);

      if (inputTest.value.length != k) {
        k = inputTest.value.length;
      } else {
        k += 1;
      }
    }

    while (inputTest.value == dataList[j]) {
      console.log("========================");

      console.log(textTimer.innerHTML);
      dataTimer[j] = textTimer.innerHTML;
      localStorage.setItem("dataTimer", JSON.stringify(dataTimer));

      dataListHTML[j] = '<li class="inList"><span class="testText">' + dataList[j] + '</span><span class="testTimer">(<span class="theTimer">' + textTimer.innerHTML + '</span><span> sec)</span></span><span class="delBtn">×</span></li>';
      localStorage.setItem("dataListHTML", JSON.stringify(dataListHTML));

      clearInterval(countTimer);
      milisec = 0;
      sec = 0;
      startTimer();

      j += 1;
      textTest.innerHTML = dataList[j];
      inputTest.value = "";
    }

    endTest();
  });
}

function endTest() {
  while (dataList[j] === undefined) {
    inputTest.disabled = true;
    infoTimer.style.display = "none";
    inputTest.placeholder = "wait..";

    textTest.innerHTML = "finish!";
    console.log("end");

    setTimeout(() => {
      if (dataList[j] === undefined) {
        textTest.innerHTML = "finish! 1";

        setTimeout(() => {
          if (dataList[j] === undefined) {
            textTest.innerHTML = "finish! 1 2";

            setTimeout(() => {
              if (dataList[j] === undefined) {
                textTest.innerHTML = "finish! 1 2 3";

                setTimeout(() => {
                  if (dataList[j] === undefined) {
                    inputTest.disabled = false;
                    location.reload();
                  }
                }, 1000);
              }
            }, 1000);
          }
        }, 1000);
      }
    }, 1000);
    break;
  }
}

function startTimer() {
  countTimer = setInterval(() => {
    milisec++;
    if (milisec == 100) {
      milisec = 0;
      sec++;
    }

    let timer = sec + "." + milisec;
    textTimer.innerHTML = timer;
  }, 10);
  return;
}

listcontainer.addEventListener("click", function (e) {
  saveData();
  const numList = localStorage.getItem("numList");
  if (e.target.className === "delBtn") {
    e.target.parentElement.remove();
    console.log("list terhapus");
    updateData();
    saveData();
    // location.reload();
    if (numList == 1) {
      console.log("list kosong");
      listcontainer.classList.add("hide");
    }
  }
});

if (coll.length) {
  for (countList = 0; countList <= coll.length; countList++) {
    coll[countList].addEventListener("click", function () {
      if (content.style.maxHeight) {
        closeList();
      } else {
        collBtn.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

function closeList() {
  content.style.maxHeight = null;
  collBtn.classList.remove("active");
}
