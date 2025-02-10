import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { NotFoundException } from '@nestjs/common';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;

  const mockStudentService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findBycode: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        {
          provide: StudentService,
          useValue: mockStudentService,
        },
      ],
    }).compile();

    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const createStudentDto: CreateStudentDto = {
        code: '123',
        firstname: 'John',
        lastname: 'Doe',
      };

      const createdStudent = {
        id: 1,
        ...createStudentDto,
      };

      mockStudentService.create.mockResolvedValue(createdStudent);

      const result = await controller.create(createStudentDto);
      expect(service.create).toHaveBeenCalledWith(createStudentDto);
      expect(result).toEqual(createdStudent);
    });
  });

  describe('findAll', () => {
    it('should call service.findAll and return all students', async () => {
      const students = [
        { id: 1, code: '123', firstname: 'John', lastname: 'Doe' },
      ];

      mockStudentService.findAll.mockResolvedValue(students);

      const result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(students);
    });
  });

  describe('findOne', () => {
    it('should return a student by ID', async () => {
      const student = { id: 1, code: '123', firstname: 'John', lastname: 'Doe' };

      mockStudentService.findOne.mockResolvedValue(student);

      const result = await controller.findOne('1');
      expect(service.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(student);
    });

    it('should throw a NotFoundException if student not found', async () => {
      mockStudentService.findOne.mockRejectedValue(new NotFoundException('Student not found'));

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findBycode', () => {
    it('should return a student by code', async () => {
      const student = { id: 1, code: '123', firstname: 'John', lastname: 'Doe' };

      mockStudentService.findBycode.mockResolvedValue(student);

      const result = await controller.findbycode('123');
      expect(service.findBycode).toHaveBeenCalledWith('123');
      expect(result).toEqual(student);
    });
  });

  describe('update', () => {
    it('should call service.update with correct parameters', async () => {
      const updateStudentDto: UpdateStudentDto = { firstname: 'Jane' };
      const updatedStudent = { id: 1, code: '123', firstname: 'Jane', lastname: 'Doe' };

      mockStudentService.update.mockResolvedValue(updatedStudent);

      const result = await controller.update('1', updateStudentDto);
      expect(service.update).toHaveBeenCalledWith(1, updateStudentDto);
      expect(result).toEqual(updatedStudent);
    });
  });

  describe('remove', () => {
    it('should call service.remove with correct ID', async () => {
      mockStudentService.remove.mockResolvedValue({ message: 'Student removed' });

      const result = await controller.remove('1');
      expect(service.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual({ message: 'Student removed' });
    });
  });
});
