export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  this.urlPrefix = 'http://localhost:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.passthrough('/write-coverage');
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');


    https://www.ember-cli-mirage.com/docs/route-handlers/shorthands
  */

  this.post('/sign-up', (schema, request) => {
    let user = JSON.parse(request.requestBody).user

    return schema.users.create(user);
  });

  this.get('/users/me', () => {
    return {
      user: {
        id: 0,
        username: "current",
        email: "current@mail.com"
      }
    }
  })

  this.get('/users', (schema, request) => {
    const searchTerm = request.queryParams.search;

    if (searchTerm) {
      return schema.users
        .where(user => user.username.includes(searchTerm));
    }

    if (request.queryParams.friendRequest) {
      return schema.users
        .where(user => (user.friendRequestSent || user.friendRequestRecieved));
    }

    if (request.queryParams.isFriend) {
      return schema.users.where(user => user.isFriend);
    }

    return schema.users.all();
  })

  this.get('/users/:id');

  this.post('/friendRequests', function(schema, request) {
    const friendRequest = JSON.parse(request.requestBody).friendRequest;
    const user = schema.users.find(friendRequest.to);

    if (friendRequest.acceptFriendRequest) {
      user.update({
        isFriend: true,
        friendRequestSent: false,
        friendRequestRecieved: false
      })
    } else if (friendRequest.sendFriendRequest) {
      user.update({
        isFriend: false,
        friendRequestSent: false,
        friendRequestRecieved: true
      })
    }


    return {
      friendRequest
    }
  })


  this.get('/exercises');
  this.resource('goals');
  this.post('/token', () => {
    return {
      "access_token":"2YotnFZFEjr1zCsicMWpAA",
      "token_type":"bearer",
    }
  })
}
