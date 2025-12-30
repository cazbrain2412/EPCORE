// scripts/createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Local Mongo or Atlas (if using Atlas paste URI in .env.local)
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/epicore_dev";

async function main() {
  // CONNECT TO MONGO (latest mongoose version – no extra options required)
  await mongoose.connect(uri);

  // Access "users" collection directly
  const usersColl = mongoose.connection.db.collection("users");

  const email = "admin@epicore.local";

  // Check if admin already exists
  const exists = await usersColl.findOne({ email });
  if (exists) {
    console.log("Admin already exists:", email);
    process.exit(0);
  }

  // Hash password
  const password = "Admin@123"; // change later for security
  const hash = await bcrypt.hash(password, 10);

  // Insert admin user
  const res = await usersColl.insertOne({
    name: "Admin",
    email,
    passwordHash: hash,
    role: "admin",
    createdAt: new Date(),
  });

  console.log("Admin created:", email, "id:", res.insertedId.toString());
  process.exit(0);
}

// Run script
main().catch((e) => {
  console.error("createAdmin error:", e);
  process.exit(1);
});

