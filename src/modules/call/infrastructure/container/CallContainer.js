import { MongoCallRepository } from "../repositories/MongoCallRepository.js";
import { RecordingService } from "../services/RecordingService.js";
import { Call } from "../../domain/entities/Call.entity.js";

// Use Cases
import { GetCallRecordingUseCase } from "../../application/usecases/GetCallRecordingUseCase.js";
import { GetAllCallsUseCase } from "../../application/usecases/GetAllCallsUseCase.js";
import { GetCallsByCustomerUseCase } from "../../application/usecases/GetCallsByCustomerUseCase.js";
import { GetCallStatsUseCase } from "../../application/usecases/GetCallStatsUseCase.js";

// Presentation
import { CallController } from "../../presentation/controllers/CallController.js";
import { CallRoutes } from "../../presentation/routes/CallRoutes.js";

export class CallContainer {
  constructor() {
    this.initializeDependencies();
  }

  initializeDependencies() {
    // Infrastructure
    this.callRepository = new MongoCallRepository();
    this.recordingService = new RecordingService();

    // Use Cases
    this.getCallRecordingUseCase = new GetCallRecordingUseCase(
      this.callRepository,
      this.recordingService
    );
    this.getAllCallsUseCase = new GetAllCallsUseCase(this.callRepository);
    this.getCallsByCustomerUseCase = new GetCallsByCustomerUseCase(
      this.callRepository
    );
    this.getCallStatsUseCase = new GetCallStatsUseCase(this.callRepository);

    // Presentation
    this.callController = new CallController(
      this.getCallRecordingUseCase,
      this.getAllCallsUseCase,
      this.getCallsByCustomerUseCase,
      this.getCallStatsUseCase
    );
    this.callRoutes = new CallRoutes(this.callController);
  }

  // Getters for use cases
  getGetCallRecordingUseCase() {
    return this.getCallRecordingUseCase;
  }

  getGetAllCallsUseCase() {
    return this.getAllCallsUseCase;
  }

  getGetCallsByCustomerUseCase() {
    return this.getCallsByCustomerUseCase;
  }

  getGetCallStatsUseCase() {
    return this.getCallStatsUseCase;
  }

  // Getters for presentation
  getCallController() {
    return this.callController;
  }

  getCallRoutes() {
    return this.callRoutes;
  }

  // Getters for infrastructure
  getCallRepository() {
    return this.callRepository;
  }

  getRecordingService() {
    return this.recordingService;
  }
}

export class CallContainerMinimal {
  constructor() {
    this.mockCallRepository = {
      create: async (data) => new Call({ id: "mock-id", ...data }),
      findByCallId: async (callid) =>
        new Call({
          id: "mock-id",
          callid,
          recordingUrl: "https://example.com/recording.mp3",
          customerId: "customer-123",
        }),
      findByCustomerId: async (customerId) => [
        new Call({
          id: "1",
          callid: "call-1",
          recordingUrl: "https://example.com/recording1.mp3",
          customerId,
        }),
        new Call({
          id: "2",
          callid: "call-2",
          recordingUrl: "https://example.com/recording2.mp3",
          customerId,
        }),
      ],
      findAll: async () => [
        new Call({
          id: "1",
          callid: "call-1",
          recordingUrl: "https://example.com/recording1.mp3",
          customerId: "customer-123",
        }),
        new Call({
          id: "2",
          callid: "call-2",
          recordingUrl: "https://example.com/recording2.mp3",
          customerId: "customer-456",
        }),
      ],
      update: async (id, data) => new Call({ id, ...data }),
      delete: async (id) => new Call({ id, callid: "deleted-call" }),
      getStats: async () => ({
        totalCalls: 2,
        callsWithRecordings: 2,
        callsWithoutRecordings: 0,
        todayCalls: 1,
        weeklyCalls: 2,
        recordingPercentage: 100,
      }),
      countCalls: async () => 2,
    };

    this.mockRecordingService = {
      getRecordingPath: async (callid, tokenId) => {
        console.log(`[MOCK RECORDING] Getting recording for callid: ${callid}`);
        return "https://example.com/mock-recording.mp3";
      },
    };

    // Use Cases with mocks
    this.getCallRecordingUseCase = new GetCallRecordingUseCase(
      this.mockCallRepository,
      this.mockRecordingService
    );
    this.getAllCallsUseCase = new GetAllCallsUseCase(this.mockCallRepository);
    this.getCallsByCustomerUseCase = new GetCallsByCustomerUseCase(
      this.mockCallRepository
    );
    this.getCallStatsUseCase = new GetCallStatsUseCase(this.mockCallRepository);

    // Controller with mocks
    this.callController = new CallController(
      this.getCallRecordingUseCase,
      this.getAllCallsUseCase,
      this.getCallsByCustomerUseCase,
      this.getCallStatsUseCase
    );

    // Routes with mocks
    this.callRoutes = new CallRoutes(this.callController);
  }

  // Getters for use cases
  getGetCallRecordingUseCase() {
    return this.getCallRecordingUseCase;
  }

  getGetAllCallsUseCase() {
    return this.getAllCallsUseCase;
  }

  getGetCallsByCustomerUseCase() {
    return this.getCallsByCustomerUseCase;
  }

  getGetCallStatsUseCase() {
    return this.getCallStatsUseCase;
  }

  // Getters for presentation
  getCallController() {
    return this.callController;
  }

  getCallRoutes() {
    return this.callRoutes;
  }

  // Getters for mocks
  getMockCallRepository() {
    return this.mockCallRepository;
  }

  getMockRecordingService() {
    return this.mockRecordingService;
  }
}
