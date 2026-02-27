const { prisma } = require('../config/db');

const User = {
  findById: async (id, options = {}) => {
    const { select } = options;
    let selectObj = {};
    let useSelect = false;
    
    if (select) {
      selectObj = select.split(' ').reduce((acc, field) => {
        if (field !== '-password') {
          acc[field] = true;
        }
        return acc;
      }, {});
      useSelect = Object.keys(selectObj).length > 0;
    }
    
    const user = await prisma.user.findUnique({
      where: { id },
      ...(useSelect && { select: selectObj }),
    });
    return user;
  },
  findOne: async (where) => {
    return await prisma.user.findFirst({ where });
  },
  create: async (data) => {
    return await prisma.user.create({ data });
  },
  save: async (user) => {
    return await prisma.user.update({
      where: { id: user.id },
      data: user,
    });
  },
  update: async (where, data) => {
    return await prisma.user.update({ where, data });
  },
};

module.exports = User;

