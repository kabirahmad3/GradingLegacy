import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { Users } from "./models/users.js";
import mongoose from "mongoose";
import _ from "lodash";
import cookieParser from 'cookie-parser';
import { Forms } from "./models/forms.js";
import cors from "cors";




const PORT = 3000;
const salt = "34908a8c8f4b70c544976eb3bd889597";
const secretKey = 'yourSecretKey'
const app = express();

mongoose.connect("mongodb+srv://kabirahmad985:bCDu9GWT6mF2nML3@grading-legacy.bojjjtq.mongodb.net/grading_system?retryWrites=true&w=majority&appName=Grading-Legacy")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch(console.error);
    
app.use(cors({origin:"https://gradinglegacy.onrender.com",credentials: true}));


app.use(express.json());


app.post("/signup", async (req, res, next) => {
    const { body: { name, role, username, password, leader , head } = {} } = req;
    const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');

    const leaderId = new mongoose.Types.ObjectId(leader);

    await Users.create({
        name,
        password: hashedPassword,
        role,
        username,
        leader: leader && leaderId
    })

    res.status(201)
        .send({
            message: "user created"
        })
});

app.post("/login", async (req, res, next) => {
    const { body: { username, password } = {} } = req;
    const hashedPassword = crypto.scryptSync(password, salt, 64).toString('hex');

    const user = await Users.findOne({
        username,
    }).lean();

    if (_.isEmpty(user)) {
        throw new Error("User not found")
    }

    if (user.password !== hashedPassword) {
        throw new Error("password is incorrect");
    }

    const payload = { userId: user._id, role: user.role };
    const options = { expiresIn: '1h' }; // Token expiration time

    const token = jwt.sign(payload, secretKey, options);
    res.cookie("ACTIVE_USER", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            sameSite: 'none',
            secure: true 
        })
    res.send({
            _id: user._id,
            role: user.role,
            name: user.name,
            username: user.username
        });
});

app.use(cookieParser());

app.use((req, res, next) => {
    try {
        const token = req.cookies?.ACTIVE_USER;

        if (!token) {
            return res.status(401).send({ message: 'No token provided' });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).send({ message: 'Invalid or expired token' });
            }

            req.ACTIVE_USER = {
                _id: decoded.userId,
                role: decoded.role,
            };

            next();
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

app.post("/create-form", async (req, res, next) => {
    const employees = await Users.find({
        role: "employe"
    }).lean();

    employees.forEach(async (employee) => {
        const employeeId = new mongoose.Types.ObjectId(employee._id);
        const leaderId = new mongoose.Types.ObjectId(employee.leader);

        await Forms.create({ employee: employeeId, leader: leaderId });
    })

    res.status(201).send({
        message: "Form created successfully"
    })
});

app.get("/get-form", async (req, res, next) => {
    const { ACTIVE_USER } = req;

    const employeeId = new mongoose.Types.ObjectId(ACTIVE_USER._id);

    const forms = await Forms.find({ employee: employeeId }).populate("employee");

    res.status(200)
        .send(forms)
});

app.get("/get-form/:id", async (req, res, next) => {
    const { ACTIVE_USER, params: { id } } = req;

    const formId = new mongoose.Types.ObjectId(id);

    const forms = await Forms.findOne({ _id: formId }).populate("employee");

    res.status(200)
        .send(forms)
});

app.post("/fill-form", async (req, res, next) => {
    const { body, ACTIVE_USER } = req;

    const employeeId = new mongoose.Types.ObjectId(ACTIVE_USER._id);
    const form = await Forms.findOne({ employee: employeeId });

    if (_.isEmpty(form)) {
        throw new Error("form not found")
    }

    Object.assign(form, body);
    await form.save()

    res.status(201).send({
        message: "Form created successfully"
    })
});

app.post("/leader-fill-form", async (req, res, next) => {
    const { body = {} } = req;

    const formId = new mongoose.Types.ObjectId(body?.formId);
    const form = await Forms.findOne({ _id: formId });

    if (_.isEmpty(form)) {
        throw new Error("form not found")
    }

    Object.assign(form, body);
    await form.save()

    res.status(201).send({
        message: "Form created successfully"
    })
});

// error
app.use((error, req, res, next) => {
    console.log(error)

    res.status(500).send({
        name: error.name,
        message: error.message,
        statusCode: error.statusCode || error.status || error.code || 500
    })
});

app.listen(PORT, () => {
    console.log(`App listing on ${PORT}`)
})