import Controller from '@ember/controller';
import { action } from '@ember/object'
import { inject as service } from '@ember/service';

export default class HomeController extends Controller {
  @service session;
  count = 0;


  @action
  invalidateSession() {
    this.get('session').invalidate();
  }
}
