export default class Korisnik {
  constructor(korisnik) {
    this.korisnik = korisnik;
  }

  login(korisnik) {
    localStorage.setItem("korisnik", korisnik);
  }
}
