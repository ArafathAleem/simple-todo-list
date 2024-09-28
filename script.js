// Wait for the entire DOM (Document Object Model) content to load
document.addEventListener("DOMContentLoaded", () => {
  // Selecting key elements from the DOM
  const addBtn = document.getElementById("add-btn"); // The "Add" button
  const todoInput = document.getElementById("todo-input"); // Input field for new tasks
  const todoList = document.getElementById("todo-list"); // Unordered list that will hold all tasks
  const taskCount = document.getElementById("task-count"); // Element that displays the total number of tasks

  // Variable to keep track of the total number of tasks
  let tasks = 0;

  // Function to update the total task count in the UI
  function updateTaskCount() {
    taskCount.textContent = `Total tasks: ${tasks}`; // Updates the text content to reflect the current task count
  }

  // Function to handle adding a new to-do item
  function addTodo() {
    const todoText = todoInput.value.trim(); // Get the value of the input field and trim extra whitespace
    if (todoText === "") return; // If the input is empty, exit the function without adding anything

    // Create a new list item (li) to hold the to-do task
    const li = document.createElement("li");

    // Create a checkbox input for marking tasks as complete
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; // Set the input type to 'checkbox'

    // Event listener to toggle the 'checked' class when the checkbox is clicked
    checkbox.addEventListener("click", () => {
      li.classList.toggle("checked"); // Adds/removes 'checked' class to visually differentiate completed tasks
    });

    // Create a span element to hold the task text
    const span = document.createElement("span");
    span.textContent = todoText; // Set the span's content to the task text

    // Create a delete button to allow the user to remove tasks
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn"; // Assigns a class to style the delete button
    deleteBtn.textContent = "Delete"; // Text inside the button

    // Event listener for the delete button to remove the task from the list
    deleteBtn.addEventListener("click", () => {
      todoList.removeChild(li); // Removes the list item (task) from the unordered list (todoList)
      tasks--; // Decreases the task counter
      updateTaskCount(); // Updates the displayed task count after removal
    });

    // Append the checkbox, task text, and delete button to the li (list item)
    li.appendChild(checkbox); // Checkbox for marking the task as completed
    li.appendChild(span); // Task text
    li.appendChild(deleteBtn); // Delete button

    // Append the complete li (task) to the unordered list (todoList)
    todoList.appendChild(li);

    tasks++; // Increments the task counter when a new task is added
    updateTaskCount(); // Update the task count in the UI

    // Clear the input field and reset focus for easy consecutive task entries
    todoInput.value = ""; // Clear the text in the input field
    todoInput.focus(); // Return focus to the input field so the user can type the next task
  }

  // Event listener for the "Add" button
  addBtn.addEventListener("click", addTodo); // Calls addTodo() when the "Add" button is clicked

  // Event listener to allow adding tasks by pressing the "Enter" key
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      // Check if the pressed key is "Enter"
      addTodo(); // Calls addTodo() when the Enter key is pressed inside the input field
    }
  });
});
