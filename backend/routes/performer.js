const express = require('express');
const router = express.Router();
const User = require('../models/User');
const PerformerAchievement = require('../models/Performer/Achievement');
const { Campus, CulturalGroup, Department, Program, PerformerDetails } = require('../models/Performer/Details');

// Add performer's details
router.post('/details', async (req, res) => {
	const { userId, campus, culturalGroup, department, program, srCode } = req.body;

	try {
		const performerDetails = new PerformerDetails({ user: userId, campus, culturalGroup, department, program, srCode });
		await performerDetails.save();

		res.status(201).json({ message: 'Performer details added successfully', performerDetails });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Edit performer's details
router.put('/details/:id', async (req, res) => {
	const { id } = req.params;
	const { campus, culturalGroup, department, program, srCode } = req.body;

	try {
		const performerDetails = await PerformerDetails.findByIdAndUpdate(id, { campus, culturalGroup, department, program, srCode }, { new: true });

		if (!performerDetails) {
			return res.status(404).json({ message: 'Performer details not found' });
		}

		res.status(200).json({ message: 'Performer details updated successfully', performerDetails });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Delete performer's details
router.delete('/details/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const performerDetails = await PerformerDetails.findByIdAndDelete(id);

		if (!performerDetails) {
			return res.status(404).json({ message: 'Performer details not found' });
		}

		res.status(200).json({ message: 'Performer details deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get performer's details
router.get('/details/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		const performerDetails = await PerformerDetails.findOne({ user: userId }).populate('campus culturalGroup department program');

		if (!performerDetails) {
			return res.status(404).json({ message: 'Performer details not found' });
		}

		res.status(200).json({ performerDetails });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Add performer's achievement
router.post('/achievement', async (req, res) => {
	const { userId, title, description } = req.body;

	try {
		const performerAchievement = new PerformerAchievement({ user: userId, title, description });
		await performerAchievement.save();

		res.status(201).json({ message: 'Performer achievement added successfully', performerAchievement });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Edit performer's achievement
router.put('/achievement/:id', async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	try {
		const performerAchievement = await PerformerAchievement.findByIdAndUpdate(id, { title, description }, { new: true });

		if (!performerAchievement) {
			return res.status(404).json({ message: 'Performer achievement not found' });
		}

		res.status(200).json({ message: 'Performer achievement updated successfully', performerAchievement });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Delete performer's achievement
router.delete('/achievement/:id', async (req, res) => {
	const { id } = req.params;

	try {
		const performerAchievement = await PerformerAchievement.findByIdAndDelete(id);

		if (!performerAchievement) {
			return res.status(404).json({ message: 'Performer achievement not found' });
		}

		res.status(200).json({ message: 'Performer achievement deleted successfully' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get performer's achievements
router.get('/achievements/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		const performerAchievements = await PerformerAchievement.find({ user: userId });

		if (!performerAchievements) {
			return res.status(404).json({ message: 'Performer achievements not found' });
		}

		res.status(200).json({ performerAchievements });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get registration values -- GOOD
router.get('/registration-values', async (req, res) => {
	try {
		const campuses = await Campus.find({}, 'label');
		const culturalgroups = await CulturalGroup.find({}, 'label');
		const departments = await Department.find({}, 'label');
		const programs = await Program.find({}, 'label department').populate('department', 'label');
	
		const programsByDepartment = departments.reduce((acc, department) => {
			acc[department.label] = programs
			.filter(program => program.department.label === department.label)
			.map(program => ({ label: program.label, _id: program._id  }));
			return acc;
		}, {});
	
		res.status(200).json({
			campuses,
			culturalgroups,
			departments,
			programs: programsByDepartment,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Get performer's details and achievements
router.get('/:userId', async (req, res) => {
	const { userId } = req.params;

	try {
		// Fetch user
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		// Fetch performer's details
		const performerDetails = await PerformerDetails.find({ user: userId }).populate('campus culturalGroup department program');
		if (!performerDetails) {
			return res.status(404).json({ message: 'Performer details not found' });
		}

		// Fetch performer's achievements
		const performerAchievements = await PerformerAchievement.find({ user: userId });
		if (!performerAchievements) {
			return res.status(404).json({ message: 'Performer achievements not found' });
		}

		res.status(200).json({
			user,
			performerDetails,
			performerAchievements,
		});
		} catch (error) {
		res.status(500).json({ message: error.message });
			}
});

// Save performer's profile
router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { firstName, lastName, email, image, culturalGroup, campus, department, program, srCode, achievements } = req.body;

  try {
    // Update user details
    const user = await User.findByIdAndUpdate(userId, { firstName, lastName, email, image }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update performer details
    const performerDetails = await PerformerDetails.findOneAndUpdate(
      { user: userId },
      { culturalGroup, campus, department, program, srCode },
      { new: true, upsert: true } // Create if not exists
    );

    // Update achievements
    await PerformerAchievement.deleteMany({ user: userId });
    const newAchievements = await PerformerAchievement.insertMany(
      achievements.map(achievement => ({ ...achievement, user: userId }))
    );

    res.status(200).json({
      user,
      performerDetails,
      performerAchievements: newAchievements,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;