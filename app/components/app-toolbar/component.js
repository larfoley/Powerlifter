import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  classNames: ['app-toolbar'],
  title: "",

  showBackButton: computed(function() {
    return get(this, 'backButton') && window.history.length > 0;
  }),

  actions: {
    goBack() {
      window.history.back()
    }
  }
});
