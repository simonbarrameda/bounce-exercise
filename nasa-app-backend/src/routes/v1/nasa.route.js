import express from 'express';
import nasaController from '../../controllers/nasa.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.route('/apod').get(auth, nasaController.getApod);

export default router;
