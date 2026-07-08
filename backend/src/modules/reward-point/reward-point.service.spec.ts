import { Test, TestingModule } from '@nestjs/testing';
import { RewardPointService } from './reward-point.service';

describe('RewardPointService', () => {
  let service: RewardPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardPointService],
    }).compile();

    service = module.get<RewardPointService>(RewardPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
