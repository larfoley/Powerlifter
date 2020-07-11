import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import Validator from "ember-model-validator/mixins/object-validator";
import { isPresent } from '@ember/utils';

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

export default class UserModel extends Model.extend(Validator) {
  validations;

  @attr('string') username;
  @attr('string') email;
  @attr('string') password;
  @belongsTo('friend-request') friendRequest;
  @attr('string') confirmPassword;
  @attr('boolean', { defaultValue: false} ) friendRequestRecieved;
  @attr('boolean', { defaultValue: false} ) friendRequestSent;
  @attr('boolean', { defaultValue: false} ) isFriend;
  @attr('boolean', { defaultValue: false} ) isOnline;
  @attr('string') profilePic;
  @hasMany('workout-program-template') workoutProgramTemplates;
  @hasMany('workout-program') workoutHistory;

};
