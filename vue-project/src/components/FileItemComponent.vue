<script setup>
import IconDelete from './icons/IconDelete.vue';
import IconUpdate from './icons/IconUpdate.vue';
defineProps({
  filedata: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-row">
    <div class=" w-2/3">
      <h3>
        {{ filedata.name }}
      </h3>
    </div>
    <IconUpdate :filename="filedata.name"/>
    <IconDelete :filename="filedata.name" />
  </div>
</template>


<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
</style>