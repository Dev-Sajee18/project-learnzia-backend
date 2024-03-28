import express from 'express';
import { registerCandidate, getCandidates, deleteCandidate } from '../Controllers/candidateController.js';

const router = express.Router();

router.post('/signup', registerCandidate);
router.get('/getallcandidates', getCandidates);
router.delete('/:email', deleteCandidate);

export default router;

