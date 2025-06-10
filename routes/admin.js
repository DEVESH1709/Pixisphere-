const express = require('express');
const router = express.Router();
const { verifyToken, isAdmin } = require('../middlewares/authJwt');
const adminCtrl = require('../controllers/adminController');

router.get('/partners', verifyToken, isAdmin, adminCtrl.getPendingPartners);
router.put('/partners/:id/approve', verifyToken, isAdmin, adminCtrl.approvePartner);
router.put('/partners/:id/reject', verifyToken, isAdmin, adminCtrl.rejectPartner);
router.put('/partners/:id/feature', verifyToken, isAdmin, adminCtrl.featurePartner);


router.get('/kpis', verifyToken, isAdmin, adminCtrl.getKPIs);


router.get('/reviews', verifyToken, isAdmin, adminCtrl.getReviews);
router.delete('/reviews/:id', verifyToken, isAdmin, adminCtrl.deleteReview);


router.get('/categories', verifyToken, isAdmin, adminCtrl.getCategories);
router.post('/categories', verifyToken, isAdmin, adminCtrl.createCategory);
router.put('/categories/:id', verifyToken, isAdmin, adminCtrl.updateCategory);
router.delete('/categories/:id', verifyToken, isAdmin, adminCtrl.deleteCategory);

router.get('/locations', verifyToken, isAdmin, adminCtrl.getLocations);
router.post('/locations', verifyToken, isAdmin, adminCtrl.createLocation);
router.put('/locations/:id', verifyToken, isAdmin, adminCtrl.updateLocation);
router.delete('/locations/:id', verifyToken, isAdmin, adminCtrl.deleteLocation);

module.exports = router;
