const schema = require("./schema");
const repository = require("./repository");
const validation = require("../../utilities/joiValidation");
const responseError = require("../../error/responseError");

// create
const create = async (request) => {
  const validData = validation(request, schema.create);

  //   check if gallery is more than 5
  const galleries = await repository.get();

  if (galleries.length >= 5) {
    throw new responseError(400, "home image is more than 5");
  }

  const result = await repository.create(validData);

  return result;
};

// get all
const getAll = async () => {
  const result = await repository.get();

  if (result.length === 0) {
    throw new responseError(404, "home image not found");
  }

  return result;
};

// get by id
const getById = async (request) => {
  const result = await repository.getById(request.id);

  if (!result) {
    throw new responseError(404, "home image not found");
  }

  return result;
};

// update
const updateById = async (request) => {
  const validData = validation(request, schema.update);

  const galleryExist = await repository.getById(validData.id);
  if (!galleryExist) {
    throw new responseError(404, "home image not found");
  }

  const result = await repository.updateById(validData.id, {
    image: validData.image,
  });

  return result;
};

// remove

const remove = async (request) => {
  const validData = validation(request, schema.getById);

  const homeImage = await repository.get();

  if (homeImage.length <= 3) {
    throw new responseError(400, "home image is less than 3");
  }

  const homeImageExist = await repository.getById(validData.id);
  if (!homeImageExist) {
    throw new responseError(404, "home image not found");
  }

  const result = await repository.remove(validData.id);

  return result;
};

module.exports = { create, updateById, getAll, getById, remove };
