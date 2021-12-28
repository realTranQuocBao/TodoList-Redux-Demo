console.log(window.Redux);

const { createStore } = window.Redux;

// state
// reducer
// store

const initialState = JSON.parse(localStorage.getItem('TodolistReduxDemo')) || {
    job: '',
    jobs: ['Lau nhà', 'Rửa chén']
};

const todoReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_JOB': {
            const newJobs = [
                ...state.jobs,
                action.payload
            ];
            return {
                ...state,
                jobs: newJobs
            };
        }
    }

    return state;
}

const store = createStore(todoReducer);

// ----------------------------

// Render redux todo list

const renderTodoList = (jobs) => {
    if (!Array.isArray(jobs) || jobs.length === 0) return;

    const ulElement = document.querySelector('#jobsList');
    if (!ulElement) returen;

    ulElement.innerHTML = '';

    for(const job of jobs) {
        const liElement = document.createElement('li');
        liElement.textContent = job;
        ulElement.append(liElement);
    };
};

// Render initial todolist
const initialTodo = store.getState();
console.log(initialTodo);
renderTodoList(initialTodo.jobs);

// handle form submit
const jobFormElement = document.querySelector('#jobForm');
if (jobFormElement) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const jobTextElement = document.querySelector('#jobText');
        if(!jobTextElement) return;

        const action = {
            type: 'ADD_JOB',
            payload: jobTextElement.value
        }

        store.dispatch(action);

        jobTextElement.value = '';

    };

    jobFormElement,addEventListener('submit', handleFormSubmit);
}

store.subscribe(() => {
    const newState = store.getState();
    renderTodoList(newState.jobs);
    localStorage.setItem('TodolistReduxDemo', JSON.stringify(newState));
});