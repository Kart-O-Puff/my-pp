const express = require('express');
const router = express.Router();
const { PerformerDetails } = require('../models/Performer/Details');
const PerformerAchievement = require('../models/Performer/Achievement');
const User = require('../models/User');

// Route to get all users
router.get('/users', async (req, res) => {
  try {
    const performers = await PerformerDetails.find().populate('user campus culturalGroup department program');
    const performersData = performers.map(performer => ({
      id: performer.user?._id || '',
      name: performer.user ? `${performer.user.firstName} ${performer.user.lastName}` : '',
      srcode: performer.srCode || '',
      cgroup: performer.culturalGroup?.label || '',
      campus: performer.campus?.label || '',
      department: performer.department?.label || '',
      program: performer.program?.label || '',
    }));
    res.status(200).json(performersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);
    await PerformerDetails.findOneAndDelete({ user: userId });
    await PerformerAchievement.deleteMany({ user: userId });

    res.status(200).json({
      message: 'Performer deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get awards data
router.get('/dashboard/awards-data', async (req, res) => {
  try {
    const awards = await PerformerAchievement.aggregate([
      {
        $lookup: {
          from: 'performerdetails',
          localField: 'user',
          foreignField: 'user',
          as: 'performerDetails'
        }
      },
      { $unwind: '$performerDetails' },
      {
        $lookup: {
          from: 'culturalgroups',
          localField: 'performerDetails.culturalGroup',
          foreignField: '_id',
          as: 'culturalGroup'
        }
      },
      { $unwind: '$culturalGroup' },
      {
        $group: {
          _id: '$culturalGroup.label',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const awardsData = {
      series: [
        {
          type: 'bar',
          data: awards.map(award => award.count),
        },
      ],
      xAxis: [
        {
          data: awards.map(award => award._id),
          scaleType: 'band',
          id: 'x-axis-id',
        },
      ],
    };

    res.status(200).json(awardsData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to get student performers data
router.get('/dashboard/student-performers-data', async (req, res) => {
  try {
    const performers = await PerformerDetails.aggregate([
      { $group: { _id: '$campus', count: { $sum: 1 } } },
      { $lookup: { from: 'campus', localField: '_id', foreignField: '_id', as: 'campus' } },
      { $unwind: '$campus' },
      { $sort: { count: -1 } }
    ]);

    const studentPerformersData = {
      series: [
        {
          type: 'bar',
          data: performers.map(performer => performer.count),
        },
      ],
      xAxis: [
        {
          data: performers.map(performer => performer.campus.label),
          scaleType: 'band',
          id: 'x-axis-id',
        },
      ],
    };

    res.status(200).json(studentPerformersData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;