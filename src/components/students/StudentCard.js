import React, { Component } from 'react';

export default class StudentCard extends Component {
    state = {
        firstName: '',
        lastName: '',
        email:  '',
        company: '',
        skill: '',
        pic: '',
        show: true,
        tagInput: '',
        grades: [],
        tags: []
    };

    // Method to get the average of the individual's grades
    getAvg = (grades) => {
        const total = grades.reduce((acc, c) => acc + c, 0);
        return total / grades.length;
    };

    componentDidMount = () => {
        const name = this.props.firstName + " " + this.props.lastName;  // concatenates first and last names
        const { email, company, skill, pic, show, tagInput, grades, tags} = this.props
        const gnums = this.props.grades.map(Number);    // typecast numbers to strings
        const avg = this.getAvg(gnums); // Get average of grades array

        this.setState({
            name,
            email,
            company,
            skill,
            pic,
            grades:grades,
            avg,
            show,
            tagInput,
            tags
        })
    };

    // Toggle the list view
    showGrades = () => {
        this.setState({
            show: !this.state.show,
        })
    };

    setTagInput = (e) => {
        const tagInput = this.state.tagInput
        this.setState({ tagInput }) 
    };

    addNewTag = (input) => {
        const tags = this.state.tags.concat([input])
        input.preventDefault();
        this.setState({ tags })
    };

    render() {
        return (
            <li className="list-group-item"> 
                <div className="card border-light">
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={this.state.pic} className="avatar" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <div className="card-title">
                                    <h1>{this.state.name}</h1>
                                </div>
                                <p className="card-text">
                                    Email: {this.state.email}
                                </p>
                                <p className="card-text">
                                    Company: {this.state.company}
                                </p>
                                <p className="card-text">
                                    Skill: {this.state.skill}
                                </p>
                                <p className="card-text">
                                    Average: {this.state.avg}%
                                </p>
                                <div className="student-grades">
                                    {   this.state.show &&
                                        this.state.grades.map((grade, index) => {
                                            return (
                                                <p className="card-text">
                                                    {`Test ${index+1}: ${grade}%`}
                                                </p>
                                            );
                                    })}
                                </div>
                                <div className="student-tags">
                                    {   this.state.tags &&
                                        this.state.tags.map((t) => {
                                            return (
                                                <p className="card-text">
                                                    ${t}
                                                </p>
                                            );
                                        })

                                    }
                                </div>
                                <form className="enter-tag" onSubmit={this.addNewTag}>
                                    <input 
                                        type="text"
                                        placeholder="Add a tag"
                                        value={this.state.tagInput}
                                        onChange={(e) => {
                                            this.setTagInput(e.target.value)
                                        }}
                                    />
                                </form>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="card-body">
                                <div className="card-title">
                                    {
                                        !this.state.show &&
                                        <button className="btn btn-primary" onClick={this.showGrades}>+</button>
                                    }
                                    {
                                        this.state.show &&
                                        <button type="button" className="btn btn-primary" onClick={this.showGrades}>-</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </li>
        )
    }
}
