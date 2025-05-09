export function classStr(...classes: (string | null)[]) {
  return classes.filter((item) => item !== null).join(' ')
}
