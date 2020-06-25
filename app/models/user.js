import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";

const validations = {
  username: {
    presence: true,
  },
  email: {
    presence: true,
  },
  password: {
    presence: true,
  }
}

export default Model.extend(Validator, {
  username: attr('string'),
  email: attr('string'),
  password: attr('string'),
  friendRequest: belongsTo('friend-request'),
  workoutPrograms: hasMany('workout-program'),
  confirmPassword: attr('string'),
  friendRequestRecieved: attr('boolean', { defaultValue: false} ),
  friendRequestSent: attr('boolean', { defaultValue: false} ),
  isFriend: attr('boolean', { defaultValue: false} ),
  isOnline: attr('boolean', { defaultValue: false} ),
  profilePic: attr('string'),
  workoutHistory: hasMany('workout-program-history'),
  validations
});
