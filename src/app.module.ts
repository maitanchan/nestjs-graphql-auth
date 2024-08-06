import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({

  imports: [

    ConfigModule.forRoot({

      envFilePath: ['.env.development'],

      isGlobal: true

    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({

      driver: ApolloDriver,

      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USER_NAME,
      password: process.env.DATABASE_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true
    }),

    UsersModule,

    AuthModule

  ],

})
export class AppModule { }
