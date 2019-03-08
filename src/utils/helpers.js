const initialTask = {
    text: '',
    complete: false
}

export const setupTasks = () => {
    let tasks = [];
    for ( let i = 0; i < 10; i++) {
        tasks.push(initialTask);
    }
    return tasks;
}