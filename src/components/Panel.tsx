import React from 'react'
import { useCollapse } from 'react-collapsed'
import styles from '../styles/Panel.module.scss';

function Panel({ children , onToggleClick }: any) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()
  
  return (
    <div className={styles.panel}>
      <button {...getToggleProps({
        onClick: onToggleClick,
      })}>
        <span>Legend</span>
        {isExpanded ? 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 15L12 9L6 15" stroke="#f2f2f2"/></svg> 
        : 
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 9L12 15L6 9" stroke="#f2f2f2"/>
        </svg>}
      </button>
      <section {...getCollapseProps()}>{children}</section>
    </div>
  )
}

export default Panel