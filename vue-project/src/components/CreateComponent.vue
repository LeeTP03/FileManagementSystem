<script setup>
import { ref } from 'vue';
import axios from 'axios';

// Define filename as a reactive variable
const filename = ref('');
const content = ref('');

async function createFile() {
  if (!filename.value || !content.value) {
    console.log('Please enter a filename and content');
    return;
  }

  try {
    const response = await axios.post('http://localhost:3000/create', {
      filename: filename.value, content: content.value
    });
    console.log(response.data.message);
  } catch (error) {
    console.error('Error creating file:', error.response?.data?.error || error.message);
  }
}
</script>

<template>
    <div>
        <h2 class="text-xl p-1">Create File</h2>
    <div class="flex flex-row gap-2">
        <input type="text" class="text-black border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" v-model="filename" placeholder="Enter file name" />
        <input type="text" class="text-black border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" v-model="content" placeholder="Enter file content" />
        <button @click="createFile" type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Create</button>
    </div>
  </div>
</template>
