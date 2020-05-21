import Korisnik from "./user.js";

const korisnik = document.querySelector(".username");
const form = document.querySelector("form");
const pojamForma = document.querySelector(".pojamForma");
const kategorija = document.querySelector("#kategorija");
const pojam = document.querySelector("#pojam");
const pozdrav = document.querySelector(".pozdrav");

let user = new Korisnik(korisnik.value);

//pocetni alert i kreiranje korisnika u localStorage-u

// uslov da ako nema korisnika u localStorage-u ne prikazuje formu za dodavanje pojma

if (!localStorage.korisnik) {
  pojamForma.style.display = "none";
}

// dodavanje korisnika (setting up username in localStorage)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  //   console.log(username.value);
  if (korisnik.value !== "") {
    // localStorage.setItem("korisnik", korisnik.value);
    user.login(korisnik.value);
    korisnik.value = "";
    form.style.display = "none";
    pozdrav.innerHTML = `<h2> Zdravo ${localStorage.korisnik} !</h2>`;
    pojamForma.style.display = "block";
  } else {
    alert("Ovo polje ne sme biti prazno!");
  }
});

pojamForma.addEventListener("submit", (e) => {
  e.preventDefault();

  let regexP = /^[a-zA-Z\sšđčćžŠĐĆČŽ]*$/;
  let dateTmp = new Date();

  if (pojam.value.match(regexP)) {
    let pojamPolje = pojam.value.replace(/\s/g, "");
    let pojamPoljePrvoSlovo = pojamPolje.charAt(0).toUpperCase();

    let pojamPoljeOstatak = pojamPolje.slice(1).toLowerCase();
    let pojamFinal = pojamPoljePrvoSlovo + pojamPoljeOstatak;
    console.log(pojamFinal);

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
});
