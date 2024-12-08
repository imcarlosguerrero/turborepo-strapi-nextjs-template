import type { Core } from '@strapi/strapi';

// Helper function that will add the required keys and set them accordingly
function initializeRoute(routes: any[], index: number) {
  routes[index].config = routes[index].config || {};
  routes[index].config.middlewares = routes[index].config.middlewares || [];
}

// Helper function to find and initialize route
function findAndInitializeRoute(routes: any[], handler: string, method: string, middleware: string) {
  const index = routes.findIndex(
    (route) => route.handler === handler && route.method === method
  );

  if (index !== -1) {
    initializeRoute(routes, index);
    routes[index].config.middlewares.push(middleware);
  }
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    const userRoutes = strapi.plugins["users-permissions"].routes["content-api"].routes;
    const userSelfOwnership = "global::user-self-ownership";

    // Add the middleware to the required routes for the user content type (user) to ensure that users can only access their own data and not other users' data.

    findAndInitializeRoute(userRoutes, "user.find", "GET", userSelfOwnership);
    findAndInitializeRoute(userRoutes, "user.findOne", "GET", userSelfOwnership);
    findAndInitializeRoute(userRoutes, "user.update", "PUT", userSelfOwnership);
    findAndInitializeRoute(userRoutes, "user.destroy", "DELETE", userSelfOwnership);
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
