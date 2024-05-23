const predictClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const loadData = require("../services/loadData");
const crypto = require("crypto");

async function predictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const predictionData = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  await storeData(id, predictionData);

  return h
    .response({
      status: "success",
      message: "Prediction completed successfully",
      data: predictionData,
    })
    .code(201);
}

async function predictHistories(request, h) {
  try {
    const data = await loadData();
    return h.response({
        status: "success",
        data: data,
      }).code(200);

  } catch (error) {
    return h.response({
        status: "fail",
        message: "failed to get prediction histories",
      }).code(500);
  }
}

module.exports = { predictHandler, predictHistories };