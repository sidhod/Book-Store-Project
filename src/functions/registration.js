import User from '../models/user.model.js';
import { connectToDataBase } from '../config/database.js';

export const registerUser = async (event, context, callback) => {
    console.log(event.body);
    context.callbackwaitsForEmptyEventLoop = false;
    await connectToDataBase()
        .then(async () => {
            console.log(event.body);
            const userData = JSON.parse(event.body);
            console.log("userData");
            await User.create(userData)
                .then(user => {
                    callback(null, {
                        statusCode: 200,
                        body: JSON.stringify({ message: "Create User Successfully!!!", data: user })
                    })
                })
                .catch(err => {
                    callback(null, {
                        statusCode: err.statusCode || 500,
                        headers: { 'Content-Type': 'text/plain' },
                        body: JSON.stringify({ message: err })

                    })
                });
        })
        .catch(err => {
            callback(null, {
                statusCode: err.statusCode || 500,
                headers: { 'Content-Type': 'text/plain' },
                body: 'Could Not Register User'

            })
        });
}
