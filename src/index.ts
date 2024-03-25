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
 * Response => <h1>Hello World!</h1>
 *
 * Output: In case of error
 * I am standard global middleware
 * I am standard express middleware 1
 * Error: Unnecessary random error
 * I am standard express cleanup part of middleware 1
 * I am standard global cleanup part of middleware
 *
 * Response => <h1>Something went wrong</h1>
 */

// We can append & modify the properties in request and response in middlewares
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

app.use(globalMiddleware);

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

const errorHandler: Express.ErrorRequestHandler = (
  err: any,
  _req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction,
) => {
  if (err) {
    console.error("Error: " + err.message);
    return res.send("<h1>Something went wrong</h1>");
  }
  next();
};

// Error will be caught gracefully if any of the middlewares fail
app.use(errorHandler);

app.listen(3000, function () {
  console.log("the server is running on port 3000");
});
