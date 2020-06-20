
// var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-auth20').Strategy;
// Lấy thông tin những giá trị auth
var configAuth = require('./auth');
// load  user model
var User = require('../models/user.model');
module.exports = function (passport) {
    
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    
    passport.use(new FacebookStrategy({

            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL,
            profileFields: ['id','displayName','email','photo']
        },
        // Facebook sẽ gửi lại chuối token và thông tin profile của user
        function (token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function () {
                // tìm trong db xem có user nào đã sử dụng facebook id này chưa
                User.findOne({'_id': profile.id}, function (err, user) {
                    console.log(profile);
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // nếu chưa có, tạo mới user
                        var newUser = new User();

                        // lưu các thông tin cho user
                        newUser._id = profile.id;
                        // newUser.token = token;
                        newUser.name = profile.displayName; // bạn có thể log đối tượng profile để xem cấu trúc
                        // newUser.email = profile.emails[0].value; // fb có thể trả lại nhiều email, chúng ta lấy cái đầu tiền
                        // lưu vào db
                        newUser.save(function (err) {
                            if (err)
                                throw err;
                            // nếu thành công, trả lại user
                            return done(null, newUser);
                        });
                    }
                });
            });
        }));


    // passport.use(new GooleStrategy({

    //         clientID: configAuth.googleAuth.clientID,
    //         clientSecret: configAuth.googleAuth.clientSecret,
    //         callbackURL: configAuth.googleAuth.callbackURL,
    //         profileFields: ['id','displayName','email']
    //     },
    //     // Facebook sẽ gửi lại chuối token và thông tin profile của user
    //     function (token, refreshToken, profile, done) {
    //         // asynchronous
    //         process.nextTick(function () {
    //             // tìm trong db xem có user nào đã sử dụng facebook id này chưa
    //             User.findOne({'_id': profile.id}, function (err, user) {
    //                 console.log(profile);
    //                 if (err)
    //                     return done(err);
    //                 if (user) {
    //                     return done(null, user); // user found, return that user
    //                 } else {
    //                     // nếu chưa có, tạo mới user
    //                     var newUser = new User();

    //                     // lưu các thông tin cho user
    //                     newUser._id = profile.id;
    //                     newUser.token = token;
    //                     newUser.name = profile.displayName; // bạn có thể log đối tượng profile để xem cấu trúc
    //                     // newUser.email = profile.emails[0].value; // fb có thể trả lại nhiều email, chúng ta lấy cái đầu tiền
    //                     // lưu vào db
    //                     newUser.save(function (err) {
    //                         if (err)
    //                             throw err;
    //                         // nếu thành công, trả lại user
    //                         return done(null, newUser);
    //                     });
    //                 }
    //             });
    //         });
    //     }));


};