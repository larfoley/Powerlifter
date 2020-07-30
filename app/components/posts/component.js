import Component from '@glimmer/component';
import { sort } from '@ember/object/computed';
import { set } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class PostsComponent extends Component {
  sortProps = ['createdAt:desc'];
  postLimit = 5;
  @tracked isLoadingMorePosts = false;
  @tracked posts;
  @service store;
  @tracked postCount;
  @sort('posts', 'sortProps' ) sortedPosts;

  constructor() {
    super(...arguments);
    this.posts = A();

    this._fetchPosts();
  }

  _fetchPosts() {
    this.isLoadingMorePosts = true;

    this.store.query('post', {
      offset: this.posts.length,
      limit: this.postLimit
    }).then(posts => {

      posts.toArray().forEach((post) => {
        this.posts.pushObject(post);
      });

      this.postCount = posts.meta.postCount;
      this.isLoadingMorePosts = false;
    })
  }

  willDestroy() {
    window.removeEventListener('scroll', this.loadMorePosts)
  }

  @action
  addScrolledToBottomListener() {
    window.addEventListener('scroll', this.loadMorePosts)
  }

  get hasMorePosts() {
    return this.postCount && this.postCount > this.posts.length;
  }

  get noPosts() {
    this.posts.length === 0 && !this.isLoadingMorePosts;
  }

  get shouldFetchMorePosts() {
    return (window.innerHeight + window.scrollY) >= document.body.offsetHeight && this.hasMorePosts && !this.isLoadingMorePosts
  }

  @action
  async loadMorePosts() {
    if (this.shouldFetchMorePosts) {

      this.isLoadingMorePosts = true;

      const newPosts = await this.store.query('post', {
        offset: this.posts.length,
        limit: this.postLimit
      })

      newPosts.toArray().forEach((post) => {
        this.posts.pushObject(post);
      });

      this.isLoadingMorePosts = false;
    }

    if (!this.hasMorePosts) {
      window.removeEventListener('scroll', this.loadMorePosts)
    }
  }
}
