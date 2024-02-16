import React from 'react'
import styles from './TableSkeleton.module.scss'
interface TableSkeletonProps {
  numColumns: number
  numActions: number
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  numColumns,
  numActions,
}) => {
  const columns = Array.from({ length: numColumns }, (_, i) => (
    <td key={i} className={styles.skeletonRectangle} />
  ))

  const actions = Array.from({ length: numActions }, (_, i) => (
    <td key={i} className={styles.skeletonCircle} />
  ))

  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          {columns}
          {numActions > 0 && <td>{actions}</td>}
        </tr>
      </tbody>
    </table>
  )
}
