import User from '../models/user.model.js';
import { connectToDataBase } from '../config/database.js';
// const bcrypt = require('bcrypt');
import bcrypt from 'bcrypt';

export const loginUser = async (event, context, callback) => {
    console.log(event.body);
    context.callbackwaitsForEmptyEventLoop = false;
    await connectToDataBase()
        .then(async () => {
            console.log(event.body);
            const loginData = JSON.parse(event.body);
            console.log("loginData");
            let email = loginData.email;
            let data = await User.find({ email: email });
            console.log(data.password);
            console.log(data);
            if (data.length !== 0) {
                let passwordvalidator = await bcrypt.compare(loginData.password, data[0].password);
                if (passwordvalidator) {
                    console.log("Login In----->", passwordvalidator)
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify({ message: "User Login Successfully!!!", data: data })
                    })
                } else {
                    callback(null, {
                        statusCode: 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify({ message: 'Password Is incorrect.....' })

                    })
                }

            } else {
                callback(null, {
                    statusCode: 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: JSON.stringify({ message: 'Email Is incorrect.....' })

                })

            }
        })
        .catch(err => {
            callback(null, {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Login Fails'

            })
        });
}
