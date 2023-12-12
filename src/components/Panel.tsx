import React from 'react'
import { useCollapse } from 'react-collapsed'
import styles from '../styles/Panel.module.scss';

function Panel({ children }: any) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  
  return (
    <div className={styles.panel}>
      <button {...getToggleProps()}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  )
}

export default Panel