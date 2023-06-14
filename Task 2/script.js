function addTask() {
    var taskInput = document.getElementById("task-input");
    var deadlineInput = document.getElementById("deadline-input");
    var priorityInput = document.getElementById("priority-input");

    var task = taskInput.value;
    var deadline = new Date(deadlineInput.value);
    var priority = priorityInput.value;

    if (task !== "") {
        var newTask = document.createElement("li");
        newTask.innerHTML = task + " (Deadline: " + deadline.toDateString() +   ")";
        newTask.classList.add(priority + "-priority");

        var remainingDays = getRemainingDays(deadline);
        var daysSpan = document.createElement("span");
        daysSpan.innerHTML = remainingDays + " day(s) remaining";
        newTask.appendChild(daysSpan);

        if (remainingDays < 0) {
            var deadlinePassedMsg = document.createElement("span");
            deadlinePassedMsg.innerHTML = "   Deadline has passed";
            newTask.appendChild(deadlinePassedMsg);
        }

        var pendingTasks = document.getElementById("pending-tasks");
        pendingTasks.appendChild(newTask);

        taskInput.value = "";
        deadlineInput.value = "";

        newTask.onclick = function () {
            completeTask(this);
        };
    }
}

function completeTask(taskItem) {
    taskItem.classList.toggle("completed-task");
    var completedTasks = document.getElementById("completed-tasks");
    if (taskItem.parentNode.id === "pending-tasks") {
        var remainingDaysSpan = taskItem.querySelector("span");
        taskItem.removeChild(remainingDaysSpan);
        completedTasks.appendChild(taskItem);
    } else {
        var remainingDays = getRemainingDays(new Date());
        var daysSpan = document.createElement("span");
        daysSpan.innerHTML = remainingDays + " day(s) ago";
        taskItem.appendChild(daysSpan);
        var pendingTasks = document.getElementById("pending-tasks");
        pendingTasks.appendChild(taskItem);
    }
}

function getRemainingDays(deadline) {
    var today = new Date();
    var timeDiff = deadline.getTime() - today.getTime();
    var daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysRemaining;
}
