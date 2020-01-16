import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';
import {
  isAbortError,
  isServerErrorResponse,
  isUnauthorizedResponse,
  isNotFoundResponse
} from 'ember-fetch/errors';
import ENV from '../config/environment';

const { host } = ENV.APP;

const handleErrors = (toast, response) => {
  if (isUnauthorizedResponse(response)) {
    toast.error(response.statusText);

  } else if (isServerErrorResponse(response)) {
    toast.error(response.statusText);

  } else if (isNotFoundResponse(response)) {
   toast.error(response.statusText);
  }
}

export default class FriendRequestButtonComponent extends Component {
  @service store;
  @service currentUser;
  @service toast;
  @service session;

  @action
  async sendFriendRequest() {
    const user = this.args.user;

    fetch(`${host}/friendRequests`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friendRequest: {
          from: this.currentUser.user.id,
          to: this.args.user.id
        }
      })
    })
   .then((response) => {
     if (!response.ok) {
       user.rollbackAttributes();
       handleErrors(this.toast, response);

     } else {
       if (user.friendRequestRecieved) {
         this.toast.success('Friend request accepted')
         user.isFriend = true;
       } else {
         this.toast.success('Friend request sent')
         user.friendRequestSent = true;
       }
     }
   })
   .catch((error) => {
     user.rollbackAttributes();

     if (isAbortError(error)) {
       this.toast.error(error);
     }

     this.toast.error(error);
   });
  }

  @action
  async removeFriend() {
    const user = this.args.user;

    fetch(`${host}/friendRequests`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.session.data.authenticated.access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friendRequest: {
          from: this.currentUser.user.id,
          to: this.args.user.id
        }
      })
    })
   .then((response) => {
     if (!response.ok) {
       user.rollbackAttributes();
       handleErrors(this.toast, response);
       
     } else {
       if (user.friendRequestRecieved) {
         this.toast.success('Friend request declined')
         user.friendRequestRecieved = false;

       } else if (user.isFriend) {
         this.toast.success('Friend removed')
         user.isFriend = false;

       } else if (user.friendRequestSent) {
         this.toast.success('Friend request canceled')
         user.friendRequestSent = false;
       }
     }
   })
   .catch((error) => {
     user.rollbackAttributes();

     if (isAbortError(error)) {
       this.toast.error(error);
     }

     this.toast.error(error);
   });
  }
}
