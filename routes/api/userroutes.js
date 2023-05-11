const router = require('express').Router();
const {
  getUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend

} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createNewUser);

// /api/users/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
