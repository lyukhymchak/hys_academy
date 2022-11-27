import LocalStorage from './decorators/localStorage.decorator';
import Init from './models/InitT.model';
export class Storage<DataType> implements Init<Array<DataType>> {
  private readonly key: string;

  @LocalStorage<DataType>('key')
  public localData: DataType[];

  constructor(key: string) {
    this.key = key;
  }

  public init(data: Array<DataType>): void {
    this.localData = data;
  }
}
