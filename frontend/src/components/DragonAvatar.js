import React from "react";

import {
  patchy,
  plain,
  skinny,
  slender,
  sporty,
  spotted,
  stocky,
  striped
} from "../assets";

const propertyMap = {
  backgroundColor: {
    black: "#263238",
    white: "#cfd8dc",
    green: "#a5d6a7",
    blue: "#0277bd",
    red: "fa1200"
  },
  build: {
    slender,
    stocky,
    sporty,
    skinny
  },
  pattern: {
    plain,
    striped,
    spotted,
    patchy
  },
  size: {
    tinny: 55,
    small: 100,
    medium: 140,
    large: 180,
    enormous: 220
  }
};
// gigantic: 250

class DragonAvatar extends React.Component {
  get DragonImage() {
    const dragonPropertyMap = {};
    this.props.dragon.traits.forEach(trait => {
      const { traitType, traitValue } = trait;
      dragonPropertyMap[traitType] = propertyMap[traitType][traitValue];
    });

    const { backgroundColor, build, pattern, size } = dragonPropertyMap;

    const sizing = {
      width: size,
      height: size
    };
    return (
      <div className="dragon-avatar-image-wrapper">
        <div
          className="dragon-avatar-image-background"
          style={{
            backgroundColor: backgroundColor,
            ...sizing
          }}
        />
        <img
          src={pattern}
          className="dragon-avatar-image-pattern"
          style={{
            ...sizing
          }}
        />
        <img
          src={build}
          className="dragon-avatar-image"
          style={{
            ...sizing
          }}
        />
      </div>
    );
  }

  render() {
    const {
      dragonId,
      birthdate,
      nickname,
      generationId,
      traits
    } = this.props.dragon;
    const dragonTraits = traits.map(trait => trait.traitValue).join(",");

    // if (dragon.status === fetchStates.fetching) {     return (
    // <div>...</div>     ); }

    if (!dragonId) {
      return (
        <div>
          <h3>No Dragon... Yet!!</h3>
        </div>
      );
    }
    return (
      <div>
        <p>
          Dragon Id: {dragonId}- Generation Id: {generationId}
        </p>
        <h3>
          Birthdate: {birthdate}- Nickname: {nickname}
        </h3>
        <h4>Traits: {dragonTraits}</h4>
        {this.DragonImage}
      </div>
    );
  }
}

export default DragonAvatar;
