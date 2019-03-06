import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTaskText, completeTask } from '../../actions';

class Task extends Component {
    handleTaskToggle = async () => {
        const { completeTask, checkCanPokemonEvolve, pokemonId, teamId, task, index } = this.props;
        await completeTask(pokemonId, teamId, !task.complete, index);
        checkCanPokemonEvolve();
    }


    render() {
        const { task, index, pokemonId, teamId, updateTaskText, name } = this.props;

        return (
            <div className="taskCard__tasks__task">
                { 
                    name
                        ? (
                            <>
                            <input 
                                value={task.text}
                                onChange={(e) => updateTaskText(pokemonId, teamId, e.target.value, index)}
                            />
                            <input 
                                type="checkbox" 
                                checked={task.complete}
                                onChange={() => this.handleTaskToggle()} />
                            <span className="checkmark"></span>
                            </>
                        ) : (
                            <div>
                                <input value="" disabled />
                            </div>
                        )
                
                }
                
            </div>
        )
    }
}

export default connect(null, { updateTaskText, completeTask })(Task);