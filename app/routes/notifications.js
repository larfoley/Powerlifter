import Route from './protected';
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
