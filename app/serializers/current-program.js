import ApplicationSerializer from './application';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class CurrentProgramSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    weeks: { embedded: 'always' },
  }
}
