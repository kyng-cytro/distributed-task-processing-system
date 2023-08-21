<template>
  <label
    class="h-72 border-2 border-dashed p-4 rounded-xl flex flex-col items-center justify-center w-full cursor-pointer"
    :class="{
      'border-contessa-600 bg-contessa-500': state.dragActive,
      'border-contessa-300 bg-contessa-700': !state.dragActive,
    }"
    @dragenter="handleDragEnter"
    @dragleave="handleDragLeave"
    @dragover="handleDragOver"
    @drop="handleDrop"
    ref="dropzone"
  >
    <svg
      fill="currentColor"
      class="w-10 h-10 text-contessa-100 mb-2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      v-if="state.selectedFileName"
    >
      <title>Google Sheets</title>
      <path
        d="M11.318 12.545H7.91v-1.909h3.41v1.91zM14.728 0v6h6l-6-6zm1.363 10.636h-3.41v1.91h3.41v-1.91zm0 3.273h-3.41v1.91h3.41v-1.91zM20.727 6.5v15.864c0 .904-.732 1.636-1.636 1.636H4.909a1.636 1.636 0 0 1-1.636-1.636V1.636C3.273.732 4.005 0 4.909 0h9.318v6.5h6.5zm-3.273 2.773H6.545v7.909h10.91v-7.91zm-6.136 4.636H7.91v1.91h3.41v-1.91z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10 text-contessa-100 mb-2"
      v-else
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
    <span class="text-sm text-contessa-50">
      {{ state.selectedFileName || "Select or Drag a CSV File" }}
    </span>
    <input
      type="file"
      id="fileInput"
      class="hidden"
      accept=".csv"
      @change="handleFileChange"
    />
  </label>
</template>

<script setup lang="ts">
const emit = defineEmits(["file-changed"]);

const dropzone = ref<HTMLElement | null>(null);

const state = reactive({
  dragActive: false,
  selectedFileName: "",
});

const handleFileChange = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0 && files[0].type === "text/csv") {
    state.selectedFileName = files[0].name;
    emit("file-changed", files[0]);
  }
};

const handleDragEnter = (event: Event) => {
  event.preventDefault();
  state.dragActive = true;
};

const handleDragLeave = (event: Event) => {
  event.preventDefault();
  state.dragActive = false;
};

const handleDragOver = (event: Event) => {
  event.preventDefault();
};

const handleDrop = (event: Event) => {
  event.preventDefault();
  state.dragActive = false;

  const droppedFiles = (event as DragEvent).dataTransfer?.files;
  if (
    droppedFiles &&
    droppedFiles.length > 0 &&
    droppedFiles[0].type === "text/csv"
  ) {
    state.selectedFileName = droppedFiles[0].name;
    emit("file-changed", droppedFiles[0]);
  }
};
</script>
