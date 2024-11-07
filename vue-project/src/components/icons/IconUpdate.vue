<template>
    <div class="pt-2">
            <RouterLink :to="{ name: 'update', params: { filename } }" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</RouterLink>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router"
defineProps({
  filename: {
    type: String,
    required: true,
  },
})
</script>