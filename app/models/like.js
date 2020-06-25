import Model, { attr, belongsTo } from '@ember-data/model';

export default class LikeModel extends Model {
  @belongsTo('user') user;
  @belongsTo('post') post;
  @belongsTo('post') like;
  @belongsTo('post') likes;
}
