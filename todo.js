

// Save task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDateTime = document.getElementById("taskDateTime");

  if (!taskInput.value.trim()) {
    alert("Please enter a task!");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({
    text: taskInput.value,
    dateTime: taskDateTime.value,
    completed: false
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
  alert("Task added successfully!");
  taskInput.value = "";
  taskDateTime.value = "";
}

// Load tasks
function loadTasks() {
  const taskList = document.getElementById("taskList");
  if (!taskList) return;

  taskList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    if (!task.completed) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.text} <br><small>${task.dateTime || ""}</small></span>
        <div>
          <button onclick="completeTask(${index})">✔</button>
          <button onclick="editTask(${index})">✏</button>
          <button onclick="deleteTask(${index})">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  });
}

// Load completed tasks
function loadCompleted() {
  const completedList = document.getElementById("completedList");
  if (!completedList) return;

  completedList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    if (task.completed) {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${task.text} <br><small>${task.dateTime || ""}</small></span>
        <div>
          <button class="deleteBtn" onclick="deleteCompletedTask(${index})">❌ Delete</button>
        </div>
      `;
      completedList.appendChild(li);
    }
  });
}

// Delete completed task
function deleteCompletedTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadCompleted();
}


// Mark task completed
function completeTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = true;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  launchFireworks();
  loadTasks();
}

// Edit task
function editTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let newTask = prompt("Edit your task:", tasks[index].text);
  if (newTask) {
    tasks[index].text = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

// Delete task
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

// 🎆 Fireworks animation
function launchFireworks() {
  const canvas = document.getElementById("fireworks");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      dx: (Math.random() - 0.5) * 8,
      dy: (Math.random() - 0.5) * 8,
      life: 100
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      p.life--;
      if (p.life <= 0) particles.splice(i, 1);
    });
    if (particles.length) requestAnimationFrame(animate);
  }
  animate();
}

// Auto-load on page open
window.onload = function() {
  loadTasks();
  loadCompleted();
};
