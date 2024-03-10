import _ from "lodash";

export default function paginate(
  stocks: string[],
  maxSize: number,
  currentScroll: number
): string[] {
  const startIndex = (currentScroll - 1) * maxSize;
  return _(stocks).slice(startIndex).take(maxSize).value();
}
