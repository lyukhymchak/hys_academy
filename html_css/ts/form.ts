export class Form {
  private form: HTMLFormElement;
  private inputs: HTMLInputElement[];
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  public init() {
    const FORM_DATA_KEY: string = this.id + 'Data';

    this.form = document.getElementById(this.id) as HTMLFormElement;

    this.inputs = Array.from(this.form.elements).filter(
      (el: HTMLInputElement) => el.nodeName === 'INPUT'
    ) as HTMLInputElement[];

    this.retrieveRecords(FORM_DATA_KEY);

    this.form.setAttribute('novalidate', 'true');

    this.addEventListeners(FORM_DATA_KEY);
  }

  private addEventListeners(key: string): void {
    this.form.addEventListener('submit', (event: Event) =>
      this.validateForm(event, key)
    );

    this.form.addEventListener('input', (event: Event) =>
      this.inputFormHandler(event, key)
    );
  }

  private retrieveRecords(key: string): void {
    const data: string = JSON.parse(localStorage.getItem(key));

    if (data) {
      this.inputs.forEach((element: HTMLInputElement, index: number) => {
        element.value = data[index][1];
      });
    }
  }

  private clearStorage(event: Event, key: string): void {
    localStorage.removeItem(key);
  }

  private storeRecords(key: string): void {
    const data: string[][] = [];

    this.inputs.forEach((element: HTMLInputElement) => {
      data.push([element.name, element.value]);
    });

    localStorage.setItem(key, JSON.stringify(data));
  }

  private validateForm(event: Event, key: string): void {
    event.preventDefault();

    let formErrors: boolean = false;
    const form: HTMLFormElement = event.target as HTMLFormElement;
    const fields: HTMLInputElement[] = Array.from(
      form.elements
    ) as HTMLInputElement[];

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

  private toggleErrorField(field: HTMLInputElement, show: boolean): void {
    const errorText: HTMLDivElement =
      field.previousElementSibling as HTMLDivElement;

    if (!errorText || !errorText.classList.contains('form-error-text')) {
      return;
    }

    errorText.style.display = show ? 'block' : 'none';
    errorText.setAttribute('aria-hidden', String(show));
  }

  private markFieldAsError(field: HTMLInputElement, show: boolean): void {
    field.classList.toggle('field-error', show);

    this.toggleErrorField(field, show);
  }

  private inputFormHandler(event: Event, key: string): void {
    this.storeRecords(key);

    const target: HTMLInputElement = event.target as HTMLInputElement;

    if (target.classList.contains('form__input')) {
      this.markFieldAsError(target, !target.checkValidity());
    }
  }
}
