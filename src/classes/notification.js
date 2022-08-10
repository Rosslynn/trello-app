import { v4 as uuidv4 } from 'uuid';

export default class Notification {
  constructor(options) {
    this.id = uuidv4();
    this.type = options.type;
    this.message = options.message;
  }
}
