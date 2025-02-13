import styles from "@/pages/Introduction/Introduction.module.scss";
import Header from "@/components/common/Header/Header"
import Footer from "@/components/common/Footer/Footer";
import Map from "@/components/common/Map/Map";
import { useState, useEffect } from "react";
import axios from "axios";
import CardSmallIntroduction from "@/components/common/CardList/CardSmallIntroduction/CardSmallIntroduction";
import { useNavigate } from 'react-router-dom';

export const IntroductionPage = () => {
  const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProvince && selectedCity) {
      axios
        .get(
          `http://localhost:5000/api/company-info/${selectedProvince}/${selectedCity}`
        )
        .then((response) => {
          setCompanies(response.data);
        })
        .catch((error) => {
          console.error("기업 정보 가져오기 실패:", error);
        });
    }
  }, [selectedProvince, selectedCity]); 

  const regionMap: { [key: string]: string } = {
    seoul: "서울",
    busan: "부산",
    daegu: "대구",
    incheon: "인천",
    gwangju: "광주",
    daejeon: "대전",
    ulsan: "울산",
    sejong: "세종",
    gyeonggi: "경기도",
    gangwon: "강원도",
    chungbuk: "충청북도",
    chungnam: "충청남도",
    jeonbuk: "전라북도",
    jeonnam: "전라남도",
    gyeongbuk: "경상북도",
    gyeongnam: "경상남도",
    jeju: "제주",
  };

  const cityOptions: { [key: string]: string[] } = {
    서울: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산: [
      "강서구",
      "금정구",
      "기장군",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
    ],
    대구: [
      "남구",
      "달서구",
      "달성군",
      "동구",
      "북구",
      "서구",
      "수성구",
      "중구",
    ],
    인천: [
      "강화군",
      "계양구",
      "남동구",
      "동구",
      "미추홀구",
      "부평구",
      "서구",
      "연수구",
      "옹진군",
      "중구",
    ],
    광주: ["광산구", "남구", "동구", "북구", "서구"],
    대전: ["대덕구", "동구", "서구", "유성구", "중구"],
    울산: ["남구", "동구", "북구", "울주군", "중구"],
    세종: ["세종특별자치시"],
    경기: [
      "가평군",
      "고양시 덕양구",
      "고양시 일산동구",
      "고양시 일산서구",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시 분당구",
      "성남시 수정구",
      "성남시 중원구",
      "수원시 권선구",
      "수원시 영통구",
      "수원시 장안구",
      "수원시 팔달구",
      "시흥시",
      "안산시 단원구",
      "안산시 상록구",
      "안성시",
      "안양시 동안구",
      "안양시 만안구",
      "양주시",
      "양평군",
      "여주시",
      "연천군",
      "오산시",
      "용인시 기흥구",
      "용인시 수지구",
      "용인시 처인구",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
    ],
    강원도: [
      "강릉시",
      "고성군",
      "동해시",
      "삼척시",
      "속초시",
      "양구군",
      "양양군",
      "영월군",
      "원주시",
      "인제군",
      "정선군",
      "철원군",
      "춘천시",
      "태백시",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
    충청북도: [
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "제천시",
      "증평군",
      "진천군",
      "청주시 상당구",
      "청주시 서원구",
      "청주시 청원구",
      "청주시 흥덕구",
      "충주시",
    ],
    충청남도: [
      "계룡시",
      "공주시",
      "금산군",
      "논산시",
      "당진시",
      "보령시",
      "부여군",
      "서산시",
      "서천군",
      "아산시",
      "예산군",
      "천안시 동남구",
      "천안시 서북구",
      "청양군",
      "태안군",
      "홍성군",
    ],
    전라북도: [
      "고창군",
      "군산시",
      "김제시",
      "남원시",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "익산시",
      "임실군",
      "장수군",
      "전주시 덕진구",
      "전주시 완산구",
      "정읍시",
      "진안군",
    ],
    전라남도: [
      "강진군",
      "고흥군",
      "곡성군",
      "광양시",
      "구례군",
      "나주시",
      "담양군",
      "목포시",
      "무안군",
      "보성군",
      "순천시",
      "신안군",
      "여수시",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    경상북도: [
      "경산시",
      "경주시",
      "고령군",
      "구미시",
      "군위군",
      "김천시",
      "문경시",
      "봉화군",
      "상주시",
      "성주군",
      "안동시",
      "영덕군",
      "영양군",
      "영주시",
      "영천시",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
      "포항시 남구",
      "포항시 북구",
    ],
    경상남도: [
      "거제시",
      "거창군",
      "고성군",
      "김해시",
      "남해군",
      "밀양시",
      "사천시",
      "산청군",
      "양산시",
      "의령군",
      "진주시",
      "창녕군",
      "창원시 마산합포구",
      "창원시 마산회원구",
      "창원시 성산구",
      "창원시 의창구",
      "창원시 진해구",
      "통영시",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    제주: ["서귀포시", "제주시"],
  };

  return (
    <div>
      <div className={styles.container}>
        <Header/>
        <p className={styles.title}>With 위니드</p>
        <p className={styles.content}>
          <span>위니드</span>와 함께하는 기업들을 소개하는 페이지예요.
        </p>
      </div>

      <div className={styles.selectGroup}>
        {/* 첫 번째 선택 (시/도 선택) */}
        <div className={styles.selectionMapBox}>
          <p className={styles.subTitle}>지도에서 시·도를 선택해주세요.</p>
          <br />
          <div className={styles.innerMapBox}>
            <Map
              onSelect={(provinceIds: string[]) => {
                const translatedProvinces = provinceIds.map(
                  (id) => regionMap[id]
                );
                setSelectedProvinces(translatedProvinces);
                setSelectedProvince(null);
                setSelectedCity(null);
              }}
            />
          </div>
        </div>

        {/* 두 번째 선택 (시/도 목록, 하나만 선택 가능) */}
        <div className={styles.selectionBox}>
          <p className={styles.subTitle}>시·군을 선택해주세요.</p>
          <br />
          <div className={styles.innerBox}>
            {selectedProvinces.length > 0 ? (
              <div className={styles.scrollBox}>
                {selectedProvinces.map((province) => (
                  <div
                    key={province}
                    className={`${styles.provinceBox} ${selectedProvince === province ? styles.selected : ""}`}
                    onClick={() => {
                      setSelectedProvince(province);
                      setSelectedCity(null);
                    }}
                  >
                    {province}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.subContent}>권역을 선택하면 나타나요.</p>
            )}
          </div>
        </div>

        {/* 세 번째 선택 (시/군 목록) */}
        <div className={styles.selectionBox}>
          <p className={styles.subTitle}>세부 지역을 선택해주세요.</p>
          <br />
          <div className={styles.innerBox}>
            {selectedProvince && selectedProvinces.length > 0 ? (
              <div className={styles.scrollBox}>
                {cityOptions[selectedProvince]?.map((city) => (
                  <div
                    key={city}
                    className={`${styles.cityBox} ${selectedCity === city ? styles.selected : ""}`}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </div>
                ))}
              </div>
            ) : (
              <p className={styles.subContent}>시·군을 선택하면 나타나요.</p>
            )}
          </div>
        </div>
      </div>

        <div className={styles.bottomWrapper}>
          {selectedProvince && selectedCity && (
            <p className={styles.recommendationText}>
              위니드와 함께하는{" "}
              <span>
                {selectedProvince} {selectedCity}
              </span>
              의 기업이에요.
            </p>
          )}

<div className={styles.cardContainerWrapper}>
  {companies.length > 0 ? (
    <div className={styles.cardContainer}>
      {companies.map((company, index) => {
        const latestByproduct=company.byproducts?.[0];

        return (
          <CardSmallIntroduction
            key={index}
            companyName={company.companyName}
            companyAddress={company.companyAddress}
            byproductAmount={latestByproduct?.availableByproductAmount}
            byproductName={latestByproduct?.availableByproductName}
            onClick={() => navigate(`/companyInfoDetail/${company.uniqueId}`, { state: company })}
            style={{ 
              width: "250px",
              padding: "5%"
            }}
          />
        )
      })}
    </div>
  ) : (
    selectedProvince &&
    selectedCity && (
      <p className={styles.subContent}>
        해당 지역의 등록된 기업이 없습니다.
      </p>
    )
  )}
</div>

        </div>
 
      <Footer />
    </div>
  );
};
