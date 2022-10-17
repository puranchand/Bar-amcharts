import React from 'react';
import './App.css';
import HorizontalBarChart from './charts/HorizontalChart';
import { horizonChartData } from './component/constant';
import Pagination from "react-js-pagination";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      dataList: [],
      itemPerPage: 5,
      isLoad: false,

    };
  }

  componentDidMount() {
    this.setState({ dataList: horizonChartData.slice(0, 5) });
  }

  handlePageChange(pageNumber) {
    const { itemPerPage } = this.state;
    this.setState({ isLoad: true })
    let indexOfLastItem = pageNumber * itemPerPage;
    let indexOfFirstItem = indexOfLastItem - itemPerPage;
    let currentTodos = horizonChartData.slice(indexOfFirstItem, indexOfLastItem);
    this.setState({ activePage: pageNumber });
    setTimeout(() => {
      this.setState({ activePage: pageNumber, dataList: currentTodos, isLoad: false });
    }, 10)
  }

  render() {
    return (
      <div className="container">
        <div className="chart-box default-height">
          {this.state.dataList && (this.state.dataList.length && !this.state.isLoad) ?
            <HorizontalBarChart
              data={this.state.dataList}
              id="chartdiv"
              title="Horizontal Bar amChart"
            />
            : null}
        </div>
        <div className="">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={5}
            totalItemsCount={horizonChartData.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default App;
