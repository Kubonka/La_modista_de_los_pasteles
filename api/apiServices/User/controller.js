const { User } = require("../../services/db/db");
const bcryptjs = require("bcryptjs");

async function createUser(username, password) {
  try {
    const usernameFound = await User.findOne({ where: { username } });
    if (!usernameFound) return "FAIL";
    const saltRounds = 10;
    let user = null;
    bcryptjs.hash(password, saltRounds, async (err, hashedPassword) => {
      if (err) {
        throw new Error(err.message);
      } else {
        //todo almacenar password
        console.log(hashedPassword);
        user = await User.create({ username, password });
      }
    });
    return user ? "SUCCESS" : "FAIL";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserById(user_id) {
  try {
    const userFound = await User.findByPk(user_id);
    if (userFound) return userFound;
    else throw new Error("User Not Found");
  } catch (error) {
    throw new Error(error.message);
  }
}
async function getAllUsers() {
  try {
    const users = await User.findAll();
    if (users) return users;
    else throw new Error("USERS EMPTY OR NOT FOUND");
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUser(user_id) {
  try {
    const userDeleted = await User.destroy({ where: { user_id } });
    if (userDeleted) return "SUCCESS";
    else return "FAIL";
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
};

// const saltRounds = 10;
// const plainPassword = 'password';
// bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(hash);
//   }
// });

// const bcrypt = require("bcrypt");
// const plainPassword = "password";
// const hashFromDatabase =
//   "$2b$10$3euPcmQFCiblsZeEu5s7p.9OVHgeHWFDk9nhMqZ0m/3pd/lhwZgES";

// bcrypt.compare(plainPassword, hashFromDatabase, function (err, result) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(result); // true if password matches, false otherwise
//   }
// });
