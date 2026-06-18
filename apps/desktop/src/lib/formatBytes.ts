/**
 * 将字节数格式化为人类可读的大小字符串（1024 进制），用于侧边栏数据库大小显示。
 *
 * - null/undefined/非有限数/负数 → null（调用方据此不渲染）
 * - 0 → "0 B"
 * - 其它按量级自适应单位 B/KB/MB/GB/TB/PB：<10 两位小数、<100 一位、否则整数
 */
export function formatBytes(bytes: number | null | undefined): string | null {
  if (bytes == null || bytes < 0 || !Number.isFinite(bytes)) return null;
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const k = 1024;
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), units.length - 1);
  const value = bytes / Math.pow(k, i);
  const digits = value < 10 ? 2 : value < 100 ? 1 : 0;
  return `${value.toFixed(digits)} ${units[i]}`;
}
