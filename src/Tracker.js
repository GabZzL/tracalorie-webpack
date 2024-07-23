import Storage from "./Storage.js";

class CalorieTracker {
    constructor() {
        this._caloriesLimit = Storage.getCalorieLimit();
        this._totalCalories = Storage.getTotalCalories();
        this._meals = Storage.getMeals();
        this._workouts = Storage.getWorkouts();

        this._displayCaloriesLimit();
        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();

        document.querySelector('#limit').value = this._caloriesLimit;
    };

    // public methods
    setLimit(limitValue) {
        this._caloriesLimit = limitValue;
        Storage.setCalorieLimit(limitValue);
        this._displayCaloriesLimit();
        this._renderStats();
    };

    addMeal(meal) {
        this._meals.push(meal);
        this._totalCalories += meal.calories;
        this._displayNewItem('meal', meal);
        Storage.updateMeals(this._meals);
        this._renderStats();
    };

    addWorkout(workout) {
        this._workouts.push(workout);
        this._totalCalories -= workout.calories;
        this._displayNewItem('workout', workout);
        Storage.updateWorkouts(this._workouts);
        this._renderStats();
    };

    removeMeal(id) {
        const index = this._meals.findIndex((meal) => meal.id === id);
        if(index!== -1) {
            const meal = this._meals[index];
            this._totalCalories -= meal.calories;
            this._meals.splice(index, 1);
            Storage.updateMeals(this._meals);
            this._renderStats()
        };
    };

    removeWorkout(id) {
        const index = this._workouts.findIndex((workout) => workout.id === id);
        if(index!== -1) {
            const workout = this._workouts[index];
            this._totalCalories += workout.calories;
            this._workouts.splice(index, 1);
            Storage.updateWorkouts(this._workouts);
            this._renderStats()
        };
    };

    resetDay() {
        this._totalCalories = 0;
        this._meals = [];
        this._workouts = [];
        Storage.clearAll();
        this._renderStats();
    };

    loadItems() {
        this._meals.forEach((meal) => this._displayNewItem('meal', meal));
        this._workouts.forEach((workout) => this._displayNewItem('workout', workout)); 
    };

    // private methods
    _displayCaloriesTotal() {
        const caloriesTotalDisplay = document.querySelector('#calories-total');
        caloriesTotalDisplay.textContent = this._totalCalories;
    };

    _displayCaloriesLimit() {
        const caloriesLimitDisplay = document.querySelector('#calories-limit');
        caloriesLimitDisplay.textContent = this._caloriesLimit;
    };

    _displayCaloriesConsumed() {
        const caloriesConsumedDisplay = document.querySelector('#calories-consumed');
        const caloriesConsumed = this._meals.reduce((total, meal) => total + meal.calories, 0);
        caloriesConsumedDisplay.textContent = caloriesConsumed;
    };

    _displayCaloriesBurned() {
        const caloriesBurnedDisplay = document.querySelector('#calories-burned');
        const caloriesBurned = this._workouts.reduce((total, workout) => total + workout.calories, 0);
        caloriesBurnedDisplay.textContent = caloriesBurned;
    };

    _displayCaloriesRemaining() {
        const caloriesRemainingDisplay = document.querySelector('#calories-remaining');
        const caloriesRemaining = this._caloriesLimit - this._totalCalories;
        caloriesRemainingDisplay.textContent = caloriesRemaining;

        const remainingBox = caloriesRemainingDisplay.parentElement.parentElement;
        const caloriesProgressDisplay = document.querySelector('#calorie-progress');

        if (caloriesRemaining <= 0) {
            remainingBox.classList.remove('bg-light');
            remainingBox.classList.add('bg-danger');
            caloriesProgressDisplay.style.backgroundColor = '#dc3545e6';
        } else {
            remainingBox.classList.remove('bg-danger');
            remainingBox.classList.add('bg-light');
            caloriesProgressDisplay.style.backgroundColor = '#599f3d';
        };
    };

    _displayCaloriesProgress() {
        const caloriesProgressDisplay = document.querySelector('#calorie-progress');
        const percentage = (this._totalCalories / this._caloriesLimit) * 100;
        const width = Math.min(percentage, 100);
        caloriesProgressDisplay.style.width = `${width}%`;
    };

    _displayNewItem(type, item) {
        const mealItems = document.querySelector('#meal-items');
        const workoutItems = document.querySelector('#workout-items');

        const newItem = document.createElement('div');
        newItem.classList.add('card', 'my-2');
        newItem.setAttribute('data-id', item.id);

        newItem.innerHTML = `
            <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                    <h4 class="mx-1">${item.name}</h4>
                    ${type === 'meal' 
                        ? 
                        `<div class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5">
                            ${item.calories}
                        </div>`
                        :
                        `<div class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5">
                            ${item.calories}
                        </div>`
                    }
                        <button class="delete btn btn-danger btn-sm mx-2">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                </div>
            </div>`;

        if(type === 'meal') {
            mealItems.appendChild(newItem);
        } else {
            workoutItems.appendChild(newItem);
        };
    };

    _renderStats() {
        Storage.setTotalCalories(this._totalCalories);

        this._displayCaloriesTotal();
        this._displayCaloriesConsumed();
        this._displayCaloriesBurned();
        this._displayCaloriesRemaining();
        this._displayCaloriesProgress();
    };
}

export default CalorieTracker;
