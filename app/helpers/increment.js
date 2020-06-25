import { helper } from '@ember/component/helper';

export default helper(function increment(params) {
  return params[0] + 1;
});
