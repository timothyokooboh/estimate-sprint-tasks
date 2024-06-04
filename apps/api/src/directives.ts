import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLError, defaultFieldResolver } from "graphql";

/**
 *
 * @param schema
 * @param directiveName
 * @returns an error if the session is not active on a field that is annotated with       @sessionActive but if the session is active the field will be resolved
 */

export function sessionActiveDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const sessionId = context.req?.body?.variables?.input?.session;

          const result = await resolve(source, args, context, info);
          const session = await context.prisma.session.findUnique({
            where: {
              id: sessionId,
            },
          });

          if (session.status !== "ACTIVE") {
            throw new GraphQLError("Session is not active", {
              extensions: {
                code: "FORBIDDEN",
              },
            });
          }

          return result;
        };
        return fieldConfig;
      }
    },
  });
}
