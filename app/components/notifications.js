import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NotificationsComponent extends Component {
  @service notifications;

  @action
  markAsRead(notif) {
    this.notifications.markAsRead(notif);
  }
}
