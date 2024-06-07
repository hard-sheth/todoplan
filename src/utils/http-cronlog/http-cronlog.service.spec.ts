import { Test, TestingModule } from '@nestjs/testing';
import { HttpCronlogService } from './http-cronlog.service';

describe('HttpCronlogService', () => {
  let service: HttpCronlogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpCronlogService],
    }).compile();

    service = module.get<HttpCronlogService>(HttpCronlogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
