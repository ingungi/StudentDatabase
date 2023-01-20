import React, { Component } from 'react';

import StudentCard from './StudentCard';
import axios from 'axios';

export default class StudentList extends Component {
    state = {
        url: 'https://api.hatchways.io/assessment/students',
        student: null,
        inputValue: '',
        tagSearchInput: ''
    };
    
    async componentDidMount() {
        const res = await axios.get(this.state.url); 
        const inputValue = this.state.inputValue;
        const tagSearchInput = this.state.tagSearchInput;
        
        this.setState({ 
            student: res.data['students'],
            inputValue,
            tagSearchInput
        })
    };

    // Method to handle onChange event
    setInput = (e) => {
        const inputValue = e.target.value;
        this.setState({ inputValue })   // updates state to the user's input
    };

    render() {
        return (
            <React.Fragment>
                <form className="search-input student">
                    <input 
                        type="text" 
                        placeholder="Search by name"
                        value={this.state.inputValue}
                        onChange={this.setInput}
                    />
                </form>
                <form className="search-input tag">
                    <input 
                        type="text" 
                        placeholder="Search by tag"
                        
                    />
                </form>
                <div className="student-container">
                {
                    // Check if student is not null
                    this.state.student ? (
                        <ul className="list-group list-group-flush">
                            {this.state.student
                                .filter(s => {
                                    // Filter for students whose names include the userInput
                                    if (s.firstName.toLowerCase().includes(this.state.inputValue.toLowerCase())) {
                                        return s.firstName.toLowerCase().includes(this.state.inputValue.toLowerCase())
                                    } else {
                                        return s.lastName.toLowerCase().includes(this.state.inputValue.toLowerCase())
                                    }
                                    
                                })
                                .map(student => (
                                        <StudentCard 
                                            key={student.id}
                                            firstName={student.firstName}
                                            lastName={student.lastName}
                                            email={student.email}
                                            company={student.company}
                                            skill={student.skill}
                                            pic={student.pic}
                                            grades={student.grades}
                                        />
                                ))
                            }
                        </ul>
                    ) : (<h1>Loading Students...</h1>)  // Displays if no students are found
                }
                </div>
            </React.Fragment>
        );
    }
}
