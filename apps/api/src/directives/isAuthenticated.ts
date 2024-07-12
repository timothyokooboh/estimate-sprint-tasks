import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLError, defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";

/**
 *
 * @param schema
 * @param directiveName
 * @returns an error if authorization token is not passed or it is invalid
 */

export function isAuthenticated(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const token = context.req?.headers?.authorization?.replace(
            "Bearer ",
            "",
          );
          if (!token) {
            throw new GraphQLError("Not authenticated", {
              extensions: {
                code: "UNAUTHENTICATED",
              },
            });
          } else {
            try {
              await jwt.verify(token, process.env.SECRET_KEY);
              const result = await resolve(source, args, context, info);
              return result;
            } catch (err) {
              throw new GraphQLError(
                "Your are not authenticated. Please login.",
                {
                  extensions: {
                    code: "UNAUTHENTICATED",
                  },
                },
              );
            }
          }
        };
        return fieldConfig;
      }
    },
  });
}
