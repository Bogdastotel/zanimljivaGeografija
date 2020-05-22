export default class Korisnik {
  login(korisnik) {
    localStorage.setItem("korisnik", korisnik);
  }
}
