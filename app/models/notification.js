import Model, { attr, belongsTo } from '@ember-data/model';

export default class NotificationModel extends Model {
  @attr('boolean') isUnread;
  @attr('string') text;
  @attr('string') from;
  @belongsTo('user') user;
  @attr('boolean', { defaultValue: true }) new;
  @attr() link;
  @attr('date', { defaultValue() { return new Date(); } }) createdAt;
}
