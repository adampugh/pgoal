import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateTaskText, startCompleteTask } from '../../actions';
import Modal from 'react-responsive-modal';
import { FaPlusSquare } from 'react-icons/fa';

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
        const percentageIncrease = {
            7: (100 / 70),
            8: (100 / 80),
            9: (100 / 90)
        }

        const { startCompleteTask, checkCanPokemonEvolve, pokemonId, teamId, task, index, pokemonIndex, stages, percentage } = this.props;
        
        let updatedPercentage = !task.complete 
            ? percentage + percentageIncrease[stages] 
            : percentage - percentageIncrease[stages]

        await startCompleteTask(pokemonId, teamId, !task.complete, index, pokemonIndex, updatedPercentage);
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
                                <h1 onClick={this.onOpenModal}>{task.text || <FaPlusSquare />}</h1>
                                <div className="input__checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={task.complete}
                                        onChange={() => this.handleTaskToggle()} />
                                    <span className="checkmark"></span>
                                </div>
                            </>
                        ) : (
                            <div>
                                {/* <input value="" disabled /> */}
                            </div>
                        )
                }
                
            </div>
        )
    }
}

export default connect(null, { startUpdateTaskText, startCompleteTask })(Task);