import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { RoleModule } from './role/role.module';
// import { PermissionModule } from './permission/permission.module';
// import { AuthModule } from './auth/auth.module';
// import { StoreModule } from './store/store.module';
// import { BranchModule } from './branch/branch.module';
// import { CategoryModule } from './category/category.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { PaymentMethodModule } from './payment-method/payment-method.module';
// import { UploadModule } from './upload/upload.module';
import typeorm from './config/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
// import { ShiftModule } from './shift/shift.module';
// import { UnitModule } from './unit/unit.module';
// import { PaysolutionModule } from './paysolution/paysolution.module';
// import { PaymentModule } from './payment/payment.module';
// import { PromotionModule } from './promotion/promotion.module';
// import { ReportModule } from './report/report.module';
// import { PanelModule } from './panel/panel.module';
// import { BannerModule } from './banner/banner.module';
// import { MemberModule } from './member/member.module';
// import { CardModule } from './card/card.module';
// import { TapLogModule } from './tap-log/tap-log.module';
// import { TransactionModule } from './transaction/transaction.module';
// import { OtaModule } from './ota/ota.module';
// import { ShiftsModule } from './shifts/shifts.module';
import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';
// import { DeviceModule } from './device/device.module';
// import { DashboardModule } from './dashboard/dashboard.module';
// import { BoardModule } from './board/board.module';
// import { TaskGateway } from './board/task.gateway';
import { Test2Module } from './test2/test2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
