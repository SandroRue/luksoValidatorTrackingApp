"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/wallet-balance/get-walletBalance.ts
var import_dayjs = __toESM(require("dayjs"));
var import_client = require("@prisma/client");
var import_uuid = require("uuid");
var getWalletBalance = () => __async(void 0, null, function* () {
  try {
    const res = yield fetch("https://explorer.consensus.mainnet.lukso.network/api/v1/execution/address/0xc92F4b3905754eA8E49Ea9B4B698d40825eF2743", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const result = yield res.json();
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
});
var saveWalletBalanceAndPersist = () => __async(void 0, null, function* () {
  const res = yield getWalletBalance();
  if (res !== null) {
    const address = res.data.address;
    const amount = parseFloat(res.data.ether);
    const creationDate = (0, import_dayjs.default)().toISOString();
    const data = { address, creationDate, amount };
    console.log(data);
    const prisma = new import_client.PrismaClient();
    const uuid = () => (0, import_uuid.v4)();
    yield prisma.luksoData.create({
      data: {
        id: uuid(),
        address,
        creationDate,
        amount
      }
    });
  } else {
    return null;
  }
});

// src/index.ts
var express = require("express");
var app = express();
var main = () => __async(exports, null, function* () {
  const app2 = express();
  const setImmediateDeleteInterval = (callback, interval) => {
    callback();
    setInterval(callback, interval);
  };
  setImmediateDeleteInterval(() => __async(exports, null, function* () {
    yield saveWalletBalanceAndPersist();
    console.log("Data saved");
  }), 1e3 * 60 * 60 * 24);
  app2.get("/", (req, res) => res.send("OK"));
  app2.listen(4e3, () => {
    console.log(`Server started at: http://localhost:4000`);
  });
});
main();
//# sourceMappingURL=index.js.map