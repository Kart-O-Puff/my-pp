const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Campus Schema
const CampusSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
});

// CulturalGroup Schema
const CulturalGroupSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
});

// Department Schema
const DepartmentSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
});

// Program Schema
const ProgramSchema = new Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
});

// PerformerDetails Schema
const PerformerDetailsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  campus: {
    type: Schema.Types.ObjectId,
    ref: 'Campus',
    default: null,
  },
  culturalGroup: {
    type: Schema.Types.ObjectId,
    ref: 'CulturalGroup',
    default: null,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    default: null,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'Program',
    default: null,
  },
  srCode: {
    type: String,
    default: null,
  },
});

// Models
const Campus = mongoose.model('Campus', CampusSchema);
const CulturalGroup = mongoose.model('CulturalGroup', CulturalGroupSchema);
const Department = mongoose.model('Department', DepartmentSchema);
const Program = mongoose.model('Program', ProgramSchema);
const PerformerDetails = mongoose.model('PerformerDetails', PerformerDetailsSchema);

module.exports = {
  Campus,
  CulturalGroup,
  Department,
  Program,
  PerformerDetails,
};