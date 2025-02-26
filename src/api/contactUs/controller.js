const service = require("./service");

// create
const create = async (req, res, next) => {
  try {
    const request = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    };

    const response = await service.create(request);

    res.status(201).json({
      data: response,
      error: false,
      message: "success create contact us",
      status: "success",
      statusCode: 201,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// get all
const getMany = async (req, res, next) => {
  try {
    const request = {
      page: req.query.page,
      size: req.query.size,
    };

    const response = await service.getMany(request);

    res.status(200).json({
      data: response.contactUs,
      pagination: {
        currentPage: response.currentPage,
        perPage: response.perPage,
        totalItems: response.totalItems,
        totalPage: response.totalPage,
      },
      error: false,
      message: "success get all contact us",
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
      id: req.params.contactUsId,
    };

    const response = await service.getById(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success get contact us by id",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// update

const update = async (req, res, next) => {
  try {
    const request = {
      id: req.params.contactUsId,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      message: req.body.message,
    };

    const response = await service.update(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success update contact us",
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
      id: req.params.contactUsId,
    };

    const response = await service.remove(request);

    res.status(200).json({
      data: response,
      error: false,
      message: "success remove contact us",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();

    res.status(200).json({
      data: response,
      error: false,
      message: "success get all contact us",
      status: "success",
      statusCode: 200,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getMany, getById, update, remove, getAll };
