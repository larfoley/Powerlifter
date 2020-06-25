import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service currentUser;

  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
