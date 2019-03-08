import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateTaskText, startCompleteTask } from '../../actions';

class Task extends Component {
    handleTaskToggle = async () => {
        const { startCompleteTask, checkCanPokemonEvolve, pokemonId, teamId, task, index, pokemonIndex } = this.props;
        await startCompleteTask(pokemonId, teamId, !task.complete, index, pokemonIndex);
        checkCanPokemonEvolve();
    }


    render() {
        const { task, index, pokemonId, teamId, startUpdateTaskText, name, pokemonIndex } = this.props;

        return (
            <div className="taskCard__tasks__task">
                { 
                    name
                        ? (
                            <>
                            <input 
                                value={task.text}
                                onChange={(e) => startUpdateTaskText(pokemonId, teamId, e.target.value, index, pokemonIndex)}
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

export default connect(null, { startUpdateTaskText, startCompleteTask })(Task);