let express = require('express');
let router = express.Router();

let сUser = require('./controllers/userController')
router.get ('/api/users',сUser.get);
router.post('/api/users',сUser.post);
router.put('/api/users',сUser.put);
router.delete('/api/users',сUser.delete);

// router.get ('/api/user/byid/:{user_id}',сUser.getOne);
router.get ('/api/user/testbyemail/:email',сUser.testByEmail);
router.get ('/api/user/findbyemailpswd/:email/:password',сUser.findByEmailPswd);
router.get ('/api/user/trylogin/:email/:password',сUser.tryLogin);
router.delete('/api/user/sessionDelete',сUser.deleteSession);
router.put('/api/user/sessionUpdate',сUser.updateSessionTime);


let cFiles = require('./controllers/fileController');
router.post('/api/files', cFiles.createFile);

module.exports = router;