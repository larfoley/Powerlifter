import Component from '@ember/component';

export default Component.extend({
  username: '',
  password: '',

  submit(e) {
    e.preventDefault();
    const username = this.username;
    const password = this.password;

    this.authenticate(username, password);
  }
});
