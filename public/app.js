import UsernameAlert from "./usernameAlert.js";
import Korisnik from "./user.js";

const korisnik = document.querySelector(".username");
const updateUsername = document.querySelector("#updateUsername");
const pojamForma = document.querySelector(".pojamForma");
const welcome = document.querySelector(".welcome");
const kategorija = document.querySelector("#kategorija");
const pojam = document.querySelector("#pojam");
const usernameAlert = new UsernameAlert();
const regexP = /^[a-zA-Z\sšđčćžŠĐĆČŽ]*$/;
const regexChinese = /[\u4E00-\u9FFF\u3400-\u4DFF\uF900-\uFAFF]+/g;
const dateTmp = new Date();
const user = new Korisnik();

// handling username input on page load

if (!localStorage.korisnik) {
  pojamForma.style.display = "none";
  usernameAlert.alertUser();
} else {
  pojamForma.style.display = "block";
  welcome.innerHTML = `Hello ${localStorage.korisnik}!`;
}

// promena username-a

updateUsername.addEventListener("submit", (e) => {
  e.preventDefault();
  if (korisnik.value.match(regexChinese))
    Swal.fire("Pojam ne sme sadržati specijalne karaktere ili brojeve");
  else if (korisnik.value !== "") {
    user.login(korisnik.value);
    korisnik.value = "";
    welcome.innerHTML = `Hello ${localStorage.korisnik}!`;
  } else {
    Swal.fire("Ovo polje ne sme biti prazno!");
  }
});

pojamForma.addEventListener("submit", (e) => {
  e.preventDefault();

  if (pojam.value.match(regexChinese))
    Swal.fire("Pojam ne sme sadržati specijalne karaktere ili brojeve");

  if (pojam.value === "") {
    Swal.fire("Molimo unesite pojam!");
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
            Swal.fire({
              position: "top",
              icon: "success",
              title: `Pojam '${pojamFinal}' uspešno dodat u bazu podataka!`,
              showConfirmButton: false,
              timer: 1500,
            });
            pojam.value = "";
          } else {
            snapshot.docs.forEach((doc) => {
              if (doc.data().pojam)
                Swal.fire(
                  "Uneseni pojam vec postoji u bazi, unesite novi pojam!"
                );
              pojam.value = "";
            });
          }
        });
    } else {
      Swal.fire("Pojam ne sme sadržati specijalne karaktere i brojeve");
    }
  }
});
