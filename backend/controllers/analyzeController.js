import { analyzeProfile } from '../services/geminiService.js';

export async function analyzeController(req, res, next) {
  try {
    const profile = req.body?.profile;
    if (!profile || !profile.name || !profile.targetRole) {
      return res.status(400).json({ error: 'Invalid request. Profile with name and target role is required.' });
    }
    const report = await analyzeProfile(profile);
    res.json({ report });
  } catch (err) {
    next(err);
  }
}
