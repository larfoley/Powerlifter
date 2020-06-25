import { helper } from '@ember/component/helper';

export default helper(function equals(params/*, hash*/) {
  const [ a, b ] = params;
  return a === b;
});
