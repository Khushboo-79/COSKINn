import { Test, TestingModule } from '@nestjs/testing';
import { RewardPointController } from './reward-point.controller';

describe('RewardPointController', () => {
  let controller: RewardPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardPointController],
    }).compile();

    controller = module.get<RewardPointController>(RewardPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
