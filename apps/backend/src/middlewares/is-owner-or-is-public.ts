/**
 * `is-owner-or-is-public` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.documentId;

    if (!userId && !ctx.state.isAuthenticated) {
      return ctx.unauthorized(`You can't access this entry.`);
    }

    const apiName = ctx.state.route.info.apiName;
    const appUid = `api::${apiName}.${apiName}`;

    if (entryId) {
      const entry = await strapi.documents(appUid as any).findOne({
        documentId: entryId,
        populate: "*",
      });

      if (entry && (entry.ownerId !== userId && !entry.public)) {
        return ctx.unauthorized(`You can't access this entry.`);
      }
    }

    // If the entryId is not provided, we are dealing with a find request and we need to filter the results to only show the entries owned by the user or the public ones if the user is not the owner of the entry.
    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          $or: [{ ownerId: userId }, { public: true }],
        },
      };
    }

    await next();
  };
};