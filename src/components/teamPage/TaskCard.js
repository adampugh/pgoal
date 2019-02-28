import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSkillName } from '../../actions';


class TaskCard extends Component {
    state = {
        currentSkill: ''
    }

    componentDidMount() {
        this.setState({ currentSkill: this.props.pokemon.skill })
    }

    handleInputChange = (e) => {
        this.setState({ currentSkill: e.target.value });
    }

    updateSkillName = () => {
        this.props.updateSkillName(this.props.pokemon.id, this.props.teamId, this.state.currentSkill);
    }

    addTask = () => {

    }

    completeTask = () => {

    }

    deleteTask = () => {

    }


    render() {
        const { tasks, skill } = this.props.pokemon;
        const { currentSkill } = this.state;

        return (
            <div>
                <div className="taskCard__title">
                    <input 
                        onChange={(e) => this.handleInputChange(e)}
                        onBlur={this.updateSkillName}
                        value={currentSkill} />
                </div>
                <div className="taskCard__tasks">
                    {
                        tasks.map(task => (
                            <div className="taskCard__tasks__task">
                                <input value={task.text} />
                                <input type="checkbox" checked={task.complete} />
                                <span class="checkmark"></span>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default connect(null, { updateSkillName })(TaskCard);