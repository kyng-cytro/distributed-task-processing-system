import { type worker } from "~/lib/workerSchema";

export default function () {
  const simulated_downs = ref<worker[]>([]);

  let workers: worker[] = [
    {
      name: "alpha",
      endpoint: "https://alpha-worker-distributed-system.up.railway.app",
      status: "down",
      uptime: 0,
      job: "csv-json",
    },
    {
      name: "bravo",
      endpoint: "https://bravo-worker-distributed-system.up.railway.app",
      status: "down",
      uptime: 0,
      job: "csv-json",
    },
    {
      name: "charlie",
      endpoint: "https://charlie-worker-distributed-system.up.railway.app",
      status: "down",
      uptime: 0,
      job: "csv-json",
    },
  ];

  const healthCheck = async (worker: worker) => {
    if (simulated_downs.value.some((item) => item.name === worker.name)) {
      worker.status = "down";
      worker.uptime = 0;
      return worker;
    }

    const { data, error } = await useFetch<{
      status: typeof worker.status;
      uptime: number;
    }>(worker.endpoint);

    if (error.value) {
      worker.status = "down";
      worker.uptime = 0;
      return worker;
    }

    if (!data.value || !data.value.status || !data.value.uptime) {
      worker.status = "down";
      worker.uptime = 0;
      return worker;
    }

    worker.status = data.value.status;
    worker.uptime = data.value.uptime;
    return worker;
  };

  const pollWorkers = async (): Promise<worker[]> => {
    return await Promise.all(
      workers.map(async (worker) => healthCheck(worker)),
    );
  };

  const simulateDown = (worker: worker) => {
    if (simulated_downs.value.some((item) => item.name === worker.name)) return;

    simulated_downs.value.push(worker);
  };

  const bringUp = (worker: worker) => {
    if (!simulated_downs.value.some((item) => item.name === worker.name))
      return;

    simulated_downs.value = simulated_downs.value.filter(
      (item) => item.name !== worker.name,
    );
  };

  const runTask = async (worker: worker | null, file: File) => {
    // NOTE: use load balancer
    if (!worker) {
      // NOTE: get fresh state of workers
      workers = await pollWorkers();

      // NOTE: filter for active
      const active_workers = workers.filter(
        (worker) => worker.status === "active",
      );

      if (!active_workers.length) {
        return { error: true, message: "No active workers", data: {} };
      }

      worker =
        active_workers[Math.floor(Math.random() * active_workers.length)];
    }

    const form = new FormData();

    form.append("csvFile", file);

    const { data, error } = await useFetch(worker.endpoint + "/transform", {
      method: "POST",
      body: form,
    });

    if (error.value)
      return { error: true, message: error.value.message, data: {} };

    return { error: false, message: "Task Complete", data: data.value };
  };

  return {
    simulated_downs,
    simulateDown,
    bringUp,
    pollWorkers,
    runTask,
  };
}
