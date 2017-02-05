export class ObjectKeysValueConverter {
  toView(value) {
    if(!value){
      return [''];
    }
    return Object.keys(value);
  }
}
