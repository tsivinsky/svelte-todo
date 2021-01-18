<script>
  import { onMount, afterUpdate } from "svelte";
  import Todo from "./Todo.svelte";
  import AddTodoForm from "./AddTodoForm.svelte";

  let todos = [];

  // Function for adding todos to the array
  function addTodo(e) {
    const { text, clearInput } = e.detail;

    if (text === "") return;

    const newTodo = {
      id: todos.length + 1,
      text,
      completed: false,
    };

    todos = [...todos, newTodo];

    clearInput();
  }

  // Function completing one todo in array
  function completeTodo(e) {
    const { id } = e.detail;

    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : { ...todo }
    );

    todos = newTodos;
  }

  // Function for removing todo from array
  function removeTodo(e) {
    const { id } = e.detail;

    const newTodos = todos.filter((todo) => todo.id !== id);

    todos = newTodos;
  }

  // Load todos from localStorage on first render
  onMount(() => {
    if (localStorage.getItem("todos")) {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
  });

  // Save todos in localStorate after each render
  afterUpdate(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });
</script>

<header>
  <h1 class="title">Svelte To-Do</h1>
</header>
<main>
  <div class="inner-block">
    <AddTodoForm on:addtodo={addTodo} />
    <div class="todos">
      {#each todos as todo (todo.id)}
        <Todo
          {...todo}
          on:completetodo={completeTodo}
          on:removetodo={removeTodo}
        />
      {/each}
    </div>
  </div>
</main>

<style lang="scss">
  @import "../scss/vars.scss";

  header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $primary;
    .title {
      font-size: 36pt;
      text-align: center;
    }

    @media screen and (max-width: 450px) {
      .title {
        font-size: 24pt;
      }
    }
  }

  main {
    .inner-block {
      width: 70%;
      margin: 20px auto 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      .todos {
        width: 100%;
        margin: 20px 0 0;
      }
    }
  }
</style>
