import Model, { attr } from '@ember-data/model';

export default class NotificationModel extends Model {
  @attr('boolean') isUnread;
  @attr('string') text;
  @attr('string') from;
  @attr('boolean', { defaultValue: true }) new;
  @attr() link;
  @attr('date', { defaultValue() { return new Date(); } }) createdAt;
}
