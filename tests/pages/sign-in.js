import {
  create,
  visitable
} from 'ember-cli-page-object';
import signInForm from './components/sign-in-form';
import signOutButton from './components/sign-out-button';

export default create({
  visit: visitable('/sign-in'),
  signInForm,
  signOutButton
});
