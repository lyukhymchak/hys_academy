import LocalStorage from './decorators/localStorage.decorator';
interface Init<T> {
  init(data: T[]): void;
}
export class Storage<DataType> implements Init<DataType> {
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
