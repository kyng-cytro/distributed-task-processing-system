export default function () {
  const formatUptime = (uptimeInSeconds: number): string => {
    if (!uptimeInSeconds) return "worker-down";

    const seconds = Math.round(uptimeInSeconds % 60);
    const minutes = Math.floor((uptimeInSeconds / 60) % 60);
    const hours = Math.floor((uptimeInSeconds / 3600) % 24);
    const days = Math.floor(uptimeInSeconds / 86400);

    if (days > 0) {
      return `${days}d ${hours}h`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}secs`;
    }
  };

  return {
    formatUptime,
  };
}
