class Storage{
    // static methods
    static getCalorieLimit(defaultLimit = 2000) {
        let calorieLimit;
        if(localStorage.getItem('calorieLimit') === null) {
            calorieLimit = defaultLimit;
        } else {
            calorieLimit = +localStorage.getItem('calorieLimit');
        };
        return calorieLimit;
    };

    static setCalorieLimit(calorieLimit) {
        localStorage.setItem('calorieLimit', calorieLimit);
    };

    static getTotalCalories(defaultCalories = 0) {
        let totalCalories;
        if(localStorage.getItem('totalCalories') === null) {
            totalCalories = defaultCalories;
        } else {
            totalCalories = +localStorage.getItem('totalCalories');
        };
        return totalCalories;
    };

    static setTotalCalories(totalCalories) {
        localStorage.setItem('totalCalories', totalCalories);
    };

    static getMeals(defaultMeals = []) {
        let meals;
        if(localStorage.getItem('meals') === null){
            meals = defaultMeals;
        } else {
            meals = JSON.parse(localStorage.getItem('meals'));
        };
        return meals;
    };

    static updateMeals(newMeals) {
        localStorage.setItem('meals', JSON.stringify(newMeals));
    };

    static getWorkouts(defaultWorkouts = []) {
        let workouts;
        if(localStorage.getItem('workouts') === null){
            workouts = defaultWorkouts;
        } else {
            workouts = JSON.parse(localStorage.getItem('workouts'));
        };
        return workouts;
    };

    static updateWorkouts(newWorkouts) {
        localStorage.setItem('workouts', JSON.stringify(newWorkouts));
    };

    static clearAll() {
        localStorage.clear();
    };
};

export default Storage;