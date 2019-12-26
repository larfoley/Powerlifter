import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';
import { get, set } from '@ember/object';

export default Route.extend({
  // yield * removed
  uploadPhoto: task(function  (file) {
    let product = this.modelFor('product');
    let photo = this.store.createRecord('photo', {
      product,
      filename: get(file, 'name'),
      filesize: get(file, 'size')
    });

    try {
      file.readAsDataURL().then(function (url) {
        if (get(photo, 'url') == null) {
          set(photo, 'url', url);
        }
      });

      // let response = yield file.upload('/api/images/upload');

      set(photo, 'url', 'foo/bar');
      // yield photo.save();
    } catch (e) {
      photo.rollback();
    }
  }).maxConcurrency(3).enqueue(),

  actions: {
    uploadImage(file) {
      this.uploadPhoto.perform(file);
      file.readAsDataURL().then(function (url) {
        file.set('url', url);
      });
    }
  }
});
