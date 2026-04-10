require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const result = await User.findOneAndUpdate(
      { email: 'oluwawemimo.j@gmail.com' },
      { isAdmin: true },
      { new: true }
    );
    if (result) {
      console.log('SUCCESS: ' + result.email + ' isAdmin=' + result.isAdmin);
    } else {
      console.log('User not found. All users:');
      const all = await User.find({}, 'email isAdmin');
      all.forEach(u => console.log('  ' + u.email + ' | isAdmin=' + u.isAdmin));
    }
    process.exit(0);
  })
  .catch(e => { console.error('DB Error:', e.message); process.exit(1); });
