/**
 * post router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::post.post', {
  config: {
    create: {
      middlewares: [
        "global::add-ownerId-on-create",
        "global::add-public-on-create"
      ],
    },
    find: {
      middlewares: ["global::is-owner-or-is-public"],
    },
    findOne: {
      middlewares: ["global::is-owner-or-is-public"],
    },
    update: {
      middlewares: ["global::is-owner"],
    },
    delete: {
      middlewares: ["global::is-owner"],
    },
  }
});
