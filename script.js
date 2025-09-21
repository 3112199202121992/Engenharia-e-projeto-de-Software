document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    // Função para carregar as tarefas do localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task.text, task.completed));
    }

    // Função para salvar as tarefas no localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(item => {
            tasks.push({
                text: item.querySelector('.task-text').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Função para criar o elemento HTML de uma tarefa
    function createTaskElement(taskText, isCompleted = false) {
        const li = document.createElement('li');
        li.classList.add('task-item');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const taskTextSpan = document.createElement('span');
        taskTextSpan.classList.add('task-text');
        taskTextSpan.textContent = taskText;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('task-actions');
        
        const completeButton = document.createElement('button');
        completeButton.textContent = '✔️'; // Ícone de concluído
        completeButton.title = 'Marcar como concluída';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌'; // Ícone de remover
        deleteButton.title = 'Remover tarefa';

        actionsDiv.appendChild(completeButton);
        actionsDiv.appendChild(deleteButton);
        
        li.appendChild(taskTextSpan);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);

        // Adiciona os eventos para os botões
        completeButton.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTasks();
        });

        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });
    }

    // Evento para adicionar uma nova tarefa
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            createTaskElement(taskText);
            taskInput.value = ''; // Limpa o input
            saveTasks();
        }
    });

    // Evento para adicionar uma tarefa ao pressionar a tecla Enter
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    // Carrega as tarefas ao iniciar a página
    loadTasks();
});
