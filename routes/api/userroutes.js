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

router.route('/').get(getUsers).post(createNewUser);

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);


module.exports = router;
