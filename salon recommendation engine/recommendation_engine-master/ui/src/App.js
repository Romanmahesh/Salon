import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';


import {BootstrapTable,TableHeaderColumn} from 'react-bootstrap-table';
import '../../ui/node_modules/react-bootstrap-table/css/react-bootstrap-table.css'

/*var data = [
  {id: 1, name: 'Gob', value: '2'},
  {id: 2, name: 'Buster', value: '5'},
  {id: 3, name: 'George Michael', value: '4'}
];*/

var data = [
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GSMOUBET", 
    "rank": 1, 
    "score": 0.16898409525553384
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GHREGHAI", 
    "rank": 2, 
    "score": 0.15612280368804932
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GSSHAVIN", 
    "rank": 3, 
    "score": 0.1483121713002523
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GOTRLLRD", 
    "rank": 4, 
    "score": 0.13757586479187012
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GHGLNOAM", 
    "rank": 5, 
    "score": 0.12609702348709106
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GBDEFANE", 
    "rank": 6, 
    "score": 0.11305063962936401
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GHHCUTNR", 
    "rank": 7, 
    "score": 0.09888893365859985
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GSBEDESI", 
    "rank": 8, 
    "score": 0.09878331422805786
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GSBECOLO", 
    "rank": 9, 
    "score": 0.0964340368906657
  }, 
  {
    "customerId": "RAVINDRAN9840090714", 
    "productId": "GHCOCADE", 
    "rank": 10, 
    "score": 0.07829773426055908
  }
]



class Table1 extends Component {
render() {
return (
 <div>
   <BootstrapTable data={this.props.data}>
     <TableHeaderColumn isKey dataField='productId'>
       Services
     </TableHeaderColumn>
     <TableHeaderColumn dataField='rank'>
       Rank
     </TableHeaderColumn>
   </BootstrapTable>
 </div>
);
}
}

class Table2 extends Component {
  render() {
  return (
   <div>
     <BootstrapTable data={this.props.result}>
       <TableHeaderColumn isKey dataField='productId'>
         Services
       </TableHeaderColumn>
       <TableHeaderColumn dataField='rank'>
         Rank
       </TableHeaderColumn>
     </BootstrapTable>
   </div>
  );
  }
  }
  

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        textfield1: '',
        textfield2: '',
        select1: 1,
        select2: 1,
        select3: 1
      },
      result: []
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: [] });
  }

renderProd(){
    return this.state.result.map((result) => (
        <div>
             {result.productId}
             {result.rank}
        </div>
    ))}
  
  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Recommendation</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Client ID</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Client ID" 
                  name="textfield1"
                  value={formData.textfield1}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          
        <p className="Table-header"></p>
        <Table1 data={result}/>
        </div>
      </Container>
    );
  }
}


export default App;
