import Model, { attr } from '@ember-data/model';

export default class FriendModel extends Model {
  @attr('string') username;
  @attr('boolean') isOnline;
}
