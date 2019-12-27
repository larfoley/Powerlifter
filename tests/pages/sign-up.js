import {
  create,
  visitable
} from 'ember-cli-page-object';
import signUpForm from './components/sign-up-form';

export default create({
  visit: visitable('/sign-up'),

  signUpForm
});
