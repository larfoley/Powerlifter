import { module, test } from 'qunit';
import { currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { authenticateSession } from 'ember-simple-auth/test-support';
import { setupMirage } from 'ember-cli-mirage/test-support';
import newRecordPage from '../../pages/records/new';
import { selectChoose } from 'ember-power-select/test-support';
import { setFlatpickrDate } from 'ember-flatpickr/test-support/helpers';

module('Acceptance | records/new', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('redirect unauthenticated user to the sign in page', async function(assert) {
    await newRecordPage.visit();

    assert.equal(currentURL(), '/sign-in');
  });

  test('visiting /records/new', async function(assert) {
    await authenticateSession();
    await newRecordPage.visit();

    assert.equal(currentURL(), '/records/new');
  });

  test('creating a record', async function(assert) {
    this.server.create('exercise', {
      name: 'Deadlift'
    })

    this.server.create('exercise', {
      name: 'Squat'
    })

    await authenticateSession();
    await newRecordPage.visit();

    assert.ok(newRecordPage.liftRecordForm.isPresent);

    await selectChoose('.reps-selector', 1);
    await selectChoose('.exercise-selector', 'Deadlift')
    setFlatpickrDate('[data-test-record-date]', new Date());

    await newRecordPage.liftRecordForm
      .fillInWeightLifted(100)
      .submit();


    assert.equal(currentURL(), '/records/new', 'redirected to the records page')
    // assert.equal(newRecordPage.liftRecords.records.length, 1, "new record is displayed");
    // assert.equal(newRecordPage.liftRecords.records[0].exercise, "Deadlift", "exercise name is displayed");
    // assert.equal(newRecordPage.liftRecords.records[0].weightLifted, 100, "weight lifted is displayed");
    // assert.equal(newRecordPage.liftRecords.records[0].reps, 1, "reps are displayed");
  });
});
