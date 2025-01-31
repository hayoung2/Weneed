const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors'); // CORS 패키지 추가

dotenv.config();

const app = express();
app.use(cors()); // CORS 허용
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// 사용자 스키마 정의
const userSchema = new mongoose.Schema({
    userType: { type: String, enum: ['기업', '개인'], required: true },
    companyName: String,
    representativeName: String,
    name: String,
    businessNumber: String,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    uniqueId: { type: String, unique: true }
});

const User = mongoose.model('User', userSchema);

// 회원가입 라우트
app.post('/signup', async (req, res) => {
    const { userType, companyName, representativeName, name, businessNumber, email, password } = req.body;

    const uniqueId = new mongoose.Types.ObjectId(); // 고유 ID 생성, ObjectId를 사용하여 고유번호 생성

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        userType,
        companyName: userType === '기업' ? companyName : undefined,
        representativeName: userType === '기업' ? representativeName : undefined,
        name: userType === '개인' ? name : undefined,
        businessNumber: userType === '기업' ? businessNumber : undefined,
        email,
        password: hashedPassword,
        uniqueId: uniqueId.toString() // 고유번호를 문자열로 저장
    });

    await newUser.save();
    res.status(201).json({ uniqueId: newUser.uniqueId }); // 고유번호를 응답으로 반환
});

// 로그인 라우트
app.post('/login', async (req, res) => {
    const { uniqueId, password } = req.body;

    const user = await User.findOne({ uniqueId });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ uniqueId: user.uniqueId }, process.env.JWT_SECRET);
    res.json({ token });
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
