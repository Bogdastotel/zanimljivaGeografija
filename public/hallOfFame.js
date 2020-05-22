import UsernameAlert from "./usernameAlert.js";
import Korisnik from "./user.js";

const korisnici = [];
const counts = {};
const sortable = [];
const hall = document.querySelector(".hall");

db.collection("pojmovi")
  .orderBy("korisnik")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((document) => {
      // console.log();
      korisnici.push(document.data().korisnik);
    });
  })
  .then(() => {
    // console.log(korisnici);
    korisnici.forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
  })
  .then(() => {
    for (let user in counts) {
      sortable.push([user, counts[user]]);
    }
    sortable.sort(function (b, a) {
      return a[1] - b[1];
    });
  })
  .then(() => {
    let counter = 0;
    sortable.forEach((korisnik) => {
      counter++;
      counter <= 5
        ? (hall.innerHTML += `<h5>${korisnik[0]} - ${korisnik[1]}</h5>`)
        : console.log(korisnik);
    });
  });
