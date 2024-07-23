import '@fortawesome/fontawesome-free/js/all';
import { Modal, Collapse} from 'bootstrap'
import CalorieTracker from './Tracker.js';
import { Meal, Workout } from './item.js';

import './css/bootstrap.css';
import './css/style.css';


class App{
    constructor() {
        this._tracker = new CalorieTracker();
        this._startEventListeners();
        this._tracker.loadItems();
    };

    _startEventListeners() {
        document.querySelector('#limit-form').addEventListener('submit', this._setLimit.bind(this));
        document.querySelector('#meal-form').addEventListener('submit', this._newItem.bind(this, 'meal'));
        document.querySelector('#workout-form').addEventListener('submit', this._newItem.bind(this, 'workout'));
        document.querySelector('#meal-items').addEventListener('click', this._removeItem.bind(this, 'meal'));
        document.querySelector('#workout-items').addEventListener('click', this._removeItem.bind(this, 'workout'));
        document.querySelector('#filter-meals').addEventListener('input', this._filterItems.bind(this, 'meal'));
        document.querySelector('#filter-workouts').addEventListener('input', this._filterItems.bind(this, 'workout'));
        document.querySelector('#reset').addEventListener('click', this._resetItems.bind(this));
    };

    _setLimit(e) {
        e.preventDefault();
        const limitValue = document.querySelector('#limit').value;

        if(limitValue == '') {
            alert('Please Insert A Valid Value');
            return;
        };

        this._tracker.setLimit(+limitValue);
        document.querySelector('#limit').value = '';

        const modalElement = document.querySelector('#limit-modal');
        const modal = Modal.getInstance(modalElement);
        modal.hide();
    };

    _newItem(type, e) {
        e.preventDefault();

        const name = document.querySelector(`#${type}-name`).value;
        const calories = +document.querySelector(`#${type}-calories`).value;

        if(name == '' || calories == '') {
            alert('Please fill in all fields');
            return;
        };

        if(type === 'meal') {
            const newMeal = new Meal(name, calories);
            this._tracker.addMeal(newMeal);
        } else {
            const newWorkout = new Workout(name, calories);
            this._tracker.addWorkout(newWorkout);
        }
        
        document.querySelector(`#${type}-name`).value = '';
        document.querySelector(`#${type}-calories`).value = '';

        const collapseItem = document.querySelector(`#collapse-${type}`);
        const bsCollapse = new Collapse(collapseItem, {
            toggle: true,
        });
    }

    _removeItem(type, e) {
        if(e.target.classList.contains('delete') || e.target.classList.contains('fa-xmark"') ) {
            if(confirm('Are you sure?')) {
                const id = e.target.closest('.card').getAttribute('data-id');
                if(type === 'meal') {
                    this._tracker.removeMeal(id);
                } else {
                    this._tracker.removeWorkout(id);
                };
                e.target.closest('.card').remove();
            };
        };
    };

    _filterItems(type, e) {
        const input = e.target.value.toLowerCase();
        document.querySelectorAll(`#${type}-items .card`).forEach((item) => {
            const itemName = item.firstElementChild.firstElementChild.firstElementChild.innerText.toLowerCase();
            if(itemName.indexOf(input) !== -1) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            };
        });
    };

    _resetItems() {
        this._tracker.resetDay();
        document.querySelector('#meal-items').innerHTML = '';
        document.querySelector('#workout-items').innerHTML = '';
        document.querySelector('#filter-meals').value = '';
        document.querySelector('#filter-workouts').value = '';
    };
};

const newApp = new App();
