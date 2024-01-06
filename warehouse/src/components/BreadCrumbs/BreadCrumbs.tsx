import React from 'react'
import { Link } from 'react-router-dom'
import styles from './BreadCrumbs.module.scss'
import ArrowIcon from '../Icons/ArrowIcon'

export type BreadCrumbsProps = {
  links: Map<string, string>;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({links}) => {
  const lastIndex = Array.from(links.keys()).length - 1;
  return (
    <div className={styles.breadcrumbs}>
      {Array.from(links.entries()).map(([key, value], index) => (
        <span key={key} className={styles.breadcrumbs__item}>
          {index === lastIndex ? (
            <span className={styles['breadcrumbs__item-text-active']}>{key}</span>
          ) : (
            <Link to={value} className={styles['breadcrumbs__item-link']}>
              {key}
            </Link>
          )}
          {index !== lastIndex && (
            <span className={styles['breadcrumbs__item-icon']}><ArrowIcon /></span>
          )}
        </span>
      ))}
    </div>
  )
}

export default BreadCrumbs
