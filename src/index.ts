import * as Express from "express";

const app = Express.default();

/**
 * Output: No error
 * I am standard global middleware
 * I am standard express middleware 1
 * I am standard express middleware 2
 * I am standard express callback function
 * I am standard express callback function after next
 * I am standard express cleanup part of middleware 2
 * I am standard express cleanup part of middleware 1
 * I am standard global cleanup part of middleware
 *
 * Output: In case of error
 * I am standard global middleware
 * and then just <h1>Something went wrong</h1> is sent
 */

function globalMiddleware(
  _req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) {
  console.log("I am standard global middleware");
  // for enabling cors
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
  console.log("I am standard global cleanup part of middleware");
}

const errorHandler: Express.ErrorRequestHandler = (
  err: any,
  _req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  if (err) {
    return res.send("<h1>Something went wrong</h1>");
  }
  next();
};

app.use(globalMiddleware);
app.use(errorHandler);

function middleware1(
  _req: Express.Request,
  _res: Express.Response,
  next: Express.NextFunction,
) {
  console.log("I am standard express middleware 1");
  next();
  console.log("I am standard express cleanup part of middleware 1");
}
function middleware2(
  _req: Express.Request,
  _res: Express.Response,
  next: Express.NextFunction,
) {
  console.log("I am standard express middleware 2");
  next();
  console.log("I am standard express cleanup part of middleware 2");
}

function stdCb(
  _req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) {
  console.log("I am standard express callback function");
  next();
  console.log("I am standard express callback function after next");
  return res.status(200).send("<h1>Hello world!</h1>");
}

app.get("/", middleware1, middleware2, stdCb); // local middlewares

app.listen(3000, function () {
  console.log("the server is running on port 3000");
});
