import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startUpdateSkillName, startCanEvolve } from '../../actions';
import Modal from 'react-responsive-modal';

import Task from './Task';

class TaskCard extends Component {
    state = {
        open: false,
        skillName: ''
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };
    
    onCloseModal = () => {
        this.setState({ open: false, skillName: '' });
    };

    handleInputChange = (e) => {
        this.setState({
          skillName: e.target.value
        });
    }

    submitSkillName = () => {
        const { teamId, startUpdateSkillName, index } = this.props;
        const { skillName } = this.state;

        if (skillName.length > 0) {
            startUpdateSkillName(this.props.pokemon.id, teamId, skillName, index)
        }

        this.onCloseModal();
    }

    checkCanPokemonEvolve = () => {
        const { pokemon, teamId, startCanEvolve, index} = this.props;
        let canPokemonEvolve = pokemon.tasks.every(task => task.complete === true);
        startCanEvolve(pokemon.id, teamId, canPokemonEvolve, index)
    }

    render() {
        const { tasks, id, skill, name } = this.props.pokemon;
        const { teamId, index } = this.props;
        const { open, skillName } = this.state;

        return (
            <div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="modal__content">
                        <h1>Add skill name</h1>
                        <input 
                            value={skillName}
                            placeholder={skill}
                            onChange={(e) => this.handleInputChange(e)}
                        />
                        <button className="btn" onClick={this.submitSkillName}>Save</button>
                    </div>
                </Modal>
                <div className="taskCard__title">
                    <h2 onClick={this.onOpenModal}>{skill || 'Add Skill'}</h2>
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