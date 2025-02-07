const cron = require('node-cron');
const Count = require('./models/count');

const resetDailyCounts = async () => {
    try {
        console.log('🔄 Resetting daily counts at midnight...');
        let countData = await Count.findOne();
        
        if (!countData) {
            countData = new Count();
        }

        countData.dailyQR = 0;
        countData.dailyPersonal = 0;
        countData.dailyBusiness = 0;
        countData.dailyResume = 0;
        countData.dailyBio = 0;
        countData.dailyInvitation = 0;

        await countData.save();
        console.log('✅ Daily counts reset successfully!');
    } catch (error) {
        console.error('❌ Error resetting daily counts:', error);
    }
};

// Schedule job to run every day at midnight
cron.schedule('0 0 * * *', resetDailyCounts, {
    timezone: 'Asia/Kolkata',
});

module.exports = resetDailyCounts;
