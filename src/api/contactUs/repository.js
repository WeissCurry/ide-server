const prisma = require("../../utilities/database");

// create
const create = async (data) => {
  return await prisma.contactUs.create({ data });
};

// get all
const getAll = async (data) => {
  return await prisma.contactUs.findMany({
    skip: (data.page - 1) * data.size || 0,
    take: data.size || 10,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const totalItems = async () => {
  const result = await prisma.contactUs.count();

  return result;
};

// get by id
const getById = async (id) => {
  return await prisma.contactUs.findUnique({ where: { id } });
};

// update
const update = async (id, data) => {
  return await prisma.contactUs.update({ where: { id }, data });
};

// remove
const remove = async (id) => {
  return await prisma.contactUs.delete({ where: { id } });
};

module.exports = { create, getAll, getById, update, remove, totalItems };
