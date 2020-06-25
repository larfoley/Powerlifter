import Model, { attr, belongsTo } from '@ember-data/model';

export default class FileModel extends Model {
  @attr('string') url;
  @attr('string') mediaType;
  @attr('string') size;
  @attr('string') extension;
  @belongsTo('post') post;

  get isImage() {
    return this.mediaType === "image";
  }
}
