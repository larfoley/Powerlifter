import {
  create,
  visitable
} from 'ember-cli-page-object';
import signOutButton from './components/sign-out-button';
import appNavbar from './components/app-navbar';

export default create({
  visit: visitable('/home'),
  signOutButton,
  appNavbar
});
