import ApplicationSerializer from './application';

export default class FriendRequestSerializer extends ApplicationSerializer {
  serialize(snapshot, options) {
    const json = {};

   snapshot.eachAttribute((key, attribute) => {
     json[key] = snapshot.attr(key);
   });

    return json;
  }
}
