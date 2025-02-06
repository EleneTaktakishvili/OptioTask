export class PigStatus {
  _id: number;
  name: string;
  imageUrl: string;

  constructor(_id: number, name: string, imageUrl: string) {
    this._id = _id;
    this.name = name;
    this.imageUrl = imageUrl;
  }
}
