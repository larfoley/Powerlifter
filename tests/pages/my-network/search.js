import {
  create,
  visitable
} from 'ember-cli-page-object';
import findFriends from '../components/find-friends';
import userList from '../components/user-list';

export default create({
  visit: visitable('/my-network/search'),
  findFriends,
  userList
});
