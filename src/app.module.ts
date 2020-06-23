import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthDirective } from './shared/auth.directive';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      schemaDirectives: {
        auth: AuthDirective,
      },
      tracing: true,
    }),
    MongooseModule.forRoot('mongodb://localhost/nestgraphql'),
    ItemsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
