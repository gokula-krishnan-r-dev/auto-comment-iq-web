export function formatSubscriberCount(subCount: number): string {
  const K = 1000;
  const M = 1000000;
  const B = 1000000000;

  if (subCount < K) {
    return subCount.toString();
  } else if (subCount < M) {
    return (subCount / K).toFixed(0) + "K";
  } else if (subCount < B) {
    return (subCount / M).toFixed(1) + "M";
  } else {
    return (subCount / B).toFixed(1) + "B";
  }
}
