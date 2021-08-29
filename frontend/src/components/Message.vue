<template>
<!--  <div class="bg-red-600" v-if="message">-->
  <div :class="status === 'success' ? 'bg-green-600' : 'bg-red-600'"  v-if="message">
    <div class="max-w-7xl py-1 px-1 mt-3">
      <p class="m-auto font-medium text-white truncate">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: {
    message: String,
    status: String,
  },
}
</script>

<style scoped></style>
