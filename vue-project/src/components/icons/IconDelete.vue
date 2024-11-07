<template>
    <div>
        <button @click="deleteFile(filename)" type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
    </div>
</template>

<script setup>
import axios from 'axios';

defineProps({
  filename: {
    type: String,
    required: true,
  },
})

async function deleteFile(fileName) {
  if (!fileName) {
    console.log('Please enter a filename');
    return;
  }

  try {
    const response = await axios.delete('http://localhost:3000/delete-file', {
      data: { filename: fileName }
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error deleting file:', error.response?.data?.error || error.message);
  }
}
</script>
