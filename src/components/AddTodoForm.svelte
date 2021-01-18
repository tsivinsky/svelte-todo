<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  let text;

  function onAdd() {
    dispatch("addtodo", {
      text,
      clearInput,
    });
  }

  function clearInput() {
    text = "";
  }
</script>

<form>
  <input type="text" placeholder="What do you want to do?" bind:value={text} />
  <button type="submit" on:click|preventDefault={onAdd}>Add</button>
</form>

<style lang="scss">
  @import "../scss/vars.scss";

  form {
    display: flex;
    justify-content: space-evenly;
    width: 60%;
    input {
      width: 70%;
      border: 1px solid;
      background: none;
      padding: 10px;
      font-size: 12pt;
      transition: border-color 0.3s ease-in;
      &:focus {
        border-color: $primary;
      }
    }
    button {
      border: 1px solid;
      background: none;
      width: 5em;
      padding: 5px;
      font-size: 12pt;
      cursor: pointer;
      transition: all 0.3s ease-in;
      transition-property: border-color;
      &:hover {
        border-color: $primary;
      }
    }

    @media screen and (max-width: 700px) {
      width: 80%;
    }

    @media screen and (max-width: 450px) {
      width: 100%;
    }
  }
</style>
