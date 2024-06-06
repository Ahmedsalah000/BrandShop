const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const { v2: cloudinary } = require('cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/imageUpload');
const Brand = require('../models/brandModel');
const parser = new DatauriParser();

exports.uploadBrandImage = uploadSingleImage('image');
exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (!req.file) return next();

  // Process the image buffer with Sharp and resize it
  const processedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toBuffer();

  // Convert the processed image buffer to a DataURI
  const dataUri = parser.format(path.extname(req.file.originalname).toString(), processedImage);

  // Upload the DataURI to Cloudinary
  const result = await cloudinary.uploader.upload(dataUri.content, {
    folder: 'brands',
    public_id: `brand-${uuidv4()}-${Date.now()}`,
  });

  // Save the URL of the uploaded image to the request body
  req.body.image = result.secure_url;

  next();
});
// @desc      Get all brands
// @route     GET /api/v1/brands
// @access    Public
exports.getBrands = factory.getAll(Brand);

// @desc      Get specific brand by id
// @route     GET /api/v1/brands/:id
// @access    Public
exports.getBrand = factory.getOne(Brand);
// @desc      Create brand
// @route     POST /api/v1/brands
// @access    Private
exports.createBrand = factory.createOne(Brand);

// @desc      Update brand
// @route     PATCH /api/v1/brands/:id
// @access    Private
exports.updateBrand = factory.updateOne(Brand);

// @desc     Delete brand
// @route    DELETE /api/v1/brands/:id
// @access   Private
exports.deleteBrand = factory.deleteOne(Brand);

exports.deleteAll = factory.deleteAll(Brand);
