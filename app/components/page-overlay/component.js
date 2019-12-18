import Component from '@ember/component';

export default Component.extend({
  classNames: ["page-overlay"],

  didInsertElement() {
    this._super(...arguments);
    document.body.classList.add('noscroll');
  },

  didDestroyElement() {
    this._super(...arguments);
    document.body.classList.remove('noscroll');
  }
});
