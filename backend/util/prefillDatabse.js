require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
// const PerformerDetails = require('../models/Performer/Details');
const PerformerAchievement = require('../models/Performer/Achievement');
const { Campus, CulturalGroup, Department, Program, PerformerDetails } = require('../models/Performer/Details');
const { culturalgroups, campuses, departments, programs } = require('./registrationValues');

// DATABASE SETUP AND CONFIG
const DB_URI = `mongodb+srv://admin:performerprofile@oca-pp.dvstq.mongodb.net/performer_db?retryWrites=true&w=majority&appName=oca-pp`; 

const initialize = async () => {
    try {
        // Connect to the database
        await mongoose.connect(DB_URI);

        // await Campus.deleteMany({});
        // await CulturalGroup.deleteMany({});
        // await Department.deleteMany({});
        // await Program.deleteMany({});

        // Insert sample data for campuses
        // const campusDocs = await Campus.insertMany(campuses);
        // console.log(campusDocs);

        // Insert sample data for cultural groups
        // const culturalGroupDocs = await CulturalGroup.insertMany(culturalgroups);
        // console.log(culturalGroupDocs);

        // Insert sample data for departments
        // const departmentDocs = await Department.insertMany(departments);
        // console.log(departmentDocs);

        // Insert sample data for programs
        // const programDocs = [];
        // for (const [departmentLabel, programList] of Object.entries(programs)) {
        //     const department = departmentDocs.find(dep => dep.label === departmentLabel);
        //     if (department) {
        //         for (const program of programList) {
        //             const programInsert = await Program.create({ label: program.label, department: department._id });
        //             programDocs.push(programInsert);
        //         }
        //     }
        // }
        // console.log(programDocs);

        const user = await User.create({
            firstName: 'Jane',
            lastName: 'Doe',
            email: 'janedoe@example.com',
            password: 'janedoe',
            role: 'admin',
        });

        // const performerDetails = await PerformerDetails.create({
        //     user: user._id,
        //     campus: campusDocs[0]._id,
        //     culturalGroup: culturalGroupDocs[0]._id,
        //     department: departmentDocs[0]._id,
        //     program: programDocs[0]._id,
        // });

        // const performerAchievement = await PerformerAchievement.create({
        //     user: user._id,
        //     title: 'Best Performer',
        //     description: 'Awarded for outstanding performance in the annual drama competition',
        // });

        console.log('Database initialized with test data');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
};

initialize();