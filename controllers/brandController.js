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
  console.log('Processing brand image upload request:', { body: req.body, file: req.file });

  if (!req.file) {
    console.log('No image file detected in request');
    return next();
  }

  try {
    // Process the image buffer with Sharp and resize it
    console.log('Resizing image with Sharp...');
    const processedImage = await sharp(req.file.buffer)
      .resize(500, 500)
      .toBuffer();

    // Convert the processed image buffer to a DataURI
    console.log('Converting image to DataURI...');
    const dataUri = parser.format(path.extname(req.file.originalname).toString(), processedImage);

    // Upload the DataURI to Cloudinary
    console.log('Uploading to Cloudinary...');
    const result = await cloudinary.uploader.upload(dataUri.content, {
      folder: 'brands',
      public_id: `brand-${uuidv4()}-${Date.now()}`,
    });

    console.log('Cloudinary upload successful:', result.secure_url);
    // Save the URL of the uploaded image to the request body
    req.body.image = result.secure_url;

    next();
  } catch (error) {
    console.error('Error in image processing:', error);
    next(error);
  }
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
exports.createBrand = asyncHandler(async (req, res, next) => {
  console.log('Creating new brand - Request details:', {
    body: req.body,
    files: req.files,
    file: req.file,
    headers: req.headers
  });

  if (!req.body.name) {
    console.error('Brand name is missing in the request');
    return next(new Error('Brand name is required'));
  }

  if (!req.body.image) {
    console.error('Brand image URL is missing in the request');
    return next(new Error('Brand image is required'));
  }

  try {
    const brand = await Brand.create(req.body);
    console.log('Brand created successfully:', brand);
    res.status(201).json({ data: brand });
  } catch (error) {
    console.error('Error creating brand:', {
      error: error.message,
      stack: error.stack
    });
    next(error);
  }
});

// @desc      Update brand
// @route     PATCH /api/v1/brands/:id
// @access    Private
exports.updateBrand = factory.updateOne(Brand);

// @desc     Delete brand
// @route    DELETE /api/v1/brands/:id
// @access   Private
exports.deleteBrand = factory.deleteOne(Brand);

exports.deleteAll = factory.deleteAll(Brand);

