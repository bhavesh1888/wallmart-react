import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux'
import { bindActionCreators, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import {Row, Col, Spin, Table} from 'antd';
import _ from 'lodash';
import Form from './Form.js';
import * as actions from './actions';
import {watchForWallMartData} from  './saga';
import reducer from './reducer';
import 'antd/dist/antd.min.css';
import './style.css';
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(watchForWallMartData)

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      locationId: '',
      skutext: '',
      skus: [],
      dataSource: '',
      loading: false,
    };
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSKUChange = this.handleSKUChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){
    console.log("nextProps", nextProps);
    if(nextProps.global && nextProps.global.response){
      this.setState({dataSource: nextProps.global.response});
    }
    if(nextProps.global && nextProps.global.loading){
      this.setState({loading: nextProps.global.loading});
    }else{
      this.setState({loading: nextProps.global.loading});
    }
  }

  handleLocationChange(location){
    console.log(location);
    this.setState({locationId: location});
  }
  handleSKUChange(event){
    console.log(event.target.value);
    this.setState({skutext: event.target.value});
  }

  handleSubmit(){
    console.log(this.state);
    this.props.actions.getData(this.state.locationId, this.state.skutext);
  }

  getColumns(){
    let columns = [];
    if( this.state.dataSource && this.state.dataSource.price) {
      const dataSource = this.state.dataSource;
      const keys = Object.keys(this.state.dataSource.price);
      var keysArray = [];
      keys.map((item) => {
        keysArray.push(..._.keys(dataSource.price[item].mrp), ..._.keys(dataSource.price[item].webprice));
      });
      // console.log(_.uniq(keysArray));
      columns = [{"title": "Label","dataIndex": 'label',"key": 'label'},{"title": "MRP","dataIndex": 'mrp',"key": 'mrp'},{"title": "Web Price","dataIndex": 'webprice',"key": 'webprice'}];
    }
    return columns;
  }

  getData( item = 'quantity_1' ){
    console.log("item", item);
    const dataSource = this.state.dataSource;
    let data = [];
    let keysArray = [];
    if(dataSource){
        keysArray.push(..._.keys(dataSource.price[item].mrp), ..._.keys(dataSource.price[item].webprice));
        _.uniq(keysArray).map((key, idx) => {
          data.push({"key": idx, "label": key, "mrp": dataSource.price[item].mrp[key] || 0, "webprice": dataSource.price[item].webprice[key] || 0})
        });
    }
    return data;
  }

  getStockData(){
      const dataSource = this.state.dataSource;
      let data = [];
      if( dataSource ){
        for(let key in dataSource.stock){
          data.push({"key": key, "label": key, "stock": dataSource.stock[key]});
        }
      }
      return data;
  }

  render() {
    console.log(this.state);
    const keys = this.state.dataSource && Object.keys(this.state.dataSource.price) || [];
    const stockColumns = [{"title": "Label","dataIndex": 'label',"key": 'label'},{"title": "Stock","dataIndex": 'stock',"key": 'stock'}]
    return (
      <div className="container">
        <Row>
          <Col span={20}>
            <Form loading={this.state.loading} handleSKUChange={this.handleSKUChange} handleLocationChange={this.handleLocationChange} handleSubmit={this.handleSubmit} />
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Table pagination={{ pageSize: 50 }} columns={stockColumns} dataSource={this.getStockData()} title={() => <h1>Stock</h1>}></Table>
          </Col>
        </Row>
          {
            keys.map((item, idx) => {
              return <Row key={idx}><Col span={10}>
                        <h3> price list in location defined : {this.state.dataSource.price[item].price_list_in_location_defined ? "Yes" : "No"}</h3>
                        <Table title={() => <h1>{`${item.split("_")[0] +':'+ item.split("_")[1]}`}</h1>} columns={this.getColumns()} dataSource={this.getData(item)}/>
                     </Col></Row>
            })
          }
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    global: state,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
const AppComponent = connect(mapStateToProps, mapDispatchToProps)(App);
render(<Provider store={store}><AppComponent /></Provider>, document.getElementById('root'));
