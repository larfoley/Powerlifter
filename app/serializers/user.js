import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class UserSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    workoutHistory: { embedded: 'always' },
  }
}
