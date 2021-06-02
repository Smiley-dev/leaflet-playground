import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";

class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "#ffff00",
    };
  }
  componentDidMount() {}

  color = ["green", "blue", "yellow", "orange", "grey"];

  printMessageToConsole = (event) => {
    console.log("Clicked");
  };

  changeCountryColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 1,
    });
  };

  countryStyle = {
    fillColor: "red",
    fillOpacity: 1,
    color: "black",
    weight: 2,
  };

  onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);

    layer.options.fillOpacity = Math.random();
    //layer.options.fillColor = this.color[
    //Math.floor(Math.random() * this.color.length)
    //];
    layer.on({
      click: this.changeCountryColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>My Map</h1>
        <MapContainer style={{ height: "80vh" }} zoom={2} center={[20, 100]}>
          <GeoJSON
            style={this.countryStyle}
            data={mapData.features}
            onEachFeature={this.onEachCountry}
          />
        </MapContainer>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        ></input>
      </div>
    );
  }
}

export default MyMap;
