import Service from '@ember/service';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class NotificationsService extends Service {
  @service store;
  @tracked notifications = A([]);

  async load() {
    const notifs = await this.store.findAll('notification');

    notifs.forEach(notif => this.notifications.pushObject(notif));

    return notifs;
  }

  add(notification) {
    this.notifications.pushObject(notification);
  }

  get all() {
    return this.notifications.sortBy('createdAt');
  }

  get totalNew() {
    let newNotifs = 0;

    for (let notif of this.notifications) {
      if (notif.new) {
        newNotifs++;
      }
    }

    return newNotifs;
  }

  get hasNewNotifications() {
    return this.totalNew > 0;
  }

  @action
  markAsRead(notification) {
    notification.isUnread = false;
    notification.save();
  }

  @action
  async markAllAsNotNew() {
    const promises = [];

    this.notifications.forEach(notif => {
      if (notif.new) {
        notif.new = false;
        promises.push(notif.save());
      }
    });

    return Promise.all(promises);
  }
}
