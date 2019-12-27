import {
  create,
  visitable
} from 'ember-cli-page-object';
import signOutButton from './components/sign-out-button';

export default create({
  visit: visitable('/home'),
  signOutButton
});
