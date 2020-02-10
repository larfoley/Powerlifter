import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  author() {
    return {
      username: faker.internet.userName()
    }
  },

  content() {
    return faker.lorem.paragraph();
  },
});
