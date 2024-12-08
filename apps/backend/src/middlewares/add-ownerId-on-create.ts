/**
 * `add-ownerId-on-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx, next) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You are not authenticated");
    }

    // Add the ownerId to the body
    ctx.request.body = {
      ...ctx.request.body,
      data: {
        ...ctx.request.body.data,
        ownerId: ctx.state.user.documentId,
      },
    };

    await next();
  };
};