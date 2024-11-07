<script >
import { ref } from 'vue';
import axios from 'axios';

export default {
        props: {
            filename: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                content: ref(''),
            };
        },
        async created() {
            await this.readFile();
        },
        methods: {
            async readFile() {
            try {
                const response = await axios.get('http://localhost:3000/readfile', {
                    params: {
                        filename: this.filename
                    }
                });
                this.content = response.data;
            } catch (error) {
                console.error('Error fetching files:', error);
            }
            },
            async updateFile() {
                try {
                    const response = await axios.post('http://localhost:3000/update', {
                        filename: this.filename,
                        content: this.content
                    });
                    console.log(response.data.message);
                } catch (error) {
                    console.error('Error updating file:', error.response?.data?.error || error.message);
                }
            }
        }
    };
</script>

<template>
    <div>
        <textarea class="document-editor " rows="20" cols="80" v-model="content"></textarea>
        <div class="pt-2">
            <button @click="updateFile" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Update</button>
        </div>  
    </div>
</template>

<style>
.document-editor {
    width: 100%;
    height: 500px; /* Adjust the height as needed */
    resize: vertical; /* Allow resizing vertically */
    border: 1px solid #ccc;
    padding: 10px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: black;
}
</style>
  