<script>
  export let text = "";
  export let completed = false;
  export let id = 1;

  export let onComplete;
  export let onRemove;
</script>

<div class="todo">
  <p style="text-decoration: {completed ? 'line-through' : 'none'}">
    {text}
  </p>
  <div class="buttons">
    <button class="btn-complete-todo" on:click={onComplete(id)}>Complete</button
    >
    <button class="btn-remove-todo" on:click={onRemove(id)}>Remove</button>
  </div>
</div>

<style lang="scss">
  @import "../scss/vars.scss";

  .todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid;
    margin: 15px 0;
    padding: 10px;
    transition: all 0.25s ease;
    transition-property: border-color, box-shadow;
    &:hover {
      border-color: $primary;
      box-shadow: 4px 3px 5px 6px rgba(0, 0, 0, 0.1);
    }
    p {
      font-size: larger;
    }
    .buttons {
      display: flex;
      flex-direction: column;
      button:nth-child(1) {
        margin-bottom: 10px;
      }
      button {
        border: 1px solid $primary;
        background: none;
        padding: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
        transition-property: border-color, background-color, color;
        &:hover {
          border-color: transparent;
          color: #ffffff;
          background-color: $primary;
        }
      }
    }

    @media screen and (max-width: 450px) {
      p {
        font-size: 11pt;
      }
      .buttons {
        button {
          padding: 3px;
        }
      }
    }

    @media screen and (min-width: 1920px) {
      p {
        font-size: 17pt;
      }
      .buttons {
        button {
          font-size: 13pt;
        }
      }
    }
  }
</style>
