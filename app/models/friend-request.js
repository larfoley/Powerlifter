import Model, { attr } from '@ember-data/model';

export default Model.extend({
  from: attr('string'),
  to: attr('string'),
  sendFriendRequest: attr('boolean', { defaultValue: false} ),
  acceptFriendRequest: attr('boolean', { defaultValue: false} ),
  declineFriendRequest: attr('boolean', { defaultValue: false} ),
});
