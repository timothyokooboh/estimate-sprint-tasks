import { mapSchema, MapperKind, getDirective } from "@graphql-tools/utils";
import { GraphQLError, defaultFieldResolver } from "graphql";

/**
 *
 * @param schema
 * @param directiveName
 * @returns an error if the session is not active on a field that is annotated with       @sessionActive but if the session is active the field will be resolved
 */

export function isSessionActive(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const directive = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (directive) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          const sessionId = context.req?.body?.variables?.input?.sessionId;

          const session = await context.prisma.session.findUnique({
            where: {
              id: sessionId,
            },
          });

          if (!session) {
            throw new GraphQLError("This session no longer exists", {
              extensions: {
                code: "FORBIDDEN",
              },
            });
          } else {
            const result = await resolve(source, args, context, info);
            return result;
          }
        };
        return fieldConfig;
      }
    },
  });
}
