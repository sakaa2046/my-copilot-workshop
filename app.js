// 待辦清單資料的 localStorage 鍵名稱
const STORAGE_KEY = "todo-list-items";
const THEME_KEY = "todo-theme-preference";

// 取得畫面上的元素
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const todoCount = document.getElementById("todo-count");
const themeToggle = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";

// 從 localStorage 讀取待辦事項
function loadTasks() {
  try {
    const storedTasks = localStorage.getItem(STORAGE_KEY);
    return storedTasks ? JSON.parse(storedTasks) : [];
  } catch (error) {
    console.error("讀取待辦資料失敗:", error);
    return [];
  }
}

// 儲存待辦事項到 localStorage
function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// 決定主題：如果使用者曾手動選擇，就用使用者選擇，否則跟隨作業系統設定
function getPreferredTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// 套用主題並更新按鈕顯示內容
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";

  themeToggle.innerHTML = isDark
    ? '<span class="theme-icon" aria-hidden="true">☀️</span><span class="theme-label">淺色模式</span>'
    : '<span class="theme-icon" aria-hidden="true">🌙</span><span class="theme-label">深色模式</span>';

  themeToggle.setAttribute("aria-label", isDark ? "切換為淺色模式" : "切換為深色模式");
  localStorage.setItem(THEME_KEY, theme);
}

// 切換亮暗模式
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
}

// 計算整體未完成項目數量，篩選不會影響這個數字
function updateCount(tasks) {
  const remainingCount = tasks.filter((task) => !task.completed).length;
  todoCount.textContent = `未完成: ${remainingCount} 項`;
}

// 依照目前篩選狀態取得可顯示的項目
function getVisibleTasks(tasks) {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

// 依照目前篩選狀態回傳對應空狀態文字
function getEmptyMessage() {
  if (currentFilter === "active") {
    return "目前沒有未完成的待辦事項";
  }

  if (currentFilter === "completed") {
    return "目前沒有已完成的待辦事項";
  }

  return "還沒有任何待辦事項,新增一個吧!";
}

// 更新篩選按鈕的選取樣式
function updateFilterButtons() {
  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

// 渲染待辦清單
function renderTasks() {
  const tasks = loadTasks();
  const visibleTasks = getVisibleTasks(tasks);

  // 清空目前列表並重新生成
  todoList.innerHTML = "";

  if (visibleTasks.length === 0) {
    emptyState.hidden = false;
    emptyState.textContent = getEmptyMessage();
  } else {
    emptyState.hidden = true;
  }

  visibleTasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.className = `todo-item${task.completed ? " completed" : ""}`;

    const label = document.createElement("label");
    label.className = "todo-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `標記 ${task.text} 為完成`);

    checkbox.addEventListener("change", () => {
      const updatedTasks = loadTasks().map((item) => {
        if (item.id === task.id) {
          return { ...item, completed: checkbox.checked };
        }
        return item;
      });

      saveTasks(updatedTasks);
      renderTasks();
    });

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "刪除";

    deleteButton.addEventListener("click", () => {
      const remainingTasks = loadTasks().filter((item) => item.id !== task.id);
      saveTasks(remainingTasks);
      renderTasks();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    listItem.appendChild(label);
    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });

  updateCount(tasks);
}

// 新增待辦事項
function addTask(event) {
  event.preventDefault();

  const taskText = todoInput.value.trim();

  // 若內容為空白則不新增
  if (!taskText) {
    todoInput.focus();
    return;
  }

  const tasks = loadTasks();
  const newTask = {
    id: Date.now() + Math.random(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);
  saveTasks(tasks);
  renderTasks();

  todoInput.value = "";
  todoInput.focus();
}

// 監聽表單送出事件
 todoForm.addEventListener("submit", addTask);

// 監聽主題切換
 themeToggle.addEventListener("click", toggleTheme);

// 監聽篩選按鈕點選
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    updateFilterButtons();
    renderTasks();
  });
});

// 初始化頁面
applyTheme(getPreferredTheme());
updateFilterButtons();
renderTasks();
