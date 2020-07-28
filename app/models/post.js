import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";

export default class PostModel extends Model.extend(Validator) {
  @belongsTo('user', { async: false }) author;
  @attr('string') actionText;
  @attr('string') content;
  @hasMany('comment') comments;
  @attr('number', { defaultValue: 0 }) commentsCount;
  @belongsTo('like', { inverse: 'like' }) like;
  @belongsTo('file', { async: false }) media;
  @hasMany('like', { async: false, inverse: 'likes' }) likes;
  @attr('number', { defaultValue: 0 }) likesCount;
  @attr('date', { defaultValue() { return new Date(); }}) createdAt;

  get liked() {
    return true;
  }

  validations = {
    content: {
      presence: false,
    }
  };
}
