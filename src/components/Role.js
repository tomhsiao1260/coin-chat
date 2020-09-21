import React, { Component } from 'react';
import RoleA from '../assets/roleA.png';
import RoleB from '../assets/roleB.png';
import styleA from './RoleA.module.scss';
import styleB from './RoleB.module.scss';

// period of the animation in ms (Role A)
const cycleＡ = 4000;

// the class handling the direction of movement (Role A)
const moveRight = `${styleA.character} ${styleA.channel1}`;
const moveLeft = `${styleA.character} ${styleA.channel2}`;

// add pixelArt style (Role B)
const spriteSheetB = `${styleB.spriteSheet} ${styleB.pixelart}`;

class Role extends Component {
  constructor(props) {
    super(props);
    this.state = {
        scale: 0,
        enable: true,
    };

    this.handleMove = this.handleMove.bind(this);
    this.handleScale = this.handleScale.bind(this);
  }

  componentDidMount() {
    const { char, scale, delay } = this.props;
    setTimeout(() => {
      // change the direction of movement per half cycle
      if (char === 'A') {
        this.timerID = setInterval(() => this.handleMove(), cycleＡ / 2);
      }
      // change scale from 0 to this.props.scale (pop up!)
      this.setState({ scale });
    }, delay);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // handling character movement
  handleMove() {
    const { id } = this.props;
    const char = document.querySelector(`#${id}`);

    switch (char.className) {
      case moveLeft:
      case styleA.character:
        char.className = moveRight;
        break;
      case moveRight:
        char.className = moveLeft;
        break;
      default: break;
    }
  }

  // handling transition when the character is touched
  async handleScale() {
    const { enable } = this.state;
    if (enable) {
      this.setState((state) => ({
        scale: state.scale * 0.7,
        enable: false,
      }));
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.setState((state) => ({
        scale: state.scale / 0.7,
        enable: true,
      }));
    }
  }

  render() {
    const { position, id, char } = this.props;
    const { scale } = this.state;
    const lift = `${String((1 - scale) * 50)}%`;

    // handling position
    const stylePosition = {
      left: position,
      overflow: 'visible',
    };
    // handling scale
    const styleScale = {
      transform: `translate(-50%,${lift}) scale(${scale})`,
      overflow: 'hidden',
    };

    return (
      <Character
        id={id}
        char={char}
        styPos={stylePosition}
        styScale={styleScale}
        funScale={this.handleScale}
      />
    );
  }
}

// render the character with different condition
const Character = ({
    id, char, styPos, styScale, funScale,
  }) => {
    function handleScale() { funScale(); }

  switch (char) {
    // Role A
    case 'A':
      return (
        <div id={id} style={styPos} className={styleA.character}>
          <div style={styScale} className={styleA.scale} onClick={handleScale}>
            <img className={styleA.spriteSheet} src={RoleA} alt="character" />
          </div>
        </div>
      );
    // Role B
    case 'B':
      return (
        <div id={id} style={styPos} className={styleB.character}>
          <div style={styScale} className={styleB.scale} onClick={handleScale}>
            <img className={spriteSheetB} src={RoleB} style={{ opacity: 0.8 }} alt="character" />
          </div>
        </div>
      );
    default: return null;
  }
};

export default Role;
