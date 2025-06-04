const mongoose = require('mongoose');
const cities = require('./cities3');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random528 = Math.floor(Math.random() * 528);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '683db8f322a7e7bdcf44ae80', // User ID
            location: `${cities[random528].city}, ${cities[random528].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum dolor corrupti iure numquam maxime placeat nam ad tenetur quae minus assumenda nihil suscipit fugiat perspiciatis adipisci officia, odio, ex error.Quas quam quod autem, modi consequuntur ut neque dolorum temporibus excepturi aut numquam quibusdam laudantium facilis saepe magnam tenetur, necessitatibus illo voluptates soluta distinctio corrupti similique. Minima temporibus enim quo?',
            price,
            geometry: {
                "type": "Point",
                "coordinates": [cities[random528].longitude,
                cities[random528].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzu4hk2sw/image/upload/v1749017948/YelpCamp/cuxw17860jj8qwbwib8h.jpg',
                    filename: 'YelpCamp/cuxw17860jj8qwbwib8h',
                },
                {
                    url: 'https://res.cloudinary.com/dzu4hk2sw/image/upload/v1749017947/YelpCamp/e0du5ck0rf5jmixmtsnq.jpg',
                    filename: 'YelpCamp/e0du5ck0rf5jmixmtsnq',
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});