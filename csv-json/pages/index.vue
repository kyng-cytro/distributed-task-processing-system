<script setup lang="ts">
import { storeToRefs } from "pinia";
import { type worker } from "~~/lib/workerSchema";
import { useResultStore } from "~~/stores/resultStore";

const workerController = useWorker();

const toast = useToast();

const workers = ref<worker[]>();

const loading = ref(false);

const resultStore = useResultStore();

const { showing } = storeToRefs(resultStore);

let formData = reactive<{ worker: worker | null; file: File | null }>({
  worker: null,
  file: null,
});

const handle_file_change = (file: File) => {
  formData.file = file;
};

const handle_run_job = async () => {
  if (!formData) return;

  if (!formData.file) return;

  loading.value = true;

  const res = await workerController.runTask(formData.worker, formData.file);

  loading.value = false;

  if (res.error) {
    return toast.error(res.message);
  }

  resultStore.setData(JSON.stringify(res.data, null, 2));
  resultStore.setName(formData.file.name);

  resultStore.show();
};

onMounted(() => {
  setInterval(async () => {
    workers.value = await workerController.pollWorkers();
  }, 5000);
});
</script>

<template>
  <div class="flex flex-col gap-10 h-full md:max-w-7xl mx-auto">
    <transition name="fade" mode="out-in">
      <ModalResult v-if="showing" />
    </transition>
    <div class="space-y-3">
      <span class="font-semibold text-xl">Worker Status</span>
      <div class="rounded-lg border-2 border-contessa-300 p-4">
        <div class="flex flex-wrap gap-4 justify-evenly" v-if="workers">
          <CardServer
            :key="worker.name"
            :name="worker.name"
            :endPoint="worker.endpoint"
            :status="worker.status"
            :up-time="worker.uptime"
            :job="worker.job"
            v-for="worker in workers"
          />
        </div>

        <div class="flex h-72 items-center justify-center" v-else>
          <div role="status">
            <svg
              class="inline h-16 w-16 animate-spin fill-contessa-900 text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <span class="font-semibold text-xl">Run Job</span>
      <div
        class="flex flex-col items-start justify-center gap-6 rounded-lg border-2 border-contessa-300 p-4"
      >
        <!-- File Drop Zone -->
        <div class="flex flex-col gap-2 w-full">
          <CardDropZone @file-changed="handle_file_change" />
          <span class="w-full text-right text-sm text-contessa-100 font-medium"
            >** CSV files only</span
          >
        </div>

        <!-- Worker Selector -->
        <div class="w-full">
          <select
            class="block w-full max-w-sm p-2 border-2 border-dashed border-contessa-300 rounded-xl bg-contessa-700 text-contessa-50 focus:outline-none focus:ring focus:border-contessa-400"
            v-model="formData.worker"
          >
            <!-- NOTE: make this dynamic -->
            <option :value="null" selected>Load Balancer</option>
            <option
              :value="worker"
              v-for="worker in workers?.filter(
                (worker) => worker.status === 'active',
              )"
            >
              {{ worker.name }}
            </option>
          </select>
        </div>

        <!-- Start Button -->
        <div class="w-full">
          <button
            type="button"
            class="inline-block rounded bg-contessa-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-contessa-700 shadow-lg transition duration-150 ease-in-out hover:bg-contessa-300"
            :disabled="loading"
            @click="handle_run_job"
          >
            <span v-if="!loading">Start Job</span>
            <span v-else>Running...</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
