const Count = require('../models/count');
const User = require('../models/userLogin');

exports.getCounts = async (req, res) => {
    try {
        let countData = await Count.findOne();
        
        if (!countData) {
            countData = new Count();
            await countData.save();
        }

        // Count total users dynamically
        const totalUsers = await User.countDocuments();
        countData.users = totalUsers;

        res.status(200).json(countData);
    } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

/**
 * Update count when a download occurs
 */
exports.incrementCount = async (req, res) => {
    try {
        const { type } = req.body; // e.g., 'totalQR', 'dailyQR'

        if (!type) {
            return res.status(400).json({ message: 'Type is required' });
        }

        let countData = await Count.findOne();
        if (!countData) {
            countData = new Count();
        }

        if (countData[type] !== undefined) {
            countData[type] += 1;
        } else {
            return res.status(400).json({ message: 'Invalid type' });
        }

        await countData.save();
        res.status(200).json({ message: 'Count updated successfully', countData });
    } catch (error) {
        console.error('Error updating count:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
