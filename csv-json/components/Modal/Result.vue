<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useResultStore } from "~~/stores/resultStore";

const resultStore = useResultStore();
const { resultContent, fileName } = storeToRefs(resultStore);

const target = ref(null);

onClickOutside(target, () => resultStore.hide());

const { ready: copied, start } = useTimeout(2000, {
  controls: true,
  immediate: false,
});

const copy_to_clip = () => {
  const { copy } = useClipboard();
  copy(resultContent.value as string);
  start();
};

const download_file = (): void => {
  const jsonBlob = new Blob([resultContent.value], {
    type: "application/json",
  });
  const url = URL.createObjectURL(jsonBlob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName.value.split(".")[0] || "data.json";
  link.click();

  URL.revokeObjectURL(url);
};
</script>
<template>
  <div
    tabindex="-1"
    class="absolute top-0 left-0 z-50 flex h-full w-full items-center justify-center backdrop-blur-sm text-neutral-600 p-3"
  >
    <div
      class="flex flex-col gap-2 w-full max-w-xl h-1/2 bg-contessa-100 rounded-xl p-4"
      ref="target"
    >
      <div
        class="flex justify-between border-b border-contessa-800 p-2 items-center"
      >
        <span class="text-2xl uppercase font-semibold">{{ fileName }}</span>
        <button
          @click="resultStore.hide"
          class="rounded-lg bg-contessa-700 p-2 font-sans text-xs font-bold uppercase text-white shadow-md shadow-contessa-700/20 transition-all hover:shadow-lg hover:shadow-contessa-700/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <pre
        class="flex-1 bg-contessa-500 rounded-xl overflow-scroll hide-scroll-bar text-contessa-50"
      >
        <code>
        {{ resultContent }}
        </code>
      </pre>
      <div class="flex gap-3 items-center justify-end">
        <button
          type="button"
          @click="download_file"
          class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
        >
          Download File
        </button>
        <button
          type="button"
          @click="copy_to_clip"
          class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
        >
          {{ !copied ? "Copied" : "Copy JSON" }}
        </button>
      </div>
    </div>
  </div>
</template>
