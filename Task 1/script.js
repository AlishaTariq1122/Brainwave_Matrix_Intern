document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        const textSpan = document.createElement('span');
        textSpan.textContent = taskText;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li, textSpan));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(textSpan);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        li.addEventListener('click', (event) => {
            if (event.target.tagName !== 'BUTTON') {
                li.classList.toggle('completed');
                saveTasks();
            }
        });

        taskList.appendChild(li);
        taskInput.value = '';
        saveTasks();
    }

    function editTask(li, textSpan) {
        const newText = prompt('Edit task:', textSpan.textContent);
        if (newText !== null) {
            textSpan.textContent = newText.trim();
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                const textSpan = document.createElement('span');
                textSpan.textContent = task.text;

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.classList.add('edit-btn');
                editBtn.addEventListener('click', () => editTask(li, textSpan));

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'X';
                deleteBtn.addEventListener('click', () => {
                    taskList.removeChild(li);
                    saveTasks();
                });

                li.appendChild(textSpan);
                li.appendChild(editBtn);
                li.appendChild(deleteBtn);

                if (task.completed) {
                    li.classList.add('completed');
                }

                li.addEventListener('click', (event) => {
                    if (event.target.tagName !== 'BUTTON') {
                        li.classList.toggle('completed');
                        saveTasks();
                    }
                });

                taskList.appendChild(li);
            });
        }
    }
});
