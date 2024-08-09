function addTask() {
    const tasksContainer = document.getElementById('tasksContainer');

    const newTaskItem = document.createElement('div');
    newTaskItem.className = 'taskItem mb-3';

    newTaskItem.innerHTML = `
        <label for="timeSelect" class="form-label">Time</label>
        <input type="time" class="form-control" name="timeSelect">
        <label for="activitySelect" class="form-label mt-2">Activity</label>
        <select class="form-select" name="activitySelect">
            <option value="Wake up">Wake up</option>
            <option value="Go to gym">Go to gym</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Meetings">Meetings</option>
            <option value="Lunch">Lunch</option>
            <option value="Quick nap">Quick nap</option>
            <option value="Go to library">Go to library</option>
            <option value="Dinner">Dinner</option>
            <option value="Go to sleep">Go to sleep</option>
        </select>
    `;

    tasksContainer.appendChild(newTaskItem);
}

function setReminders() {
    const day = document.getElementById('daySelect').value;
    const taskItems = document.querySelectorAll('.taskItem');

    taskItems.forEach(taskItem => {
        const time = taskItem.querySelector('input[name="timeSelect"]').value;
        const activity = taskItem.querySelector('select[name="activitySelect"]').value;

        const reminderTime = new Date();
        reminderTime.setHours(...time.split(':'));
        reminderTime.setSeconds(0);

        const now = new Date();

        if (reminderTime < now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }

        const timeToRemind = reminderTime.getTime() - now.getTime();

        setTimeout(() => {
            const audio = new Audio('chime.mp3'); 
            audio.play().then(() => {
                console.log("Playing sound...");
                alert(`Time for ${activity}!`);
                audio.pause();
            }).catch(error => {
                console.error("Failed to play sound:", error);
            });
        }, timeToRemind);
    });

    alert(`Reminders set for ${day} for the selected tasks.`);
}
