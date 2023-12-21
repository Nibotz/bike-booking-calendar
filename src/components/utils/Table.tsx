import { ComponentChildren } from "preact"

export const Table = (
  { columns, children }: 
  { columns: string[], children: ComponentChildren }) =>
{
  return (
    <table>
      <thead>
        <tr>
          {columns.map(s => <th key={s}>{s}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </table>
  )
}