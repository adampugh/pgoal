import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateTaskText, completeTask } from '../../actions';

class Task extends Component {
    handleTaskToggle = () => {
        const { completeTask, checkCanPokemonEvolve, pokemonId, teamId, task, index } = this.props;
        completeTask(pokemonId, teamId, !task.complete, index);
        // setTimeout(() => {
            checkCanPokemonEvolve();
        // }, 1000)
        
    }


    render() {
        const { task, index, completeTask, pokemonId, teamId, updateTaskText, checkCanPokemonEvolve} = this.props;

        return (
            <div className="taskCard__tasks__task">
                <input 
                    value={task.text}
                    onChange={(e) => updateTaskText(pokemonId, teamId, e.target.value, index)}
                />
                <input 
                    type="checkbox" 
                    checked={task.complete}
                    onChange={() => this.handleTaskToggle()} />
                <span className="checkmark"></span>
            </div>
        )
    }
}

export default connect(null, { updateTaskText, completeTask })(Task);