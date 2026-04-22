// ═══════════════════════════════════════════════════════════════
//  STORY_DATA.JS — Dữ liệu cốt truyện game "If You Fall"
//  Nguồn: Tài liệu gốc biên soạn dựa trên dữ liệu y tế xác thực
//  Cập nhật: 07/2025
// ═══════════════════════════════════════════════════════════════

var STORY_DATA = {

    // ── NHÂN VẬT CHÍNH ──────────────────────────────────────
    protagonist: {
        name: 'Trần Văn Minh',
        age: 34,
        job: 'Nhân viên IT / Lập trình viên',
        company: 'Công ty tư nhân tại Hà Nội',
        hometown: 'Nam Định, lên Hà Nội từ năm 22 tuổi',
        appearance: 'Gương mặt thư sinh nhưng có quầng mắt thâm. Tóc bắt đầu rụng ở đỉnh đầu. Hay mang theo ly cà phê, hiếm khi mỉm cười thực sự.',
        personality: 'Trầm lặng, chịu đựng, không bao giờ kêu ca. Có trách nhiệm đến mức không biết từ chối. Tự ti về học vấn, bù đắp bằng làm việc gấp đôi.',
        hiddenHealth: 'Tiền sử huyết áp cao nhẹ từ 2 năm trước, chưa điều trị. Hay bị đau đầu nhưng coi là bình thường.',
        weaknesses: [
            'Cảm thấy mình "không đủ tốt" — làm nhiều hơn để bù lại',
            'Sợ nhìn vào tài khoản ngân hàng',
            'Không dám nói chuyện thật với vợ về tài chính',
            'Hay nhìn ảnh con gái lúc 2h sáng và tự nhủ "thêm một đêm nữa thôi"'
        ]
    },

    // ── NHÂN VẬT PHỤ ─────────────────────────────────────────
    characters: {
        mai: {
            name: 'Nguyễn Thị Mai',
            relation: 'Vợ Minh',
            age: 32,
            job: 'Giáo viên tiểu học',
            personality: 'Mạnh mẽ nhưng che giấu nỗi lo. Yêu chồng theo kiểu người Việt — ít nói "yêu" nhưng để phần ăn ngon cho chồng.',
            conflict: 'Biết chồng kiệt sức nhưng cũng biết tiền không đủ. Vừa muốn bảo chồng nghỉ, vừa lo không ai kiếm tiền.',
            dialogues: [
                'Anh ăn đi, em thấy anh gầy hơn tuần trước rồi.',
                'Đừng làm đêm nữa anh ơi. Tiền thiếu thì mình tính sau, nhưng anh mà đổ bệnh thì...',
                'Con Linh hỏi ba có về ăn cơm tối không. Em không biết nói sao.',
                'Anh không cần phải một mình gánh hết. Mình là vợ chồng mà.',
                'Em không cần anh giàu. Em cần anh ở đây.',
                'Anh cứ nói "thêm một đêm nữa thôi". Nhưng em ngồi đếm — đó là đêm thứ 47 rồi anh ơi.',
                'Người ta nói căng thẳng kéo dài hại tim hơn cả thuốc lá. Anh có biết điều đó không?'
            ],
            gameRole: 'Khi chỉ số Tình cảm vợ < 50%, Mai sẽ gõ cửa phòng — trigger nhắc nhở. Khi = 0%, kết thúc bi kịch.'
        },
        linh: {
            name: 'Nguyễn Khánh Linh',
            relation: 'Con gái Minh',
            age: 7,
            nickname: 'Bé Linh, cục cưng',
            personality: 'Lanh lợi, hay hỏi vặn, vẽ tranh tặng ba mỗi tuần. Mỗi bức tranh đều có ba mặt cười.',
            medicalNote: 'Tim bẩm sinh thông liên thất nhỏ, đã theo dõi từ lúc sinh. Cần phẫu thuật.',
            dialogues: [
                'Ba ơi ba mệt hả? Con xoa lưng cho ba nhé!',
                'Ba đừng uống cà phê nữa, cô giáo nói cà phê không tốt cho tim.',
                'Con ước ba không đi làm. Con muốn ba chơi cùng con.',
                'Ba ơi, sao ba hay nhăn mặt vậy? Ba đau ở đâu không?',
                'Ba ơi tim con hồi đó bị hở, bác sĩ đã vá lại rồi. Còn tim ba, ai vá cho ba vậy?',
                'Cô giáo dạy: tim đập khỏe khi mình vui. Ba có vui không?'
            ],
            gameRole: 'Xuất hiện cuối ngày — nếu Minh về sớm, Linh chạy ra ôm. Phần thưởng cảm xúc tích cực duy nhất.'
        },
        thanh: {
            name: 'Bá Thành',
            relation: 'Đồng nghiệp',
            age: 36,
            nickname: 'Thành béo',
            personality: 'Vui tính, hay pha trò, nhưng đang che giấu trầm cảm nhẹ. Đã từng bị TIA 1 năm trước nhưng không nói với ai.',
            role: 'GƯƠNG PHẢN CHIẾU của Minh — người chơi thấy tương lai của Minh qua Thành.',
            dialogues: [
                'Mày lo gì? Tao còn trẻ, còn khỏe. Ngủ 4 tiếng là đủ rồi!',
                'Cơ thể như cái máy — cứ cho chạy, lúc nào hỏng thì sửa.',
                'Đợt trước tao bị tê tay một buổi, chắc ngồi sai tư thế.',
                'Mày ơi... Tao vừa ở bệnh viện ra. Bác sĩ nói tao suýt...'
            ],
            dialoguesAfterStroke: [
                'Tao từng nghĩ ngủ ít là tao dũng cảm. Giờ tao biết đó là ngu.',
                'Bác sĩ nói với tao: Mỗi đêm thiếu 1 tiếng ngủ, cơ thể mày phải bù bằng 3 ngày. Nhưng mày không bao giờ bù được nếu cứ tiếp tục.',
                'Huyết áp mày bao nhiêu? Không biết hả? Đó là vấn đề đấy.'
            ],
            lesson: 'Nhân vật "cảnh báo sống" — người chơi thấy Thành đổ bệnh sẽ bắt đầu thay đổi hành vi.'
        },
        huong: {
            name: 'Chị Hương',
            relation: 'Trưởng phòng',
            age: 42,
            personality: 'Chuyên nghiệp, không ác nhưng vô cảm theo kiểu hệ thống. Tự mình cũng làm 12h/ngày nên coi đó là bình thường.',
            dialogues: [
                'Deadline là deadline. Team mình không có chỗ cho người không kịp tiến độ.',
                'Minh ơi, anh Phúc vừa nghỉ, em cover thêm phần của anh ấy được không?',
                'Em trông có vẻ mệt đấy. Uống thêm cà phê đi.',
                'Ừ, nhưng mà cái báo cáo...'
            ],
            role: 'Đại diện cho áp lực xã hội/công việc vô hình. Không xấu — chỉ là một phần của hệ thống tạo ra bệnh tật.'
        },
        bacsiHang: {
            name: 'BS. Nguyễn Thu Hằng',
            relation: 'Bác sĩ tim mạch',
            age: 45,
            personality: 'Ân cần, nói thẳng, 20 năm kinh nghiệm tim mạch.',
            dialogues: [
                'Huyết áp của anh là 148/95. Không nguy hiểm ngay bây giờ, nhưng đây là lời cảnh báo.',
                'Anh ngủ mấy tiếng một đêm? 4-5 tiếng? Anh đang tự rút ngắn tuổi thọ của mình đấy.',
                '78% bệnh nhân đột quỵ tôi điều trị đều có tiền sử tăng huyết áp không điều trị. Anh không muốn là con số 79% chứ?',
                'Thuốc tôi kê chỉ là giải pháp tạm. Giải pháp thật là: ngủ đủ giấc, bớt stress, ăn uống điều độ.',
                'Huyết áp cao không có triệu chứng rõ ràng — đó là tại sao nó được gọi là "kẻ giết người thầm lặng".',
                'Thời gian vàng sau đột quỵ chỉ 3 đến 4,5 giờ. Sau đó, mỗi phút có gần 2 triệu tế bào não chết. Đây không phải con số tôi đặt ra — đây là thực tế.',
                'Khám sức khỏe định kỳ không phải xa xỉ — đó là đầu tư ít tốn kém nhất bạn có thể làm.',
                'Stress kéo dài + huyết áp cao = nguy cơ đột quỵ tăng gấp 4 lần. Tôi nói thật đấy.',
                'Huyết áp 162/100. Cholesterol cao. Nhịp tim rối loạn nhẹ. Anh Minh, nếu anh tiếp tục như này thêm 6 tháng... tôi không thể đảm bảo anh sẽ ổn.'
            ],
            role: 'Cung cấp thông tin y tế xác thực, lồng ghép tự nhiên vào câu chuyện.'
        }
    },

    // ── CỐT TRUYỆN 3 CHƯƠNG ─────────────────────────────────
    chapters: [
        {
            id: 1,
            title: 'VÌ CON GÁI',
            subtitle: 'Chương 1',
            days: 32,
            goal: 50000000,
            intro: 'Đêm thứ Tư. 2:17 sáng.\nÁnh đèn màn hình xanh le lói trong căn phòng tối. Minh, 34 tuổi, ngồi trước máy tính — lưng khom, mắt đỏ hoe, ngón tay vẫn gõ phím dù đầu óc đã tê liệt từ nửa tiếng trước.\n\nTrên bàn: 3 ly cà phê — 2 cái rỗng, 1 cái nguội ngắt.\n\nĐiện thoại rung. Tin nhắn từ Mai: "Anh ơi anh về chưa? Con Linh lên sốt. Em lo quá."\n\nMinh nhìn màn hình, nhìn tin nhắn, rồi nhìn lại màn hình.\nAnh gõ: "Em ngủ trước đi, anh làm xong cái này rồi về."\n\nNhưng "cái này" sẽ mất thêm 3 tiếng nữa. Và anh biết điều đó.',
            triggerEvent: 'Ngày 3: Bác sĩ gọi điện. Bé Linh cần phẫu thuật tim. Chẩn đoán: thông liên thất. Cần mổ trong 30-35 ngày. Chi phí: 50 triệu đồng (BHYT chi trả 60%). Tài khoản Minh: 8 triệu đồng.',
            medicalPopup: {
                title: '📋 THÔNG TIN Y TẾ: THÔNG LIÊN THẤT',
                content: 'Thông liên thất (VSD) là dị tật tim bẩm sinh phổ biến nhất. Lỗ thủng trên vách ngăn giữa hai buồng tim dưới khiến máu giàu oxy trộn lẫn với máu nghèo oxy.\n\nNếu không phẫu thuật kịp thời, VSD lớn có thể gây:\n• Suy tim sung huyết\n• Tăng áp phổi không hồi phục\n• Viêm nội tâm mạc nhiễm khuẩn\n\nTỷ lệ thành công phẫu thuật VSD tại Việt Nam: > 95% (BV Nhi TW).',
                source: 'Bệnh viện Nhi Trung ương, Hội Tim mạch Việt Nam'
            },
            endingGood: 'Linh mổ thành công. Minh ôm con trong phòng hậu phẫu. Bé cười: "Ba ơi, tim con đập khỏe lắm!"\n\nNhưng đêm hôm đó, Minh ngồi một mình ở hành lang bệnh viện. Anh cảm thấy ngực mình đau nhẹ — không biết vì cảm xúc hay vì cơ thể đang kêu cứu.',
            endingBad: 'Minh không kịp kiếm đủ tiền. Lịch phẫu thuật bị hoãn.\n\nBác sĩ nói: "Mỗi ngày chậm trễ, phổi cháu sẽ chịu thêm áp lực."\n\nMinh đứng ngoài phòng bệnh, nhìn Linh qua ô cửa kính. Bé đang ngủ.\n\nAnh tự nhủ: "Mình sẽ làm bất cứ giá nào."\n\nVà đó — chính là vấn đề.',
            endMedicalNote: '🏥 Mỗi năm Việt Nam có ~200.000 ca đột quỵ mới. 15% là người dưới 45 tuổi. Nhiều người là trụ cột gia đình như Minh. Hãy nhớ quy tắc FAST và gọi 115 ngay khi thấy dấu hiệu.\n\n— Nguồn: Bộ Y tế VN, GSA 2025'
        },
        {
            id: 2,
            title: 'NỢ CHỒNG NỢ',
            subtitle: 'Chương 2',
            days: 36,
            goal: 95000000,
            intro: 'Linh đã mổ xong. Thành công.\n\nNhưng để có 50 triệu đúng hạn, Minh đã vay 30 triệu từ một ứng dụng cho vay nhanh — lãi suất 25%/tháng.\n\nKhi tỉnh dậy sau kỳ phẫu thuật của Linh, Minh nhìn vào điện thoại: số nợ đã là 78 triệu đồng sau 1 tháng tính lãi. Với thêm chi phí hậu phẫu: 95 triệu đồng.\n\nMinh của Chương 2 không còn là người bình tĩnh chịu đựng. Anh bắt đầu lo lắng hơn, cáu kỉnh hơn. Anh ngủ được 3-4 tiếng nhưng hay giật mình giữa đêm vì ác mộng về tiền.',
            midChapterEvent: {
                day: 18,
                title: 'THÀNH NGÃ BỆNH',
                text: 'Ngày 18. Thành không lên văn phòng. Điện không bắt máy.\n\nChiều hôm đó, vợ Thành nhắn vào group: "Anh Thành đang ở bệnh viện. Đột quỵ nhẹ. Đang ổn nhưng cần nghỉ ngơi dài."\n\nGroup văn phòng im lặng 10 phút.\nRồi chị Hương nhắn: "Mọi người sắp xếp phân chia công việc của anh Thành nhé."\n\nMinh nhìn tin nhắn, tay run nhẹ. Anh gõ vào ô tìm kiếm: "triệu chứng đột quỵ ở người trẻ".\nĐọc xong danh sách — anh nhận ra 3 trong số đó anh đã từng trải qua.'
            },
            endingGood: 'Minh trả xong nợ. Nhưng đêm trả nợ cuối, anh ngồi trong nhà vệ sinh khóa cửa — không phải vì buồn, mà vì không muốn Mai thấy mình run.\n\nMinh nhìn gương. Người trong gương trông già hơn 5 tuổi so với 3 tháng trước.\n\nAnh mở cửa: "Ổn rồi em. Xong rồi."\n\nMai nhìn chồng một lúc. Rồi ôm anh.\n"Anh đừng bao giờ làm vậy một mình nữa nhé."',
            endingBad: 'Minh không trả nổi nợ. Tin nhắn đe dọa từ ứng dụng. Huyết áp tăng vọt.\n\nMột đêm, giữa cơn ác mộng về tiền, Minh tỉnh dậy với cơn đau ngực.\n\nAnh không biết đó là cơn hoảng loạn hay tim đang gửi tín hiệu cuối cùng.',
            endMedicalNote: '🏥 Stress kéo dài + huyết áp cao = nguy cơ đột quỵ tăng gấp 4 lần. Mỗi phút sau đột quỵ, gần 2 triệu tế bào não chết đi.\n\nChỉ 33% bệnh nhân đột quỵ tại Việt Nam đến bệnh viện trong "giờ vàng" 6 tiếng đầu.\n\n— Nguồn: Hội Đột quỵ Quốc tế, BV Bạch Mai 2025'
        },
        {
            id: 3,
            title: 'GIỜ PHÚT CUỐI CÙNG',
            subtitle: 'Chương 3',
            days: 40,
            goal: 185000000,
            intro: 'Mẹ Minh — bà Ngọc, 62 tuổi — được chẩn đoán ung thư tử cung giai đoạn 2.\n\nĐiều trị bằng hóa xạ trị kết hợp. Chi phí: 185 triệu đồng. Bác sĩ cho 40 ngày để bắt đầu.\n\nNgày 10, Minh bị ngất ở văn phòng. Không phải đột quỵ — nhưng là lời cảnh báo cuối cùng từ cơ thể.\n\nTại bệnh viện, bác sĩ Hằng đọc kết quả:\n"Huyết áp 162/100. Cholesterol cao. Nhịp tim rối loạn nhẹ. Anh Minh, nếu anh tiếp tục như này thêm 6 tháng... tôi không thể đảm bảo anh sẽ ổn."\n\nLần đầu tiên trong 3 chương, Minh tự hỏi: "Nếu mình không còn ở đây... thì sao?"',
            specialMechanic: {
                title: 'CƠ CHẾ LỰA CHỌN',
                options: [
                    { label: 'Làm việc cường độ cao', desc: 'Kiếm tiền nhanh hơn nhưng HP giảm nhanh gấp đôi' },
                    { label: 'Điều chỉnh nhịp độ', desc: 'Kiếm tiền chậm hơn nhưng HP ổn định. Cần quản lý thời gian thông minh.' },
                    { label: 'Nhờ sự giúp đỡ', desc: 'Mở khóa khi TC-vợ > 80%. Mai vay được 30 triệu từ trường học.' }
                ],
                lesson: 'Đây là lần đầu tiên game cho người chơi thấy: nhờ người khác không phải yếu đuối.'
            },
            endingGood: '40 ngày. Mẹ bắt đầu hóa trị.\n\nMinh ngồi bên giường bệnh, cầm tay mẹ.\nBà Ngọc nhìn con: "Con gầy quá rồi."\nBà lắc đầu: "Con không biết giả vờ. Mẹ là mẹ của con."\n\nMinh cúi đầu. Không nói.',
            endingGoodMessage: 'Minh đã làm được điều mà hàng nghìn người Việt mỗi năm không làm được — anh đã đến bờ vực và bước lại.\n\nNhưng hành trình thực sự chỉ bắt đầu từ đây: học cách sống, không chỉ học cách kiếm sống.',
            endingWorst: 'Ngày 31. Minh ngã trong phòng tắm.\n\nLinh — bé Linh 7 tuổi — nghe tiếng động, chạy vào.\n\n"Ba ơi ba sao vậy? Ba ơi!"',
            endingWorstMessage: 'Mỗi năm tại Việt Nam, hàng chục nghìn gia đình mất đi người thân vì đột quỵ và bệnh tim mạch. Nhiều nạn nhân dưới 45 tuổi. Nhiều người trong số họ là trụ cột gia đình.\n\nHãy chăm sóc bản thân — vì những người yêu thương bạn.',
            endMedicalNote: '🏥 Tại Việt Nam, tỷ lệ hiện mắc đột quỵ là 1.541/100.000 dân — CAO NHẤT Đông Nam Á. 45% bệnh nhân tại BV Bạch Mai dịp Tết 2025 ở độ tuổi dưới 50.\n\n— Nguồn: GSA 2025, BV Bạch Mai 12/2024'
        }
    ],

    // ── SỰ KIỆN NGẪU NHIÊN ──────────────────────────────────
    randomEvents: {
        positive: [
            {
                id: 'linh_draw',
                title: '🎨 Bé Linh Vẽ Tranh',
                text: 'Minh nhìn bức tranh: ba đang ngủ ngon.\n"Ba ơi, ba cần ngủ nhiều hơn."',
                effect: { hp: 15 },
                condition: 'Nghỉ ngơi ngay tối hôm đó'
            },
            {
                id: 'mai_cook',
                title: '🍲 Mai Nấu Món Ba Thích',
                text: 'Cơm canh chua cá lóc. Cả nhà ăn cùng nhau.\nMinh cảm thấy ấm áp trong lòng.',
                effect: { hp: 10, relWife: 8 }
            },
            {
                id: 'thanh_call',
                title: '📞 Thành Gọi Điện Từ Bệnh Viện',
                text: '"Mày ơi, tao vừa nói chuyện với bác sĩ. Họ nói nếu tao đến sớm hơn 2 tiếng... Mày nghỉ ngơi đi nhé. Nghiêm túc đấy."',
                effect: { hp: 5 },
                triggerMedicalPopup: true,
                medicalTopic: 'TIA'
            }
        ],
        negative: [
            {
                id: 'ac_broken',
                title: '❄️ Máy Điều Hòa Hỏng',
                text: 'Chi phí sửa chữa bất ngờ: -8.000.000đ\nMinh phải quyết định: cắt chi tiêu hay làm thêm?',
                effect: { money: -8000000 }
            },
            {
                id: 'linh_sick',
                title: '🤒 Con Linh Ốm Sốt',
                text: 'Linh sốt cao, cần ở nhà chăm. Minh không ngủ được vì lo lắng.\n-2 ngày làm việc hiệu quả.',
                effect: { hp: -10, dayLost: 2 }
            },
            {
                id: 'extra_project',
                title: '📋 Chị Hương Giao Thêm Dự Án',
                text: '"Minh ơi, em cover thêm phần của anh Phúc nhé?"\nThêm tiền nhưng cũng thêm kiệt sức.',
                effect: { money: 5000000, hp: -15, fatigue: 20 }
            },
            {
                id: 'overtime_group',
                title: '💬 Group "Tăng Ca"',
                text: 'Đồng nghiệp mới join group "tăng ca". Minh nhận ra cả văn phòng đang kiệt sức — không chỉ mình anh.',
                effect: { hp: -5 }
            }
        ]
    },

    // ── THÔNG TIN Y TẾ TRONG GAME (Pop-up) ──────────────────
    medicalPopups: {
        TIA: {
            title: '⚠ THÔNG TIN Y TẾ: CƠN THIẾU MÁU NÃO THOÁNG QUA (TIA)',
            content: 'TIA (Transient Ischemic Attack) là "đột quỵ mini" — triệu chứng giống đột quỵ nhưng tự hết trong vài phút đến vài giờ.\n\n⚠ NHƯNG TIA LÀ LỜI CẢNH BÁO:\n• 1/3 người bị TIA sẽ bị đột quỵ thật trong tương lai\n• 15% bị đột quỵ trong 3 tháng đầu sau TIA\n\nDấu hiệu TIA:\n• Tê yếu đột ngột một bên mặt/tay/chân\n• Nói khó, nói ngọng bất thường\n• Mờ mắt đột ngột một hoặc hai bên\n• Chóng mặt dữ dội, mất thăng bằng\n\nNếu có BẤT KỲ dấu hiệu nào — GỌI 115 NGAY.',
            source: 'American Stroke Association, BV Bạch Mai'
        },
        FAST: {
            title: '🚨 QUY TẮC F.A.S.T — NHẬN BIẾT ĐỘT QUỴ',
            content: 'F — Face: Mặt bị méo, cười lệch một bên\nA — Arms: Không giơ nổi hai tay cùng lúc\nS — Speech: Nói lắp, nói ngọng bất thường\nT — Time: GỌI 115 NGAY LẬP TỨC!\n\nMỗi phút sau đột quỵ, gần 2 TRIỆU tế bào não chết đi.\nThời gian vàng: 3 - 4,5 giờ đầu tiên.',
            source: 'World Stroke Organization (WSO), AHA/ASA 2024'
        },
        BLOOD_PRESSURE: {
            title: '💉 HUYẾT ÁP CAO — KẺ GIẾT NGƯỜI THẦM LẶNG',
            content: 'Huyết áp cao KHÔNG có triệu chứng rõ ràng — đó là tại sao nó được gọi là "kẻ giết người thầm lặng".\n\n78% bệnh nhân đột quỵ có tiền sử tăng huyết áp KHÔNG được điều trị.\n\nPhân loại huyết áp:\n• Bình thường: < 120/80 mmHg\n• Cao: 130-139/80-89 mmHg\n• Rất cao: ≥ 140/90 mmHg\n• Khẩn cấp: ≥ 180/110 mmHg\n\nHuyết áp ≥ 160/100 kéo dài không điều trị → giảm tuổi thọ trung bình 5 năm.',
            source: 'ACC/AHA 2023, BV Bạch Mai 2024'
        },
        STRESS_HEART: {
            title: '💔 STRESS VÀ TIM MẠCH',
            content: 'Căng thẳng kéo dài khiến cơ thể tiết cortisol liên tục — gây viêm mạch máu mạn tính.\n\nStress mạn tính > 3 tháng → giảm tuổi thọ trung bình 3 năm.\nStress + huyết áp cao = nguy cơ đột quỵ tăng GẤP 4 LẦN.\n\nDấu hiệu stress mãn tính:\n• Mất ngủ, ngủ không sâu\n• Đau đầu, đau vai gáy\n• Cáu gắt, khó tập trung\n• Tim đập nhanh khi nghỉ\n• Đổ mồ hôi tay',
            source: 'AHA Journal, Lancet 2021'
        }
    },

    // ── THỐNG KÊ "THỰC TẾ ĐÁNG SỢ" (sau mỗi chương) ──────
    scaryStats: {
        calcPerMinute: {
            worldStroke: 0.33,  // ~17 triệu ca/năm toàn cầu = ~32 ca/giờ = 0.53/phút
            vnStroke: 0.38,     // 200.000 ca/năm VN = ~22 ca/giờ = 0.37/phút
            vnUnder45Pct: 0.15  // 15% < 45 tuổi
        },
        template: function(playMinutes) {
            var worldCases = Math.round(playMinutes * 0.53);
            var vnCases = Math.round(playMinutes * 0.38);
            var vnYoung = Math.round(vnCases * 0.15);
            return 'Trong ' + playMinutes + ' phút bạn chơi chương này:\n\n🌍 Trên toàn thế giới có ~' + worldCases + ' ca đột quỵ xảy ra\n🇻🇳 Tại Việt Nam, ~' + vnCases + ' người bị đột quỵ\n👤 Trong số họ, ~' + vnYoung + ' người dưới 45 tuổi';
        }
    },

    // ── CHECKLIST SỨC KHỎE ───────────────────────────────────
    healthChecklist: [
        'Đo huyết áp hôm nay',
        'Ngủ đủ 7 tiếng đêm qua',
        'Ăn sáng trước 9h',
        'Uống đủ 2 lít nước',
        'Vận động 30 phút',
        'Không uống quá 2 ly cà phê',
        'Nghỉ giải lao mỗi 2 tiếng',
        'Ăn tối cùng gia đình',
        'Không làm việc sau 22h',
        'Học quy tắc FAST hôm nay'
    ]
};
