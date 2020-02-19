import Model, { attr, hasMany } from '@ember-data/model';

export default class PostModel extends Model {
  @attr author;
  @attr('string') content;
  @hasMany('comment') comments;
  @attr('date', {
    defaultValue() { return new Date(); }
  }) createdAt;
}
