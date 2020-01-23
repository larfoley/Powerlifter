import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  username() {
    return faker.internet.userName();
  },

  email() {
    return faker.internet.email();
  }
});
