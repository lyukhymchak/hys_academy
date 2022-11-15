export class Form {
  constructor(id) {
    const FORM_DATA_KEY = id + 'Data';

    this.form = document.getElementById(id);

    this.inputs = Array.from(this.form.elements).filter(
      el => el.nodeName === 'INPUT'
    );

    this.retrieveRecords(FORM_DATA_KEY);

    this.form.setAttribute('novalidate', true);

    this.addEventListeners(FORM_DATA_KEY);
  }

  addEventListeners(key) {
    this.form.addEventListener('submit', event =>
      this.validateForm(event, key)
    );

    this.form.addEventListener('input', event =>
      this.inputFormHandler(event, key)
    );
  }

  retrieveRecords(key) {
    const data = JSON.parse(localStorage.getItem(key));

    if (data !== null) {
      this.inputs.forEach((element, index) => {
        element.value = data[index][1];
      });
    }
  }

  clearStorage(event, key) {
    localStorage.removeItem(key);
  }

  storeRecords(key) {
    const data = [];

    this.inputs.forEach(element => {
      data.push([element.name, element.value]);
    });

    localStorage.setItem(key, JSON.stringify(data));
  }

  validateForm(e, key) {
    e.preventDefault();

    let formErrors = false;
    const form = e.target;
    const field = Array.from(form.elements);

    for (const el of field) {
      this.markFieldAsError(el, false);
      this.toggleErrorField(el, false);

      if (!el.checkValidity()) {
        this.markFieldAsError(el, true);
        this.toggleErrorField(el, true);
        formErrors = true;
      }
    }

    if (!formErrors) {
      form.submit();
      this.clearStorage(e, key);
    }
  }

  toggleErrorField(field, show) {
    const errorText = field.previousElementSibling;

    if (!errorText || !errorText.classList.contains('form-error-text')) {
      return;
    }

    errorText.style.display = show ? 'block' : 'none';
    errorText.setAttribute('aria-hidden', show);
  }

  markFieldAsError(field, show) {
    field.classList.toggle('field-error', show);
    this.toggleErrorField(field, show);
  }

  inputFormHandler(e, key) {
    this.storeRecords(key);

    if (e.target.classList.contains('form__input')) {
      this.markFieldAsError(e.target, !e.target.checkValidity());
    }
  }
}
