import { Test, TestingModule } from '@nestjs/testing';
import { RoomStatusController } from './room_status.controller';
import { RoomStatusService } from './room_status.service';
import { RoomStatus } from './entities/room_status.entity';

// describe('RoomStatusController', () => {
//   let controller: RoomStatusController;
//   let service: RoomStatusService;

//   const mockRoomStatusService = {
//     GetAllRoomsStatus: jest.fn(),
//     GetMemberInRoom: jest.fn(),
//   };

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [RoomStatusController],
//       providers: [
//         {
//           provide: RoomStatusService,
//           useValue: mockRoomStatusService,
//         },
//       ],
//     }).compile();

//     controller = module.get<RoomStatusController>(RoomStatusController);
//     service = module.get<RoomStatusService>(RoomStatusService);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });

//   describe('GetAllRoomsStatus', () => {
//     it('should return all room statuses', async () => {
//       const mockRooms: RoomStatus[] = [
//         { Room_Status_ID: 1, Room_ID: 'A101', room_status: true, item_status: false, beacon: [] },
//         { Room_Status_ID: 2, Room_ID: 'B312', room_status: false, item_status: true, beacon: [] },
//       ];

//       mockRoomStatusService.GetAllRoomsStatus.mockResolvedValue(mockRooms);

//       const result = await controller.GetAllRoomsStatus();
//       expect(service.GetAllRoomsStatus).toHaveBeenCalled();
//       expect(result).toEqual(mockRooms);
//     });
//   });

//   describe('GetMember', () => {
//     it('should return members in a room', async () => {
//       const mockMembers = [
//         { firstname: 'Kottaboung', lastname: 'Nanvong', code: '64200002' },
//         { firstname: 'main', lastname: 'main', code: '64200003' },
//       ];

//       mockRoomStatusService.GetMemberInRoom.mockResolvedValue(mockMembers);

//       const result = await controller.GetMember('A101');
//       expect(service.GetMemberInRoom).toHaveBeenCalledWith('A101');
//       expect(result).toEqual(mockMembers);
//     });

//     it('should return "Room not found" if room does not exist', async () => {
//       mockRoomStatusService.GetMemberInRoom.mockResolvedValue('Room A101 not found');

//       const result = await controller.GetMember('A101');
//       expect(service.GetMemberInRoom).toHaveBeenCalledWith('A101');
//       expect(result).toBe('Room A101 not found');
//     });
//   });
// });
