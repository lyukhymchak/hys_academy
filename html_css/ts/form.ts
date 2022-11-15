export class Form {
  form: HTMLFormElement;
  inputs: HTMLInputElement[];

  constructor(id: string) {
    const FORM_DATA_KEY = id + 'Data';

    this.form = document.getElementById(id) as HTMLFormElement;

    this.inputs = Array.from(this.form.elements).filter(
      el => el.nodeName === 'INPUT'
    ) as HTMLInputElement[];

    this.retrieveRecords(FORM_DATA_KEY);

    this.form.setAttribute('novalidate', 'true');

    this.addEventListeners(FORM_DATA_KEY);
  }

  addEventListeners(key: string): void {
    this.form.addEventListener('submit', event =>
      this.validateForm(event, key)
    );

    this.form.addEventListener('input', event =>
      this.inputFormHandler(event, key)
    );
  }

  retrieveRecords(key: string) {
    const data: string = JSON.parse(localStorage.getItem(key));

    if (data !== null) {
      this.inputs.forEach((element, index) => {
        element.value = data[index][1];
      });
    }
  }

  clearStorage(event: Event, key: string) {
    localStorage.removeItem(key);
  }

  storeRecords(key: string) {
    const data: string[][] = [];

    this.inputs.forEach(element => {
      data.push([element.name, element.value]);
    });

    localStorage.setItem(key, JSON.stringify(data));
  }

  validateForm(event: Event, key: string): void {
    event.preventDefault();

    let formErrors: boolean = false;
    const form = event.target as HTMLFormElement;
    const fields = Array.from(form.elements) as HTMLInputElement[];

    for (const element of fields) {
      this.markFieldAsError(element, false);
      this.toggleErrorField(element, false);

      if (!element.checkValidity()) {
        this.markFieldAsError(element, true);
        this.toggleErrorField(element, true);
        formErrors = true;
      }
    }

    if (!formErrors) {
      form.submit();
      this.clearStorage(event, key);
    }
  }

  toggleErrorField(field: HTMLInputElement, show: boolean): void {
    const errorText = field.previousElementSibling as HTMLDivElement;

    if (!errorText || !errorText.classList.contains('form-error-text')) {
      return;
    }

    errorText.style.display = show ? 'block' : 'none';
    errorText.setAttribute('aria-hidden', String(show));
  }

  markFieldAsError(field: HTMLInputElement, show: boolean): void {
    field.classList.toggle('field-error', show);

    this.toggleErrorField(field, show);
  }

  inputFormHandler(event: Event, key: string) {
    this.storeRecords(key);

    const target = event.target as HTMLInputElement;

    if (target.classList.contains('form__input')) {
      this.markFieldAsError(target, !target.checkValidity());
    }
  }
}
