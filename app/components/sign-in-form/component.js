import Component from '@ember/component';

export default Component.extend({
  username: '',
  password: '',

  submit(e) {
    e.preventDefault();
    const username = this.get('username');
    const password = this.get('password');

    this.authenticate(username, password);
  }
});
