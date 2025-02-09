const Referal = require('../models/referal');


const createReferal = async (req, res) => {
  try {
    const { user, referal, type } = req.body;

    if (!user || !referal || !type) {
      return res.status(400).json({ message: 'User, referal, and type fields are required.' });
    }

    const newReferal = new Referal({ user, referal, type });
    await newReferal.save();

    return res.status(200).json({
      message: 'Referral created successfully',
      data: newReferal,
    });
  } catch (error) {
    console.error('Error creating referral:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getReferals = async (req, res) => {
  try {
    const referals = await Referal.find();
    return res.status(200).json(referals);
  } catch (error) {
    console.error('Error retrieving referrals:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createReferal,
  getReferals
};
