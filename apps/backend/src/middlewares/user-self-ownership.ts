/**
 * `user-self-ownership` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    const currentUserId = ctx.state?.user?.documentId;

    if (!currentUserId) {
      return ctx.badRequest("You are not authenticated.");
    }

    if (ctx.method === "GET") {
      // Handle find requests
      ctx.query = {
        ...ctx.query,
        filters: {
          ...ctx.query.filters,
          documentId: currentUserId,
        },
      };
    } else if (["PUT", "DELETE"].includes(ctx.method)) {
      // Handle update and delete requests
      const params = ctx.params;
      const requestedUserId = params?.documentId;

      if (!requestedUserId) {
        return ctx.badRequest("Missing or invalid user ID.");
      }

      if (currentUserId !== requestedUserId) {
        return ctx.unauthorized("You are not authorized to perform this action.");
      }
    }

    await next();
  };
};