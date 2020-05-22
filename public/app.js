import UsernameAlert from "./usernameAlert.js";
import Korisnik from "./user.js";

const korisnik = document.querySelector(".username");
const updateUsername = document.querySelector("#updateUsername");
const pojamForma = document.querySelector(".pojamForma");
const welcome = document.querySelector(".welcome");
const kategorija = document.querySelector("#kategorija");
const pojam = document.querySelector("#pojam");
const pozdrav = document.querySelector(".pozdrav");
const usernameAlert = new UsernameAlert();
const regexP = /^[a-zA-Z\sšđčćžŠĐĆČŽ]*$/;
const dateTmp = new Date();
const user = new Korisnik();

// handling username input on page load

if (!localStorage.korisnik) {
  pojamForma.style.display = "none";
  usernameAlert.alertUser();
} else {
  pojamForma.style.display = "block";
  welcome.innerHTML = `Dobrodošao ${localStorage.korisnik}!`;
}

// promena username-a

updateUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  if (korisnik.value !== "") {
    user.login(korisnik.value);
    korisnik.value = "";
    welcome.innerHTML = `Dobrodošao ${localStorage.korisnik}!`;
  } else {
    alert("Ovo polje ne sme biti prazno!");
  }
});

pojamForma.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pojam.value === "") {
    alert("Molimo unesite pojam!");
  } else {
    if (pojam.value.match(regexP)) {
      let pojamPolje = pojam.value.replace(/\s/g, "");
      let pojamPoljePrvoSlovo = pojamPolje.charAt(0).toUpperCase();

      let pojamPoljeOstatak = pojamPolje.slice(1).toLowerCase();
      let pojamFinal = pojamPoljePrvoSlovo + pojamPoljeOstatak;

      let pojamDodavanje = {
        kategorija: kategorija.value,
        korisnik: localStorage.korisnik,
        pocetnoSlovo: pojamFinal[0],
        pojam: pojamFinal,
        vreme: firebase.firestore.Timestamp.fromDate(dateTmp),
      };
      // get kategorije
      db.collection("pojmovi")
        .where("pojam", "==", pojamFinal)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length < 1) {
            // dodavanje pojma
            db.collection("pojmovi").add(pojamDodavanje);
            alert(`Pojam '${pojamFinal}' uspešno dodat u bazu podataka!`);
            pojam.value = "";
          } else {
            snapshot.docs.forEach((doc) => {
              if (doc.data().pojam)
                alert("Uneseni pojam vec postoji u bazi, unesite novi pojam!");
              pojam.value = "";
            });
          }
        });
    } else {
      alert("Pojam ne sme sadržati specijalne karaktere i brojeve");
    }
  }
});
