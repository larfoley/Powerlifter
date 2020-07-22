import Model, { attr, belongsTo } from '@ember-data/model';

export default class FriendRequestModel extends Model {
  @attr('date') added;
  @attr() friend;
  @attr('string') status;
  @belongsTo('user') user;

  get username() {
    return this.friend.username;
  }

  get friendRequestRecieved() {
    return this.status === 'pending';
  }

  get friendRequestSent() {
    return this.status === 'requested';
  }

  get isFriend() {
    return this.status === 'accepted';
  }
}
