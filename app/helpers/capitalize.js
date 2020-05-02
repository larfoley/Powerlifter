import { helper } from '@ember/component/helper';

export default helper(function capitalize(params/*, hash*/) {
  const [ s ] = params;

  return s.capitalize()
});
