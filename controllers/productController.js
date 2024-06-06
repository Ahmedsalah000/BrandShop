const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const { v2: cloudinary } = require('cloudinary');
const DatauriParser = require('datauri/parser');
const path = require('path');
const multer = require('multer');

const ApiError = require('../utils/apiError');
const Product = require('../models/productModel');
const factory = require('./handlersFactory');
const parser = new DatauriParser();

// Storage
const multerStorage = multer.memoryStorage();

// Accept only images
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new ApiError('only images allowed', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });


exports.uploadProductImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 5 },

]);


exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  if (!req.files) return next();

  // 1) Image Process for imageCover
  if (req.files.imageCover) {
    const ext = req.files.imageCover[0].mimetype.split('/')[1];
    const processedImage = await sharp(req.files.imageCover[0].buffer).toBuffer();
    
    // Convert the processed image buffer to a DataURI
    const dataUri = parser.format(path.extname(req.files.imageCover[0].originalname).toString(), processedImage);
    
    // Upload the DataURI to Cloudinary
    const result = await cloudinary.uploader.upload(dataUri.content, {
      folder: 'products',
      public_id: `product-${uuidv4()}-${Date.now()}-cover`,
    });

    // Save the URL of the uploaded image to the request body
    req.body.imageCover = result.secure_url;  // Directly using Cloudinary URL
  }

  req.body.images = [];
  
  // 2) Image processing for images
  if (req.files.images) {
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const ext = img.mimetype.split('/')[1];
        const processedImage = await sharp(img.buffer).toBuffer();
        
        // Convert the processed image buffer to a DataURI
        const dataUri = parser.format(path.extname(img.originalname).toString(), processedImage);

        // Upload the DataURI to Cloudinary
        const result = await cloudinary.uploader.upload(dataUri.content, {
          folder: 'products',
          public_id: `product-${uuidv4()}-${Date.now()}-${index + 1}`,
        });

        // Save the URL of the uploaded image to the request body
        req.body.images.push(result.secure_url);  // Directly using Cloudinary URL
      })
    );
  }

  next();
});
// @desc      Get all products
// @route     GET /api/v1/products
// @access    Public
exports.getProducts = factory.getAll(Product, 'Products');

// @desc      Get specific product by id
// @route     GET /api/v1/products/:id
// @access    Public
exports.getProduct = factory.getOne(Product, 'reviews');

// @desc      Create product
// @route     POST /api/v1/products
// @access    Private
exports.createProduct = factory.createOne(Product);
// @desc      Update product
// @route     PATCH /api/v1/products/:id
// @access    Private
exports.updateProduct = factory.updateOne(Product);

// @desc     Delete product
// @route    DELETE /api/v1/products/:id
// @access   Private
exports.deleteProduct = factory.deleteOne(Product);
