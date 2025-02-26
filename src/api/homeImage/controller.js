const service = require("./service");
// create

const create = async (req, res, next) => {
  try {
    const request = {
      image: req.body.image,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create home image",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get all
const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get all home image",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get by id
const getById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.homeImageId,
    };

    const response = await service.getById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get home image by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update
const updateById = async (req, res, next) => {
  try {
    const request = {
      id: req.params.homeImageId,
      image: req.body.image,
    };

    const response = await service.updateById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update home image by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// remove
const remove = async (req, res, next) => {
  try {
    const request = {
      id: req.params.homeImageId,
    };

    const response = await service.remove(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success delete home image by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, updateById, getAll, getById, remove };
