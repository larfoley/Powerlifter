import ApplicationSerializer from './application';

export default class FriendRequestSerializer extends ApplicationSerializer {
  serialize(snapshot) {
    const json = {};

   snapshot.eachAttribute((key) => {
     json[key] = snapshot.attr(key);
   });

    return json;
  }
}
