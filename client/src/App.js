import React, {Component} from 'react';

import{
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Col,
  Jumbotron,
  InputGroup,
  Input,
  Button,
  FormGroup

}from "reactstrap";
import Weather from "./Weather";

class App extends Component{
 constructor(props){
   super(props);

   this.state = {
     weather: null,
     cityList: [],
     newCityName:" "
    };
 }
 handleInputChange = (e) =>{
   this.setState({ newCityName: e.target.value})
 };
 try=()=>{
  console.log("123456789")

 }
 handleAddCity=()=>{
   fetch("/api/cities",{
     method: "post",
     headers:{"Content-Type": "application/json"},
     body: JSON.stringify({city: this.state.newCityName })
   })
   .then(res=> res.json())
   .then(res =>{
    //  this.getCityList();
     this.getState({ newCityName: " "}) 
   });
  };

getWeather = (city) => {
  fetch('/api/weather/'+(city))
  .then(res => res.json())
  .then(weather =>{
    this.setstate({weather});
  })
}
handleChangeCity = (e) =>{
  this.getWeather(e.target.value);
}

 getCityList =() => {
   fetch("/api/cities")
   .then(res => console.log("i dont know12344"))
   .then(res =>res.json())
   .then(res => console.log("i dont know"))
   .then(res=>{
     var cityList = res.map(r => r.city_name);
     this.setState({cityList});
   });
 };
 componentDidMount(){
   this.getCityList();
 }
 render(){ 
  return (
    <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">My Weather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <Jumbotron>
            <h1 className = "display-3">MyWeather</h1>
            <p className = "lead">The current weather for your favorite city</p>
            <InputGroup>
              <Input
                placeholder="New city name...."
                value={this.state.newCityName}
                onChange={this.handleInputChange}>

              </Input>
          
              <Button color="primary" onClick={this.handleAddCity}>add city</Button>
            </InputGroup>

          </Jumbotron>

        </Col> 
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={this.handleChangeCity}>
              {this.state.cityList.length === 0 &&<option> No! cities added yet</option> }
              {this.state.cityList.length > 1 &&<option> Select a city.</option> }
              {this.state.cityList.map((city,i)=><option key={i}>{city}</option>)}
            </Input>>
          </FormGroup>
        </Col>

      </Row>
      <Weather data= {this.state.weather} />
    </Container>
  
  );
 }
}

export default App;
 