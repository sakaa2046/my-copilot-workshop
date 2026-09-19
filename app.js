// 待辦清單的 localStorage 鍵名稱
const STORAGE_KEY = "todo-list-items";

// 取得畫面上的元素
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const emptyState = document.getElementById("empty-state");
const todoCount = document.getElementById("todo-count");

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

// 計算未完成項目數量並更新底部文字
function updateCount(tasks) {
  const remainingCount = tasks.filter((task) => !task.completed).length;
  todoCount.textContent = `未完成: ${remainingCount} 項`;
}

// 渲染待辦清單
function renderTasks() {
  const tasks = loadTasks();

  // 清空目前列表並重新生成
  todoList.innerHTML = "";

  if (tasks.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  tasks.forEach((task) => {
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

// 初始化頁面
renderTasks();
