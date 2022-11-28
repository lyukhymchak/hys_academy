import LocalStorage from './decorators/localStorage.decorator';
import SessionStorage from './decorators/sessionStorage.decorator';
import Init from './models/init.generic.model';

export default class Storage<DataType> implements Init<Array<DataType>> {
  private readonly key: string;

  @LocalStorage('key')
  @SessionStorage('key')
  private _localData: Array<DataType>;

  public set localData(data: Array<DataType>) {
    if (data) {
      this._localData = data;

      sessionStorage.setItem(this.key, JSON.stringify(data));
      localStorage.setItem(this.key, JSON.stringify(data));
    }
  }

  public get localData(): Array<DataType> {
    return this._localData;
  }

  constructor(key: string) {
    this.key = key;
  }

  public init(data: Array<DataType>): void {
    this.localData = data;
  }
}
