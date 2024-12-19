import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { NotFoundException, BadRequestException } from '@nestjs/common';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('StudentService', () => {
  let service: StudentService;
  let repository: jest.Mocked<Repository<Student>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student)) as jest.Mocked<Repository<Student>>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a student successfully', async () => {
      const createStudentDto = {
        id: 1,
        code: '123',
        firstname: 'John',
        lastname: 'Doe',
      };

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(createStudentDto);
      repository.save.mockResolvedValue(createStudentDto);

      const result = await service.create(createStudentDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { code: '123' } });
      expect(repository.create).toHaveBeenCalledWith(createStudentDto);
      expect(repository.save).toHaveBeenCalledWith(createStudentDto);
      expect(result).toEqual(createStudentDto);
    });

    it('should throw an error if the student already exists', async () => {
      const createStudentDto = {
        code: '123',
        firstname: 'John',
        lastname: 'Doe',
      };

      repository.findOne.mockResolvedValue({ ...createStudentDto, id: 1 });

      await expect(service.create(createStudentDto)).rejects.toThrow(
        new BadRequestException('Student with code 123 already exists'),
      );
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const students = [
        { id: 1, code: '123', firstname: 'John', lastname: 'Doe' },
      ];

      repository.find.mockResolvedValue(students);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(students);
    });
  });

  describe('findOne', () => {
    it('should return a student by ID', async () => {
      const student = { id: 1, code: '123', firstname: 'John', lastname: 'Doe' };

      repository.findOne.mockResolvedValue(student);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(student);
    });

    it('should throw an error if student not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(
        new NotFoundException('Student with ID #1 not found'),
      );
    });
  });

  describe('update', () => {
    it('should update a student successfully', async () => {
      const updateStudentDto = { firstname: 'Jane' };
      const existingStudent = { id: 1, code: '123', firstname: 'John', lastname: 'Doe' };
      const updatedStudent = { ...existingStudent, ...updateStudentDto };

      repository.findOne.mockResolvedValue(existingStudent);
      repository.save.mockResolvedValue(updatedStudent);

      const result = await service.update(1, updateStudentDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith(updatedStudent);
      expect(result).toEqual(updatedStudent);
    });

    it('should throw an error if student not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(1, { firstname: 'Jane' })).rejects.toThrow(
        new NotFoundException('Student with ID #1 not found'),
      );
    });

    it('should throw an error if the code already exists for another student', async () => {
      const updateStudentDto = { code: '456' };
      const existingStudent = { id: 1, code: '123', firstname: 'John', lastname: 'Doe' };
      const otherStudent = { id: 2, code: '456', firstname: 'Jane', lastname: 'Doe' };

      repository.findOne
        .mockResolvedValueOnce(existingStudent)
        .mockResolvedValueOnce(otherStudent);

      await expect(service.update(1, updateStudentDto)).rejects.toThrow(
        new BadRequestException('Student with code 456 already exists'),
      );
    });
  });
});
