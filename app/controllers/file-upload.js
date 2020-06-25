import Controller from '@ember/controller';
import { action } from '@ember/object';

import Ember from 'ember';
import { task } from 'ember-concurrency';

const { get, set } = Ember;

export default class FileUploadController extends Controller.extend({
  uploadPhoto: task(function * (file) {
    let photo = this.store.createRecord('lift-record', {
      filename: get(file, 'name'),
      filesize: get(file, 'size')
    });

    try {
      file.readAsDataURL().then(function (url) {
        if (get(photo, 'url') == null) {
          set(photo, 'url', url);
        }
      });

      let response = yield file.upload('http://localhost:3000/upload');

      set(photo, 'url', response.headers.Location);

      yield photo.save();

    } catch (e) {
      console.log(e);
      photo.rollback();
    }
  }).maxConcurrency(3).enqueue(),
}) {

  @action
  uploadImage(file) {
    // get(this, 'uploadPhoto').perform(file);
  }
};
