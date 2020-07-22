import Component from '@glimmer/component';
import { isPresent } from '@ember/utils';

export default class TabsComponent extends Component {
  get sticky() {
    if (isPresent(this.args.sticky)) {
      return this.args.sticky;
    }

    return false;
  }
}
