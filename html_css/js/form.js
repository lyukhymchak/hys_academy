export class Form {
  constructor(id) {
    const FORM_DATA_KEY = id + "Data";
    this.form = document.getElementById(id);
    this.name = form.querySelector("input[type=text]");
    this.tel = form.querySelector("input[type=tel]");
    this.email = form.querySelector("input[type=email]");

    this.retrieveRecords(FORM_DATA_KEY);

    form.addEventListener("input", () => this.storeRecords(FORM_DATA_KEY));
    form.addEventListener("submit", (event, key) =>
      this.clearStorage(event, FORM_DATA_KEY)
    );
  }

  retrieveRecords(key) {
    const data = JSON.parse(localStorage.getItem(key));

    if (data !== null) {
      this.name.value = data.name;
      this.tel.value = data.tel;
      this.email.value = data.email;
    }
  }

  clearStorage(event, key) {
    event.preventDefault();

    localStorage.removeItem(key);

    this.name.value = "";
    this.tel.value = "";
    this.email.value = "";
  }

  storeRecords(key) {
    const data = {
      name: this.name.value,
      tel: this.tel.value,
      email: email.value,
    };

    localStorage.setItem(key, JSON.stringify(data));
  }
}

// export { formOnLoad };
