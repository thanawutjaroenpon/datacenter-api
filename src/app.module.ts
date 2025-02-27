import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { Test2Module } from './test2/test2.module';
import { StudentModule } from './student/student.module';
import { AuthModule } from './auth/auth.module';
import { TeacherModule } from './teacher/teacher.module';
import { PersonModule } from './person/person.module';
import { UserInfoModule } from './user_info/user_info.module';
import { BeaconLogModule } from './beacon_log/beacon_log.module';
import { RoomStatusModule } from './room_status/room_status.module';
import { RoomLogModule } from './room_log/room_log.module';
import { NfcLogModule } from './nfc_log/nfc_log.module';
import { RoomEntryModule } from './room_entry/room_entry.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeorm]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      exclude: ['/api/(.*)'],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    ScheduleModule.forRoot(),
    Test2Module,
    StudentModule,
    AuthModule,
    TeacherModule,
    PersonModule,
    UserInfoModule,
    BeaconLogModule,
    RoomStatusModule,
    RoomLogModule,
    NfcLogModule,
    RoomEntryModule,


  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
