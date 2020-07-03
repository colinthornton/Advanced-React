const Mutations = {
  async createItem(parent, args, ctx, info) {
    // Check if logged in
    const item = await ctx.db.mutation.createItem({ data: { ...args } }, info);
    return item;
  },
  async updateItem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: { id: args.id },
      },
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find item
    const item = await ctx.db.query.item({ where }, "{ id, title }");
    // TODO: check if permission to delete
    return ctx.db.mutation.deleteItem({ where }, info);
  },
};

module.exports = Mutations;
