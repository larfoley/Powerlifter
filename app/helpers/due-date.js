import { helper } from '@ember/component/helper';

export default helper(function dueDate(params/*, hash*/) {
  const [ date ] = params;

  return date.toLocaleDateString();
});
