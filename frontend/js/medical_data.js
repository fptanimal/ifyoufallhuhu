// ═══════════════════════════════════════════════════════════════
//  MEDICAL_DATA.JS — Dữ liệu y tế xác thực cho game "If You Fall"
//  Nguồn: WHO, CDC, AHA, Bộ Y tế VN, GSA 2025, BV Bạch Mai
//  Cập nhật: 07/2025
// ═══════════════════════════════════════════════════════════════

var MEDICAL_DATA = {

    // ── NGUỒN THAM KHẢO CHÍNH THỨC ──────────────────────────
    sources: {
        GSA2025: { name: 'Hội nghị Liên minh Đột quỵ Toàn cầu (GSA 2025)', location: 'Hà Nội, 24-26/7/2025', abbr: 'GSA 2025' },
        BACHMAI: { name: 'Trung tâm Đột quỵ Bệnh viện Bạch Mai', date: '12/2024', abbr: 'BV Bạch Mai' },
        MOH_VN: { name: 'Bộ Y tế Việt Nam — Cổng thông tin chính thức', abbr: 'Bộ Y tế VN' },
        WSO: { name: 'Tổ chức Đột quỵ Thế giới (WSO)', date: '2024', abbr: 'WSO 2024' },
        WHO: { name: 'Tổ chức Y tế Thế giới (WHO)', abbr: 'WHO' },
        CDC: { name: 'Trung tâm Kiểm soát Bệnh tật Hoa Kỳ (CDC)', abbr: 'CDC' },
        AHA: { name: 'Hiệp hội Tim mạch Hoa Kỳ (AHA)', abbr: 'AHA' },
        LANCET: { name: 'The Lancet — Tạp chí Y khoa hàng đầu', date: '2021', abbr: 'Lancet 2021' },
        NEJM: { name: 'New England Journal of Medicine', abbr: 'NEJM' },
        NIH: { name: 'Viện Sức khỏe Quốc gia Hoa Kỳ (NIH)', abbr: 'NIH' },
        BMJ: { name: 'British Medical Journal — Nutrition', abbr: 'BMJ Nutrition' },
        ACC_AHA: { name: 'American College of Cardiology / AHA', date: '2023', abbr: 'ACC/AHA 2023' },
        SLEEP_MED: { name: 'Sleep Medicine Reviews', abbr: 'Sleep Med Rev' },
        VNEXPRESS: { name: 'VnExpress Sức khỏe', date: '2025', abbr: 'VnExpress' },
        BV115: { name: 'Bệnh viện Nhân dân 115 TP.HCM', abbr: 'BV NĐ 115' },
        CHORAY: { name: 'Bệnh viện Chợ Rẫy', abbr: 'BV Chợ Rẫy' },
        TAMDUC: { name: 'Bệnh viện Tim Tâm Đức', abbr: 'BV Tim TĐ' },
        AI_DATA_PDF: { name: 'Báo cáo thu thập và chuẩn bị dữ liệu bệnh tim mạch và đột quỵ cho mô hình AI', date: 'Báo cáo nội bộ', abbr: 'Báo cáo AI' }
    },

    // ── PHƯƠNG PHÁP LUẬN THU THẬP & CHUẨN BỊ DỮ LIỆU AI ───────
    aiMethodology: {
        title: 'Quy trình thu thập và chuẩn bị dữ liệu Tim mạch & Đột quỵ',
        sources: 'Tích hợp từ MIMIC-IV, GBD 2023, WHO và các y văn chuyên ngành.',
        dataCleansing: 'Xử lý các giá trị khuyết thiếu (Missing values). Các dữ liệu mất < 20% được dùng phương pháp nội suy K-NN, mất > 20% tự động loại để tránh nhiễu.',
        imbalanceHandling: 'Xử lý mất cân bằng dữ liệu bằng kỹ thuật SMOTE (Synthetic Minority Over-sampling Technique) để bù đắp các ca mắc nhồi máu cơ tim trong nhóm khỏe mạnh.',
        featureEngineering: 'Đưa vào các biến trọng số lâm sàng quan trọng: Huyết áp, BMI, Nghề nghiệp (nhóm Holland code), Chất lượng giấc ngủ, Mức cholesterol.'
    },

    // ── THỐNG KÊ ĐỘT QUỴ — VIỆT NAM ────────────────────────
    strokeStatsVN: [
        { indicator: 'Ca đột quỵ mới mỗi năm', value: '~200.000 ca', source: 'Bộ Y tế VN, GSA 2025' },
        { indicator: 'Tỷ lệ mắc mới / 100.000 dân', value: '222 ca', source: 'GSA 2025' },
        { indicator: 'Tỷ lệ hiện mắc / 100.000 dân', value: '1.541 ca', source: 'GSA 2025 — Cao nhất ĐNA' },
        { indicator: 'Tử vong do đột quỵ/năm', value: '~135.999 người', source: 'BV Bạch Mai, dữ liệu 2019' },
        { indicator: 'Bệnh nhân < 45 tuổi', value: '15% tổng số ca', source: 'BV Bạch Mai 12/2024' },
        { indicator: 'Bệnh nhân < 50 tuổi (dịp Tết 2025)', value: '45% tại BV Bạch Mai', source: 'Báo cáo Tết 2025' },
        { indicator: 'Tỷ lệ đến BV trong "giờ vàng" 6h', value: 'Chỉ 33%', source: 'Hội Đột quỵ QT 2025' },
        { indicator: 'Được điều trị tái tưới máu', value: 'Chỉ 14%', source: 'Bộ Y tế VN' },
        { indicator: 'Bệnh viện có khả năng điều trị đột quỵ', value: 'Chỉ 3%', source: 'Bộ Y tế VN' },
        { indicator: 'Số đơn vị đột quỵ toàn quốc', value: '134 đơn vị', source: 'GSA 2025' },
        { indicator: 'Tử vong/tàn phế nếu trễ giờ vàng', value: '> 70%', source: 'BV NĐ 115' }
    ],

    // ── THỐNG KÊ ĐỘT QUỴ — THẾ GIỚI ────────────────────────
    strokeStatsWorld: [
        { indicator: 'Ca đột quỵ mới toàn cầu/năm', value: '12.2 triệu ca', source: 'WSO 2024' },
        { indicator: 'Tử vong do đột quỵ toàn cầu/năm', value: '6.6 triệu người', source: 'WSO 2024' },
        { indicator: 'Người sống sót bị tàn phế', value: '> 110 triệu người', source: 'WSO 2024' },
        { indicator: 'Tỷ lệ tăng đột quỵ người < 45 tuổi', value: '50% trong 15 năm qua', source: 'Lancet Neurology 2024' },
        { indicator: 'Chi phí toàn cầu/năm', value: '> 891 tỷ USD (2.5% GDP)', source: 'WSO 2024' },
        { indicator: 'Cứ mỗi 3 giây', value: '1 người đột quỵ', source: 'WSO 2024' },
        { indicator: 'Cứ mỗi 5 giây', value: '1 người chết vì đột quỵ', source: 'WSO 2024' }
    ],

    // ── YẾU TỐ NGUY CƠ — BẢNG ĐIỂM RỦI RO ─────────────────
    riskFactors: [
        { factor: 'Hút thuốc lá (từ 18 tuổi)', yearsLost: [-8, -10], source: 'WHO, CDC' },
        { factor: 'Ngủ < 3 tiếng/đêm', yearsLost: [-5, -5], source: 'NIH Sleep Research' },
        { factor: 'Thức khuya 2 ngày liên tục', riskIncrease: '300% nguy cơ đột quỵ', source: 'Sleep Medicine Reviews' },
        { factor: 'Làm việc > 12h/ngày kéo dài', yearsLost: [-3, -5], source: 'Lancet 2021' },
        { factor: 'Stress mạn tính > 3 tháng', yearsLost: [-3, -3], source: 'AHA Journal' },
        { factor: 'Ít vận động hoàn toàn', yearsLost: [-3, -3], source: 'WHO Physical Activity Guidelines' },
        { factor: 'BMI > 30 (béo phì)', yearsLost: [-3, -7], source: 'NEJM' },
        { factor: 'Uống rượu nặng', yearsLost: [-5, -8], source: 'WHO' },
        { factor: 'Huyết áp > 160/100 không điều trị', yearsLost: [-5, -5], source: 'ACC/AHA 2023' },
        { factor: '> 4 ly cà phê/ngày', yearsLost: [-1, -2], source: 'BMJ Nutrition' }
    ],

    protectiveFactors: [
        { factor: 'Tập thể dục 5 ngày/tuần', yearsGained: [3, 7], source: 'WHO' },
        { factor: 'Ngủ đủ 7-8 tiếng', yearsGained: [2, 4], source: 'NIH' },
        { factor: 'Chế độ ăn lành mạnh / Địa Trung Hải', yearsGained: [3, 3], source: 'NEJM' },
        { factor: 'Không hút thuốc', yearsGained: [8, 10], source: 'WHO, CDC' },
        { factor: 'Khám sức khỏe định kỳ', yearsGained: [2, 3], source: 'AHA' },
        { factor: 'Quản lý stress tốt', yearsGained: [2, 2], source: 'AHA Journal' },
        { factor: 'Có mạng lưới xã hội tốt', yearsGained: [5, 7], source: 'Lancet 2021' }
    ],

    // ── BẢNG TÍNH AI ĐOÁN TUỔI THỌ (Nâng cấp) ──────────────
    aiScoring: {
        baseLifeExpectancy: { male: 73.6, female: 79.2, source: 'WHO Vietnam Country Profile 2024' },

        // Bảng điểm rủi ro chi tiết — mỗi yếu tố có nguồn
        riskScoring: [
            { id: 'smoking', label: 'Hút thuốc lá', points: -8, source: 'WHO, CDC — Người hút thuốc mất trung bình 8-10 năm tuổi thọ' },
            { id: 'alcohol', label: 'Uống rượu bia nhiều', points: -5, source: 'WHO — Rượu nặng gây xơ gan, tim mạch, ung thư' },
            { id: 'stress', label: 'Stress mãn tính > 3 tháng', points: -3, source: 'AHA Journal — Cortisol gây viêm mạch máu mạn tính' },
            { id: 'overwork', label: 'Làm việc > 12h/ngày', points: -4, source: 'Lancet 2021 — Tăng 17% nguy cơ đột quỵ' },
            { id: 'nosocial', label: 'Cô lập xã hội', points: -5, source: 'Lancet 2021 — Cô đơn nguy hiểm bằng hút 15 điếu/ngày' },
            { id: 'caffeine', label: '> 4 ly cà phê/ngày', points: -1, source: 'BMJ Nutrition — Tăng huyết áp, rối loạn nhịp tim' },
            { id: 'insomnia2d', label: 'Thức trắng 2 ngày liên tục', points: -5, source: 'Sleep Med Reviews — Tăng 300% nguy cơ đột quỵ' },
            { id: 'skipmeal', label: 'Bỏ ăn thường xuyên', points: -2, source: 'NEJM — Suy dinh dưỡng gây suy giảm miễn dịch' },
            { id: 'gameabuse', label: 'Lạm dụng game > 6h/ngày', points: -2, source: 'WHO — Rối loạn game, ít vận động' },
            { id: 'nobreak', label: 'Làm liên tục không nghỉ', points: -2, source: 'AHA — Tăng nguy cơ huyết khối' },
            { id: 'sleep3h', label: 'Ngủ dưới 3 tiếng', points: -5, source: 'NIH — Thiếu ngủ trầm trọng tăng viêm toàn thân' },
            { id: 'longstress', label: 'Stress kéo dài > 3 tháng', points: -3, source: 'AHA — Hormone cortisol gây tổn thương mạch máu' },
            { id: 'sedentary', label: 'Không vận động cả ngày', points: -3, source: 'WHO — Ít vận động là yếu tố nguy cơ tử vong hàng thứ 4' },
            { id: 'energydrink', label: 'Lạm dụng nước tăng lực', points: -2, source: 'AHA — Caffeine + taurine gây rối loạn nhịp' }
        ],

        // Bảng điểm bảo vệ — mỗi yếu tố có nguồn
        protectiveScoring: {
            exercise_excellent: { points: 5, source: 'WHO — Tập 5-6 ngày/tuần giảm 35% nguy cơ tim mạch' },
            exercise_good: { points: 3, source: 'WHO — Tập 3-4 ngày/tuần giảm 20% nguy cơ' },
            exercise_moderate: { points: 1, source: 'WHO — Tập 1-2 ngày/tuần vẫn có lợi' },
            sleep_good: { points: 3, source: 'NIH — Ngủ 7-8h giảm viêm, tăng miễn dịch' },
            diet_excellent: { points: 4, source: 'NEJM — Chế độ ăn Địa Trung Hải +3 năm tuổi thọ' },
            diet_good: { points: 2, source: 'WHO — Ăn đủ chất, hạn chế chế biến sẵn' },
            no_smoking: { points: 8, source: 'WHO, CDC — Không hút thuốc +8-10 năm so với hút' },
            regular_checkup: { points: 2, source: 'AHA — Phát hiện sớm bệnh lý nền' },
            stress_managed: { points: 2, source: 'AHA Journal — Thiền, yoga, hít thở giảm cortisol' },
            good_social: { points: 5, source: 'Lancet 2021 — Mạng lưới xã hội tốt +5-7 năm' }
        },

        // Điểm chỉ số y tế — có nguồn
        medicalScoring: {
            blood_pressure: {
                excellent: { points: 2, desc: '90/60 – 120/80 mmHg', source: 'ACC/AHA 2023' },
                normal: { points: 0, desc: '120/80 – 129/84 mmHg', source: 'ACC/AHA 2023' },
                prehigh: { points: -2, desc: '130/85 – 139/89 mmHg', source: 'ACC/AHA 2023' },
                high1: { points: -4, desc: '140/90 – 159/99 mmHg', source: 'ACC/AHA 2023' },
                high2: { points: -7, desc: '160/100 – 179/109 mmHg → Giảm 5 năm tuổi thọ', source: 'ACC/AHA 2023' },
                crisis: { points: -10, desc: '≥ 180/110 mmHg — KHẨN CẤP', source: 'ACC/AHA 2023' }
            },
            blood_sugar: {
                normal: { points: 1, desc: '3.9 – 5.5 mmol/L', source: 'ADA 2024' },
                prehigh: { points: -2, desc: '6.1 – 6.9 mmol/L — Tiền tiểu đường', source: 'ADA 2024' },
                diabetic: { points: -5, desc: '> 7.0 mmol/L — Tiểu đường', source: 'ADA 2024' },
                severe: { points: -8, desc: '> 10.0 mmol/L — KS kém', source: 'ADA 2024' }
            },
            heart_rate: {
                excellent: { points: 2, desc: '60-75 nhịp/phút', source: 'AHA' },
                normal: { points: 0, desc: '76-85 nhịp/phút', source: 'AHA' },
                high: { points: -2, desc: '86-95 nhịp/phút', source: 'AHA' },
                tachycardia: { points: -5, desc: '> 100 nhịp/phút', source: 'AHA — Tăng gấp đôi nguy cơ tử vong' }
            },
            cholesterol: {
                excellent: { points: 1, desc: 'Dưới mức bình thường', source: 'ACC/AHA 2023' },
                normal: { points: 0, desc: 'Bình thường', source: 'ACC/AHA 2023' },
                high: { points: -4, desc: 'Cao — cần điều chỉnh', source: 'ACC/AHA 2023' },
                veryHigh: { points: -8, desc: 'Rất cao — đang dùng thuốc', source: 'ACC/AHA 2023 — Xơ vữa động mạch' }
            },
            bmi: {
                underweight: { points: -1, range: [0, 18.5], desc: 'Thiếu cân', source: 'WHO' },
                normal: { points: 2, range: [18.5, 24.9], desc: 'Bình thường', source: 'WHO' },
                overweight: { points: -1, range: [25, 29.9], desc: 'Thừa cân', source: 'WHO' },
                obese1: { points: -3, range: [30, 34.9], desc: 'Béo phì độ 1', source: 'WHO — Giảm 3 năm tuổi thọ' },
                obese2: { points: -5, range: [35, 39.9], desc: 'Béo phì độ 2', source: 'NEJM — Giảm 5 năm' },
                obese3: { points: -7, range: [40, 100], desc: 'Béo phì độ 3', source: 'NEJM — Giảm 7 năm' }
            }
        }
    },

    // ── CÂU PHÂN TÍCH AI MẪU ─────────────────────────────────
    aiAnalysisTemplates: {
        highRisk: 'Dữ liệu của bạn cho thấy {riskCount} yếu tố nguy cơ nghiêm trọng đang kết hợp: {riskList}. Theo mô hình tính toán dựa trên dữ liệu WHO và AHA, tuổi thọ ước tính của bạn là {estimatedAge} tuổi — thấp hơn {yearsLost} năm so với trung bình. Tin tốt: các yếu tố này ĐỀU CÓ THỂ thay đổi.',
        mediumRisk: 'Dữ liệu cho thấy bạn đang có một số yếu tố nguy cơ cần lưu ý. {riskDetails} Tuổi thọ ước tính: {estimatedAge} tuổi. Để cải thiện, hãy ưu tiên: {recommendations}.',
        lowRisk: 'Dữ liệu của bạn rất đáng khích lệ. Thói quen lành mạnh của bạn đang bảo vệ sức khỏe hiệu quả. Tuổi thọ ước tính: {estimatedAge} tuổi. Tuy nhiên, đừng chủ quan — hãy tầm soát sức khỏe định kỳ để phát hiện sớm các yếu tố ẩn.',

        riskExplanations: {
            sleep_deprivation: 'Thiếu ngủ làm tăng huyết áp và rối loạn nhịp tim (NIH Sleep Research).',
            sedentary: 'Lối sống ít vận động thúc đẩy xơ vữa động mạch (WHO).',
            work_stress: 'Áp lực công việc kéo dài khiến cơ thể tiết cortisol liên tục — gây viêm mạch máu mạn tính (AHA).',
            poor_diet: 'Chế độ ăn kém gây thiếu hụt vitamin, tăng cholesterol và viêm mạn (NEJM).',
            smoking: 'Thuốc lá gây tổn thương nội mạc mạch máu, tăng nguy cơ huyết khối và ung thư (WHO, CDC).',
            caffeine: 'Lạm dụng caffeine gây rối loạn nhịp tim và tăng huyết áp tạm thời (BMJ Nutrition).',
            alcohol: 'Rượu bia nhiều gây xơ gan, bệnh cơ tim giãn nở và tăng huyết áp (WHO).',
            social_isolation: 'Cô đơn mãn tính tăng 50% nguy cơ tử vong sớm — tương đương hút 15 điếu/ngày (Lancet 2021).'
        }
    },

    // ── TIN TỨC Y TẾ XÁC THỰC (News) ────────────────────────
    verifiedNews: [
        {
            id: 1,
            date: '24/07/2025',
            title: 'Việt Nam Có Tỷ Lệ Đột Quỵ Cao Nhất Đông Nam Á — GSA 2025',
            summary: 'Hội nghị GSA 2025 tại Hà Nội công bố: tỷ lệ hiện mắc đột quỵ tại Việt Nam: 1.541/100.000 dân — cao nhất khu vực. 15% bệnh nhân dưới 45 tuổi. Chỉ 33% đến bệnh viện trong "giờ vàng".',
            source: 'Bộ Y tế VN, GSA 2025',
            url: 'https://moh.gov.vn',
            tag: 'dot_quy'
        },
        {
            id: 2,
            date: '02/02/2025',
            title: 'Tết 2025: 45% Bệnh Nhân Đột Quỵ Tại Bạch Mai Dưới 50 Tuổi',
            summary: 'Dịp Tết Ất Tỵ 2025, 45% bệnh nhân đột quỵ tại BV Bạch Mai dưới 50 tuổi — chủ yếu do uống rượu bia, ăn uống không kiểm soát, ít vận động. Nhiều ca liên quan trực tiếp đến tăng huyết áp không điều trị.',
            source: 'BV Bạch Mai, VnExpress 2/2025',
            url: 'https://vnexpress.net/45-benh-nhan-dot-quy-tai-bach-mai-dip-tet-duoi-50-tuoi-4847592.html',
            tag: 'dot_quy'
        },
        {
            id: 3,
            date: '05/01/2025',
            title: 'Báo Động Trẻ Hóa Bệnh Tim Mạch — Nhiều Ca Biến Chứng Nặng',
            summary: 'Xu hướng trẻ hóa bệnh tim mạch đáng lo ngại. Bệnh viện ghi nhận nhiều ca nhồi máu cơ tim, suy tim ở người dưới 40 tuổi — liên quan stress, thức khuya, ít vận động.',
            source: 'Kênh 14 / BV Đại học Y Dược TP.HCM',
            url: 'https://kenh14.vn/bac-si-canh-bao-xu-huong-tre-hoa-benh-tim-mach-nhieu-ca-bien-chung-nang-215260105143939182.chn',
            tag: 'tim_mach'
        },
        {
            id: 4,
            date: '14/03/2025',
            title: 'Cô Gái 22 Tuổi Bị Đột Quỵ Sau Nhiều Tháng Thức Khuya, Kiệt Sức',
            summary: 'Bùi Thị Ánh Hồng (22 tuổi) làm nail đến khuya nhiều tháng, bỏ ăn, ngủ không đủ giấc. Chẩn đoán: Đột quỵ. Từ cô gái năng động, giờ phải tập đi từng bước một. Ước mơ mở tiệm tan thành mây khói.',
            source: 'Đời sống & Pháp luật, 3/2025',
            url: 'https://doisongphapluat.com.vn/canh-bao-nguoi-tre-dot-quy-vi-lao-luc-lam-viec-khong-ngung-nghi-va-stress-keo-dai-a670189.html',
            tag: 'dot_quy'
        },
        {
            id: 5,
            date: '15/01/2025',
            title: '7 Tiến Bộ Lớn Trong Nghiên Cứu Tim Mạch 2024',
            summary: 'AI phát hiện rung nhĩ qua ảnh chụp đáy mắt, thuốc GLP-1 giảm nguy cơ suy tim, can thiệp không cần mổ hở ngày càng phổ biến. Tuy nhiên: phòng ngừa vẫn hiệu quả hơn điều trị gấp 10 lần.',
            source: 'Thuốc & Sức khỏe, 1/2025',
            url: 'https://thuocsuckhoe.vn/7-tien-bo-lon-trong-nghien-cuu-benh-tim-mach-nam-2024-546',
            tag: 'tim_mach'
        },
        {
            id: 6,
            date: '17/05/2025',
            title: "Combo 'Chết Người': Thức Khuya + Cà Phê + Ít Vận Động",
            summary: 'TS.BS Bùi Phạm Minh Mẫn (BV ĐH Y Dược TP.HCM): Không có yếu tố nguy cơ nào đứng một mình — chúng CỘNG HƯỞNG nhau. Người huyết áp cao + thức khuya + nhiều cà phê = đột quỵ tăng gấp nhiều lần.',
            source: 'Kênh 14 / BV ĐH Y Dược TP.HCM, 5/2025',
            url: 'https://kenh14.vn/bao-dong-dot-quy-o-nguoi-tre-qua-bom-tu-nhung-combo-thoi-quen-tuong-vo-hai-215250517133829101.chn',
            tag: 'dot_quy'
        }
    ],

    // ── DỮ LIỆU CHATBOT BÁC SĨ AI ──────────────────────────
    chatbotKnowledge: {
        dotQuy: {
            definition: 'Đột quỵ (stroke) xảy ra khi nguồn cung cấp máu đến một phần não bị gián đoạn hoặc giảm, ngăn cản mô não nhận oxy và chất dinh dưỡng. Trong vài phút, tế bào não bắt đầu chết.',
            types: [
                { name: 'Đột quỵ thiếu máu (Ischemic)', pct: '87%', desc: 'Do cục máu đông chặn động mạch não' },
                { name: 'Đột quỵ xuất huyết (Hemorrhagic)', pct: '13%', desc: 'Do mạch máu não bị vỡ' }
            ],
            FAST: 'F=Face(méo mặt), A=Arms(yếu tay), S=Speech(nói khó), T=Time(gọi 115 ngay). Mỗi phút chậm trễ = ~1.9 triệu tế bào não chết.',
            goldenTime: '3-4.5 giờ đầu tiên. Sau thời gian này, tỷ lệ tử vong/tàn phế tăng >70%.',
            source: 'WSO 2024, AHA/ASA, BV Bạch Mai'
        },
        huyetAp: {
            definition: 'Huyết áp là lực máu đẩy vào thành động mạch khi tim bơm máu. Huyết áp cao (tăng HA) là khi áp lực này liên tục cao bất thường.',
            levels: [
                { level: 'Bình thường', range: '< 120/80 mmHg' },
                { level: 'Tăng nhẹ', range: '120-129/<80 mmHg' },
                { level: 'THA giai đoạn 1', range: '130-139/80-89 mmHg' },
                { level: 'THA giai đoạn 2', range: '≥ 140/90 mmHg' },
                { level: 'Khẩn cấp', range: '≥ 180/110 mmHg' }
            ],
            fact: '78% bệnh nhân đột quỵ có tiền sử THA không điều trị. THA được gọi là "kẻ giết người thầm lặng" vì KHÔNG có triệu chứng rõ ràng.',
            source: 'ACC/AHA 2023, BV Bạch Mai'
        },
        giấcNgủ: {
            importance: 'Ngủ 7-8 tiếng/đêm tăng 2-4 năm tuổi thọ. Ngủ < 5 tiếng liên tục tăng 48% nguy cơ tim mạch. Ngủ < 3 tiếng tăng 300% nguy cơ đột quỵ.',
            tips: ['Đi ngủ và dậy cùng giờ', 'Không dùng điện thoại 1h trước ngủ', 'Phòng ngủ tối, mát (22-24°C)', 'Tránh caffeine sau 14h', 'Tập thể dục nhẹ buổi chiều'],
            source: 'NIH Sleep Research, Sleep Medicine Reviews'
        },
        stress: {
            mechanism: 'Stress kéo dài → cortisol cao → viêm mạch máu → xơ vữa động mạch → đột quỵ/nhồi máu cơ tim. Stress mãn tính > 3 tháng giảm 3 năm tuổi thọ.',
            fact: 'Căng thẳng kéo dài hại tim hơn cả thuốc lá (AHA Journal). Stress + huyết áp cao = nguy cơ đột quỵ x4.',
            management: ['Hít thở sâu 4-7-8', 'Thiền 10-15 phút/ngày', 'Vận động 30 phút/ngày', 'Nói chuyện với người tin tưởng', 'Giới hạn giờ làm việc'],
            source: 'AHA Journal, Lancet 2021'
        },
        dinhDuong: {
            guidelines: 'Chế độ ăn Địa Trung Hải được chứng minh tăng 3 năm tuổi thọ: nhiều rau, trái cây, cá, dầu olive, ngũ cốc nguyên hạt. Hạn chế đường, muối, đồ chế biến sẵn.',
            warnings: ['Bỏ bữa sáng tăng 87% nguy cơ tim mạch', 'Ăn đêm thường xuyên gây béo phì, đái tháo đường', 'Quá nhiều muối (> 5g/ngày) gây THA'],
            source: 'NEJM, WHO Nutrition Guidelines'
        },
        vanDong: {
            recommendation: 'WHO khuyến nghị: 150-300 phút vận động trung bình/tuần hoặc 75-150 phút vận động mạnh/tuần. Ít vận động là yếu tố nguy cơ tử vong hàng thứ 4 toàn cầu.',
            benefits: ['Giảm 35% nguy cơ tim mạch', 'Giảm 40% nguy cơ tiểu đường type 2', 'Giảm 20% nguy cơ ung thư', 'Cải thiện giấc ngủ', 'Giảm stress, trầm cảm'],
            source: 'WHO Physical Activity Guidelines 2020'
        },
        caffeine: {
            safe: '≤ 400mg/ngày (khoảng 3-4 ly cà phê cỡ nhỏ)',
            risks: '> 4 ly/ngày: Tăng huyết áp, rối loạn nhịp tim, mất ngủ, lo âu. Phụ nữ mang thai: ≤ 200mg/ngày.',
            combo: 'Caffeine + thiếu ngủ + stress = "quả bom hẹn giờ" tim mạch (TS.BS Bùi Phạm Minh Mẫn, BV ĐH Y Dược TP.HCM)',
            source: 'BMJ Nutrition, FDA'
        },
        soCapCuu: {
            CPR: '1. Gọi 115 ngay. 2. Đặt hai tay giữa ngực, ấn mạnh 5-6cm, tốc độ 100-120 lần/phút. 3. Không dừng cho đến khi cấp cứu tới.',
            choking: '1. Đứng sau nạn nhân, ôm quanh bụng. 2. Nắm tay, đặt trên rốn. 3. Ấn mạnh và nhanh hướng lên trên (Heimlich).',
            burn: '1. Ngâm nước mát 10-20 phút (KHÔNG đá lạnh). 2. KHÔNG bôi kem đánh răng, mỡ trăn. 3. Che gạc sạch, đến BV nếu bỏng nặng.',
            source: 'IFRC First Aid Guidelines, AHA'
        }
    },

    // ── HÀM TRẢ LỜI CHATBOT ──────────────────────────────────
    getChatbotResponse: function (question) {
        var q = question.toLowerCase();
        var kb = this.chatbotKnowledge;
        var responses = [];

        // Đột quỵ
        if (q.match(/đột quỵ|stroke|dot quy|trúng gió/)) {
            responses.push('🧠 **VỀ ĐỘT QUỴ:**\n' + kb.dotQuy.definition + '\n\n📊 Loại phổ biến: ' + kb.dotQuy.types[0].name + ' (' + kb.dotQuy.types[0].pct + ') — ' + kb.dotQuy.types[0].desc + '\n\n⏰ Thời gian vàng: ' + kb.dotQuy.goldenTime + '\n\n🚨 QUY TẮC FAST: ' + kb.dotQuy.FAST + '\n\n📌 *Nguồn: ' + kb.dotQuy.source + '*');
        }
        // Huyết áp
        if (q.match(/huyết áp|huyet ap|blood pressure|tăng ha|tha/)) {
            var lvlStr = kb.huyetAp.levels.map(function (l) { return '• ' + l.level + ': ' + l.range; }).join('\n');
            responses.push('💉 **VỀ HUYẾT ÁP:**\n' + kb.huyetAp.definition + '\n\nPhân loại:\n' + lvlStr + '\n\n⚠ ' + kb.huyetAp.fact + '\n\n📌 *Nguồn: ' + kb.huyetAp.source + '*');
        }
        // Giấc ngủ
        if (q.match(/ngủ|ngu|sleep|mất ngủ|thiếu ngủ|insomnia/)) {
            responses.push('😴 **VỀ GIẤC NGỦ:**\n' + kb.giấcNgủ.importance + '\n\n💡 Mẹo ngủ ngon:\n' + kb.giấcNgủ.tips.map(function (t) { return '• ' + t; }).join('\n') + '\n\n📌 *Nguồn: ' + kb.giấcNgủ.source + '*');
        }
        // Stress
        if (q.match(/stress|căng thẳng|lo lắng|anxiety|trầm cảm|depression/)) {
            responses.push('😰 **VỀ STRESS:**\n' + kb.stress.mechanism + '\n\n⚡ ' + kb.stress.fact + '\n\n💡 Cách quản lý:\n' + kb.stress.management.map(function (t) { return '• ' + t; }).join('\n') + '\n\n📌 *Nguồn: ' + kb.stress.source + '*');
        }
        // Dinh dưỡng
        if (q.match(/ăn|dinh dưỡng|nutrition|diet|bữa ăn|thức ăn/)) {
            responses.push('🍎 **VỀ DINH DƯỠNG:**\n' + kb.dinhDuong.guidelines + '\n\n⚠ Cảnh báo:\n' + kb.dinhDuong.warnings.map(function (t) { return '• ' + t; }).join('\n') + '\n\n📌 *Nguồn: ' + kb.dinhDuong.source + '*');
        }
        // Vận động
        if (q.match(/tập|vận động|exercise|thể dục|gym|chạy bộ/)) {
            responses.push('🏃 **VỀ VẬN ĐỘNG:**\n' + kb.vanDong.recommendation + '\n\nLợi ích:\n' + kb.vanDong.benefits.map(function (t) { return '• ' + t; }).join('\n') + '\n\n📌 *Nguồn: ' + kb.vanDong.source + '*');
        }
        // Caffeine / Cà phê
        if (q.match(/cà phê|cafe|coffee|caffeine|ca phe/)) {
            responses.push('☕ **VỀ CAFFEINE:**\nMức an toàn: ' + kb.caffeine.safe + '\n\n⚠ Nguy cơ khi quá liều: ' + kb.caffeine.risks + '\n\n💣 ' + kb.caffeine.combo + '\n\n📌 *Nguồn: ' + kb.caffeine.source + '*');
        }
        // Sơ cấp cứu
        if (q.match(/sơ cứu|cấp cứu|cpr|hô hấp|bỏng|nghẹn|heimlich|first aid/)) {
            responses.push('🚑 **SƠ CẤP CỨU:**\n\n💔 CPR (Hồi sinh tim phổi):\n' + kb.soCapCuu.CPR + '\n\n🔥 Bỏng:\n' + kb.soCapCuu.burn + '\n\n📌 *Nguồn: ' + kb.soCapCuu.source + '*');
        }
        // Tim mạch
        if (q.match(/tim|heart|tim mạch|nhồi máu|suy tim/)) {
            responses.push('🫀 **VỀ TIM MẠCH:**\nBệnh tim mạch là nguyên nhân tử vong số 1 toàn cầu (~17.9 triệu người/năm). Tại Việt Nam, xu hướng trẻ hóa đáng báo động — nhiều ca biến chứng nặng ở người dưới 40 tuổi.\n\nYếu tố nguy cơ chính: Huyết áp cao, cholesterol cao, tiểu đường, hút thuốc, ít vận động, stress mãn tính.\n\n📌 *Nguồn: WHO, AHA, BV Tim Tâm Đức*');
        }

        if (responses.length === 0) {
            // Trả lời tổng quát với dữ liệu thống kê
            responses.push('Cảm ơn câu hỏi của bạn. Dưới đây là một số thông tin quan trọng:\n\n🇻🇳 Tại Việt Nam: ~200.000 ca đột quỵ mới mỗi năm, 15% ở người < 45 tuổi (GSA 2025, Bộ Y tế VN).\n\n⏰ Thời gian vàng: 3-4.5 giờ đầu — chỉ 33% bệnh nhân đến BV kịp thời.\n\n💡 Phòng ngừa: Ngủ đủ 7-8h, tập thể dục 150 phút/tuần, kiểm soát huyết áp, ăn uống lành mạnh.\n\nBạn muốn hỏi cụ thể về: đột quỵ, huyết áp, giấc ngủ, stress, dinh dưỡng, vận động, cà phê, hay sơ cấp cứu?');
        }

        return responses.join('\n\n---\n\n');
    }
};
