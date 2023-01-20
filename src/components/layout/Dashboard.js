import React from 'react';
import StudentList from '../students/StudentList';

function Dashboard() {
        return (
            <div className="Dashboard">
                <div>
                    <StudentList/>
                </div>
            </div>
        );
}

export default Dashboard;