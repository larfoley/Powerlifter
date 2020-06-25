import ApplicationSerializer from './application';

export default class CommentSerializer extends ApplicationSerializer {
  // extractMeta(store, typeClass, payload) {
  //   console.log('extract meta');
  //   console.log('payload', payload.meta);
  //   return payload.meta;
  //   if (payload && payload.hasOwnProperty('_pagination')) {
  //     let meta = payload._pagination;
  //     delete payload._pagination;
  //     return meta;
  //   }
  // }
}
