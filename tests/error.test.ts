import { errorHandler } from "../src/middleware/error-handler";
import type { Request, Response, NextFunction } from "express";

describe("errorHandler middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should return provided status and message", () => {
    const err = { status: 400, message: "Bad Request" };

    errorHandler(err, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: "Bad Request" },
    });
  });

  it("should default to 500 and generic message", () => {
    const err = {};

    errorHandler(err, mockReq as Request, mockRes as Response, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: "Internal Server Error" },
    });
  });
});