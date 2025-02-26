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

  const contactUs = await repository.getMany(validData);

  if (contactUs.length === 0) {
    throw new responseError(404, "contact us not found");
  }

  const totalItems = await repository.totalItems();
  const currentPage = validData.page;
  const perPage = validData.size;
  const totalPage = Math.ceil(totalItems / validData.size);

  return {
    contactUs,
    currentPage,
    perPage,
    totalItems,
    totalPage,
  };
};

// get by id
const getById = async (request) => {
  const validData = validation(request, schema.getById);

  const result = await repository.getById(validData.id);
  if (!result) {
    throw new responseError(404, "contact us not found");
  }

  return result;
};

// update
const update = async (request) => {
  const validData = validation(request, schema.update);

  const contactUsExist = await repository.getById(validData.id);
  if (!contactUsExist) {
    throw new responseError(404, "contact us not found");
  }

  const result = await repository.update(validData.id, validData);
  return result;
};

// remove
const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const contactUsExist = await repository.getById(validData.id);
  if (!contactUsExist) {
    throw new responseError(404, "contact us not found");
  }

  const result = await repository.remove(validData.id);
  return result;
};

const getAll = async () => {
  const contactUs = await repository.getAll();
  if (contactUs.length === 0) {
    throw new responseError(404, "contact us not found");
  }

  return contactUs;
};

module.exports = {
  create,
  getMany,
  getById,
  update,
  remove,
  getAll,
};
