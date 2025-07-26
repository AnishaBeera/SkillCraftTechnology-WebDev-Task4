const themeBtn = document.getElementById("themeBtn");
const taskInput = document.getElementById("taskInput");
const taskDateTime = document.getElementById("taskDateTime");
const taskList = document.getElementById("taskList");

function setTheme(mode) {
  const sunnyBg = 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1950&q=80")'; // Day
  const starryBg = 'url("https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80")'; // Night stars

  if (mode === "light") {
    document.body.classList.add("light");
    document.body.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.3)), ${sunnyBg}`;
    themeBtn.textContent = "🌞"; 
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.remove("light");
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), ${starryBg}`;
    themeBtn.textContent = "🌙"; 
    localStorage.setItem("theme", "dark");
  }
}

themeBtn.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme") || "dark";
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  setTheme(newTheme);
});

window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
});


function addTask() {
  const taskText = taskInput.value.trim();
  const taskTime = taskDateTime.value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span class="task-text">${taskText}</span>
    <span class="task-time">${taskTime ? new Date(taskTime).toLocaleString() : ""}</span>
    <div class="actions">
      <button onclick="markDone(this)">✅</button>
      <button onclick="editTask(this)">✏️</button>
      <button onclick="deleteTask(this)">❌</button>
    </div>
  `;
  taskList.appendChild(li);
  taskInput.value = "";
  taskDateTime.value = "";
}

function markDone(btn) {
  const task = btn.closest("li");
  task.classList.toggle("completed");
}

function editTask(btn) {
  const task = btn.closest("li");
  const taskText = task.querySelector(".task-text");
  const newTask = prompt("Edit your task:", taskText.textContent);
  if (newTask !== null) taskText.textContent = newTask;
}

function deleteTask(btn) {
  const task = btn.closest("li");
  task.remove();
}
