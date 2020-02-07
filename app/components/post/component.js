import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class PostComponent extends Component {
  @tracked showingComments = false;

  @action
  showComments() {
    this.showingComments = true;
  }
}
