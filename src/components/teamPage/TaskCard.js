import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSkillName, canEvolve } from '../../actions';

import Task from './Task';

class TaskCard extends Component {

    checkCanPokemonEvolve = () => {
        const { pokemon, teamId, canEvolve} = this.props;
        let canPokemonEvolve = pokemon.tasks.every(task => task.complete === true);
        canEvolve(pokemon.id, teamId, canPokemonEvolve)
    }

    render() {
        const { tasks, id, skill, name } = this.props.pokemon;
        const { teamId, updateSkillName } = this.props;

        return (
            <div>
                <div className="taskCard__title">
                    <input 
                        onChange={(e) => updateSkillName(id, teamId, e.target.value)}
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
                            />
                        ))
                    }
                    
                </div>
            </div>
        )
    }
}


export default connect(null, { updateSkillName, canEvolve })(TaskCard);