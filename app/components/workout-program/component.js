import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking'
import { action } from '@ember/object';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { inject as service } from '@ember/service';

export default class WorkoutProgramComponent extends Component {
  @service store;
  @service toast;
  @tracked showWorkoutCompleteDialog = false;
  @tracked showWorkoutProgramCompleteDialog = false;
  @tracked selectedWorkoutDay = 1;

  constructor() {
    super(...arguments);

    for (var workout of this.workoutSessions) {
      if (!workout.completed) {
        this.selectedWorkoutDay = workout.day;
        break;
      }
    }
  }

  get currentWorkout() {
    return this.workoutSessions.find(workout => {
      return workout.day === this.selectedWorkoutDay
    })
  }

  get workoutSessions() {
    const workoutSessions = A();
    const weeks = this.args.workoutProgram.weeks;

    weeks.forEach((week) => {
      week.workouts.forEach((workout) => {
        workoutSessions.pushObject(workout);
      });
    });

    return workoutSessions;
  }


  get wokroutProgramIsCompleted() {
    return this.workoutsSessions.every(workout => workout.completed);
  }

  get canFinishWorkout() {
    return this.currentWorkout.everyWorkoutBlockIsCompleted;
  }

  get canFinishWorkoutProgram() {
    const completedSessions = this.workoutSessions
      .filter(workoutSession => workoutSession.everyWorkoutBlockIsCompleted)

    return completedSessions.length === this.workoutSessions;
  }

  get shouldDisableFinishWorkoutButton() {
    return !this.canFinishWorkoutSession;
  }

  get hasNextWorkout() {
    return isPresent(this._findWorkoutSession(this.selectedWorkoutDay + 1))
  }

  get hasPreviousWorkout() {
    return isPresent(this._findWorkoutSession(this.selectedWorkoutDay - 1))
  }

  @action
  async toggleExerciseSetCompleted(exerciseSet) {
    exerciseSet.completed = !exerciseSet.completed;
    this.args.workoutProgram.save()
  }

  @action
  goToNextWorkout() {
    if (this.hasNextWorkout) {
      this.selectedWorkoutDay = this.selectedWorkoutDay + 1;
      document.documentElement.scrollTop = 0;
    }
  }

  @action
  goToPreviousWorkout() {
    if (this.hasPreviousWorkout) {
      this.selectedWorkoutDay = this.selectedWorkoutDay - 1;
    }
  }

  @action
  updateExerciseSet() {
    console.log(0);
  }

  @action
  async completeWorkout() {
    this.currentWorkout.goalsAchieved = []
    this.currentWorkout.personalBestsAchieved = [];

    const workout = this.currentWorkout.serialize();

    if (!workout.completed) {

      this.currentWorkout.completed = true;
      // this.showWorkoutCompleteDialog = true;

      for (const exercise of workout.exercises) {
        for (const exerciseSet of exercise.sets) {

          const liftRecords = await this.store.query('lift-record', {
            reps: exerciseSet.repsCompleted,
            exercise: exercise.exercise
          }).then((results) => {
            return results.filter((lr) => {
              return  lr.weightLifted > exerciseSet.weightLifted
            });
          })

          if (liftRecords.length === 0) {
            const newLiftRecord = this.store.createRecord('lift-record', {
              exercise: { name: exercise.exercise },
              reps: exerciseSet.repsCompleted,
              weightLifted: exerciseSet.weightLifted,
              date: new Date()
            })

            await newLiftRecord.save();

            this.currentWorkout.personalBestsAchieved.push({
              exercise: newLiftRecord.exercise.name,
              reps: newLiftRecord.reps,
              weight: newLiftRecord.weightLifted,
              achievedOn: new Date(),
            })
          }

          const goals = await this.store.query('goal', {
            reps: exerciseSet.repsCompleted,
            exercise: exercise.exercise,
            isCompleted: false,
          }).then((results) => {
            return results.filter((goal) => {
              return exerciseSet.weightLifted >= goal.weight;
            });
          })

          for (const goal of goals) {
            goal.isCompleted = true;
            goal.completedOn = new Date();

            await goal.save();

            this.currentWorkout.goalsAchieved.push({
              exercise: goal.exercise.name,
              reps: goal.reps,
              weight: goal.weight,
              achievedOn: new Date(),
            })
          }

        }
      }

      const totalGoals = this.currentWorkout.goalsAchieved.length;
      const totalPersonalBests = this.currentWorkout.personalBestsAchieved.length;

      if (totalGoals > 0) {
        const msg = totalGoals === 1 ? 'Goal Completed' : totalGoals + ' Goals completed';

        this.toast.success(msg);
      }

      if (totalPersonalBests > 0) {
        const msg = totalPersonalBests === 1 ? 'New Personal Best' : totalPersonalBests + ' New Personal Bests';

        this.toast.success(msg);
      }

      await this.args.workoutProgram.save()
      this.showWorkoutCompleteDialog = true;
    }

    if (this.args.workoutProgram.progress === 100) {
      return this.completeWorkoutProgram();
    }
  }

  @action
  onCloseWorkoutCompleteDialog() {
    this.showWorkoutCompleteDialog = false;

    if (this.args.workoutProgram.completed) {
      this.showWorkoutProgramCompleteDialog = true;
    }
  }

  @action
  onCloseWorkoutProgramCompleteDialog() {
    this.showWorkoutProgramCompleteDialog = false;
  }

  @action
  async completeWorkoutProgram() {
    const program = this.args.workoutProgram

    program.completed = true;
    program.completedOn = new Date();
    program.isActive = false;

    await program.save();
  }

  _findWorkoutSession(day) {
    return this.workoutSessions.find(workout => workout.day === day)
  }
}
