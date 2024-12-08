/**
 * `add-public-on-create` middleware
 */

import type { Core } from "@strapi/strapi";

export default (config: any, { strapi }: { strapi: Core.Strapi }) => {
  return async (ctx: any, next: any) => {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized("You are not authenticated");
    }

    // Add the public attribute to the body
    ctx.request.body = {
      ...ctx.request.body,
      data: {
        ...ctx.request.body.data,
        public: true,
      },
    };

    await next();
  };
};