import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class NotificationsRoute extends Route {
  @service notifications;

  model() {
    return this.notifications.all;
  }

  afterModel() {
    this.notifications.markAllAsNotNew();
  }
}
