export default function () {
  const formatUptime = (uptimeInSeconds: number): string => {
    if (!uptimeInSeconds) return "worker-down";

    const seconds = Math.round(uptimeInSeconds % 60);
    const minutes = Math.floor((uptimeInSeconds / 60) % 60);
    const hours = Math.floor((uptimeInSeconds / 3600) % 24);
    const days = Math.floor(uptimeInSeconds / 86400);

    const formattedUptime = [];
    if (days > 0) {
      formattedUptime.push(`${days} days`);
    }
    if (hours > 0) {
      formattedUptime.push(`${hours} hrs`);
    }
    if (minutes > 0) {
      formattedUptime.push(`${minutes} mins`);
    }
    if (seconds > 0) {
      formattedUptime.push(`${seconds} secs`);
    }

    return formattedUptime.join(", ");
  };

  return {
    formatUptime,
  };
}
