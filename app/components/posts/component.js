import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';
import { set } from '@ember/object';

export default class PostsComponent extends Component {
  constructor() {
    super(...arguments);
    set(this, 'posts', this.args.posts);
  }
  
  sortProps = ['createdAt:desc'];

  @sort('posts', 'sortProps' ) sortedPosts;
}
