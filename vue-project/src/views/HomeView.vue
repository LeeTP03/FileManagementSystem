
<script>
    import axios from 'axios';
    import FileItemComponent from '../components/FileItemComponent.vue';
    import FileIconBarComponent from '../components/FileIconBarComponent.vue';

    export default {
        components: { FileItemComponent, FileIconBarComponent },
        data() {
            return {
                files: []
            };
        },
        async created() {
            await this.fetchFiles();
        },
        methods: {
            async fetchFiles() {
            try {
                const response = await axios.get('http://localhost:3000/files');
                this.files = response.data;
            } catch (error) {
                console.error('Error fetching files:', error);
            }
            }
        }
    };
</script>
  
<template>
    <div>
        <FileIconBarComponent/>
        <div>
            <h1 class="text-3xl pb-4">File List</h1>
            <ul v-if="files.length">
                <li v-for="file in files" :key="file.name">
                    <FileItemComponent :filedata="file" />
                </li>
            </ul>
            <p v-else>Loading files...</p>
        </div>
    </div>
</template>

  <style scoped>
  /* Optional styling */
  ul {
    list-style-type: none;
  }
  li {
    margin-bottom: 10px;
  }
  </style>
  