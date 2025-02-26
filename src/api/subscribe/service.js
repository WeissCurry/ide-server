const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);
  const result = await repository.create(validData);
  return result;
};

// get all
const getMany = async (request) => {
  const validData = validation(request, schema.getAll);

  const subscribe = await repository.getMany(validData);
  if (subscribe.length === 0) {
    throw new responseError(404, "subscribe not found");
  }

  const totalItems = await repository.totalItems();
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalPage = Math.ceil(totalItems / validData.size);

  return { subscribe, currentPage, perPage, totalItems, totalPage };
};

// get by id
const getById = async (request) => {
  const validData = validation(request, schema.getById);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "subscribe not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const subscribeExist = await repository.getById(validData.id);
  if (!subscribeExist) {
    throw new responseError(404, "subscribe not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const subscribeExist = await repository.getById(validData.id);
  if (!subscribeExist) {
    throw new responseError(404, "subscribe not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

const getAll = async () => {
  const subscribe = await repository.getAll();
  if (subscribe.length === 0) {
    throw new responseError(404, "subscribe not found");
  }

  return subscribe;
};

module.exports = { create, getMany, getById, update, remove, getAll };
