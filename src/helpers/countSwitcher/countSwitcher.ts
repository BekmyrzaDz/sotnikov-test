enum SelectItems {
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
  OneHundred = 100,
}

export function countSwitcher(count: number): number {
  switch (count) {
    case SelectItems.OneHundred:
      return 1
    case SelectItems.Fifty:
      return 2
    case SelectItems.Twenty:
      return 5
    case SelectItems.Ten:
      return 10
    default:
      return 10
  }
}