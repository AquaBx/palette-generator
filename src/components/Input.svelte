<script lang="ts">
  let { value = $bindable(), min, max, type } = $props();
</script>

<input
  {type}
  {min}
  {max}
  bind:value
  class="block w-full p-2 text-compl-400 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
/>
