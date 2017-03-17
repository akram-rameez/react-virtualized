/** @flow */
import Immutable from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import CellMeasurer from './CellMeasurer'
import CellMeasurerCache from './CellMeasurerCache'
import MultiGrid from '../MultiGrid'
import styles from './CellMeasurer.example.css'

export default class DynamiHeightMultiGrid extends PureComponent {
  static propTypes = {
    getClassName: PropTypes.func.isRequired,
    getContent: PropTypes.func.isRequired,
    list: PropTypes.instanceOf(Immutable.List).isRequired,
    width: PropTypes.number.isRequired
  }

  constructor (props, context) {
    super(props, context)

    this._cache = new CellMeasurerCache({
      defaultHeight: 30,
      defaultWidth: 50,
      fixedWidth: true,
      fixedHeight: false
    })

    this._cellRenderer = this._cellRenderer.bind(this)
  }

  render () {
    const { width } = this.props

    return (
      <MultiGrid
        className={styles.BodyGrid}
        columnCount={50}
        columnWidth={75}
        deferredMeasurementCache={this._cache}
        fixedColumnCount={1}
        fixedRowCount={0}
        height={400}
        overscanColumnCount={0}
        overscanRowCount={0}
        cellRenderer={this._cellRenderer}
        rowCount={50}
        rowHeight={this._cache.rowHeight}
        width={width}
      />
    )
  }

  _cellRenderer ({ columnIndex, key, parent, rowIndex, style }) {
    const { getClassName, getContent, list } = this.props

    const datum = list.get((rowIndex + columnIndex) % list.size)
    const classNames = getClassName({ columnIndex, rowIndex })
    let content = getContent({ index: rowIndex, datum, long: false })

    if (columnIndex === 0) {
      content = content.substr(0, 50)
    }

    return (
      <CellMeasurer
        cache={this._cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          className={classNames}
          style={{
            ...style,
            whiteSpace: 'normal'
          }}
        >
          {content}
        </div>
      </CellMeasurer>
    )
  }
}
