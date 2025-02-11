const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL 연결 설정
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST.split(':')[0],
    port: process.env.MYSQL_HOST.split(':')[1],
    dialect: 'mysql',
});

// 사용자 모델 정의
const User = sequelize.define('User', {
    userType: {
        type: DataTypes.ENUM('기업', '개인'),
        allowNull: false
    },
    companyName: DataTypes.STRING,
    representativeName: DataTypes.STRING,
    name: DataTypes.STRING,
    businessNumber: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING(60), allowNull: false },
    uniqueId: { type: DataTypes.STRING, unique: true } // 사용자 고유 ID
});

// 회사 정보 모델 정의
const CompanyInfo = sequelize.define('CompanyInfos', {
    companyName: { type: DataTypes.STRING, allowNull: false },
    businessNumber: { type: DataTypes.STRING, allowNull: false },
    representativeName: { type: DataTypes.STRING, allowNull: false },
    industryType: DataTypes.STRING,
    mainProducts: DataTypes.STRING,
    revenue: DataTypes.DECIMAL(15, 2),
    contactNumber: DataTypes.STRING,
    faxNumber: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    websiteLink: DataTypes.STRING,
    uniqueId: { type: DataTypes.STRING, unique: true }
});

// 공급 가능한 부산물 모델 정의
const AvailableByproduct = sequelize.define('AvailableByproducts', {
    availableByproductName: DataTypes.STRING,
    availableByproductAmount: DataTypes.STRING,
    availableByproductUnit: DataTypes.STRING,
    availableByproductAnalysis: DataTypes.STRING,
    uniqueId: { type: DataTypes.STRING, unique: true }
});

// 필요한 부산물 모델 정의
const NeededByproduct = sequelize.define('NeededByproducts', {
    neededByproductName: DataTypes.STRING,
    neededByproductAmount: DataTypes.STRING,
    neededByproductUnit: DataTypes.STRING,
    uniqueId: { type: DataTypes.STRING, unique: true }
});

// 거래일지 모델 정의
const TransactionLog = sequelize.define('TransactionLog', {
    uniqueId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'uniqueId'
        }
    },
    callDate: { type: DataTypes.STRING, allowNull: false }, // 통화 일시 (문자열 형식)
    callHandler: { type: DataTypes.STRING, allowNull: false }, // 통화 담당자
    recordHandler: { type: DataTypes.STRING, allowNull: false }, // 기록 담당자
    transactionDate: { type: DataTypes.STRING, allowNull: false }, // 거래 예정 시간 (문자열 형식)
    transactionLocation: { type: DataTypes.STRING, allowNull: false }, // 거래 예정 장소
    byproductName: { type: DataTypes.STRING, allowNull: false }, // 거래 부산물명
    byproductQuantity: { type: DataTypes.FLOAT, allowNull: false }, // 거래 부산물량
    byproductUnit: { type: DataTypes.STRING, allowNull: false }, // 단위
    transactionPrice: { type: DataTypes.INTEGER, allowNull: false }, // 거래 가격
    transactionMethod: { type: DataTypes.STRING, allowNull: false }, // 거래 방식
    bank: { type: DataTypes.STRING, allowNull: false }, // 은행 이름 추가
    accountNumber: { type: DataTypes.STRING, allowNull: false }, // 계좌번호
    depositorName: { type: DataTypes.STRING, allowNull: false }, // 예금주 이름
    additionalNotes: { type: DataTypes.STRING } // 기타 내용
});

// 데이터베이스 동기화
sequelize.sync({ force: false })
    .then(() => console.log("MySQL Connected"))
    .catch(err => console.log("DB Connection Error:", err));

// 회원가입 라우트
app.post('/signup', async (req, res) => {
    const { userType, companyName, representativeName, name, businessNumber, email, password } = req.body;

    const uniqueId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({
            userType,
            companyName: userType === '기업' ? companyName : null,
            representativeName: userType === '기업' ? representativeName : null,
            name: userType === '개인' ? name : null,
            businessNumber: userType === '기업' ? businessNumber : null,
            email,
            password: hashedPassword,
            uniqueId // 사용자 고유 ID
        });

        res.status(201).json({ uniqueId: newUser.uniqueId, companyName, businessNumber, representativeName });
    } catch (error) {
        console.error("회원가입 오류:", error);
        res.status(400).json({ error: "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요." });
    }
});

// 로그인 라우트
app.post('/login', async (req, res) => {
    const { uniqueId, password } = req.body;

    const user = await User.findOne({ where: { uniqueId } });
    if (!user) return res.status(400).send('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    const token = jwt.sign({ uniqueId: user.uniqueId }, process.env.JWT_SECRET);
    res.json({
        token,
        companyName: user.companyName,
        businessNumber: user.businessNumber,
        representativeName: user.representativeName,
        uniqueId: user.uniqueId,
        email: user.email,
        userType: user.userType,
        name: user.name,
    });
});

// 회사 정보 저장 API
app.post('/api/company-info', async (req, res) => {
    const {
        companyName,
        businessNumber,
        representative,
        industry,
        mainProducts,
        revenue,
        contactNumber,
        faxNumber,
        companyAddress,
        websiteLink,
        availableByproductName,
        availableByproductAmount,
        availableByproductUnit,
        availableByproductAnalysis,
        neededByproductName,
        neededByproductAmount,
        neededByproductUnit,
        uniqueId
    } = req.body;

    try {
        // 1. 회사 정보 저장
        const companyInfo = await CompanyInfo.create({
            companyName,
            businessNumber,
            representativeName: representative,
            industryType: industry,
            mainProducts,
            revenue,
            contactNumber,
            faxNumber,
            companyAddress,
            websiteLink,
            uniqueId
        });

        // 2. 공급 가능한 부산물 저장
        const availableByproduct = await AvailableByproduct.create({
            availableByproductName,
            availableByproductAmount,
            availableByproductUnit,
            availableByproductAnalysis,
            uniqueId
        });

        // 3. 필요한 부산물 저장
        const neededByproduct = await NeededByproduct.create({
            neededByproductName,
            neededByproductAmount,
            neededByproductUnit,
            uniqueId
        });

        res.status(201).json({ message: '회사 정보가 저장되었습니다.', companyInfo, availableByproduct, neededByproduct });
    } catch (error) {
        console.error('회사 정보 저장 오류:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 거래일지 저장 API
app.post('/api/transaction-log', async (req, res) => {
    const {
        uniqueId, // uniqueId 사용
        callDate,
        callHandler,
        recordHandler,
        transactionDate,
        transactionLocation,
        byproductName,
        byproductQuantity,
        byproductUnit,
        transactionPrice,
        transactionMethod,
        bank,
        accountNumber,
        depositorName,
        additionalNotes
    } = req.body;

    try {
        const transactionLog = await TransactionLog.create({
            uniqueId, // uniqueId 사용
            callDate,
            callHandler,
            recordHandler,
            transactionDate,
            transactionLocation,
            byproductName,
            byproductQuantity,
            byproductUnit,
            transactionPrice,
            transactionMethod,
            bank,
            accountNumber,
            depositorName,
            additionalNotes
        });

        res.status(201).json({ message: '거래일지가 저장되었습니다.', transactionLog });
    } catch (error) {
        console.error('거래일지 저장 오류:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
