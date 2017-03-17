/** @flow */
import Immutable from 'immutable'
import React, { PropTypes, PureComponent } from 'react'
import { ContentBox, ContentBoxHeader, ContentBoxParagraph } from '../demo/ContentBox'
import AutoSizer from '../AutoSizer'
import cn from 'classnames'
import styles from './CellMeasurer.example.css'
import DynamicWidthGrid from './CellMeasurer.DynamicWidthGrid.example.js'
import DynamiHeightGrid from './CellMeasurer.DynamiHeightGrid.example.js'
import DynamiWidthMultiGrid from './CellMeasurer.DynamiWidthMultiGrid.example.js'
import DynamiHeightMultiGrid from './CellMeasurer.DynamiHeightMultiGrid.example.js'
import DynamicHeightList from './CellMeasurer.DynamicHeightList.example.js'
import DynamicHeightTableColumn from './CellMeasurer.DynamicHeightTableColumn.example.js'

const demoComponents = [
  DynamicWidthGrid,
  DynamiHeightGrid,
  DynamiWidthMultiGrid,
  DynamiHeightMultiGrid,
  DynamicHeightList,
  DynamicHeightTableColumn
]

export default class CellMeasurerExample extends PureComponent {
  static contextTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
  }

  constructor (props, context) {
    super(props, context)

    this.state = {
      currentTab: 0
    }

    this._onClick = this._onClick.bind(this)
  }

  render () {
    const { list } = this.context
    const { currentTab } = this.state

    const buttonProps = {
      currentTab,
      onClick: this._onClick
    }

    const DemoComponent = demoComponents[currentTab]

    return (
      <ContentBox>
        <ContentBoxHeader
          text='CellMeasurer'
          sourceLink='https://github.com/bvaughn/react-virtualized/blob/master/source/CellMeasurer/CellMeasurer.example.js'
          docsLink='https://github.com/bvaughn/react-virtualized/blob/master/docs/CellMeasurer.md'
        />

        <ContentBoxParagraph>
          This component can be used to just-in-time measure dynamic content (eg. messages in a chat interface).
        </ContentBoxParagraph>

        <AutoSizer disableHeight>
          {({ width }) => (
            <div style={{ width }}>
              <div>
                <strong>Grid</strong>:
                <Tab id={0} {...buttonProps}>dynamic width text</Tab>
                <Tab id={1} {...buttonProps}>dynamic height text</Tab>

                <strong>MultiGrid</strong>:
                <Tab id={2} {...buttonProps}>dynamic width text</Tab>
                <Tab id={3} {...buttonProps}>dynamic height text</Tab>

                <strong>List</strong>:
                <Tab id={4} {...buttonProps}>dynamic height image</Tab>

                <strong>Table</strong>:
                <Tab id={5} {...buttonProps}>mixed fixed and dynamic height text</Tab>
              </div>

              <DemoComponent
                getClassName={getClassName}
                getContent={getContent}
                list={list}
                width={width}
              />
            </div>
          )}
        </AutoSizer>
      </ContentBox>
    )
  }

  _onClick (id) {
    this.setState({
      currentTab: id
    })
  }
}

function getClassName ({ columnIndex, rowIndex }) {
  const rowClass = rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow

  return cn(rowClass, styles.cell, {
    [styles.centeredCell]: columnIndex > 2
  })
}

function getContent ({ index, datum, long = true }) {
  switch (index % 3) {
    case 0:
      return datum.color
    case 1:
      return datum.name
    case 2:
      return long ? datum.randomLong : datum.random
  }
}

function Tab ({ children, currentTab, id, onClick }) {
  const classNames = cn(styles.Tab, {
    [styles.ActiveTab]: currentTab === id
  })

  return (
    <button
      className={classNames}
      onClick={() => onClick(id)}
    >
      {children}
    </button>
  )
}
