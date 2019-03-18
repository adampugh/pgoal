import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateTaskText, startCompleteTask } from '../../actions';
import Modal from 'react-responsive-modal';

class Task extends Component {
    state = {
        open: false,
        taskText: ''
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false, taskText: '' });
    };

    handleInputChange = (e) => {
        this.setState({
          taskText: e.target.value
        });
    }

    submitTaskText = () => {
        const { index, pokemonId, teamId, startUpdateTaskText, pokemonIndex } = this.props;
        const { taskText } = this.state;

        if (taskText.length > 0) {
            startUpdateTaskText(pokemonId, teamId, taskText, index, pokemonIndex)
        }

        this.onCloseModal();
    }

    handleTaskToggle = async () => {
        const { startCompleteTask, checkCanPokemonEvolve, pokemonId, teamId, task, index, pokemonIndex } = this.props;
        await startCompleteTask(pokemonId, teamId, !task.complete, index, pokemonIndex);
        checkCanPokemonEvolve();
    }

    render() {
        const { task, name } = this.props;
        const { taskText, open } = this.state;

        return (
            <div className="taskCard__tasks__task">
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                        <h1>Add a new task</h1>
                        <input 
                            value={taskText}
                            placeholder={task.text}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <button className="btn" onClick={this.submitTaskText}>Save</button>
                    </div>
                </Modal>
                { 
                    name
                        ? (
                            <>
                                <p onClick={this.onOpenModal}>{task.text || 'Add a Task'}</p>
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