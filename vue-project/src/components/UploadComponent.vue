<template>
    <div>
      <h2 class='text-xl p-1'>Upload a File</h2>

      <form @submit.prevent="uploadFile">
        <input type="file" @change="handleFileSelect" />
        <button type="submit">Upload</button>
      </form>

      <p v-if="message">{{ message }}</p>
    </div>
</template>
  
<script>
import axios from 'axios';

    export default {
        data() {
            return {
            selectedFile: null,
            message: ''
            };
        },
        methods: {
            // Method to handle file selection
            handleFileSelect(event) {
                this.selectedFile = event.target.files[0];
            },
            // Method to upload file to backend server
            async uploadFile() {
                if (!this.selectedFile) {
                    this.message = 'Please select a file to upload';
                    return;
            }

            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                // Send POST request to backend server
                await axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                });
                this.message = 'File uploaded successfully';
                this.selectedFile = null; // Clear selected file after upload
            } catch (error) {
                console.error('Error uploading file:', error);
                this.message = 'Failed to upload file';
            }
            }
        }
    };
</script>