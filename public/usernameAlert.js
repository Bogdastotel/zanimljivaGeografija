import Korisnik from "./user.js";

export default class UsernameAlert {
  usernameError = () =>
    Swal.fire({
      icon: "error",
      title: "Greška",
      text: "Korisničko ime je obavezno polje",
    }).then(() => {
      setTimeout(() => location.reload(), 500);
    });

  alertUser = () => {
    Swal.fire({
      title: "Unesite korisničko ime",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      confirmButtonText: "Potvrdi",
      showLoaderOnConfirm: true,
      preConfirm: (user) => {
        if (user !== "") {
          console.log(user);
          let username = new Korisnik(user);
          username.login(user);
          location.reload();
        } else {
          this.usernameError();
        }
      },
      allowOutsideClick: () => {
        this.usernameError();
      },
    });
  };
}
