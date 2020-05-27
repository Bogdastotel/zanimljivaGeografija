const game = document.querySelector(".game");
const humanForm = document.querySelector("#humanForm");
const drzava = document.querySelector(".država");
const grad = document.querySelector(".grad");
const reka = document.querySelector(".reka");
const planina = document.querySelector(".planina");
const zivotinja = document.querySelector(".životinja");
const biljka = document.querySelector(".biljka");
const predmet = document.querySelector(".predmet");
const COMDržava = document.querySelector(".COMdržava");
const COMGrad = document.querySelector(".COMgrad");
const COMReka = document.querySelector(".COMreka");
const COMPlanina = document.querySelector(".COMplanina");
const COMŽivotinja = document.querySelector(".COMživotinja");
const COMBiljka = document.querySelector(".COMbiljka");
const COMPredmet = document.querySelector(".COMpredmet");
const potvrdi = document.querySelector(".potvrdi");
const startAgain = document.querySelector(".start");
const pslovo = document.querySelector(".pslovo");
const time = document.querySelector(".time");
const timeRemaining = document.querySelector(".timeRemaining");
const kreni = document.querySelector(".kreni");
const computerForm = document.querySelector(".computer");
const human = document.getElementById("human");
const humanScores = document.querySelector(".humanScores");
const computerScores = document.querySelector(".computerScores");

let formSubmitted = false;
let pocetnoSlovo = "";

const abeceda = [
  "A",
  "B",
  "C",
  "Č",
  "Ć ",
  "Č",
  "D",
  "Dž",
  "Đ",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "Lj",
  "M",
  "N",
  "Nj",
  "O",
  "P",
  "R",
  "S",
  "Š",
  "T",
  "U",
  "V",
  "Z",
  "Ž",
];

human.innerText = localStorage.korisnik;

let timeleft = 0;
game.style.display = "none";
potvrdi.style.display = "inline-block";
startAgain.style.display = "none";

startAgain.addEventListener("click", () => {
  humanForm.reset();
  humanScores.innerText = "";
  computerScores.innerText = "";
  computerForm.reset();
  kreni.click();
  potvrdi.style.display = "inline-block";
  startAgain.style.display = "none";
  formSubmitted = false;
});

kreni.addEventListener("click", () => {
  kreni.style.display = "none";
  ChooseLetter();
  timeleft = 90;

  setTimeout(() => {
    let downloadTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(downloadTimer);
        potvrdi.click();
      }

      if (formSubmitted) {
        timeRemaining.innerText = "Vreme je isteklo";
      } else {
        timeleft -= 1;
        timeRemaining.innerText = timeleft;
      }
    }, 1000);
  }, 2000);
});

function ChooseLetter() {
  let start = Date.now();
  let timer = setInterval(() => {
    let timePassed = Date.now() - start;
    pslovo.innerText =
      `Početno slovo je: ` +
      abeceda[Math.floor(Math.random() * abeceda.length)];

    if (timePassed >= 2000) {
      clearInterval(timer);
      pocetnoSlovo = abeceda[Math.floor(Math.random() * abeceda.length)];
      if (pocetnoSlovo !== "") {
        game.style.display = "block";
        time.style.display = "block";

        () => downloadTimer();
      }

      pslovo.innerHTML = `Početno slovo je: <span>${pocetnoSlovo}</span> `;
    }
  }, 100);
}

// ChooseLetter();

let nizKat = [
  "Država",
  "Grad",
  "Reka",
  "Planina",
  "Zivotinja",
  "Biljka",
  "Predmet",
];

// submit forme

humanForm.addEventListener("submit", (e) => {
  e.preventDefault();
  potvrdi.style.display = "none";
  formSubmitted = true;
  startAgain.style.display = "inline-block";
  console.log(`Pocetno slovo je ` + pocetnoSlovo);

  let nizOdg = [];
  let poeniCOM = {
    Država: 0,
    Grad: 0,
    Reka: 0,
    Planina: 0,
    Životinja: 0,
    Biljka: 0,
    Predmet: 0,
  };
  let nizOdgCOM = [];
  let answer = "";
  let poeni = {
    Država: 0,
    Grad: 0,
    Reka: 0,
    Planina: 0,
    Životinja: 0,
    Biljka: 0,
    Predmet: 0,
  };
  let poeniTotalHuman = 0;

  nizOdg.push(
    [
      drzava.value === "" ? (drzava.value = "/") : drzava.value,
      drzava.getAttribute("name"),
      COMDržava,
    ],
    [
      grad.value === "" ? (grad.value = "/") : grad.value,
      grad.getAttribute("name"),
      COMGrad,
    ],
    [
      reka.value === "" ? (reka.value = "/") : reka.value,
      reka.getAttribute("name"),
      COMReka,
    ],
    [
      planina.value === "" ? (planina.value = "/") : planina.value,
      planina.getAttribute("name"),
      COMPlanina,
    ],
    [
      zivotinja.value === "" ? (zivotinja.value = "/") : zivotinja.value,
      zivotinja.getAttribute("name"),
      COMŽivotinja,
    ],
    [
      biljka.value === "" ? (biljka.value = "/") : biljka.value,
      biljka.getAttribute("name"),
      COMBiljka,
    ],
    [
      predmet.value === "" ? (predmet.value = "/") : predmet.value,
      predmet.getAttribute("name"),
      COMPredmet,
    ]
  );

  console.log(nizOdg);

  nizOdg.forEach((odg) => {
    let moguciOdgovori = [];

    let verovatnoca = Math.floor(Math.random() * 10);
    // console.log("verovatnoca odgovora za " + odg[1], verovatnoca);

    // forma kompjutera

    if (verovatnoca < 8) {
      db.collection("pojmovi")
        .where("kategorija", "==", odg[1])
        .where("pocetnoSlovo", "==", pocetnoSlovo)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((item) => {
            // console.log(item.data().pojam);
            moguciOdgovori.push(item.data().pojam);
          });
        })
        .then(() => {
          answer =
            moguciOdgovori[Math.floor(Math.random() * moguciOdgovori.length)];
          // console.log(`kategorija ${odg[1]} - Odgovor: ${answer} `);
          nizOdgCOM.push(answer);
          // console.log(nizOdgCOM);
          // poeniCOM[odg[1]] += 10;
          odg[2].value = answer || "/";
          if (answer) {
            if (odg[0] == "") {
              poeniCOM[odg[1]] += 15;
            } else if (answer !== odg[0].value) {
              poeniCOM[odg[1]] += 10;
            } else if (answer === odg[0].value) {
              poeniCOM[odg[1]] += 5;
            }
          }
        });
    } else {
      odg[2].value = "/";
    }

    // forma korisnika

    db.collection("pojmovi")
      .where("pojam", "==", odg[0])
      .where("pocetnoSlovo", "==", pocetnoSlovo)
      .where("kategorija", "==", odg[1])
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((item) => {
          if (item.data().pojam) {
            if (odg[2].value == "/") {
              poeni[odg[1]] += 15;
            } else if (item.data().pojam !== odg[2].value) {
              poeni[odg[1]] += 10;
            } else if (item.data().pojam === odg[2].value) {
              poeni[odg[1]] += 5;
            }
          }
        });
      })
      .then(() => {
        console.log("poeni", poeni);
        poeniTotalHuman =
          poeni["Država"] +
          poeni["Grad"] +
          poeni["Reka"] +
          poeni["Planina"] +
          poeni["Životinja"] +
          poeni["Biljka"] +
          poeni["Predmet"];

        poeniTotalComputer =
          poeniCOM["Država"] +
          poeniCOM["Grad"] +
          poeniCOM["Reka"] +
          poeniCOM["Planina"] +
          poeniCOM["Životinja"] +
          poeniCOM["Biljka"] +
          poeniCOM["Predmet"];

        // dodeljivanje poena korisniku i racunaru
        humanScores.innerHTML = `
    <h4>Osvojeni poeni po kategorijama</h4>
    <div>Država - <span> ${poeni["Država"]}</span> </div>
    <div>Grad -<span> ${poeni["Grad"]} </span></div>
    <div>Reka -<span> ${poeni["Reka"]}</span> </div>
    <div>Planina -<span> ${poeni["Planina"]}</span> </div>
    <div>Životinja -<span> ${poeni["Životinja"]}</span> </div>
    <div>Biljka -<span> ${poeni["Biljka"]}</span></div>
    <div>Predmet -<span> ${poeni["Predmet"]}</span></div>
    <h4>Ukupno poena -<span> ${poeniTotalHuman}</span> </h4>
    `;
        computerScores.innerHTML = `
    <h4>Osvojeni poeni po kategorijama</h4>
    <div>Država - <span> ${poeniCOM["Država"]}</span> </div>
    <div>Grad -<span> ${poeniCOM["Grad"]} </span></div>
    <div>Reka -<span> ${poeniCOM["Reka"]}</span> </div>
    <div>Planina -<span> ${poeniCOM["Planina"]}</span> </div>
    <div>Životinja -<span> ${poeniCOM["Životinja"]}</span> </div>
    <div>Biljka -<span> ${poeniCOM["Biljka"]}</span></div>
    <div>Predmet -<span> ${poeniCOM["Predmet"]}</span></div>
    <h4>Ukupno poena -<span> ${poeniTotalComputer}</span> </h4>
    `;
        if (poeniTotalHuman > poeniTotalComputer) {
          humanScores.innerHTML += `<h3><span>POBEDA!</span></h3>`;
          // Swal.fire("Čestitamo! Pobedili ste!");
          Swal.fire({
            title: "Čestitamo! Pobedili ste!",
            imageUrl: "assets/victory.png",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Victory",
          });
        } else if (poeniTotalHuman < poeniTotalComputer) {
          // Swal.fire("Nažalost kompjuter je bio bolji...");
          Swal.fire({
            title: "Nažalost kompjuter je bio bolji...",
            imageUrl: "assets/robotWins.jpg",
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: "Victory",
          });
          computerScores.innerHTML += `<h3><span>POBEDA!</span></h3>`;
        } else {
          Swal.fire("Rezultat je nerešen!!!");
        }
      });
  });
});
