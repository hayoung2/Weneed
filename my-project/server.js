const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const { Sequelize, DataTypes ,Op} = require('sequelize');
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
    availableByproductPrice: DataTypes.STRING,
    uniqueId:  { type: DataTypes.STRING, unique: false }
});

// 필요한 부산물 모델 정의
const NeededByproduct = sequelize.define('NeededByproducts', {
    neededByproductName: DataTypes.STRING,
    neededByproductAmount: DataTypes.STRING,
    neededByproductUnit: DataTypes.STRING,
    neededByproductProperty:DataTypes.STRING,
    uniqueId:  { type: DataTypes.STRING, unique: false }
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
    contactNumber: { type: DataTypes.STRING, allowNull: false }, //상대방 연락처
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

// 즐겨찾기 모델 정의
const Favorite = sequelize.define('Favorite', {
    userId: { // 즐겨찾기를 한 사용자 고유 ID
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: User,
            key: 'uniqueId'
        }
    },
    favoriteCompanyId: { // 즐겨찾기를 당한 기업의 고유 ID
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: CompanyInfo,
            key: 'uniqueId'
        }
    },
    companyName: { // 기업 이름
        type: DataTypes.STRING,
        allowNull: false
    }
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
        availableByproductPrice,
        neededByproductName,
        neededByproductAmount,
        neededByproductUnit,
        neededByproductProperty,
        uniqueId
    } = req.body;

    try {
        // uniqueId가 이미 있는지 확인
        const existingCompany = await CompanyInfo.findOne({ where: { uniqueId } });
        if (existingCompany) {
            return res.status(400).json({ error: "이 uniqueId는 이미 존재합니다." });
        }

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
            availableByproductPrice,
            uniqueId
        });

        // 3. 필요한 부산물 저장
        const neededByproduct = await NeededByproduct.create({
            neededByproductName,
            neededByproductAmount,
            neededByproductUnit,
            neededByproductProperty,
            uniqueId
        });

        res.status(201).json({ message: '회사 정보가 저장되었습니다.', companyInfo, availableByproduct, neededByproduct });
    } catch (error) {
        console.error('회사 정보 저장 오류:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});

// 필요한 부산물 저장 API
app.post('/api/needed-byproduct', async (req, res) => {
    const { neededByproductName, neededByproductAmount, neededByproductUnit,neededByproductProperty, uniqueId } = req.body;

    if (!neededByproductName || !neededByproductAmount || !neededByproductUnit || !neededByproductProperty || !uniqueId) {
        return res.status(400).json({ error: "모든 필드를 입력해주세요." });
    }

    try {
        const neededByproduct = await NeededByproduct.create({
            neededByproductName,
            neededByproductAmount,
            neededByproductUnit,
            neededByproductProperty,
            uniqueId,
        });

        res.status(201).json({ message: "필요 자원이 등록되었습니다.", neededByproduct });
    } catch (error) {
        console.error("필요 자원 등록 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 공급 가능한 부산물 저장 API
app.post('/api/availablebyproduct', async (req, res) => {
    const { availableByproductName, availableByproductAmount, availableByproductUnit, availableByproductPrice, availableByproductAnalysis, uniqueId } = req.body;

    if (!availableByproductName || !availableByproductAmount || !availableByproductUnit || !availableByproductPrice || !uniqueId) {
        return res.status(400).json({ error: "모든 필드를 입력해주세요." });
    }


    try {
        const availableByproduct = await AvailableByproduct.create({
            availableByproductName,
            availableByproductAmount,
            availableByproductUnit,
            availableByproductPrice,
            availableByproductAnalysis,
            uniqueId,
        });

        res.status(201).json({ message: "공급 가능한 부산물이 등록되었습니다.", availableByproduct });
    } catch (error) {
        console.error("공급 가능한 부산물 등록 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});


// 거래일지 저장 API
app.post('/api/transaction-log', async (req, res) => {
    const {
        uniqueId, // uniqueId 사용
        contactNumber,
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
            uniqueId, 
            contactNumber,
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


// 특정 지역의 기업 정보 + 모든 부산물 정보 조회 API
app.get('/api/company-info/:province/:city', async (req, res) => {
    const { province, city } = req.params;

    try {
        // **1. 해당 지역의 기업 리스트 조회**
        const companies = await CompanyInfo.findAll({
            where: {
                companyAddress: {
                    [Sequelize.Op.like]: `%${province} ${city}%`
                }
            },
            attributes: { exclude: [ 'updatedAt'] }
        });

        // **2. 각 기업의 모든 부산물 정보 가져오기**
        const results = await Promise.all(companies.map(async (company) => {
            const byproducts = await AvailableByproduct.findAll({
                where: { uniqueId: company.uniqueId },
                order: [['createdAt', 'DESC']], 
                attributes: { exclude: [ 'updatedAt'] }
            });

            return {
                ...company.toJSON(),  
                byproducts            
            };
        }));

        res.json(results);
    } catch (error) {
        console.error("지역별 기업 정보 조회 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});


// 즐겨찾기 추가 API
app.post('/api/favorites', async (req, res) => {
    const { userId, favoriteCompanyId, companyName } = req.body;

    if (!userId || !favoriteCompanyId || !companyName) {
        return res.status(400).json({ error: "모든 필드를 입력해주세요." });
    }

    try {
        const favorite = await Favorite.create({
            userId,
            favoriteCompanyId,
            companyName
        });

        res.status(201).json({ message: "즐겨찾기가 추가되었습니다.", favorite });
    } catch (error) {
        console.error("즐겨찾기 추가 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 사용자 즐겨찾기 조회 API
app.get('/api/favorites/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const favorites = await Favorite.findAll({
            where: { userId },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        res.json(favorites);
    } catch (error) {
        console.error("즐겨찾기 조회 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 즐겨찾기 삭제 API
app.delete('/api/favorites/favoriteCompanyId/:favoriteCompanyId', async (req, res) => {
    const { favoriteCompanyId } = req.params;

    try {
        const result = await Favorite.destroy({
            where: { favoriteCompanyId }
        });

        if (result === 0) {
            return res.status(404).json({ error: "즐겨찾기를 찾을 수 없습니다." });
        }

        res.json({ message: "즐겨찾기가 삭제되었습니다." });
    } catch (error) {
        console.error("즐겨찾기 삭제 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

AvailableByproduct.belongsTo(CompanyInfo, {
    foreignKey: 'uniqueId', 
    targetKey: 'uniqueId',
    as: 'companyInfo' 
});



//  **특정 검색어로 `AvailableByproducts` 조회 + 회사 정보 포함**
app.get('/api/available-byproducts', async (req, res) => {
    const { search } = req.query;
    try {
        const results = await AvailableByproduct.findAll({
            where: {
                availableByproductName: { [Op.like]: `%${search}%` }
            },
            include: [
                {
                    model: CompanyInfo,
                    as: 'companyInfo' 
                }
            ]
        });
        res.json(results);
    } catch (error) {
        console.error('검색 오류:', error);
        res.status(500).json({ error: '서버 오류' });
    }
});


//마이페이지 값 가져오기 (상단 데이터 가져오기 )
app.get('/api/user-info/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const companyInfo = await CompanyInfo.findOne({
            where: { uniqueId },  
            attributes: { exclude: ['createdAt', 'updatedAt'] } 
        });

        if (!companyInfo) {
            return res.status(404).json({ error: '해당 회사 정보를 찾을 수 없습니다.' });
        }

        res.json(companyInfo);
    } catch (error) {
        console.error('회사 정보 조회 오류:', error);
        res.status(500).json({ error: '서버 오류 발생' });
    }
});

// 검색 정보 상세 조회 API (CompanyInfo 테이블에서 가져오기)
app.get('/api/transactionDetail/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const byProductInfo = await AvailableByproduct.findOne({
            where: { id },
            include: [{
                model: CompanyInfo, // ✅ CompanyInfo 테이블과 조인
                as: 'companyInfo',
                attributes: { exclude: ['updatedAt'] }
            }]
        });

        if (!byProductInfo) {
            return res.status(404).json({ error: '부산물 정보를 찾을 수 없습니다.' });
        }

        res.json(byProductInfo);
    } catch (error) {
        console.error('회사 정보 조회 오류:', error);
        res.status(500).json({ error: '서버 오류 발생' });
    }
});

// 특정 사용자의 공급 가능한 부산물 조회 API
app.get('/api/available-byproducts/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const availableByproducts = await AvailableByproduct.findAll({
            where: { uniqueId },
            attributes: { exclude: ['updatedAt'] }
        });

        res.json(availableByproducts);
    } catch (error) {
        console.error("공급 가능한 부산물 조회 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

// 특정 사용자의 필요 자원 조회 API
app.get('/api/needed-byproducts/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const neededByproducts = await NeededByproduct.findAll({
            where: { uniqueId },
            attributes: { exclude: ['updatedAt'] }
        });

        res.json(neededByproducts);
    } catch (error) {
        console.error("필요 자원 조회 오류:", error);
        res.status(500).json({ error: "서버 오류 발생" });
    }
});

app.post('/api/ai-recommendation', async (req, res) => {
    try {
        const { byProductName, requiredQuantity, requestingCompanyUniqueId } = req.body;

        const requestingCompany = await CompanyInfo.findOne({
            where: { uniqueId: requestingCompanyUniqueId },
            attributes: ['companyAddress']
        });

        if (!requestingCompany) {
            return res.status(404).json({ success: false, message: "요청 회사 정보를 찾을 수 없습니다." });
        }

        let byproducts = await AvailableByproduct.findAll({
            where: {
                availableByproductName: {
                    [Op.like]: `%${byProductName}%`
                }
            },
            include: [{
                model: CompanyInfo,
                as: 'companyInfo',
                attributes: ['companyAddress', 'companyName', 'uniqueId']
            }]
        });

        byproducts = byproducts.map(byproduct => {
            const distance = calculateDistance(requestingCompany.companyAddress, byproduct.companyInfo.companyAddress);
            const pricePerKg = calculatePricePerKg(byproduct.availableByproductAmount, byproduct.availableByproductPrice, byproduct.availableByproductUnit);
            return { ...byproduct.toJSON(), distance, pricePerKg };
        });

        byproducts.sort((a, b) => {
            if (a.distance !== b.distance) return a.distance - b.distance;
            if (a.pricePerKg !== b.pricePerKg) return a.pricePerKg - b.pricePerKg;
            if (a.availableByproductName !== b.availableByproductName) {
                return a.availableByproductName.localeCompare(b.availableByproductName);
            }
            return parseFloat(b.availableByproductAmount) - parseFloat(a.availableByproductAmount);
        });

        const recommendations = byproducts
            .filter(item => parseFloat(item.availableByproductAmount) >= requiredQuantity)
            .map(item => ({
                id: item.id,
                availableByproductName: item.availableByproductName,
                availableByproductAmount: item.availableByproductAmount,
                availableByproductUnit: item.availableByproductUnit,
                availableByproductPrice: item.availableByproductPrice,
                pricePerKg: item.pricePerKg,
                companyName: item.companyInfo.companyName,
                companyAddress: item.companyInfo.companyAddress,
                distance: item.distance,
                reason: generateRecommendationReason(item, requestingCompany.companyAddress, requiredQuantity)
            }));

        res.json({ success: true, recommendations });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

function calculateDistance(address1, address2) {
    const region1 = address1.split(' ')[0];
    const region2 = address2.split(' ')[0];
    return region1 === region2 ? 0 : 1;
}

function calculatePricePerKg(amount, price, unit) {
    const amountInKg = convertToKg(parseFloat(amount), unit);
    return parseFloat(price) / amountInKg;
}

function convertToKg(amount, unit) {
    switch(unit.toLowerCase()) {
        case 'kg':
        case '킬로그램':
            return amount;
        case 'g':
        case '그램':
            return amount / 1000;
        case 't':
        case '톤':
            return amount * 1000;
        default:
            return amount; // 기본값으로 처리
    }
}

function generateRecommendationReason(item, requestingAddress, requiredQuantity) {
    const reasons = [];
    if (item.distance === 0) {
        reasons.push("같은 지역에 위치하고 있어 운송 비용을 절감할 수 있습니다.");
    }
    if (parseFloat(item.availableByproductAmount) > parseFloat(requiredQuantity)) {
        reasons.push("요구 수량보다 많은 양을 보유하고 있어 안정적인 공급이 가능합니다.");
    }
    reasons.push(`1kg당 가격이 ${item.pricePerKg.toFixed(2)}원으로 경제적입니다.`);
    return reasons.join(" ");
}






// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});