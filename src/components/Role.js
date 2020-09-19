import React, { Component } from 'react';
import RoleA from '../assets/roleA.png';
import RoleB from '../assets/roleB.png';
import styleA from './RoleA.module.scss';
import styleB from './RoleB.module.scss';

// period of the animation in ms (Role A)
const cycleＡ = 4000;

// the class handling the direction of movement (Role A)
const move_right = `${styleA.character} ${styleA.channel1}`;
const move_left = `${styleA.character} ${styleA.channel2}`; 

// add pixelArt style (Role B)
const spriteSheetB = `${styleB.spriteSheet} ${styleB.pixelart}`;

class Role extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: this.props.scale,
            enable: true,
        }
    
        this.handleMove = this.handleMove.bind(this);
    }
    componentDidMount() {
        const role = document.querySelector(`#${this.props.id}`);
        setTimeout(() => {  
            // start to display after the delay time
            role.style.display = 'block';
            // change the direction of movement per half cycle 
            if (this.props.role === 'A') { 
                this.timerID = setInterval(() => this.handleMove(), cycleＡ/2);
            }
        }, this.props.delay)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }  

    // handling character movement
    handleMove() {
        const role = document.querySelector(`#${this.props.id}`);

        switch (role.className){
            case move_left:
            case styleA.character:
                role.className = move_right;
                break;
            case move_right:
                role.className = move_left;
                break;
            default: break;
        }
    }
    // handling transition when the character is touched
    async handleScale() {
        if(this.state.enable){
            this.setState( state =>({
                scale: state.scale * 0.7,
                enable: false,
            })); 
            await new Promise(resolve => setTimeout(resolve, 2000));
            this.setState( state =>({
                scale: state.scale / 0.7,
                enable: true,
            })); 
        }
    }

    render() {
        const scale = this.state.scale;
        const lift = String((1-this.state.scale) * 50) + '%';

        // handling position
        const stylePosition = {
            left: this.props.position,
            // cannot be seen until the delay time is reached
            display: 'none',
            overflow: 'visible',
        }
        // handling scale
        const styleScale = {
            transform: `translate(-50%,${lift}) scale(${scale})`,
            overflow: 'hidden',
        }

        return (
            <Character id={this.props.id}  role={this.props.role} 
                       pos={stylePosition} scale={styleScale}
                       funScale={this.handleScale.bind(this)}
            />
        )
    }
}

// render the character with different condition
const Character = (props) => {

    function Scale(){ props.funScale() };

    switch (props.role) {
        // Role A
        case 'A':
            return (
                <div id={props.id} 
                     style={props.pos}
                     className={styleA.character}
                >
                    <div className={styleA.scale} 
                         style={props.scale}
                         onClick={Scale}
                    >
                        <img className={styleA.spriteSheet} src={RoleA} alt="character"/>
                    </div>
                </div>
            )
        // Role B
        case 'B':
            return (
                <div id={props.id} 
                     style={props.pos}
                     className={styleB.character}
                >
                    <div className={styleB.scale} 
                         style={props.scale}
                         onClick={Scale}
                    >
                        <img className={spriteSheetB} src={RoleB} alt="character" style={{opacity: 0.8}}/>
                    </div>
                </div>
            )
        default: return null;
    }
}

export default Role;
