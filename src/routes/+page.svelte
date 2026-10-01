<script lang="ts">
  import { send_message, get_messages } from "./chat.remote";
  let messages = get_messages();
</script>

<div class="w-full h-[50vh]">
  {#if messages.current}
    {#each messages.current as message (message.id)}
      <p><strong>{message.sender}:</strong> {message.text}</p>
    {/each}
  {/if}
</div>


<form {...send_message} class="flex gap-4">
  <input {...send_message.fields.sender.as('hidden', "User")} />
  <input {...send_message.fields.text.as('text')} required class="border rounded" />
  <button>Send</button>
</form>
