import { createContext, useContext } from 'react'

export const WorkbookContext = createContext({
  setWorkbookContext: () => {},
})

export function useWorkbookContext() {
  return useContext(WorkbookContext)
}
