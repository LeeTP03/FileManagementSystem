<script>
import EditComponent from '@/components/EditComponent.vue';
import IconHome from '@/components/icons/IconHome.vue';

export default {
  name: 'UpdateView',
  
  computed: {
    filename() {
      return this.$route.params.filename;
    }
  },
  components: { EditComponent, IconHome },
}

</script>

<template>
  <div>
    <IconHome/>
    <p>{{ this.filename }}</p>
    <EditComponent :filename="filename"/>
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
