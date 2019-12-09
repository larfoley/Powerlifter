import DataTableSerializerMixin from 'ember-data-table/mixins/serializer';

import RESTSerializer from '@ember-data/serializer/rest';

export default RESTSerializer.extend(DataTableSerializerMixin, {
});
