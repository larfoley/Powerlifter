import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  text: "Liked your post",
  isUnread: faker.random.boolean(),
  new: true,
  createdAt() {
    return faker.date.past()
  },
  from() {
    return faker.internet.userName();
  },
});
