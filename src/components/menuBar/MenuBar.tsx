import React, { Component } from "react";
import "./MenuBar.css";
import { MenuMenu, MenuItem, Input, Menu } from "semantic-ui-react";

export default class MenuBar extends Component {
  state = { activeItem: "home" };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary className="menuContainer">
        <MenuItem
          className="item"
          name="Top Seller"
          active={activeItem === "topSeller"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="Fiction"
          active={activeItem === "fiction"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="Kids"
          active={activeItem === "kids"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="Spanish books"
          active={activeItem === "spanishBooks"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="eBooks"
          active={activeItem === "ebooks"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="Offerts"
          active={activeItem === "offerts"}
          //  onClick={this.handleItemClick}
        />
        <MenuItem
          className="item"
          name="Technical books"
          active={activeItem === "technicalBooks"}
          //  onClick={this.handleItemClick}
        />
      </Menu>
    );
  }
}
