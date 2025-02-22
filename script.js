document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.getElementById("add-btn");
  const todoInput = document.getElementById("todo-input");
  const todoList = document.getElementById("todo-list");
  const taskCount = document.getElementById("task-count");

  let tasks = 0;

  function updateTaskCount() {
    taskCount.textContent = `Total tasks: ${tasks}`;
  }

  function addTodo() {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("click", () => {
      li.classList.toggle("checked");
    });

    const span = document.createElement("span");
    span.textContent = todoText;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      todoList.removeChild(li);
      tasks--;
      updateTaskCount();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);

    tasks++;
    updateTaskCount();

    todoInput.value = "";
    todoInput.focus();

    sendNotification("New Task Added", `Task: ${todoText}`);
  }

  addBtn.addEventListener("click", addTodo);

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  // Register Service Worker
  if ("serviceWorker" in navigator && "PushManager" in window) {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
        return Notification.requestPermission();
      })
      .then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
        } else {
          console.log("Notification permission denied.");
        }
      })
      .catch((error) => console.error("Service Worker registration failed:", error));
  }

  // Handle Firebase Cloud Messaging
  if (typeof firebase !== "undefined") {
    const messaging = firebase.messaging();

    // Request FCM Token
    messaging.getToken()
      .then((currentToken) => {
        if (currentToken) {
          console.log("FCM Token:", currentToken);
        } else {
          console.log("No registration token available.");
        }
      })
      .catch((err) => {
        console.log("Error retrieving token:", err);
      });

    // Handle incoming messages
    messaging.onMessage((payload) => {
      console.log("Message received: ", payload);
      sendNotification(payload.notification.title, payload.notification.body);
    });
  }

  function sendNotification(title, message) {
    if (Notification.permission === "granted") {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.showNotification(title, {
            body: message,
            icon: "/icons/icon-192x192.png",
            vibrate: [200, 100, 200],
          });
        }
      });
    }
  }
});
