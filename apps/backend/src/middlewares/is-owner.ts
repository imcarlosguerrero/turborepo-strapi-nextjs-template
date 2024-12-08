/**
 * `is-owner` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    const entryId = ctx.params.id;
    const user = ctx.state.user;
    const userId = user?.documentId;

    if (!userId) {
      return ctx.unauthorized(`You can't access this entry.`);
    }

    const apiName = ctx.state.route.info.apiName;
    const appUid = `api::${apiName}.${apiName}`;

    if (entryId) {
      const entry = await strapi.documents(appUid as any).findOne({
        documentId: entryId,
        populate: "*",
      });

      if (entry && entry.ownerId !== userId) {
        return ctx.unauthorized(`You can't access this entry.`);
      }
    }

    // If the entryId is not provided, we are dealing with a find request and we need to filter the results to only show the entries owned by the user.
    if (!entryId) {
      ctx.query = {
        ...ctx.query,
        filters: { ...ctx.query.filters, ownerId: userId },
      };
    }

    await next();
  };
};