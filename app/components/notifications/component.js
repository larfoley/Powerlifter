import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NotificationsComponent extends Component {
  @service notifications;
  @service router;

  get notifs() {
    return this.notifications.all
  }

  @action
  async onClickNotification(notif) {
    if (notif.isUnread) {
      await this.notifications.markAsRead(notif);
    }

    if (notif.link.model) {
      this.router.transitionTo(notif.link.route, notif.link.model)
    } else {
      this.router.transitionTo(notif.link.route)
    }
  }
}
