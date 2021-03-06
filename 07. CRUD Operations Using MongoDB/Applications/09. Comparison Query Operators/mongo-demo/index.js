const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {

    const nodeCourse = new Course({
        name: 'Node.js Course',
        author: 'Ankit',
        tags: ['node', 'backend'],
        isPublished: true
    });
    const nodeResult = await nodeCourse.save();
    console.log(nodeResult);

    const angularCourse = new Course({
        name: 'Angular Course',
        author: 'Ankit',
        tags: ['angular', 'frontend'],
        isPublished: true
    });
    const angularResult = await angularCourse.save();
    console.log(angularResult);
}

//createCourse();

async function getCourses() {
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // in
    // nin (not in)
    const courses = await Course
        // .find({ author: 'Ankit', isPublished: true}) // Filtering condition
        // .find({ price: { $gte: 10, $lte: 20 } })
        .find({ price: { $in: [10, 15, 20] } })
        .limit(10) // Limit to 10 items
        .sort({ name: 1 }) // Sorting ascending(1) or descending(-1)
        .select({ name: 1, tags: 1 }); // Return only the listed values
    console.log(courses);
}

getCourses();