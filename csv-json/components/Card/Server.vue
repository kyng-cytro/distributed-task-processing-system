<script setup lang="ts">
const formartter = useUptimeFormatter();
defineProps({
  name: String,
  job: String,
  endPoint: String,
  status: String,
  upTime: Number,
  sim: Boolean,
});
</script>
<template>
  <div
    class="h-80 max-w-sm rounded-xl bg-contessa-100 shadow-lg shadow-contessa-800 w-full p-6 flex flex-col justify-between gap-8"
  >
    <div class="flex flex-col gap-4 text-base text-neutral-600">
      <p>Worker Name: {{ name }}</p>
      <p>Worker Job: {{ job }}</p>
      <p>
        End Point:
        <NuxtLink :to="endPoint" target="_blank">{{ name }}-worker</NuxtLink>
      </p>
      <p>
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
      <p>Worker Uptime: {{ formartter.formatUptime(upTime ?? 0) }}</p>
    </div>
    <div class="flex gap-3">
      <button
        type="button"
        class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
      >
        Restart Worker
      </button>
      <button
        @click="$emit(sim ? 'bring-up' : 'simulate-down')"
        type="button"
        class="inline-block rounded bg-contessa-700 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-contessa-600"
      >
        {{ sim ? "Bring Up" : "Simulate Down" }}
      </button>
    </div>
  </div>
</template>
