// middleware.ts
import { NextResponse } from "next/server";
import passport from "passport";
import LocalStrategy from "passport-local";

passport.use(
  new LocalStrategy(function (username, password, done) {
    return done(null, { test: "hallo" });
    // User.findOne({ username: username }, function (err, user) {
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   if (!user.verifyPassword(password)) {
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });
  })
);

function isLoggedIn(password) {
  return password === "123";
}

const giphy =
  "https://giphy.com/gifs/Hollyoaks-tom-baby-crying-7oWxuWzMs8YNdAnCQl";

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const response = NextResponse.next();
  const cookie = request.cookies.get("password");
  console.log(cookie);
  response.redirect = () => {
    console.log("test");
  };
  const login = passport.authenticate("local", (error, user) => {
    console.log(error, user);
  });
  console.log(login(request, response));

  //   const hasAccess = isLoggedIn(cookie);
  //   if (!hasAccess) {
  //     console.log("no access");
  //     return NextResponse.redirect(giphy);
  //   }
  // .ico , .png , .jpeg , _next
  //   console.log("hallo", request.url);
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!_next\\/|favicon\\.ico).*)/",
};
