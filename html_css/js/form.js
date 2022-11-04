const FORM_DATA_KEY = 'formData';

const form = document.getElementById('form');
const btnSubmit = form.querySelector('button[type=submit]');
const name = form.querySelector('input[type=text]');
const tel = form.querySelector('input[type=tel]');
const email = form.querySelector('input[type=email]');

function clearStorage() {
  localStorage.removeItem(FORM_DATA_KEY);
}

function storeRecords() {
  const data = {
    name: name.value,
    tel: tel.value,
    email: email.value,
  };

  localStorage.setItem(FORM_DATA_KEY, JSON.stringify(data));
}

function retrieveRecords() {
  const data = JSON.parse(localStorage.getItem(FORM_DATA_KEY));

  if (data !== null) {
    name.value = data.name;
    tel.value = data.tel;
    email.value = data.email;
  }
}

function formOnLoad() {
  retrieveRecords();

  form.addEventListener('keydown', storeRecords);
  btnSubmit.addEventListener('click', clearStorage);
}

export { formOnLoad };
