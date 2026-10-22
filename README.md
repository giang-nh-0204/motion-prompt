# motionsites

Bộ sưu tập 35 trang landing / hero độc lập, mỗi trang nằm trong một thư mục riêng. Mỗi trang được dựng từ một bản mô tả chi tiết (spec) rồi kiểm tra bằng Chrome headless ở nhiều kích thước màn hình trước khi commit.

> **TL;DR (English):** 35 self-contained landing-page heroes, one folder each. Most are a single `index.html` with inline CSS/JS and self-hosted fonts. Open directly or serve the folder; pages marked *server* need `python -m http.server`.

## Cách chạy

Phần lớn các trang là **một file `index.html`** duy nhất, mở trực tiếp bằng trình duyệt là chạy. Một số trang dùng ES module, `fetch` hoặc đường dẫn tuyệt đối nên cần server tĩnh:

```bash
cd <thư-mục-trang>
python -m http.server 3000
# mở http://127.0.0.1:3000/
```

Sáu dự án dùng Vite/Next thì cài và chạy như bình thường:

```bash
cd mainframe      # hoặc kollektiva, toonhub, jack-portfolio, synapsex, studio-footer
npm install
npm run dev
```

## Danh sách trang

| Thư mục | Nội dung | Kỹ thuật chính | Chạy |
|---|---|---|---|
| `camper` | Hero trại hè mùa đông, JS chọn 3 chế độ bố cục exact/tablet/compact | Web Animations, pill-to-drawer menu | file |
| `cutora` | Trang đăng nhập app dựng video, tháp kính hoàng hôn | 3 artboard desktop/dọc/ngang | file |
| `design-world` | Khối lập phương kính Three.js r169 | shader khúc xạ hai pass | server |
| `eclipsio` | Hero nhật thực cho trình tạo website cá nhân | marquee logo kính, stack một màn | file |
| `ethan-vale` | Quả cầu ảnh xoay 3D bằng CSS | transform 3D, scrub video | file |
| `feather-atlas` | Sổ tay chim 3D, hai mô hình GLB tương tác | Three.js r170, drag/zoom/turn | server |
| `fennec` | Cáo 3D cầm trà sữa, menu mọc từ pill | Three.js r160, clip-path menu | server |
| `freight-hero` | Hero tàu hàng, stage 1280×800 phóng theo màn | font local, khối đối xứng | file |
| `gridwork` | Onboarding “What tools do you use?” với ảnh nhà kính | video loop forward/reverse | file |
| `iris` | Robot mascot 3D, đầu và mắt theo chuột | Three.js r169, bloom, rim shader | server |
| `jack-portfolio` | Portfolio 3D creator | Vite + React | npm |
| `kairn` | Kính trượt tuyết Alpine 26, bố cục 1546×1017 | font Anybody wide, cụm tile 2×2 | file |
| `keylight` | Trang sign-in chia đôi, tái tạo nguyên văn source | Google Sans self-host | server |
| `kollektiva` | Hero tập thể sáng tạo | Vite + React + Tailwind | npm |
| `lauberhorn` | Dashboard hướng dẫn đường mòn núi | SVG bản đồ, biểu đồ, gauge | file |
| `lumora` | Phi hành gia nhí: đầu theo chuột bằng scrub video, mũ bảo hiểm bật tắt | fetch blob, mix-blend screen | server |
| `mainframe` | Hero scrub video theo chuột | Vite + React, video all-intra | npm |
| `meadowbell` | Series hoạt hình nông trại, frame 1440×1280 | Grandstander, chapter cards | file |
| `melli` | Ong 3D bay theo scroll qua 5 section | Three.js r160, cánh procedural | server |
| `mostar` | Thành phố Mostar | HTML/CSS/JS tách file | file |
| `murmur` | Podcast hero, cửa sổ mưa blue hour | waveform procedural, bloom | file |
| `nival` | Spotlight reveal | CSS mask | file |
| `planet-jumping` | Chuyển cảnh hành tinh bằng video portal | clip-path, blob loader | file |
| `reelmark` | Carousel thẻ video cong, kéo được | clip-path path(), 10 thẻ chung 1 video | file |
| `ridgeai` | Hero AI app-builder, dãy núi tuyết | khung blueprint, bloom/sweep | file |
| `skyprompt` | Đảo bay với fan 4 thẻ art | highlighter SVG, frame 1440×900 | file |
| `soscale` | Agency quảng cáo | font subset local, video H.264 | file |
| `spaceedu` | Chuyển đổi hành tinh | CSS/JS thuần | file |
| `strata` | AI infrastructure, canvas 2048×1455 | glass cards, DM Sans | file |
| `studio-footer` | Footer studio scrub video | Next 15 App Router | npm |
| `synapsex` | Hero AI với video lazy | Vite + React | npm |
| `toonhub` | Carousel hoạt hình | Vite + lucide | npm |
| `vesper` | Hero AI infra, nút liquid-glass | Inter + Instrument Serif local | file |
| `wanderfar` | Booking du lịch, vịnh hẹp Na Uy | Inter opsz, search bar | file |

## Quy ước chung

- **Font:** tự host dưới dạng `.woff2` subset latin, đặt cạnh `index.html`, không gọi Google Fonts lúc chạy (trừ vài trang đầu).
- **Media:** ảnh và video tải từ CDN được chỉ định trong spec. Riêng `vesper/hero.mp4` và `fennec/hero.mp4` là bản encode lại H.264 vì nguồn gốc là HEVC 10-bit, không phát được trên trình duyệt thiếu giải mã phần cứng.
- **Chuyển động:** entrance chạy một lần bằng CSS hoặc Web Animations rồi dọn sạch inline style. Mọi trang tôn trọng `prefers-reduced-motion`: tắt entrance, tắt video, giữ ảnh tĩnh.
- **Responsive:** mỗi trang có bố cục riêng cho desktop, tablet và điện thoại theo spec; không cuộn ngang ở 360–390px.
- **Không framework** với các trang tĩnh: HTML, CSS và JS thuần trong một file.

## Cách kiểm tra

Mỗi trang được kiểm tra bằng script Node điều khiển Chrome headless qua CDP: đo toạ độ phần tử so với spec, theo dõi timeline opacity/transform của entrance, xác nhận video phát và khớp khung ảnh tĩnh, bấm thử nút và menu, chụp ảnh ở từng kích thước. Script nằm ngoài repo.
