export class Form {
  constructor(id) {
    const FORM_DATA_KEY = id + 'Data';

    this.form = document.getElementById(id);

    this.inputs = Array.from(this.form.elements).filter(
      el => el.nodeName === 'INPUT'
    );

    this.retrieveRecords(FORM_DATA_KEY);

    this.form.setAttribute('novalidate', true);

    for (const inputElement of this.inputs) {
      inputElement.addEventListener('input', e => {
        this.markFieldAsError(e.target, !e.target.checkValidity());
      });
    }

    this.form.addEventListener('submit', event =>
      this.validateForm(event, FORM_DATA_KEY)
    );

    this.form.addEventListener('input', () => this.storeRecords(FORM_DATA_KEY));
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

    if (errorText !== null) {
      if (errorText.classList.contains('form-error-text')) {
        errorText.style.display = show ? 'block' : 'none';
        errorText.setAttribute('aria-hidden', show);
      }
    }
  }

  markFieldAsError(field, show) {
    if (show) {
      field.classList.add('field-error');
    } else {
      field.classList.remove('field-error');
      this.toggleErrorField(field, false);
    }
  }
}
