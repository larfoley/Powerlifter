export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  this.urlPrefix = 'http://localhost:3000';    // make this `http://localhost:8080`, for example, if your API is on a different server
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

  this.get('/users/me', (schema) => {
    return schema.users.create({
      username: "current",
      email: "current@mail.com"
    })
  })

  this.get('/users', (schema, request) => {
    const searchTerm = request.queryParams.search;

    if (searchTerm) {
      return schema.users
        .where(user => user.username.includes(searchTerm));
    }

    if (request.queryParams.friendRequest) {
      return schema.users
        .where(user => user.username !== 'current' && (user.friendRequestSent || user.friendRequestRecieved));
    }

    return schema.users.all();
  })
  this.post('/friendRequests', function(schema, request) {
    const friendRequest = JSON.parse(request.requestBody).friendRequest;

    const users = schema.users.
      where(user => user.usernameuser.id === friendRequest.from);

    users.update({
      friendRequestSent: true
    })
    return schema.friendRequests.create(friendRequest);
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
