import Model, { belongsTo, attr } from '@ember-data/model';

export default class CommentModel extends Model {
  @attr('string') content;
  @belongsTo('post') post;
}
