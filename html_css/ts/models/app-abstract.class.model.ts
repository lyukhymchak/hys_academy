export default abstract class AppAbstract<T> {
  protected baseUrl = 'https://jsonplaceholder.typicode.com/albums/';

  protected abstract getSliderData(albumID: string): Promise<T[]>;
}
