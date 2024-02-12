// utils.js

function generateUserId() {
    // Generate a timestamp to ensure uniqueness
    const timestamp = new Date().getTime();

    // Generate a random number to add uniqueness
    const random = Math.floor(Math.random() * 1000);

    // Concatenate timestamp and random number to create the user ID
    const userId = `${timestamp}${random}`;

    return userId;
}

module.exports = { generateUserId };
