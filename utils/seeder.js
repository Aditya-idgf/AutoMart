const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

const seedVehicles = async () => {
    try {
        // Check if the vehicles collection is entirely empty
        const count = await Vehicle.countDocuments();
        
        if (count === 0) {
            console.log('Vehicles collection is empty. Seeding data...');
            
            // First, ensure we have a demo user to act as the seller
            let demoUser = await User.findOne({ email: 'demo@dealer.com' });
            
            if (!demoUser) {
                demoUser = await User.create({
                    name: 'Demo Dealer',
                    email: 'demo@dealer.com',
                    contactNumber: '123-456-7890'
                });
            }

            // High-quality placeholder data for cars and bikes
            const mockVehicles = [
                {
                    title: '2021 Toyota Camry SE',
                    description: 'Reliable sedan with great fuel economy and advanced safety features. Well-maintained and clean inside out. Perfect daily commuter.',
                    category: 'car',
                    price: 24500,
                    make: 'Toyota',
                    model: 'Camry',
                    year: 2021,
                    images: ['https://static.cargurus.com/images/site/2021/01/18/11/09/2021_toyota_camry-pic-11682479993215762494-1600x1200.jpeg'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2019 Honda Civic Sport',
                    description: 'Sporty compact car with aggressive styling and a comfortable interior. Perfect for city driving with excellent handling.',
                    category: 'car',
                    price: 21000,
                    make: 'Honda',
                    model: 'Civic',
                    year: 2019,
                    images: ['https://images.hgmsites.net/hug/2019-honda-civic-sdn_100677004_h.jpg'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2022 Ford Mustang GT',
                    description: 'Powerful V8 engine, iconic design, and a thrilling driving experience. Low mileage, garage kept, never tracked.',
                    category: 'car',
                    price: 45000,
                    make: 'Ford',
                    model: 'Mustang',
                    year: 2022,
                    images: ['https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2020 BMW 3 Series 330i',
                    description: 'Luxury sport sedan with cutting-edge technology, premium sound system, and soft leather seating. Driven mostly highway miles.',
                    category: 'car',
                    price: 36000,
                    make: 'BMW',
                    model: '3 Series',
                    year: 2020,
                    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2021 Kawasaki Ninja 400',
                    description: 'Excellent beginner-friendly sportbike. Lightweight, responsive, and incredibly fun to ride. Recently serviced.',
                    category: 'bike',
                    price: 5200,
                    make: 'Kawasaki',
                    model: 'Ninja 400',
                    year: 2021,
                    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2023 Yamaha YZF-R7',
                    description: 'Middleweight supersport bike with aggressive modern styling. Brand new condition, barely broken in. Includes quickshifter.',
                    category: 'bike',
                    price: 9000,
                    make: 'Yamaha',
                    model: 'YZF-R7',
                    year: 2023,
                    images: ['https://bike.net/res/media/img/hy800/ref/1be/109204.jpg'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2018 Harley-Davidson Iron 883',
                    description: 'Classic cruiser with raw, blacked-out stripped-down custom style. Runs completely perfectly with custom exhaust installed.',
                    category: 'bike',
                    price: 8500,
                    make: 'Harley-Davidson',
                    model: 'Iron 883',
                    year: 2018,
                    images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'],
                    sellerId: demoUser._id,
                    status: 'available'
                },
                {
                    title: '2021 Tesla Model Y Long Range',
                    description: 'All-electric SUV with autopilot, premium white interior, and extended range battery. Dual motor all-wheel drive.',
                    category: 'car',
                    price: 49000,
                    make: 'Tesla',
                    model: 'Model Y',
                    year: 2021,
                    images: ['https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=800&q=80'],
                    sellerId: demoUser._id,
                    status: 'available'
                }
            ];

            await Vehicle.insertMany(mockVehicles);
            console.log('✅ 8 Demo vehicles successfully seeded into the database.');
        } else {
            console.log('⚡ Vehicles collection already has data. Skipping automatic seed.');
        }
    } catch (error) {
        console.error('❌ Error seeding vehicles:', error.message);
    }
};

module.exports = seedVehicles;
