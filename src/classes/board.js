export default class Board {
  constructor(options) {
    this.name = options.name;
    this.isStarred = options.isStarred || false;
    this.description = options.description;
  }
}
