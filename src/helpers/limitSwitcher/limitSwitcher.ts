enum SelectItems {
  Ten = 10,
  Twenty = 20,
  Fifty = 50,
  OneHundred = 100,
}

export function limitSwitcher(limit: string): boolean {
  const num: number = parseInt(limit)

  switch (num) {
    case SelectItems.OneHundred:
      return true
    case SelectItems.Fifty:
      return true
    case SelectItems.Twenty:
      return true
    case SelectItems.Ten:
      return true
    default:
      return false
  }
}