import { Project, Service, Experience, AboutData, HeroData, ContactData } from './types';

export const NAV_LINKS = [
  { name: 'Giới thiệu', href: '#about' },
  { name: 'Dự án', href: '#projects' },
  { name: 'Dịch vụ', href: '#services' },
  { name: 'Tư vấn Trực tuyến', href: '#ai-consultant' },
  { name: 'Liên hệ', href: '#contact' },
];

export const HERO_DATA: HeroData = {
  name: "Nguyễn Hoàng Nguyên",
  title: "Kỹ Sư Xây Dựng & Quản Lý Dự Án",
  subtitle: "Kiến tạo những công trình bền vững với hơn 10 năm kinh nghiệm trong lĩnh vực kết cấu và thi công.",
  cta: "Xem Dự Án",
};

export const ABOUT_DATA: AboutData = {
  badge: "Về Tôi",
  titleLine1: "Tận tâm với từng chi tiết,",
  titleLine2: "Vững chắc mọi công trình.",
  description1: "Là một kỹ sư xây dựng với hơn 10 năm kinh nghiệm, tôi đã trực tiếp tham gia vào nhiều dự án quy mô lớn từ giai đoạn thiết kế ý tưởng đến khi bàn giao đưa vào sử dụng.",
  description2: "Tôi tin rằng một công trình thành công không chỉ cần đảm bảo an toàn chịu lực mà còn phải tối ưu về kinh tế và thẩm mỹ. Phương châm làm việc của tôi là \"Chính xác - Hiệu quả - Trách nhiệm\".",
  skills: [
    "Quản lý dự án (PMP)",
    "Thiết kế kết cấu (ETABS, SAP2000)",
    "Bản vẽ kỹ thuật (AutoCAD, Revit)",
    "Dự toán công trình",
    "Giám sát an toàn lao động",
    "Tiếng Anh chuyên ngành"
  ]
};

export const CONTACT_DATA: ContactData = {
  phone: "0934 862 383",
  email: "hoangnguyen231104@gmail.com",
  address: "Tầng 12, Tòa nhà Building 68, Cầu Giấy, Hà Nội",
  socialLinks: [
    { id: 1, platform: 'facebook', url: '#' },
    { id: 2, platform: 'linkedin', url: '#' },
    { id: 3, platform: 'zalo', url: 'https://zalo.me/0934862383' }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Chung cư cao cấp Skyline",
    category: "Nhà cao tầng",
    image: "https://picsum.photos/id/122/800/600",
    description: "Giám sát thi công kết cấu phần thân và hoàn thiện. Đảm bảo tiến độ nhanh hơn 2 tháng so với kế hoạch.",
    stats: [
      { label: "Diện tích", value: "25,000 m²" },
      { label: "Ngân sách", value: "500 Tỷ VNĐ" },
      { label: "Năm", value: "2022" }
    ]
  },
  {
    id: 2,
    title: "Cầu vượt Sông Hồng 2",
    category: "Cầu đường",
    image: "https://picsum.photos/id/227/800/600",
    description: "Tham gia thiết kế kỹ thuật và tính toán chịu lực cho nhịp chính của cầu dây văng.",
    stats: [
      { label: "Chiều dài", value: "1.2 km" },
      { label: "Tải trọng", value: "HL-93" },
      { label: "Năm", value: "2020" }
    ]
  },
  {
    id: 3,
    title: "Nhà máy Intel Tech",
    category: "Công nghiệp",
    image: "https://picsum.photos/id/364/800/600",
    description: "Quản lý dự án thi công nhà xưởng thép tiền chế khẩu độ lớn và hệ thống M&E.",
    stats: [
      { label: "Diện tích", value: "10,000 m²" },
      { label: "Kết cấu", value: "Thép tiền chế" },
      { label: "Năm", value: "2023" }
    ]
  }
];

export const SERVICES: Service[] = [
  {
    id: 1,
    title: "Thiết kế Kết cấu",
    description: "Tính toán và thiết kế kết cấu bê tông cốt thép, kết cấu thép đảm bảo an toàn và tối ưu chi phí.",
    icon: "Ruler"
  },
  {
    id: 2,
    title: "Giám sát Thi công",
    description: "Kiểm soát chất lượng, khối lượng và an toàn lao động trực tiếp tại công trường.",
    icon: "HardHat"
  },
  {
    id: 3,
    title: "Tư vấn Pháp lý",
    description: "Hỗ trợ xin giấy phép xây dựng, hoàn công và các thủ tục pháp lý liên quan.",
    icon: "FileText"
  },
  {
    id: 4,
    title: "Thẩm tra Thiết kế",
    description: "Kiểm tra độc lập hồ sơ thiết kế để phát hiện sai sót và đề xuất giải pháp tốt hơn.",
    icon: "Search"
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    role: "Trưởng phòng Quản lý Dự án",
    company: "VinConstruction",
    period: "2019 - Nay",
    description: "Chịu trách nhiệm quản lý danh mục dự án nhà ở cao tầng tại khu vực phía Bắc."
  },
  {
    id: 2,
    role: "Kỹ sư Kết cấu Chính",
    company: "Civil Engineering Corp 1",
    period: "2015 - 2019",
    description: "Chủ trì thiết kế kết cấu cho các dự án trường học và bệnh viện công."
  },
  {
    id: 3,
    role: "Kỹ sư Giám sát",
    company: "Delta Group",
    period: "2013 - 2015",
    description: "Giám sát thi công cọc khoan nhồi và tường vây cho các tòa nhà văn phòng."
  }
];