import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitObject(type) {
    console.log('visitObject');
    this.ensureFieldsWrapped(type);
    type._requiredAuthRole = this.args.roles;
  }

  visitFieldDefinition(field, details) {
    this.ensureFieldsWrapped(details.objectType);

    field._requiredAuthRole = this.args.roles;
  }

  ensureFieldsWrapped(objectType) {
    // Mark the GraphQLObjectType object to avoid re-wrapping:
    if (objectType._authFieldsWrapped) return;
    objectType._authFieldsWrapped = true;
    const fields = objectType.getFields();

    Object.keys(fields).forEach(fieldName => {
      const field = fields[fieldName];
      const { resolve = defaultFieldResolver } = field;

      field.resolve = async function(...args) {
        // Get the required Role from the field first, falling back
        // to the objectType if no Role is required by the field:

        const requiredRole =
          field._requiredAuthRole || objectType._requiredAuthRole;

        if (!requiredRole) {
          return resolve.apply(this, args);
        }

        const context = args[2];
        const user = context.req.user;

        if (!user.role || !requiredRole.includes(user.role)) {
          throw new Error('not authorized');
        }

        return resolve.apply(this, args);
      };
    });
  }
}
