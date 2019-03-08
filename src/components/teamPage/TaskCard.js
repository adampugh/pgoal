import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateSkillName, startCanEvolve } from '../../actions';

import Task from './Task';

class TaskCard extends Component {

    checkCanPokemonEvolve = () => {
        const { pokemon, teamId, startCanEvolve, index} = this.props;
        let canPokemonEvolve = pokemon.tasks.every(task => task.complete === true);
        startCanEvolve(pokemon.id, teamId, canPokemonEvolve, index)
    }

    render() {
        const { tasks, id, skill, name } = this.props.pokemon;
        const { teamId, startUpdateSkillName, index } = this.props;

        return (
            <div>
                <div className="taskCard__title">
                    <input 
                        onChange={(e) => startUpdateSkillName(id, teamId, e.target.value, index)}
                        value={skill || ''}
                        placeholder="Skill"
                        />
                </div>
                <div className="taskCard__tasks">
                    {
                        tasks.map((task, i) => (
                            <Task 
                                name={name}
                                key={i}
                                task={task} 
                                index={i}
                                teamId={teamId} 
                                pokemonId={id}
                                checkCanPokemonEvolve={this.checkCanPokemonEvolve}
                                pokemonIndex={index}
                            />
                        ))
                    }
                    
                </div>
            </div>
        )
    }
}


export default connect(null, { startUpdateSkillName, startCanEvolve })(TaskCard);