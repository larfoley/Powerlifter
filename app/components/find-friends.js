import Component from '@glimmer/component';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class FindFriendsComponent extends Component {
  @service toast;
  @tracked searching = false;
  @tracked noUsersFound = false;
  delay = 350;
  users = A([]);

  async findFriends(userSearchTerm) {
    try {
      const results = await this.args.findFriends(userSearchTerm);

      this.users.removeObjects(this.users);

      if (!isEmpty(results)) {
        results.forEach(result => this.users.pushObject(result));
        this.noUsersFound = false;

      } else {
        this.noUsersFound = true;
      }

    } catch (error) {
      this.toast.error('Unable to search for friends');

    } finally {
      this.searching = false;
    }
  }

  @action
  debounceFindFriends(userSearchTerm) {
    this.noUsersFound = false;
    this.users.removeObjects(this.users);

    if (userSearchTerm.trim() !== "") {
      this.searching = true;
      debounce(this, this.findFriends, userSearchTerm, this.delay);
    }
  }
}