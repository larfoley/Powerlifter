import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNames: ['app-toolbar'],
  title: "",
  session: service(),

  showBackButton: computed(function() {
    return get(this, 'backButton') && window.history.length > 0;
  }),

  actions: {
    goBack() {
      window.history.back()
    },

    navigateTo() {
    },

    invalidateSession() {
      this.session.invalidate();
    }
  }
});
