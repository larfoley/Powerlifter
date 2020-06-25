import { helper } from '@ember/component/helper';

export default helper(function uppercase(params/*, hash*/) {
  const [ s ] = params;

  return s.toUpperCase();
});
