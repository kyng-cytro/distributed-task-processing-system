<script setup lang="ts">
const formartter = useUptimeFormatter();
defineProps({
  name: String,
  job: String,
  endPoint: String,
  status: String,
  upTime: Number,
});
</script>
<template>
  <div
    class="max-w-sm rounded-xl bg-contessa-100 shadow-lg shadow-contessa-800 w-full"
  >
    <div class="p-6">
      <p class="mb-4 text-base text-neutral-600">Worker Name: {{ name }}</p>
      <p class="mb-4 text-base text-neutral-600">Worker Job: {{ job }}</p>
      <p class="mb-4 text-base text-neutral-600">
        End Point:
        <NuxtLink :to="endPoint" target="_blank">{{ name }}-worker</NuxtLink>
      </p>
      <p class="mb-4 text-base text-neutral-600">
        Worker Status:
        <span
          :class="{
            'bg-green-500': status === 'active',
            'bg-yellow-500': status === 'busy',
            'bg-red-500': status === 'down',
          }"
          class="py-1 px-2 rounded-sm"
          >{{ status }}</span
        >
      </p>
      <p class="mb-8 text-base text-neutral-600">
        Worker Uptime: {{ formartter.formatUptime(upTime ?? 0) }}
      </p>
      <div class="flex gap-3">
        <button
          type="button"
          class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
        >
          restart worker
        </button>
        <button
          type="button"
          class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
        >
          Simulate Down
        </button>
      </div>
    </div>
  </div>
</template>
