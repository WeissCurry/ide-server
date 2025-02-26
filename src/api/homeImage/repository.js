const prisma = require("../../utilities/database");

// create
const create = async (data) => await prisma.homeImage.create({ data });

// get all
const get = async () => await prisma.homeImage.findMany();

// get by id
const getById = async (id) =>
  await prisma.homeImage.findFirst({ where: { id } });

// update
const updateById = async (id, data) =>
  await prisma.homeImage.update({
    where: { id },
    data,
  });

// remove
const remove = async (id) => {
  const result = await prisma.homeImage.delete({
    where: { id },
  });

  return result;
};

module.exports = { create, get, getById, updateById, remove };
