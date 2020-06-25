import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class PostSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    media: { embedded: 'always' },
    likes: { embedded: 'always' },
  }
}
